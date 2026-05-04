import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadExtension = () => {
  return (
    <a
      href="https://addons.mozilla.org/en-US/firefox/addon/gc-memora/"
      target="_blank"
      className="lp-btn lp-btn--download"
    >
      <FaDownload /> Download Extension
    </a>
  );
};

export default DownloadExtension;
