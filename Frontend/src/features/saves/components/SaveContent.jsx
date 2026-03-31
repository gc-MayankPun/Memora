import { useState, useEffect } from "react";
import { HiSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { PiNotePencilLight } from "react-icons/pi";
import "../styles/save-content.scss";
import AddToCollection from "../../collections/components/AddToCollection";
import { getHighlights, deleteHighlight } from "../services/highlight.api";
import { PiQuotesFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function SaveContent({ save, onUpdateTags, onUpdateNote }) {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    getHighlights(save._id)
      .then((data) => setHighlights(data.highlights || []))
      .catch(() => setHighlights([]));
  }, [save._id]);

  const handleDeleteHighlight = async (highlightId) => {
    await deleteHighlight(save._id, highlightId);
    setHighlights((prev) => prev.filter((h) => h._id !== highlightId));
  };

  const [tags, setTags] = useState(save.tags || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [tagsDirty, setTagsDirty] = useState(false);

  const [note, setNote] = useState(save.note || "");
  const [editingNote, setEditingNote] = useState(false);
  const [noteDirty, setNoteDirty] = useState(false);

  const addTag = () => {
    const trimmed = inputVal.trim().toLowerCase().replace(/\s+/g, "-");
    if (trimmed && !tags.includes(trimmed)) {
      const next = [...tags, trimmed];
      setTags(next);
      setTagsDirty(true);
    }
    setInputVal("");
    setInputVisible(false);
  };

  const removeTag = (tag) => {
    const next = tags.filter((t) => t !== tag);
    setTags(next);
    setTagsDirty(true);
  };

  const saveTags = async () => {
    onUpdateTags(tags);
    setTagsDirty(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTag();
    if (e.key === "Escape") {
      setInputVisible(false);
      setInputVal("");
    }
  };

  const saveNote = () => {
    setEditingNote(false);
    setNoteDirty(false);
    if (note !== save.note) onUpdateNote(note);
  };

  const handleNoteKeyDown = (e) => {
    if (e.key === "Escape") saveNote();
  };

  return (
    <div className="save-content">
      {/* AI Summary */}
      <section className="save-content__section">
        <div className="save-content__section-label">
          <HiSparkles className="save-content__ai-icon" />
          AI Summary
        </div>
        <p className="save-content__summary">{save.summary}</p>
      </section>

      {/* Your Note */}
      <section className="save-content__section">
        <div className="save-content__section-label">
          <PiNotePencilLight className="save-content__note-icon" />
          Your Note
          {noteDirty && (
            <button className="save-content__save-tags" onClick={saveNote}>
              Save
            </button>
          )}
        </div>

        {editingNote ? (
          <textarea
            autoFocus
            className="save-content__note-input"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteDirty(e.target.value !== save.note); // ← mark dirty only if actually changed
            }}
            onBlur={saveNote}
            onKeyDown={handleNoteKeyDown}
            placeholder="Why did you save this? What stood out?"
            rows={3}
          />
        ) : (
          <div
            className={`save-content__note ${!note ? "save-content__note--empty" : ""}`}
            onClick={() => setEditingNote(true)}
          >
            {note || "Add a personal note..."}
          </div>
        )}
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="save-content__section">
          <div className="save-content__section-label">
            <PiQuotesFill className="save-content__highlight-icon" />
            Highlights
            <span className="save-content__highlight-count">
              {highlights.length}
            </span>
          </div>
          <div className="save-content__highlights">
            {highlights.map((h) => (
              <div key={h._id} className="save-content__highlight">
                <span className="save-content__highlight-quote">❝</span>
                <p className="save-content__highlight-text">
                  {h.highlightedText}
                </p>
                <button
                  className="save-content__highlight-delete"
                  onClick={() => handleDeleteHighlight(h._id)}
                  aria-label="Delete highlight"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI Topics */}
      <section className="save-content__section">
        <div className="save-content__section-label">
          <HiSparkles className="save-content__ai-icon" />
          Key Topics
        </div>
        <div className="save-content__topics">
          {save.topics?.map((topic) => (
            <span key={topic} className="save-content__topic">
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="save-content__section">
        <div className="save-content__section-label">
          Tags
          {tagsDirty && (
            <button className="save-content__save-tags" onClick={saveTags}>
              Save
            </button>
          )}
        </div>
        <div className="save-content__tags">
          {tags.map((tag) => (
            <span key={tag} className="save-content__tag">
              # {tag}
              <button
                className="save-content__tag-remove"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
              >
                <IoClose />
              </button>
            </span>
          ))}
          {inputVisible ? (
            <input
              autoFocus
              className="save-content__tag-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={addTag}
              placeholder="new tag..."
              maxLength={24}
            />
          ) : (
            <button
              className="save-content__tag-add"
              onClick={() => setInputVisible(true)}
            >
              <IoAdd /> Add tag
            </button>
          )}
        </div>
      </section>

      <section className="save-content__section">
        <div className="save-content__section-label">Collections</div>
        <AddToCollection saveId={save._id} />
      </section>
    </div>
  );
}
