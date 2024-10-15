import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TagInput = ({ tagsData, onTagsChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(tagsData);
  }, [tagsData]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim()) {
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onTagsChange(updatedTags);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white px-2 py-3 rounded-full flex items-center"
          >
            {tag}
            <button
              type="button"
              className="ml-4 text-red-500"
              onClick={() => handleRemoveTag(tag)}
              style={{padding:"0px 10px"}}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder="Add a tag"
          className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="bg-[#f97316] text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

TagInput.propTypes = {
  tagsData: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTagsChange: PropTypes.func.isRequired,
};

export default TagInput;
