// Blog.tsx
import React, { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Copy,
  Check,
  Layout,
  Home,
  ShoppingCart,
  BarChart,
  Package,
  DollarSign,
  Star,
  Mail,
  HelpCircle,
  Moon,
  Sun,
  Menu,
} from "lucide-react";


/* -----------------------
   Theme tokens (premium)
   ----------------------- */
const THEME = {
  primary: "#D4A753", // polished royal gold
  dark: "#141414", // premium matte black
  light: "#FAF4EA", // creamy luxury white
  accent: "#7C2138", // deep wine/burgundy
  borderWarm: "#B78A44",
};

/* -----------------------
   Utility: JSX -> HTML (best-effort)
   ----------------------- */
function jsxToHtml(jsx: string) {
  return jsx
    .replace(/className=/g, "class=")
    // remove single self-closing React components like <Menu />
    .replace(/<([A-Z][A-Za-z0-9_]*)\s*\/>/g, "")
    // remove wrapper custom component tags conservatively: <Component>...</Component> -> inner
    .replace(/<([A-Z][A-Za-z0-9_]*)[^>]*>([\s\S]*?)<\/\1>/g, "$2")
    .trim();
}

/* -----------------------
   Individual preview components
   ----------------------- */

const NavbarPreview: React.FC = () => (
  <nav
    className="flex justify-between items-center px-6 py-4 rounded-lg shadow-md"
    style={{ background: THEME.dark, color: THEME.light, border: `1px solid ${THEME.borderWarm}` }}
  >
    <div className="font-semibold text-lg" style={{ color: THEME.primary }}>
      LuxuryBrand
    </div>

    <div className="hidden md:flex gap-6 text-sm" style={{ color: THEME.light }}>
      <a href="#" className="hover:opacity-90 transition">
        Home
      </a>
      <a href="#" className="hover:opacity-90 transition">
        Collection
      </a>
      <a href="#" className="hover:opacity-90 transition">
        Contact
      </a>
    </div>

    <div className="flex items-center gap-3">
      <button
        className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded"
        style={{ border: `1px solid ${THEME.borderWarm}`, color: THEME.primary }}
      >
        <ShoppingCart size={14} /> Cart
      </button>

      <button className="md:hidden p-2 rounded-lg border" style={{ borderColor: THEME.primary }}>
        <Menu size={20} style={{ color: THEME.primary }} />
      </button>
    </div>
  </nav>
);

const HeroPreview: React.FC = () => (
  <section
    className="text-center py-16 rounded-2xl shadow-lg"
    style={{ background: `linear-gradient(180deg, ${THEME.dark}, #0f0f0f)`, color: THEME.light, border: `1px solid ${THEME.borderWarm}` }}
  >
    <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: THEME.primary }}>
      Elevate Your Style
    </h1>
    <p className="mb-6 opacity-80" style={{ color: "#e6dcbc" }}>
      Discover premium products crafted to last.
    </p>
    <div className="flex justify-center gap-4">
      <button className="px-6 py-3 rounded-md font-semibold shadow" style={{ background: THEME.primary, color: THEME.dark }}>
        Shop Now
      </button>
      <button className="px-6 py-3 rounded-md border" style={{ border: `1px solid ${THEME.borderWarm}`, color: THEME.light }}>
        Explore
      </button>
    </div>
  </section>
);

