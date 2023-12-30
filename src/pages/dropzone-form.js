import React from "react";
import { useDropzone } from "react-dropzone";

export default function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
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

        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>

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

//<Basic />

/* 
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
        <input type="hidden" name="draganddropform-name" value="draganddropform-name" />
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

*/
