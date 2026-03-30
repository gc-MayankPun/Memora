import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../../app/theme.context";
import GraphCanvas from "../components/GraphCanvas";
import MemoryPanel from "../components/MemoryPanel";
import { IoArrowBack } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import { useGraph } from "../hooks/useGraph";
import "../styles/graph.scss";

export default function Graph() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { saves, graphData, loading } = useGraph();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="graph-page">
      {/* Topbar */}
      <div className="graph-page__topbar">
        <button className="graph-page__back" onClick={() => navigate("/")}>
          <IoArrowBack /> Back
        </button>
        <div className="graph-page__heading">
          <span className="graph-page__title">◈ Knowledge Graph</span>
          <span className="graph-page__subtitle">
            {graphData.nodes.filter((n) => n.type === "save").length} saves ·{" "}
            {graphData.nodes.filter((n) => n.type === "topic").length} topics
          </span>
        </div>

        {/* Mobile memory button */}
        <button
          className="graph-page__memory-btn"
          onClick={() => setSheetOpen(true)}
        >
          <LuBrainCircuit />
          <span>Memory</span>
        </button>
      </div>

      {/* Main layout */}
      <div className="graph-page__body">
        {/* Canvas */}
        <div className="graph-page__canvas-wrap">
          {loading ? (
            <div className="graph-page__loading">
              <div className="graph-page__loading-dots">
                <span />
                <span />
                <span />
              </div>
              <p>Building your graph</p>
            </div>
          ) : graphData.nodes.length === 0 ? (
            <div className="graph-page__empty">
              <span className="graph-page__empty-icon">◈</span>
              <p className="graph-page__empty-title">No connections yet</p>
              <p className="graph-page__empty-sub">
                Save some content to start building your knowledge graph.
              </p>
            </div>
          ) : (
            <GraphCanvas graphData={graphData} theme={theme} />
          )}
        </div>

        {/* Desktop sidebar */}
        <div className="graph-page__sidebar">
          <MemoryPanel saves={saves} />
          <div className="graph-page__legend">
            <p className="graph-page__legend-title">Legend</p>
            <div className="graph-page__legend-item">
              <span className="graph-page__legend-dot graph-page__legend-dot--topic" />
              Topic node
            </div>
            <div className="graph-page__legend-item">
              <span className="graph-page__legend-dot graph-page__legend-dot--save" />
              Save node — click to open
            </div>
            <div className="graph-page__legend-item graph-page__legend-hint">
              Hover nodes to highlight connections
            </div>
            <div className="graph-page__legend-item graph-page__legend-hint">
              Scroll to zoom · Drag to pan
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div
          className="graph-page__sheet-overlay"
          onClick={() => setSheetOpen(false)}
        />
      )}
      <div
        className={`graph-page__sheet ${sheetOpen ? "graph-page__sheet--open" : ""}`}
      >
        <div
          className="graph-page__sheet-handle"
          onClick={() => setSheetOpen(false)}
        />
        <div className="graph-page__sheet-content">
          <MemoryPanel saves={saves} />
          <div className="graph-page__legend">
            <p className="graph-page__legend-title">Legend</p>
            <div className="graph-page__legend-item">
              <span className="graph-page__legend-dot graph-page__legend-dot--topic" />
              Topic node
            </div>
            <div className="graph-page__legend-item">
              <span className="graph-page__legend-dot graph-page__legend-dot--save" />
              Save node — click to open
            </div>
            <div className="graph-page__legend-item graph-page__legend-hint">
              Pinch to zoom · Drag to pan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
