import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const [allFiles, setAllFiles] = useState([]);
  const maxFiles = 10;
  const pdfThumbnail = "/pdfThumbnail.png"; // URL for the PDF thumbnail in the static folder

  const onDrop = useCallback((acceptedFiles) => {
    setAllFiles((prevFiles) => {
      // Filter out any non-file objects or undefined values
      const filteredFiles = acceptedFiles.filter(
        (file) => file instanceof File
      );

      // Create previews for new files
      const newFilesWithPreview = filteredFiles.map((file) => {
        if (file.type === "application/pdf") {
          return { ...file, preview: pdfThumbnail };
        } else {
          return { ...file, preview: URL.createObjectURL(file) };
        }
      });

      // Combine with previous files, but ensure total does not exceed maxFiles
      return [...prevFiles, ...newFilesWithPreview].slice(0, maxFiles);
    });
  }, []);

  const thumbs = allFiles.map((file, index) => (
    <div
      key={`${file.path}-${index}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "10px",
        marginBottom: "10px",
        width: "100px", // Set width to match the thumbnail
      }}
    >
      <img
        src={file.preview}
        style={{ width: "100%", height: "100px" }}
        alt={file.path}
      />
      <p
        style={{
          marginTop: "5px",
          fontSize: "0.8em",
          color: "black",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%", // Ensure the text respects the container's width
          textAlign: "center",
        }}
      >
        {file.path}
      </p>
    </div>
  ));

  // Clean up the URLs when the component unmounts
  useEffect(() => {
    return () =>
      allFiles.forEach((file) => {
        if (file.type !== "application/pdf") {
          URL.revokeObjectURL(file.preview);
        }
      });
  }, [allFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <>
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            Drag 'n' drop some files here, or click to select files (max 10)
          </p>
        </div>
        <aside style={{ display: "flex", flexWrap: "wrap" }}>{thumbs}</aside>
      </div>
      <form
        name="draganddropform-name"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
        <input
          type="hidden"
          name="draganddropform-name"
          value="draganddropform-name"
        />
        <input type="file" style={{ display: "none" }} name="file0" />
        <input type="file" style={{ display: "none" }} name="file1" />
        <input type="file" style={{ display: "none" }} name="file2" />
        <input type="file" style={{ display: "none" }} name="file3" />
        <input type="file" style={{ display: "none" }} name="file4" />
        <input type="file" style={{ display: "none" }} name="file5" />
        <input type="file" style={{ display: "none" }} name="file6" />
        <input type="file" style={{ display: "none" }} name="file7" />
        <input type="file" style={{ display: "none" }} name="file8" />
        <input type="file" style={{ display: "none" }} name="file9" />
      </form>
    </>
  );
}

export default MyDropzone;
