import { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import "../styles/save-content.scss";

export default function SaveContent({ save, onUpdateTags }) {
  const [tags, setTags] = useState(save.tags || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [tagsDirty, setTagsDirty] = useState(false);

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

      {/* AI Topics */}
      <section className="save-content__section">
        <div className="save-content__section-label">
          <HiSparkles className="save-content__ai-icon" />
          Key Topics
        </div>
        <div className="save-content__topics">
          {save.topics.map((topic) => (
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
    </div>
  );
}
