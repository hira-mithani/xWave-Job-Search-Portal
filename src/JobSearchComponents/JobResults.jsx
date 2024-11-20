import React from "react";
import "./Style.css";

const JobResults = ({ jobs }) => {
  return (
    <div className="job-results">
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => (
          <JobItem
            key={job.id}
            title={job.title}
            type={job.type}
            description={job.description}
          />
        ))
      ) : (
        <NoJobsFound />
      )}
    </div>
  );
};

const JobItem = ({ title, type, description }) => {
  return (
    <div className="job-item">
      <h3 className="job-title">{title}</h3>
      <p className="job-type">Type: {type}</p>
      <p className="job-description">{description}</p>
    </div>
  );
};

const NoJobsFound = () => {
  return (
    <p className="no-jobs-message">
       No jobs found. Please adjust your search criteria or try again later.
    </p>
  );
};

export default JobResults;
