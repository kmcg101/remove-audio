import React from "react";

export default function DroppedFileAttributes({ droppedFile }) {
  return (
    <div>
      <ul>
        <li>File size: {Math.round(droppedFile.payload?.size / 1000000)}MB</li>
      </ul>
    </div>
  );
}