const ProductCardPreview: React.FC = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ background: THEME.light }}>
    <img src="https://via.placeholder.com/420x240" className="rounded-lg mb-4 w-full object-cover" alt="product" />
    <div className="flex justify-between items-center mb-2">
      <div>
        <h3 className="font-semibold text-lg" style={{ color: THEME.dark }}>
          Leather Weekender
        </h3>
        <p className="text-sm opacity-80" style={{ color: THEME.accent }}>
          Hand-stitched premium leather
        </p>
      </div>
      <div className="text-right">
        <div className="font-bold" style={{ color: THEME.primary }}>
          $249
        </div>
        <div className="flex items-center gap-1 text-[#B78A44] mt-1">
          <Star size={14} fill={THEME.primary} />
          <Star size={14} fill={THEME.primary} />
          <Star size={14} fill={THEME.primary} />
          <Star size={14} fill={THEME.primary} />
          <Star size={14} className="opacity-40" />
        </div>
      </div>
    </div>

    <div className="flex gap-3">
      <button className="flex-1 py-2 rounded-md font-medium" style={{ background: THEME.primary, color: THEME.dark }}>
        Add to Cart
      </button>
      <button className="px-3 py-2 rounded-md border" style={{ border: `1px solid ${THEME.borderWarm}`, color: THEME.dark }}>
        View
      </button>
    </div>
  </div>
);

const ProductGridPreview: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i}>
        <ProductCardPreview />
      </div>
    ))}
  </div>
);

const LoginFormPreview: React.FC = () => (
  <form className="p-6 rounded-xl shadow-sm" style={{ background: THEME.light }}>
    <input className="w-full p-3 border rounded-lg mb-3" placeholder="Email" />
    <input className="w-full p-3 border rounded-lg mb-3" placeholder="Password" />
    <button className="w-full py-3 rounded-md font-medium" style={{ background: THEME.primary, color: THEME.dark }}>
      Sign In
    </button>
  </form>
);

const LoaderPreview: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-8 h-8 rounded-full animate-spin" style={{ border: `4px solid ${THEME.primary}`, borderTopColor: "transparent" }} />
  </div>
);

const StatsCardsPreview: React.FC = () => (
  <div className="grid grid-cols-3 gap-4">
    <div className="p-4 rounded-xl text-center" style={{ background: THEME.primary, color: THEME.dark }}>
      Sales
    </div>
    <div className="p-4 rounded-xl text-center" style={{ background: THEME.accent, color: THEME.light }}>
      Users
    </div>
    <div className="p-4 rounded-xl text-center" style={{ background: "#4338CA", color: THEME.light }}>
      Revenue
    </div>
  </div>
);

const PricingPreview: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="rounded-xl p-6 text-center" style={{ background: THEME.light }}>
      <h3 className="font-semibold">Basic</h3>
      <p className="mt-2 opacity-80">$29 / month</p>
    </div>

    <div className="rounded-xl p-6 text-center transform scale-105 shadow-lg" style={{ background: THEME.primary, color: THEME.dark }}>
      <h3 className="font-bold">Premium</h3>
      <p className="text-3xl font-extrabold mt-2">$99</p>
      <p className="opacity-80">per month</p>
      <button className="mt-4 w-full py-2 rounded-md" style={{ background: THEME.dark, color: THEME.primary }}>
        Choose
      </button>
    </div>

    <div className="rounded-xl p-6 text-center" style={{ background: THEME.light }}>
      <h3 className="font-semibold">Enterprise</h3>
      <p className="mt-2 opacity-80">$149 / month</p>
    </div>
  </div>
);

const FAQPreview: React.FC = () => (
  <div className="p-5 rounded-xl shadow-sm" style={{ background: THEME.dark, color: THEME.light }}>
    <details>
      <summary className="cursor-pointer font-semibold" style={{ color: THEME.primary }}>
        What makes your products special?
      </summary>
      <p className="mt-3 opacity-80">Crafted with premium materials and attention to detail.</p>
    </details>
  </div>
);

const NewsletterPreview: React.FC = () => (
  <div className="p-6 rounded-xl flex gap-4 items-center" style={{ background: THEME.dark, color: THEME.light, border: `1px solid ${THEME.borderWarm}` }}>
    <Mail size={24} style={{ color: THEME.primary }} />
    <input className="flex-1 p-3 rounded-md bg-[#0f0f0f] border" placeholder="Enter your email" style={{ color: THEME.light }} />
    <button className="px-4 py-2 rounded-md" style={{ background: THEME.primary, color: THEME.dark }}>
      Join
    </button>
  </div>
);

