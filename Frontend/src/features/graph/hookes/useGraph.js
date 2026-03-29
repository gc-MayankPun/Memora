import { useState, useEffect } from "react";
import { fetchAllSaves } from "../../dashboard/services/dashboard.api";

export function useGraph() {
  const [saves, setSaves] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchAllSaves();
        const allSaves = data.saves || [];
        setSaves(allSaves);
        setGraphData(buildGraphData(allSaves));
      } catch (err) {
        console.error("Failed to load graph data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { saves, graphData, loading };
}

function buildGraphData(saves) {
  const nodes = [];
  const links = [];
  const topicMap = new Map(); // topic label → node id

  saves.forEach((save) => {
    const saveNodeId = `save-${save._id}`;

    nodes.push({
      id: saveNodeId,
      label: save.title,
      type: "save",
      nodeType: save.type || "article",
      thumbnail: save.thumbnail,
      data: save,
    });

    (save.topics || []).forEach((topic) => {
      const topicKey = topic.toLowerCase().trim();

      if (!topicMap.has(topicKey)) {
        const topicNodeId = `topic-${topicKey}`;
        topicMap.set(topicKey, topicNodeId);
        nodes.push({
          id: topicNodeId,
          label: topic,
          type: "topic",
        });
      }

      links.push({
        source: saveNodeId,
        target: topicMap.get(topicKey),
      });
    });
  });

  return { nodes, links };
}