import React, { useState } from 'react';
import './TagInput.css';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || !inputValue.trim()) return;
    e.preventDefault();
    if (!tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-input-container">
      {tags.map((tag, index) => (
        <div key={index} className="tag-item">
          {tag}
          <span className="remove-tag" onClick={() => removeTag(tag)}>&times;</span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="tag-input"
        placeholder="Type an allergen and press Enter"
      />
    </div>
  );
};

export default TagInput;