/* -----------------------
   Components metadata (code strings + previews)
   ----------------------- */

const componentsMeta = [
  {
    id: "navbar",
    title: "Navbar",
    description: "Premium navbar with elegant accents.",
    preview: <NavbarPreview />,
    reactCode: `
<nav className="flex justify-between items-center px-6 py-4 rounded-lg shadow-md" style={{ background: "${THEME.dark}", color: "${THEME.light}", border: "1px solid ${THEME.borderWarm}" }}>
  <div className="font-semibold text-lg" style={{ color: "${THEME.primary}" }}>LuxuryBrand</div>
  <div className="hidden md:flex gap-6 text-sm" style={{ color: "${THEME.light}" }}>
    <a href="#">Home</a>
    <a href="#">Collection</a>
    <a href="#">Contact</a>
  </div>
  <button className="md:hidden p-2 rounded-lg border" style={{ borderColor: "${THEME.primary}" }}>
    <Menu size={20} style={{ color: "${THEME.primary}" }} />
  </button>
</nav>
`.trim(),
  },

  {
    id: "hero",
    title: "Hero",
    description: "Bold hero with CTA.",
    preview: <HeroPreview />,
    reactCode: `
<section className="text-center py-16 rounded-2xl shadow-lg" style={{ background: "linear-gradient(180deg, ${THEME.dark}, #0f0f0f)", color: "${THEME.light}", border: "1px solid ${THEME.borderWarm}" }}>
  <h1 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ color: "${THEME.primary}" }}>Elevate Your Style</h1>
  <p className="mb-6 opacity-80">Discover premium products crafted to last.</p>
  <div className="flex justify-center gap-4">
    <button className="px-6 py-3 rounded-md font-semibold shadow" style={{ background: "${THEME.primary}", color: "${THEME.dark}" }}>Shop Now</button>
    <button className="px-6 py-3 rounded-md border" style={{ border: "1px solid ${THEME.borderWarm}", color: "${THEME.light}" }}>Explore</button>
  </div>
</section>
`.trim(),
  },

  {
    id: "product-card",
    title: "Product Card",
    description: "Card with price and actions.",
    preview: <ProductCardPreview />,
    reactCode: `
<div className="bg-white rounded-2xl p-4 shadow-sm" style={{ background: "${THEME.light}" }}>
  <img src="https://via.placeholder.com/420x240" className="rounded-lg mb-4 w-full object-cover" alt="product" />
  <div className="flex justify-between items-center mb-2">
    <div>
      <h3 className="font-semibold text-lg" style={{ color: "${THEME.dark}" }}>Leather Weekender</h3>
      <p className="text-sm opacity-80" style={{ color: "${THEME.accent}" }}>Hand-stitched premium leather</p>
    </div>
    <div className="text-right">
      <div className="font-bold" style={{ color: "${THEME.primary}" }}>$249</div>
    </div>
  </div>
  <div className="flex gap-3">
    <button className="flex-1 py-2 rounded-md font-medium" style={{ background: "${THEME.primary}", color: "${THEME.dark}" }}>Add to Cart</button>
    <button className="px-3 py-2 rounded-md border" style={{ border: "1px solid ${THEME.borderWarm}", color: "${THEME.dark}" }}>View</button>
  </div>
</div>
`.trim(),
  },

  {
    id: "product-grid",
    title: "Product Grid",
    description: "Responsive grid for items.",
    preview: <ProductGridPreview />,
    reactCode: `
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* product cards */ }
</div>
`.trim(),
  },

  {
    id: "login",
    title: "Login Form",
    description: "Simple sign in form.",
    preview: <LoginFormPreview />,
    reactCode: `
<form className="p-6 rounded-xl shadow-sm" style={{ background: "${THEME.light}" }}>
  <input className="w-full p-3 border rounded-lg mb-3" placeholder="Email" />
  <input className="w-full p-3 border rounded-lg mb-3" placeholder="Password" />
  <button className="w-full py-3 rounded-md font-medium" style={{ background: "${THEME.primary}", color: "${THEME.dark}" }}>Sign In</button>
</form>
`.trim(),
  },

  {
    id: "loader",
    title: "Loader",
    description: "Minimal spinner loader.",
    preview: <LoaderPreview />,
    reactCode: `
<div className="flex justify-center items-center py-8">
  <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '4px solid ${THEME.primary}', borderTopColor: 'transparent' }} />
</div>
`.trim(),
  },

  {
    id: "stats",
    title: "Stats Cards",
    description: "KPI cards.",
    preview: <StatsCardsPreview />,
    reactCode: `
<div className="grid grid-cols-3 gap-4">
  <div className="p-4 rounded-xl text-center" style={{ background: "${THEME.primary}", color: "${THEME.dark}" }}>Sales</div>
  <div className="p-4 rounded-xl text-center" style={{ background: "${THEME.accent}", color: "${THEME.light}" }}>Users</div>
  <div className="p-4 rounded-xl text-center" style={{ background: "#4338CA", color: "${THEME.light}" }}>Revenue</div>
</div>
`.trim(),
  },

  {
    id: "pricing",
    title: "Pricing",
    description: "Three tier pricing.",
    preview: <PricingPreview />,
    reactCode: `
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* pricing cards */}
</div>
`.trim(),
  },

  {
    id: "faq",
    title: "FAQ",
    description: "Accessible accordion.",
    preview: <FAQPreview />,
    reactCode: `
<div className="p-5 rounded-xl" style={{ background: "${THEME.dark}", color: "${THEME.light}" }}>
  <details>
    <summary className="cursor-pointer font-semibold" style={{ color: "${THEME.primary}" }}>What makes your products special?</summary>
    <p className="mt-3 opacity-80">Crafted with premium materials and attention to detail.</p>
  </details>
</div>
`.trim(),
  },

  {
    id: "newsletter",
    title: "Newsletter",
    description: "Subscription CTA.",
    preview: <NewsletterPreview />,
    reactCode: `
<div className="p-6 rounded-xl flex gap-4 items-center" style={{ background: "${THEME.dark}", color: "${THEME.light}", border: "1px solid ${THEME.borderWarm}" }}>
  <Mail size={24} style={{ color: "${THEME.primary}" }} />
  <input className="flex-1 p-3 rounded-md bg-[#0f0f0f] border" placeholder="Enter your email" style={{ color: "${THEME.light}" }} />
  <button className="px-4 py-2 rounded-md" style={{ background: "${THEME.primary}", color: "${THEME.dark}" }}>Join</button>
</div>
`.trim(),
  },
].map((c) => ({ ...c, htmlCode: jsxToHtml(c.reactCode) }));

