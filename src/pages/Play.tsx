import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";



/* ---------- Settings / Difficulty ---------- */
const DIFFICULTIES = {
  Easy: { spawnInterval: 1400, targetTTL: 2100, maxTargets: 1, speed: 0.9, timer: 15 },
  Normal: { spawnInterval: 1000, targetTTL: 1800, maxTargets: 2, speed: 1.1, timer: 20 },
  Hard: { spawnInterval: 700, targetTTL: 1400, maxTargets: 3, speed: 1.35, timer: 20 },
  Insane: { spawnInterval: 450, targetTTL: 1000, maxTargets: 4, speed: 1.6, timer: 20 },
} as const;
type DifficultyKey = keyof typeof DIFFICULTIES;

/* ---------- Helpers: audio + random ---------- */
function playBeep(freq = 440, duration = 0.06, vol = 0.08) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + duration);
    o.onended = () => ctx.close();
  } catch {
    // noop on unsupported
  }
}
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

/* ---------- Types ---------- */
type Target = {
  id: string;
  x: number; // percentage left
  y: number; // percentage top
  createdAt: number;
  ttl: number;
  size: number; // px
  vx: number; // velocity for drifting
  vy: number;
  scale: number;
};

/* ---------- Component ---------- */
const Play: React.FC = () => {
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyKey>("Normal");
  const [running, setRunning] = useState(false);
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState<number | null>(null);
  const comboRef = useRef(0);
  const comboExpireRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTIES[difficulty].timer);
  const [modeTimerEnabled, setModeTimerEnabled] = useState(true); // timer mode vs infinite
  const spawnRef = useRef<number | null>(null);
  const tickerRef = useRef<number | null>(null);
  const [highscores, setHighscores] = useState<Record<string, number>>({});
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<
    { id: string; x: number; y: number; color?: string; created: number }[]
  >([]);
  const particleTimerRef = useRef<number | null>(null);

  /* Load highscores */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("arcade_highscores_v1");
      if (stored) setHighscores(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    // persist highscores when changed
    try {
      localStorage.setItem("arcade_highscores_v1", JSON.stringify(highscores));
    } catch {}
  }, [highscores]);

  /* Mouse cursor */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = arenaRef.current?.getBoundingClientRect();
      if (!rect) {
        setMousePos({ x: e.clientX, y: e.clientY });
      } else {
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Utility: spawn a target */
  const spawnTarget = () => {
    const arena = arenaRef.current;
    const areaW = arena?.clientWidth ?? 800;
    const areaH = arena?.clientHeight ?? 400;

    const size = Math.round(rand(36, 64));
    const padding = 20;
    const leftPx = rand(padding, areaW - padding - size);
    const topPx = rand(padding, areaH - padding - size);

    const t: Target = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      x: (leftPx / areaW) * 100,
      y: (topPx / areaH) * 100,
      createdAt: Date.now(),
      ttl: DIFFICULTIES[difficulty].targetTTL,
      size,
      vx: rand(-0.2, 0.2) * DIFFICULTIES[difficulty].speed,
      vy: rand(-0.2, 0.2) * DIFFICULTIES[difficulty].speed,
      scale: rand(0.95, 1.05),
    };

    setTargets((s) => {
      // limit targets per difficulty
      const max = DIFFICULTIES[difficulty].maxTargets;
      const next = [...s, t].slice(-max);
      return next;
    });
  };

  /* Start / Stop game */
  const startGame = (resetTimer = true) => {
    setRunning(true);
    setScore(0);
    setCombo(0);
    comboRef.current = 0;
    setTargets([]);
    if (modeTimerEnabled && resetTimer) setTimeLeft(DIFFICULTIES[difficulty].timer);

    // spawn loop
    if (spawnRef.current) window.clearInterval(spawnRef.current);
    spawnRef.current = window.setInterval(() => {
      spawnTarget();
    }, DIFFICULTIES[difficulty].spawnInterval);

    // movement & TTL ticker (updates positions + clears expired)
    if (tickerRef.current) window.clearInterval(tickerRef.current);
    tickerRef.current = window.setInterval(() => {
      setTargets((cur) =>
        cur
          .map((t) => {
            // drift slightly
            const nx = Math.max(3, Math.min(97, t.x + t.vx));
            const ny = Math.max(3, Math.min(97, t.y + t.vy));
            return { ...t, x: nx, y: ny };
          })
          .filter((t) => Date.now() - t.createdAt < t.ttl)
      );

      if (modeTimerEnabled) {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            // finish
            finishGame();
            return prev;
          }
          return (prev - 1) as typeof prev;
        });
      }
    }, 1000); // every second for TTL & timer (positions updated continuously via CSS transitions)
  };

  const pauseGame = () => {
    setRunning(false);
    if (spawnRef.current) {
      window.clearInterval(spawnRef.current);
      spawnRef.current = null;
    }
    if (tickerRef.current) {
      window.clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  };

  const finishGame = () => {
    pauseGame();
    // save highscore
    setTargets([]);
    const prev = highscores[difficulty] ?? 0;
    if (score > prev) {
      setHighscores((h) => ({ ...h, [difficulty]: score }));
      playBeep(880, 0.12, 0.12);
    } else {
      playBeep(220, 0.06, 0.06);
    }
  };

  useEffect(() => {
    // cleanup timers on unmount
    return () => {
      if (spawnRef.current) window.clearInterval(spawnRef.current);
      if (tickerRef.current) window.clearInterval(tickerRef.current);
      if (particleTimerRef.current) window.clearInterval(particleTimerRef.current);
    };
  }, []);

  /* Click handling on arena: hit detection */
  const handleArenaClick = (e: React.MouseEvent) => {
    if (!running) return;
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    // check targets from topmost (last) to first
    const hitIndex = [...targets].reverse().findIndex((t) => {
      const tx = (t.x / 100) * rect.width + t.size / 2;
      const ty = (t.y / 100) * rect.height + t.size / 2;
      const dist = Math.hypot(clickX - tx, clickY - ty);
      return dist <= t.size / 1.1; // generous hitbox
    });

    if (hitIndex === -1) {
      // miss: break combo
      comboRef.current = 0;
      setCombo(0);
      playBeep(120, 0.05, 0.03);
      // small particle on miss (gray)
      spawnParticles(clickX, clickY, "#999999");
      return;
    }

    // translate reverse-index to actual index
    const actualIndex = targets.length - 1 - hitIndex;
    const target = targets[actualIndex];

    // remove the target
    setTargets((t) => t.filter((x) => x.id !== target.id));

    // scoring: base points = size-based + time bonus
    const base = Math.round(100 * (1 + (64 - target.size) / 64));
    // combo logic
    const now = Date.now();
    if (comboExpireRef.current && now - comboExpireRef.current < 1200) {
      // within combo window
      comboRef.current = comboRef.current + 1;
    } else {
      comboRef.current = 1;
    }
    comboExpireRef.current = now;
    setCombo(comboRef.current);

    // combo multiplier
    const comboMultiplier = Math.min(1 + comboRef.current * 0.12, 3); // caps at x3
    const points = Math.round(base * comboMultiplier + Math.random() * 12);

    setScore((s) => s + points);

    // small reward sound & particle
    playBeep(600 + Math.random() * 300, 0.05, 0.06);
    spawnParticles((target.x / 100) * rect.width + target.size / 2, (target.y / 100) * rect.height + target.size / 2, "#FFD36B");
  };

  /* Particles: short lived */
  const spawnParticles = (x: number, y: number, color = "#FFD36B") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setParticles((p) => [...p, { id, x, y, color, created: Date.now() }]);
    // cleanup after 600ms
    setTimeout(() => {
      setParticles((p) => p.filter((pp) => pp.id !== id));
    }, 600);
  };

  /* UI helpers */
  const pretty = (n: number) => `${n}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-[#070707] dark:to-[#0b0b0b]">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Game area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 gap-4">
              <div>
                <h1 className="text-3xl font-bold dark:text-white">🎯 Arcade: Target Shooter</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Multiple targets, combos, highscores & smooth physics.</p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600 dark:text-gray-300">Mode</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as DifficultyKey)}
                  disabled={running}
                  className="px-3 py-2 rounded-md border"
                >
                  {Object.keys(DIFFICULTIES).map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={modeTimerEnabled}
                    onChange={(e) => setModeTimerEnabled(e.target.checked)}
                    className="h-4 w-4"
                    disabled={running}
                  />
                  Timer
                </label>

                {!running ? (
                  <Button onClick={() => startGame(true)} className="px-4 py-2">
                    Start
                  </Button>
                ) : (
                  <Button onClick={() => pauseGame()} className="px-4 py-2">
                    Pause
                  </Button>
                )}

                <Button
                  onClick={() => {
                    finishGame();
                    setScore(0);
                  }}
                  className="px-4 py-2"
                >
                  End
                </Button>
              </div>
            </div>

            <div
              ref={arenaRef}
              onMouseDown={(e) => {
                e.preventDefault();
                // forward to click handler
                handleArenaClick(e as any);
              }}
              className="relative w-full h-[520px] md:h-[560px] rounded-xl bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-[#1f1f1f] overflow-hidden"
            >
              {/* targets */}
              {targets.map((t) => {
                const style: React.CSSProperties = {
                  position: "absolute",
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  width: t.size,
                  height: t.size,
                  transform: `translate(-50%, -50%) scale(${t.scale})`,
                  transition: `left ${DIFFICULTIES[difficulty].spawnInterval / 1000}s linear, top ${DIFFICULTIES[difficulty].spawnInterval / 1000}s linear`,
                };
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: t.scale }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    style={{
                      ...style,
                      borderRadius: 9999,
                      background:
                        "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.15), rgba(0,0,0,0.05)), linear-gradient(180deg,#fffbec,#ffd36b)",
                      boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      // simulate click
                      const fake = {
                        clientX: (t.x / 100) * (arenaRef.current?.clientWidth ?? 0),
                        clientY: (t.y / 100) * (arenaRef.current?.clientHeight ?? 0),
                        preventDefault: () => {},
                        nativeEvent: e.nativeEvent,
                      } as any;
                      handleArenaClick(fake);
                    }}
                  >
                    <div className="text-sm font-semibold" style={{ color: "#382100" }}>
                      ✦
                    </div>
                  </motion.div>
                );
              })}

              {/* particles */}
              {particles.map((p) => (
                <span
                  key={p.id}
                  style={{
                    position: "absolute",
                    left: p.x,
                    top: p.y,
                    pointerEvents: "none",
                    transform: "translate(-50%,-50%)",
                    color: p.color,
                    fontSize: 18,
                    opacity: 0.95,
                    mixBlendMode: "screen",
                  }}
                >
                  ✶
                </span>
              ))}

              {/* gun cursor */}
              <div
                style={{
                  position: "absolute",
                  left: mousePos.x,
                  top: mousePos.y,
                  pointerEvents: "none",
                  transform: "translate(-50%,-50%)",
                  transition: "transform 0.06s linear",
                  zIndex: 60,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: "#000000",
                    opacity: 0.9,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFD36B",
                    fontWeight: 700,
                    transform: "rotate(-22deg)",
                  }}
                >
                  🔫
                </div>
              </div>

              {/* HUD */}
              <div style={{ position: "absolute", right: 12, top: 12 }} className="text-sm text-gray-700 dark:text-gray-200">
                <div>Score: <span className="font-bold">{score}</span></div>
                <div>Combo: <span className="font-bold">{combo}</span></div>
                {modeTimerEnabled && <div>Time: <span className="font-bold">{timeLeft}s</span></div>}
              </div>
            </div>
          </div>

          {/* Right: Controls & Highscores */}
          <aside className="w-full md:w-96 flex-shrink-0">
            <div className="rounded-xl p-4 bg-white dark:bg-[#0e0e0e] border border-gray-100 dark:border-[#1f1f1f] shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Game Controls</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Click on targets to score. Chain hits quickly to build combos.</p>

              <div className="mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Difficulty</div>
                <div className="flex gap-2">
                  {Object.keys(DIFFICULTIES).map((k) => (
                    <button
                      key={k}
                      onClick={() => !running && setDifficulty(k as DifficultyKey)}
                      className={`px-3 py-1 rounded-md text-sm ${difficulty === k ? "font-bold ring-2 ring-yellow-300" : "opacity-80"}`}
                      style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mode</div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={modeTimerEnabled} onChange={(e) => setModeTimerEnabled(e.target.checked)} />
                  Timer mode
                </label>
                <div className="text-xs text-gray-500 mt-2">Timer can be toggled. In infinite mode, play until you decide to end.</div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Highscores</div>
                <div className="text-sm">
                  <div className="flex justify-between"><span>Easy</span><span className="font-semibold">{highscores["Easy"] ?? 0}</span></div>
                  <div className="flex justify-between"><span>Normal</span><span className="font-semibold">{highscores["Normal"] ?? 0}</span></div>
                  <div className="flex justify-between"><span>Hard</span><span className="font-semibold">{highscores["Hard"] ?? 0}</span></div>
                  <div className="flex justify-between"><span>Insane</span><span className="font-semibold">{highscores["Insane"] ?? 0}</span></div>
                </div>
              </div>

              <div className="mb-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tips</div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4">
                  <li>Click targets quickly to maintain combos.</li>
                  <li>Targets move slightly — aim ahead of them.</li>
                  <li>Higher difficulty = more targets & less time.</li>
                </ul>
              </div>

              <div className="flex gap-2 mt-3">
                <Button onClick={() => startGame(true)} className="flex-1">Start</Button>
                <Button onClick={() => { pauseGame(); }} className="flex-1">Pause</Button>
              </div>

              <div className="mt-3 text-xs text-gray-500">Score: <span className="font-semibold">{score}</span></div>
            </div>

            <div className="mt-6 rounded-xl p-4 bg-white dark:bg-[#0e0e0e] border border-gray-100 dark:border-[#1f1f1f] shadow-sm">
              <h4 className="font-semibold mb-2">Session Stats</h4>
              <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">Best ({difficulty}): <span className="font-bold">{highscores[difficulty] ?? 0}</span></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Current Combo: <span className="font-bold">{combo}</span></div>
              <div className="mt-3">
                <Button onClick={() => { setScore(0); setCombo(0); setTargets([]); }}>Reset Session</Button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Play;
