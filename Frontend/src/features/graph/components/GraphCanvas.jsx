import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { useNavigate } from "react-router";
import "../styles/graph-canvas.scss";

const TYPE_COLORS = {
  article: "#4a67d6",
  tweet: "#1a7a45",
  youtube: "#c0392b",
  pdf: "#b05a0a",
  github: "#6b3fa0",
  reddit: "#c03a12",
};

export default function GraphCanvas({ graphData, theme }) {
  const svgRef = useRef(null);
  const navigate = useNavigate();

  const getThemeColors = useCallback(() => {
    const isDark = theme === "dark";
    return {
      bg: isDark ? "#111010" : "#faf9f7",
      topicNode: isDark ? "#282624" : "#ffffff",
      topicBorder: isDark ? "#3d3a37" : "#e8e5e0",
      topicText: isDark ? "#ede9e3" : "#1a1815",
      link: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
      linkHover: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
      accent: isDark ? "#c9924a" : "#003cb4",
    };
  }, [theme]);

  useEffect(() => {
    if (!graphData.nodes.length || !svgRef.current) return;

    const container = svgRef.current.parentElement;
    const W = container.clientWidth;
    const H = container.clientHeight;
    const colors = getThemeColors();

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current).attr("width", W).attr("height", H);

    // Zoom + pan
    const g = svg.append("g");
    svg.call(
      d3
        .zoom()
        .scaleExtent([0.2, 4])
        .on("zoom", (event) => g.attr("transform", event.transform)),
    );

    // Deep clone nodes/links so D3 mutation doesn't affect original state
    const nodes = graphData.nodes.map((n) => ({ ...n }));
    const links = graphData.links.map((l) => ({ ...l }));

    // Force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => {
            const target = d.target;
            const topicSaveCount = links.filter(
              (l) => (l.target?.id || l.target) === (target?.id || target),
            ).length;
            return topicSaveCount > 2 ? 120 : 160;
          })
          .strength(0.6),
      )
      .force("charge", d3.forceManyBody().strength(-280))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => (d.type === "topic" ? 52 : 32)),
      );

    // Links
    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "graph-link")
      .attr("stroke", colors.link)
      .attr("stroke-width", 1.5);

    // Topic nodes group
    const topicNodes = nodes.filter((n) => n.type === "topic");
    const saveNodes = nodes.filter((n) => n.type === "save");

    // Topic nodes 
    const topicGroup = g
      .append("g")
      .selectAll("g.topic-node")
      .data(topicNodes)
      .join("g")
      .attr("class", "topic-node")
      .style("cursor", "pointer")
      .call(drag(simulation));

    // pill background
    topicGroup
      .append("rect")
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("fill", colors.topicNode)
      .attr("stroke", colors.topicBorder)
      .attr("stroke-width", 1);

    topicGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", colors.topicText)
      .attr("font-size", "11px")
      .attr("font-family", "DM Sans, sans-serif")
      .attr("font-weight", "500")
      .attr("letter-spacing", "0.3px")
      .text((d) => d.label);

    // Size pill to text
    topicGroup.each(function () {
      const grp = d3.select(this);
      const text = grp.select("text").node();
      if (!text) return;
      const bbox = text.getBBox();
      const pw = bbox.width + 24;
      const ph = bbox.height + 14;
      grp
        .select("rect")
        .attr("width", pw)
        .attr("height", ph)
        .attr("x", -pw / 2)
        .attr("y", -ph / 2);
    });

    // Topic hover
    topicGroup
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .select("rect")
          .attr("stroke", colors.accent)
          .attr("stroke-width", 1.5);
        // Highlight connected links
        link
          .attr("stroke", (l) =>
            l.target?.id === d.id || l.target === d.id
              ? colors.accent
              : colors.link,
          )
          .attr("stroke-width", (l) =>
            l.target?.id === d.id || l.target === d.id ? 2 : 1.5,
          );
        // Dim unconnected save nodes
        saveGroup.attr("opacity", (s) => {
          const connected = links.some(
            (l) =>
              (l.target?.id === d.id || l.target === d.id) &&
              (l.source?.id === s.id || l.source === s.id),
          );
          return connected ? 1 : 0.25;
        });
      })
      .on("mouseleave", function () {
        d3.select(this)
          .select("rect")
          .attr("stroke", colors.topicBorder)
          .attr("stroke-width", 1);
        link.attr("stroke", colors.link).attr("stroke-width", 1.5);
        saveGroup.attr("opacity", 1);
      });

    // Save nodes 
    const saveGroup = g
      .append("g")
      .selectAll("g.save-node")
      .data(saveNodes)
      .join("g")
      .attr("class", "save-node")
      .style("cursor", "pointer")
      .call(drag(simulation))
      .on("click", (event, d) => {
        event.stopPropagation();
        navigate(`/saves/${d.data._id}`);
      });

    // Circle
    saveGroup
      .append("circle")
      .attr("r", 22)
      .attr("fill", (d) => TYPE_COLORS[d.nodeType] || TYPE_COLORS.article)
      .attr("opacity", 0.15)
      .attr("stroke", (d) => TYPE_COLORS[d.nodeType] || TYPE_COLORS.article)
      .attr("stroke-width", 1.5);

    // Initials / short label inside circle
    saveGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", (d) => TYPE_COLORS[d.nodeType] || TYPE_COLORS.article)
      .attr("font-size", "9px")
      .attr("font-family", "DM Mono, monospace")
      .attr("font-weight", "500")
      .text((d) => d.label.slice(0, 2).toUpperCase());

    // Tooltip label below circle
    saveGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 32)
      .attr("fill", colors.topicText)
      .attr("font-size", "9.5px")
      .attr("font-family", "DM Sans, sans-serif")
      .attr("opacity", 0.7)
      .text((d) => {
        const max = 22;
        return d.label.length > max ? d.label.slice(0, max) + "…" : d.label;
      });

    // Save hover
    saveGroup
      .on("mouseenter", function (event, d) {
        d3.select(this).select("circle").attr("opacity", 0.35).attr("r", 26);
        link
          .attr("stroke", (l) =>
            l.source?.id === d.id || l.source === d.id
              ? colors.accent
              : colors.link,
          )
          .attr("stroke-width", (l) =>
            l.source?.id === d.id || l.source === d.id ? 2 : 1.5,
          );
      })
      .on("mouseleave", function () {
        d3.select(this).select("circle").attr("opacity", 0.15).attr("r", 22);
        link.attr("stroke", colors.link).attr("stroke-width", 1.5);
      });

    // Tick 
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      topicGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
      saveGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [graphData, theme, getThemeColors, navigate]);

  return (
    <div className="graph-canvas">
      <svg ref={svgRef} />
    </div>
  );
}

function drag(simulation) {
  return d3
    .drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}