/* -----------------------
   Small CodeBlock component
   ----------------------- */
const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
  <pre className="text-xs overflow-x-auto p-3 rounded-md bg-[#0b0b0b] text-[#f1e9d6]">
    <code>{children}</code>
  </pre>
);

/* -----------------------
   Main page component
   ----------------------- */
const Blog: React.FC = () => {
  const [openCode, setOpenCode] = useState<Record<string, boolean>>({});
  const [codeTab, setCodeTab] = useState<Record<string, "react" | "html">>({});
  const [copiedMap, setCopiedMap] = useState<Record<string, string>>({});
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") return document.documentElement.classList.contains("dark");
    return true;
  });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const copyText = async (key: string, type: "react" | "html", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMap((m) => ({ ...m, [key]: `${type.toUpperCase()} copied` }));
      setTimeout(() => setCopiedMap((m) => ({ ...m, [key]: undefined })), 2000);
    } catch {
      setCopiedMap((m) => ({ ...m, [key]: `copy failed` }));
      setTimeout(() => setCopiedMap((m) => ({ ...m, [key]: undefined })), 2000);
    }
  };

  const handleToggleCode = (id: string) => {
    setOpenCode((s) => ({ ...s, [id]: !s[id] }));
    setCodeTab((s) => ({ ...s, [id]: s[id] || "react" }));
  };

  return (
    <div className="min-h-screen bg-[#FAF4EA] dark:bg-[#141414] transition-colors">
      <Navigation />

      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 flex items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: THEME.primary }}>
            UI Vault
          </h1>
          <p className="mt-1 text-sm text-[#6f6150] dark:text-[#cfc3ab]">Premium clean Tailwind components — copy React or HTML.</p>
        </div>

        {/* <div className="flex items-center gap-3">
          <button
            className="px-3 py-2 rounded-md border flex items-center gap-2"
            onClick={() => setDarkMode((d) => !d)}
            style={{ borderColor: THEME.borderWarm, color: darkMode ? THEME.primary : THEME.dark, background: darkMode ? THEME.dark : "transparent" }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-sm">{darkMode ? "Light" : "Dark"}</span>
          </button>

          <button
            className="px-4 py-2 rounded-md shadow font-semibold"
            style={{ background: THEME.primary, color: THEME.dark }}
            onClick={() => window.scrollTo({ top: 9999, behavior: "smooth" })}
          >
            Explore Components
          </button>
        </div> */}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {componentsMeta.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border p-6 shadow-md transition hover:shadow-xl"
              style={{ background: darkMode ? THEME.dark : THEME.light, borderColor: THEME.borderWarm }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Layout size={28} style={{ color: THEME.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: darkMode ? THEME.light : THEME.dark }}>
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-sm mt-2" style={{ color: darkMode ? "#d8cdb8" : "#6f6150" }}>
                    {c.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 px-3 py-1 rounded-md text-sm border"
                      onClick={() => copyText(c.id, "react", c.reactCode)}
                      style={{ borderColor: THEME.borderWarm, color: THEME.primary, background: "transparent" }}
                      title="Copy React JSX"
                    >
                      {copiedMap[c.id]?.includes("REACT") ? <Check size={14} /> : <Copy size={14} />} React
                    </button>

                    <button
                      className="flex items-center gap-2 px-3 py-1 rounded-md text-sm border"
                      onClick={() => copyText(c.id, "html", c.htmlCode)}
                      style={{ borderColor: THEME.borderWarm, color: THEME.primary, background: "transparent" }}
                      title="Copy HTML"
                    >
                      <Copy size={14} /> HTML
                    </button>
                  </div>

                  <button className="text-xs underline" onClick={() => handleToggleCode(c.id)} style={{ color: darkMode ? "#d8cdb8" : "#6f6150" }}>
                    {openCode[c.id] ? "Hide Code" : "Show Code"}
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-lg p-4 border" style={{ borderColor: THEME.borderWarm, background: darkMode ? "#121212" : "#fff6ea" }}>
                {c.preview}
              </div>

              {openCode[c.id] && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      className={`px-3 py-1 rounded-md text-sm ${codeTab[c.id] === "react" ? "font-bold" : ""}`}
                      onClick={() => setCodeTab((s) => ({ ...s, [c.id]: "react" }))}
                      style={{ color: THEME.dark }}
                    >
                      React
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md text-sm ${codeTab[c.id] === "html" ? "font-bold" : ""}`}
                      onClick={() => setCodeTab((s) => ({ ...s, [c.id]: "html" }))}
                      style={{ color: THEME.dark }}
                    >
                      HTML
                    </button>

                    <div className="ml-auto text-sm text-green-500">{copiedMap[c.id]}</div>
                  </div>

                  {codeTab[c.id] === "react" ? <CodeBlock>{c.reactCode}</CodeBlock> : <CodeBlock>{c.htmlCode}</CodeBlock>}
                </div>
              )}
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: THEME.primary }}>
            Example Listing (Preview)
          </h2>
          <div className="rounded-2xl p-6" style={{ background: darkMode ? "#0f0f0f" : "#fff8ee", border: `1px solid ${THEME.borderWarm}` }}>
            <ProductGridPreview />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
