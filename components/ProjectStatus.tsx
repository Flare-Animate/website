import React from "react";

export default function ProjectStatus() {
  return (
    <section>
      <div className="container">
        <span className="section-label">Project status</span>
        <h2>A work in progress</h2>
        <p className="section-desc">
          Flare is an open-source animation editor in active development. Builds
          and feature support may change; check the releases and project issues
          for the latest status.
        </p>
        <div className="btn-group">
          <a
            href="https://github.com/Flare-Animate/Flare/releases"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            View releases
          </a>
          <a
            href="https://github.com/Flare-Animate/Flare/issues"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Follow development
          </a>
        </div>
      </div>
    </section>
  );
}
