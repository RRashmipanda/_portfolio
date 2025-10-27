import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Snippets = () => {
  const [showCircle, setShowCircle] = useState(false);
  const [message, setMessage] = useState("Click 'Start' to test your reaction time!");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => {
    setMessage("Wait for green...");
    setReactionTime(null);
    setGameActive(true);
    const delay = Math.random() * 3000 + 2000; // 2–5s random delay
    setShowCircle(false);
    setTimeout(() => {
      setShowCircle(true);
      setStartTime(Date.now());
      setMessage("Click now!");
    }, delay);
  };

  const handleClick = () => {
    if (!gameActive) return;

    if (!showCircle) {
      // clicked too early
      setMessage("Too early! Try again.");
      setGameActive(false);
      return;
    }

    const endTime = Date.now();
    const reaction = endTime - (startTime ?? endTime);
    setReactionTime(reaction);
    setMessage(`⏱️ Your reaction time: ${reaction} ms`);
    setShowCircle(false);
    setGameActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <h1 className="text-5xl font-bold mb-6 dark:text-gray-100">🎮 Let's Play</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
          Test your reaction speed! Click as soon as the screen turns <span className="text-green-500 font-semibold">green</span>.
        </p>

        <div
          onClick={handleClick}
          className={`w-72 h-72 flex items-center justify-center rounded-2xl cursor-pointer transition-colors duration-300 ${
            showCircle ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <motion.span
            key={message}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl text-white font-semibold"
          >
            {showCircle ? "CLICK!" : message.includes("Too early") ? "⛔" : ""}
          </motion.span>
        </div>

        <div className="mt-6">
          {reactionTime && (
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Your best time: <span className="font-semibold">{reactionTime} ms</span>
            </p>
          )}
          <Button onClick={startGame} variant="default" className="px-6 py-3 text-lg">
            Start
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Snippets;