import React from "react";
import { navigate } from "gatsby-link";

// function encode(data) {
//   const formData = new FormData();

//   for (const key of Object.keys(data)) {
//     formData.append(key, data[key]);
//   }

//   return formData;
// }

export default function Contact() {
  const [state, setState] = React.useState({});
  const [firstFileSelected, setFirstFileSelected] = React.useState(false);
  const [firstFileName, setFirstFileName] = React.useState("");
  const [secondFileName, setSecondFileName] = React.useState("");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // const handleAttachment = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.files[0] });
  //   if (e.target.name === "firstAttachment") {
  //     setFirstFileSelected(!!e.target.files[0]);
  //   }
  // };

  const handleFiles = (files) => {
    if (files.length === 0) {
      return;
    }

    if (!firstFileSelected) {
      // No file has been selected for the first input yet
      setState({ ...state, firstAttachment: files[0] });
      setFirstFileName(files[0].name);
      setFirstFileSelected(true);

      if (files.length > 1) {
        // If there are two files, set the second file
        setState((prevState) => ({ ...prevState, secondAttachment: files[1] }));
        setSecondFileName(files[1].name);
      }
    } else {
      // First file is already selected, set the new file to the second input
      setState((prevState) => ({ ...prevState, secondAttachment: files[0] }));
      setSecondFileName(files[0].name);
    }
  };

  const handleAttachment = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    console.log("State before submission:", state); // Log the state

    const formData = new FormData();

    // Append the form-name field
    formData.append("form-name", form.getAttribute("name"));

    // Append regular form fields
    for (const key in state) {
      if (
        state.hasOwnProperty(key) &&
        key !== "firstAttachment" &&
        key !== "secondAttachment"
      ) {
        formData.append(key, state[key]);
      }
    }

    // Append file fields if they exist
    if (state.firstAttachment) {
      console.log(
        "Appending first file:",
        state.firstAttachment,
        firstFileName
      ); // Log first file details
      formData.append("firstAttachment", state.firstAttachment, firstFileName);
    }
    if (state.secondAttachment) {
      console.log(
        "Appending second file:",
        state.secondAttachment,
        secondFileName
      ); // Log second file details
      formData.append(
        "secondAttachment",
        state.secondAttachment,
        secondFileName
      );
    }

    // Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  return (
    <form
      name="file-upload"
      method="post"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="file-upload" />
      <p hidden>
        <label>
          Don't fill this out:{" "}
          <input name="bot-field" onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Your name:
          <br />
          <input type="text" name="name" onChange={handleChange} />
        </label>
      </p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        Drag and drop files here
      </div>

      <p>
        <label>
          First File:
          <br />
          <input
            type="file"
            name="firstAttachment"
            onChange={handleAttachment}
          />
          {firstFileName && <span>Selected file: {firstFileName}</span>}
        </label>
      </p>

      {/* {firstFileSelected && ( */}
      <p>
        <label>
          Second File:
          <br />
          <input
            type="file"
            //type="hidden"
            style={{ display: "none" }}
            name="secondAttachment"
            onChange={handleAttachment}
          />
          {secondFileName && <span>Selected file: {secondFileName}</span>}
        </label>
      </p>
      {/* )} */}
      <p>
        <button type="submit">Send</button>
      </p>
      <p>
        Note: multiple file uploads are not supported by Netlify at this time.
      </p>
    </form>
  );
}
//adding comment to allow commit to force deploy
//
