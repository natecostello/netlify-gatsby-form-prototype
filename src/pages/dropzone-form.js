import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const [allFiles, setAllFiles] = useState([]);
  const [totalSize, setTotalSize] = useState(0);
  const pdfThumbnail = "/pdfThumbnail.png";

  const onDrop = useCallback(
    (acceptedFiles) => {
      const maxFilesSize = 8 * 1024 * 1024; // 8 MB in bytes
      const maxFiles = 10; // Maximum number of files

      // Calculate the size of the new files
      const newSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0);

      // Check if adding new files exceeds the size limit
      if (totalSize + newSize > maxFilesSize) {
        alert("Adding these files would exceed the 8MB limit.");
        return;
      }

      // Check if adding new files exceeds the size limit
      if (allFiles.length + acceptedFiles.length > maxFiles) {
        alert("Adding these files would exceed the 10 file limit.");
        return;
      }

      // Update total size
      setTotalSize((currentSize) => currentSize + newSize);

      // Append new files with preview
      const newFilesWithPreview = acceptedFiles.map((file) => ({
        ...file,
        preview:
          file.type === "application/pdf"
            ? pdfThumbnail
            : URL.createObjectURL(file),
      }));

      // Update all files list
      setAllFiles((currentFiles) =>
        [...currentFiles, ...newFilesWithPreview].slice(0, maxFiles)
      );
    },
    [totalSize, allFiles]
  );

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Append the form name
    formData.append("form-name", "draganddropform-name");

    // Append each file to the form data
    allFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    //
    try {
      const response = await fetch("/", {
        method: "POST",
        body: formData,
        // headers: {
        //   Accept: "application/x-www-form-urlencoded;charset=UTF-8",
        //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        // },
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Additional success handling
      } else {
        alert("Form submission failed!");
      }
    } catch (error) {
      alert("An error occurred:", error.message);
    }
  };

  return (
    <>
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            Drag 'n' drop some files here, or click to select files (max 10
            files, max 8MB total)
          </p>
        </div>
        <aside style={{ display: "flex", flexWrap: "wrap" }}>{thumbs}</aside>
        <div>Total Size: {(totalSize / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      <form
        name="draganddropform-name"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
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