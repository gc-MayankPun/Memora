import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadExtension = () => {
  return (
    <a
      href="https://github.com/gc-MayankPun/Memora/blob/main/extension/README.md"
      target="_blank"
      className="lp-btn lp-btn--download"
    >
      <FaDownload /> Download Extension
    </a>
  );
};

export default DownloadExtension;
