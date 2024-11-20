import React, { useState, useCallback } from 'react';
import './Style.css';

const JobSearch = ({ jobs, onSearch, onSelectJob }) => {
  const [title, setTitle] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  const handleInputChange = useCallback((e) => {
    const inputTitle = e.target.value;
    setTitle(inputTitle);

    if (inputTitle.trim()) {
      const filteredSuggestions = jobs.filter((job) =>
        job.title.toLowerCase().includes(inputTitle.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [jobs]);


  const handleSuggestionClick = useCallback(
    (job) => {
      setTitle(job.title); 
      setSuggestions([]);
      onSelectJob?.(job);  
    },
    [onSelectJob]
  );

  const handleSearchClick = () => {
    const filteredJob = jobs.find(
      (job) => job.title.toLowerCase() === title.toLowerCase()
    );
    if (filteredJob) {
      onSelectJob?.(filteredJob);
    } else {
      alert('Job not found. Please refine your search.');
    }
  };

  return (
    <div className="job-search">
      <input
        type="text"
        placeholder="Job Title (e.g., Frontend Developer)"
        value={title}
        onChange={handleInputChange}
        aria-label="Search for job titles"
      />
      {suggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {suggestions.map((job) => (
            <div
              key={job.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(job)}
              tabIndex="0" 
              onKeyPress={(e) =>
                e.key === 'Enter' && handleSuggestionClick(job)
              }
            >
              {job.title}
            </div>
          ))}
        </div>
      )}
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default JobSearch;
