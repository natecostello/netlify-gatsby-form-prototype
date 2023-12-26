import * as React from "react";

export default function FormPage() {
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (event) => {
    // Add the newly selected files to the existing files array
    setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append each file as a separate field
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Append other form data
    formData.append("name", event.target.name.value);
    formData.append("email", event.target.email.value);
    formData.append("message", event.target.message.value);

    // Convert formData to URLSearchParams for Netlify
    // const urlSearchParams = new URLSearchParams();
    // for (const pair of formData) {
    //   urlSearchParams.append(pair[0], pair[1]);
    // }

    fetch("/", {
      method: "POST",
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => alert("Thank you for your submission"))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <form
        name="contact"
        enctype="multipart/form-data"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            Your Name: <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Your Role:{" "}
            <select name="role[]" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message" rows="4"></textarea>
          </label>
        </p>
        <p>
          <label>
            Your Files:{" "}
            <input type="file" onChange={handleFileChange} multiple />
          </label>
        </p>
        <p>
          Selected Files:{" "}
          {files.map((file) => (
            <div key={file.name}>{file.name}</div>
          ))}
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </div>
  );
}
