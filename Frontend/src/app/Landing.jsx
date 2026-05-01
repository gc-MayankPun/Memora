import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaRocket,
  FaBrain,
  FaBookmark,
  FaSearch,
  FaCheck,
  FaArrowRight,
  FaDownload,
  FaShieldAlt,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaLayerGroup,
  FaYoutube,
  FaLink,
  FaTrash,
  FaExternalLinkAlt,
  FaHashtag,
  FaQuoteLeft,
  FaProjectDiagram,
  FaArrowDown,
} from "react-icons/fa";
import "./landing.scss";
import DownloadExtension from "./components/DownloadExtension";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`faq-item ${open ? "faq-item--open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div className="faq-item__header">
        <h3 className="faq-item__question">{question}</h3>
        <span className="faq-item__icon">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {open && <p className="faq-item__answer">{answer}</p>}
    </div>
  );
};

const DashboardMockup = () => (
  <div className="lpm lpm--dashboard">
    <div className="lpm__topbar">
      <span className="lpm__logo">Memora</span>
      <div className="lpm__search">
        <FaSearch />
        <span>Search your saves...</span>
      </div>
      <div className="lpm__topbar-right">
        <span className="lpm__chip">Collections</span>
        <span className="lpm__chip lpm__chip--acc">⬡ Graph</span>
      </div>
    </div>
    <div className="lpm__filters">
      {[
        "ALL",
        "ARTICLE",
        "TWEET",
        "YOUTUBE",
        "PDF",
        "GITHUB",
        "REDDIT",
        "FAVORITES",
      ].map((t, i) => (
        <span
          key={t}
          className={`lpm__filter ${i === 0 ? "lpm__filter--active" : ""}`}
        >
          {t}
        </span>
      ))}
    </div>
    <div className="lpm__grid">
      <div className="lpm__card">
        <div className="lpm__thumb lpm__thumb--article">
          <div className="lpm__thumb-inner">
            <span className="lpm__thumb-brand">
              Image <span style={{ color: "#e67e22" }}>Compressor</span>
            </span>
            <span className="lpm__thumb-sub">
              Compress JPEG, PNG, WebP and GIF images.
            </span>
          </div>
        </div>
        <div className="lpm__card-body">
          <p className="lpm__card-title">
            Image Compressor – Compress JPEG, PNG, WebP, GIF, SVG Online
          </p>
          <span className="lpm__badge lpm__badge--article">
            <FaLink />
            ARTICLE
          </span>
          <div className="lpm__card-tags">
            <span>#file-optimizer</span>
            <span>#image-resize</span>
            <span>#lossy-compression</span>
          </div>
          <div className="lpm__card-foot">
            <span>6 Apr 2026</span>
            <span>imagecompressor.com</span>
          </div>
        </div>
      </div>
      <div className="lpm__card">
        <div className="lpm__thumb lpm__thumb--youtube">
          <div className="lpm__thumb-inner lpm__thumb-inner--dark">
            <span className="lpm__thumb-stuck">Stuck?</span>
          </div>
        </div>
        <div className="lpm__card-body">
          <p className="lpm__card-title">
            (40) Stop Coding Like a Follower! 5 Mistakes Keeping You Stuck After
            Tutorials
          </p>
          <span className="lpm__badge lpm__badge--youtube">
            <FaYoutube />
            YOUTUBE
          </span>
          <div className="lpm__card-tags">
            <span>#software-development</span>
            <span>#coding-skills</span>
            <span>#learning-resources</span>
          </div>
          <div className="lpm__card-foot">
            <span>6 Apr 2026</span>
            <span>youtube.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DetailMockup = () => (
  <div className="lpm lpm--detail">
    <div className="lpm__detail-nav">
      <span className="lpm__back">← Back</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
        <span className="lpm__chip">
          <FaExternalLinkAlt /> Open
        </span>
        <span className="lpm__chip lpm__chip--danger">
          <FaTrash /> Delete
        </span>
      </div>
    </div>
    <div className="lpm__detail-hero-img" />
    <div className="lpm__detail-content">
      <div className="lpm__detail-left">
        <span className="lpm__badge lpm__badge--youtube">
          <FaYoutube />
          YOUTUBE
        </span>
        <h3 className="lpm__detail-title">
          Stop Coding Like a Follower! 5 Mistakes Keeping You Stuck After
          Tutorials
        </h3>
        <span className="lpm__detail-source">youtube.com · 6 April 2026</span>

        <div className="lpm__section-hd">
          <FaBrain /> AI SUMMARY
        </div>
        <div className="lpm__ai-box">
          This YouTube video discusses common mistakes that prevent developers
          from advancing after completing coding tutorials.
        </div>

        <div className="lpm__section-hd" style={{ marginTop: "14px" }}>
          <FaQuoteLeft /> HIGHLIGHTS <span className="lpm__count">1</span>
        </div>
        <div className="lpm__highlight-box">
          🚀 What You Will Learn — Why you get stuck after tutorials · Common
          coding mistakes · Copy vs Figure Out mindset · How to develop a strong
          developer mindset
        </div>

        <div className="lpm__section-hd" style={{ marginTop: "14px" }}>
          ⬡ KEY TOPICS
        </div>
        <div className="lpm__topics">
          <span>coding mistakes</span>
          <span>tutorial learning</span>
          <span>programming advice</span>
        </div>

        <div className="lpm__section-hd" style={{ marginTop: "12px" }}>
          <FaHashtag /> TAGS
        </div>
        <div className="lpm__tags-row">
          <span># software-development ×</span>
          <span># coding-skills ×</span>
          <span># learning-resources ×</span>
          <span className="lpm__add-tag">+ Add tag</span>
        </div>

        <div className="lpm__section-hd" style={{ marginTop: "12px" }}>
          🗂 COLLECTIONS
        </div>
        <div className="lpm__collection-row">
          <span className="lpm__collection-btn">🗂 Add to collection +</span>
          <span className="lpm__collection-item">
            🗂 React Resources <span>0</span>
          </span>
        </div>
      </div>
      <div className="lpm__detail-right">
        <div className="lpm__section-hd">
          ⇌ RELATED SAVES <span className="lpm__count">0</span>
        </div>
        <p className="lpm__no-related">NO RELATED SAVES FOUND.</p>
      </div>
    </div>
  </div>
);

const GraphMockup = () => (
  <div className="lpm lpm--graph">
    <div className="lpm__graph-top">
      <span className="lpm__back">← Back</span>
      <span className="lpm__graph-label">
        ⬡ <em>Knowledge Graph</em>
      </span>
      <span className="lpm__graph-meta">2 saves · 6 topics</span>
    </div>
    <div className="lpm__graph-wrap">
      <div className="lpm__graph-canvas">
        <svg className="lpm__graph-svg" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="21%"
            y1="44%"
            x2="14%"
            y2="16%"
            stroke="#333"
            strokeWidth="1"
          />
          <line
            x1="21%"
            y1="44%"
            x2="31%"
            y2="30%"
            stroke="#333"
            strokeWidth="1"
          />
          <line
            x1="21%"
            y1="44%"
            x2="14%"
            y2="70%"
            stroke="#333"
            strokeWidth="1"
          />
          <line
            x1="56%"
            y1="38%"
            x2="76%"
            y2="16%"
            stroke="#333"
            strokeWidth="1"
          />
          <line
            x1="56%"
            y1="38%"
            x2="88%"
            y2="44%"
            stroke="#333"
            strokeWidth="1"
          />
          <line
            x1="56%"
            y1="38%"
            x2="76%"
            y2="66%"
            stroke="#333"
            strokeWidth="1"
          />
        </svg>
        <div
          className="lpm__node lpm__node--topic"
          style={{ top: "12%", left: "6%" }}
        >
          programming advice
        </div>
        <div
          className="lpm__node lpm__node--topic"
          style={{ top: "26%", left: "22%" }}
        >
          coding mistakes
        </div>
        <div
          className="lpm__node lpm__node--topic"
          style={{ top: "66%", left: "6%" }}
        >
          tutorial learning
        </div>
        <div
          className="lpm__node lpm__node--topic"
          style={{ top: "12%", right: "14%" }}
        >
          media processing
        </div>
        <div
          className="lpm__node lpm__node--topic"
          style={{ top: "40%", right: "4%" }}
        >
          image compression
        </div>
        <div
          className="lpm__node lpm__node--topic"
          style={{ top: "62%", right: "14%" }}
        >
          online tools
        </div>
        <div
          className="lpm__node lpm__node--save"
          style={{ top: "38%", left: "14%" }}
        >
          <span>4C</span>
          <div className="lpm__node-label">(40) Stop Coding Like...</div>
        </div>
        <div
          className="lpm__node lpm__node--save"
          style={{ top: "31%", left: "49%" }}
        >
          <span>IM</span>
          <div className="lpm__node-label">Image Compressor – Com...</div>
        </div>
      </div>
      <div className="lpm__graph-sidebar">
        <div className="lpm__from-memory">
          <div className="lpm__memory-icon">🧠</div>
          <p className="lpm__memory-title">You've viewed everything.</p>
          <p className="lpm__memory-sub">
            No forgotten saves, you're built different 🔥
          </p>
        </div>
        <div className="lpm__legend">
          <div className="lpm__legend-title">LEGEND</div>
          <div className="lpm__legend-row">
            <span className="lpm__ldot lpm__ldot--topic" />
            Topic node
          </div>
          <div className="lpm__legend-row">
            <span className="lpm__ldot lpm__ldot--save" />
            Save node — click to open
          </div>
          <p className="lpm__legend-hint">
            Hover nodes to highlight connections
          </p>
          <p className="lpm__legend-hint">Scroll to zoom · Drag to pan</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeMockup, setActiveMockup] = useState("dashboard");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const mockupTabs = [
    { id: "dashboard", label: "Dashboard", icon: <FaLayerGroup /> },
    { id: "detail", label: "Save Detail", icon: <FaBrain /> },
    { id: "graph", label: "Knowledge Graph", icon: <FaProjectDiagram /> },
  ];

  const faqs = [
    {
      question: "How do I install the Chrome extension?",
      answer:
        "Download the extension zip, go to chrome://extensions, enable Developer Mode, then drag and drop the zip onto the page. Done in under a minute.",
    },
    {
      question: "What types of content can I save?",
      answer:
        "Articles, YouTube videos, tweets, GitHub repos, PDFs, Reddit posts, and more. The AI adapts its extraction per type — YouTube gets a transcript-aware summary, GitHub gets a repo description, etc.",
    },
    {
      question: "How does semantic search work?",
      answer:
        "On every save, we generate a 1024-dim vector via Mistral Embeddings and store it in MongoDB Atlas. When you search, your query becomes a vector too and we find nearest matches by meaning — not by keywords.",
    },
    {
      question: "What are Key Topics vs Tags?",
      answer:
        "Key Topics are AI-extracted concepts that appear as nodes in the Knowledge Graph. Tags are user-facing labels (AI-suggested, editable) for filtering on the dashboard.",
    },
    {
      question: "What is the Knowledge Graph?",
      answer:
        "A D3.js force-directed graph mapping every save and AI topic as nodes. Shared topics create edges so you can visually explore connections across your entire knowledge base.",
    },
    {
      question: "How does Memory Resurfacing work?",
      answer:
        "Memora tracks lastViewedAt per save. It surfaces items saved 7+ days ago that haven't been viewed in 5+ days, shuffled on every visit — shown in the sidebar.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes. Every DB query is scoped to your userId at the query level — not just the route. JWT stored in HTTP-only cookies with SameSite=None for extension support.",
    },
    {
      question: "Does text highlighting work everywhere?",
      answer:
        "Yes. Select any text on any webpage → a tooltip appears → click Save Highlight → it's stored under that save's detail page.",
    },
  ];

  return (
    <div className="lp">
      <div className="lp__ambient">
        <div className="lp__orb lp__orb--a" />
        <div className="lp__orb lp__orb--b" />
        <div className="lp__orb lp__orb--c" />
      </div>

      {/* NAV */}
      <nav className={`lp-nav ${scrolled ? "lp-nav--scrolled" : ""}`}>
        <div className="lp-nav__inner">
          <span className="lp-nav__wordmark">Memora</span>
          <div className="lp-nav__links">
            <button
              onClick={() => scrollTo("features")}
              className="lp-nav__link"
            >
              Features
            </button>
            <button onClick={() => scrollTo("how")} className="lp-nav__link">
              How it works
            </button>
            <button
              onClick={() => scrollTo("download")}
              className="lp-nav__link"
            >
              Extension
            </button>
            <button onClick={() => scrollTo("faq")} className="lp-nav__link">
              FAQ
            </button>
          </div>
          <div className="lp-nav__actions">
            <button
              className="lp-nav__signin"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
            <button
              className="lp-nav__cta"
              onClick={() => navigate("/register")}
            >
              Get started <FaArrowRight />
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero__left">
          <div className="lp-hero__eyebrow">
            <span className="lp-hero__dot" />
            AI-powered knowledge management
          </div>
          <h1 className="lp-hero__title">
            Save anything.
            <br />
            Find it by
            <br />
            <em>meaning.</em>
          </h1>
          <p className="lp-hero__sub">
            Memora captures any webpage, video, or tweet in one click, then
            automatically summarises, tags, and connects your content using AI,
            so you can search by intent, not exact words.
          </p>
          <div className="lp-hero__ctas">
            <button
              className="lp-btn lp-btn--primary"
              onClick={() => navigate("/register")}
            >
              <FaRocket /> Start saving
            </button>
            <button
              className="lp-btn lp-btn--ghost"
              onClick={() => scrollTo("how")}
            >
              See how it works <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="lp-hero__right">
          <div className="lp-mockup-switcher">
            <div className="lp-mockup-tabs">
              {mockupTabs.map((t) => (
                <button
                  key={t.id}
                  className={`lp-mockup-tab ${activeMockup === t.id ? "lp-mockup-tab--active" : ""}`}
                  onClick={() => setActiveMockup(t.id)}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <div className="lp-mockup-frame">
              {activeMockup === "dashboard" && <DashboardMockup />}
              {activeMockup === "detail" && <DetailMockup />}
              {activeMockup === "graph" && <GraphMockup />}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="lp-section lp-section--alt">
        <div className="lp-container">
          <div className="lp-section__eyebrow">How it works</div>
          <h2 className="lp-section__title">
            Four steps to your knowledge base
          </h2>
          <div className="lp-steps">
            {[
              {
                n: "01",
                icon: <FaDownload />,
                title: "Install the extension",
                desc: "Drag the zip into chrome://extensions with Developer Mode on. Works on Chrome, Edge, and Brave.",
              },
              {
                n: "02",
                icon: <FaBookmark />,
                title: "Save anything, one click",
                desc: "Click the icon on any page — or select text → tooltip → Save Highlight. Articles, videos, repos, tweets.",
              },
              {
                n: "03",
                icon: <FaBrain />,
                title: "AI enriches it silently",
                desc: "Mistral AI generates a summary, extracts key topics, suggests tags, and embeds it as a 1024-dim vector.",
              },
              {
                n: "04",
                icon: <FaSearch />,
                title: "Search by meaning",
                desc: "Type a concept, not an exact phrase. Vector search finds closest ideas across everything you've saved.",
              },
            ].map((s, i) => (
              <div key={i} className="lp-step">
                <div className="lp-step__num">{s.n}</div>
                <div className="lp-step__icon">{s.icon}</div>
                <h4 className="lp-step__title">{s.title}</h4>
                <p className="lp-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="lp-section">
        <div className="lp-container">
          <div className="lp-section__eyebrow">Features</div>
          <h2 className="lp-section__title">
            Every layer of your knowledge, covered
          </h2>
          <div className="lp-features">
            <div className="lp-feature-hero">
              <div className="lp-feature-hero__icon">
                <FaBrain />
              </div>
              <div>
                <div className="lp-feature-hero__tag">Core engine</div>
                <h3 className="lp-feature-hero__title">
                  AI Enrichment Pipeline
                </h3>
                <p className="lp-feature-hero__desc">
                  Every save runs through Mistral AI via LangChain. You get an
                  auto-generated summary, AI-extracted key topics that power the
                  Knowledge Graph, auto-suggested tags, and a 1024-dimensional
                  semantic embedding stored in MongoDB Atlas, no external vector
                  DB needed.
                </p>
                <ul className="lp-feature-hero__list">
                  <li>
                    <FaCheck /> Auto-summarisation per content type
                  </li>
                  <li>
                    <FaCheck /> Key topic extraction → Knowledge Graph nodes
                  </li>
                  <li>
                    <FaCheck /> AI tag suggestions + user editing
                  </li>
                  <li>
                    <FaCheck /> Semantic vector embeddings in MongoDB Atlas
                  </li>
                </ul>
              </div>
            </div>
            <div className="lp-feat-grid">
              {[
                {
                  icon: <FaProjectDiagram />,
                  title: "Knowledge Graph",
                  desc: "D3.js force-directed graph of every save and AI topic as nodes. Hover to highlight connections, scroll to zoom, drag to pan.",
                },
                {
                  icon: <FaSearch />,
                  title: "Semantic Search",
                  desc: '"Make my app faster" finds your React performance article. One MongoDB Atlas vector index, zero extra services.',
                },
                {
                  icon: <FaLightbulb />,
                  title: "Text Highlights",
                  desc: "Select any passage → tooltip → saved as a highlight under that save's detail page, with full surrounding context.",
                },
                {
                  icon: <FaLayerGroup />,
                  title: "Collections",
                  desc: 'Group saves into named collections like "React Resources". Assign from the save detail page, as many as you need.',
                },
                {
                  icon: <FaCode />,
                  title: "Memory Resurfacing",
                  desc: "Saves 7+ days old, not viewed in 5+ days, are surfaced in the sidebar on every visit so nothing stays buried.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Query-level security",
                  desc: "Every DB query is scoped to your userId, not just the route. JWT in HTTP-only cookies with SameSite=None for extension.",
                },
              ].map((f, i) => (
                <div key={i} className="lp-feat-card">
                  <div className="lp-feat-card__icon">{f.icon}</div>
                  <h4 className="lp-feat-card__title">{f.title}</h4>
                  <p className="lp-feat-card__desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VECTOR EXPLAINER */}
      <section className="lp-section lp-section--alt">
        <div className="lp-container">
          <div className="lp-vector">
            <div className="lp-vector__text">
              <div className="lp-section__eyebrow">Under the hood</div>
              <h2 className="lp-section__title">
                Search that understands intent
              </h2>
              <p className="lp-vector__desc">
                Traditional bookmarking matches words. Memora matches{" "}
                <em>meaning</em>. Every save is converted to a vector
                representing its semantic content. Similar meanings cluster
                together, so "make my app faster" finds your React performance
                article without those exact words.
              </p>
              <p className="lp-vector__desc">
                No Pinecone. No extra services. MongoDB Atlas vector search, in
                the same database as everything else.
              </p>
            </div>
            <div className="lp-vector__demo">
              <div className="lp-vdemo">
                <div className="lp-vdemo__row">
                  <span className="lp-vdemo__label">Your query</span>
                  <span className="lp-vdemo__phrase">"make my app faster"</span>
                </div>
                <div className="lp-vdemo__arrow">
                  <FaArrowDown /> converted to 1024-dim vector
                </div>
                <div className="lp-vdemo__vec">
                  [0.22, 0.81, 0.11, 0.89, 0.34…]
                </div>
                <div className="lp-vdemo__arrow">
                  <FaArrowDown /> nearest match in Atlas
                </div>
                <div className="lp-vdemo__match">
                  <FaBookmark className="lp-vdemo__match-icon" />
                  <div>
                    <p className="lp-vdemo__match-title">
                      React Performance Optimisation Guide
                    </p>
                    <div className="lp-vdemo__match-meta">
                      <span
                        className="lpm__badge lpm__badge--article"
                        style={{ fontSize: "0.65rem" }}
                      >
                        <FaLink />
                        ARTICLE
                      </span>
                      <span>saved 12 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="lp-section lp-section--download">
        <div className="lp-container">
          <div className="lp-download">
            <div className="lp-download__text">
              <div className="lp-section__eyebrow lp-section__eyebrow--warm">
                Chrome Extension
              </div>
              <h2 className="lp-section__title">One click. From anywhere.</h2>
              <p className="lp-download__desc">
                The extension turns your entire browser into a capture layer.
                Works on Chrome, Edge, Brave, and any Chromium browser.
              </p>
              <div className="lp-download__feats">
                {[
                  "One-click page saving",
                  "Text highlight selection + tooltip",
                  "Auto-categorisation by content type",
                  "Auth synced with web app (HTTP-only JWT)",
                  "Already-saved page detection",
                  "Works on Chrome, Edge, Brave",
                ].map((f, i) => (
                  <div key={i} className="lp-download__feat">
                    <FaCheck /> {f}
                  </div>
                ))}
              </div>
              <DownloadExtension />
            </div>
            <div className="lp-download__popup">
              <div className="lp-popup">
                <div className="lp-popup__bar">
                  <div className="lp-popup__logo">M</div>
                  <span>Memora</span>
                  <span className="lp-popup__pill">extension</span>
                </div>
                <div className="lp-popup__form">
                  <label>Page title</label>
                  <div className="lp-popup__input">
                    Stop Coding Like a Follower! – YouTube
                  </div>
                  <label>
                    Note <span>(optional)</span>
                  </label>
                  <div className="lp-popup__textarea">
                    Great breakdown of the tutorial trap and how to build real
                    developer mindset...
                  </div>
                  <div className="lp-popup__auto-tags">
                    <span className="lp-popup__auto-label">AI will add</span>
                    <span>#coding-skills</span>
                    <span>#learning-resources</span>
                  </div>
                  <button className="lp-popup__save">
                    <FaBookmark /> Save to Memora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="lp-section lp-section--alt">
        <div className="lp-container lp-container--narrow">
          <div className="lp-section__eyebrow">FAQ</div>
          <h2 className="lp-section__title">Questions answered</h2>
          <div className="lp-faq">
            {faqs.map((f, i) => (
              <FAQItem key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="lp-cta">
        <div className="lp-cta__inner">
          <h2 className="lp-cta__title">Build your second brain.</h2>
          <p className="lp-cta__sub">
            Start saving. Let the AI connect the dots. Never lose a good idea to
            the void of browser tabs again.
          </p>
          <div className="lp-cta__actions">
            <button
              className="lp-btn lp-btn--primary lp-btn--lg"
              onClick={() => navigate("/register")}
            >
              <FaRocket /> Get started free
            </button>
            <a
              href="/extension.zip"
              download="memora-extension.zip"
              className="lp-btn lp-btn--outline lp-btn--lg"
            >
              <FaDownload /> Download extension
            </a>
          </div>
          <p className="lp-cta__note">
            No credit card · Free forever · Your data stays yours
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer__inner">
            <div className="lp-footer__brand">
              <span>Memora</span>
              <p>Your digital second brain</p>
            </div>
            <div className="lp-footer__cols">
              <div className="lp-footer__col">
                <h4>Product</h4>
                <button onClick={() => scrollTo("features")}>Features</button>
                <button onClick={() => scrollTo("how")}>How it works</button>
                <button onClick={() => scrollTo("download")}>Extension</button>
              </div>
              <div className="lp-footer__col">
                <h4>Support</h4>
                <button onClick={() => scrollTo("faq")}>FAQ</button>
                <a href="mailto:support@memora.app">Contact</a>
              </div>
              <div className="lp-footer__col">
                <h4>Account</h4>
                <button onClick={() => navigate("/login")}>Sign in</button>
                <button onClick={() => navigate("/register")}>Sign up</button>
              </div>
            </div>
          </div>
          <div className="lp-footer__bottom">
            <p>© 2024 Memora. All rights reserved.</p>
            <a
              href="https://github.com/gc-MayankPun/Memora"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
