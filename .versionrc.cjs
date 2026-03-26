"use strict";

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "changelog-templates");
const read = (name) => fs.readFileSync(path.join(dir, name), "utf8");

module.exports = {
  header:
    "# Changelog\n\n" +
    "All notable changes to this project will be documented in this file.\n\n" +
    "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), " +
    "and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n",
  types: [
    { type: "feat", section: "Added" },
    { type: "fix", section: "Fixed" },
    { type: "perf", section: "Changed" },
    { type: "refactor", section: "Changed" },
    { type: "docs", section: "Changed" },
    { type: "build", section: "Changed" },
    { type: "deprecated", section: "Deprecated" },
    { type: "chore", hidden: true },
    { type: "ci", hidden: true },
    { type: "test", hidden: true },
  ],
  releaseCommitMessageFormat: "chore(release): {{currentTag}}",
  writerOpts: {
    mainTemplate: read("template.hbs"),
    headerPartial: read("header.hbs"),
    commitPartial: read("commit.hbs"),
    footerPartial: read("footer.hbs"),
  },
};
