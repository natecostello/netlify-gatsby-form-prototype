import * as React from "react";

export default function FormPage() {
  return (
    <div>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        enctype="multipart/form-data"
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
          <input type="file" name="file-upload" />
        </p>
        <p>
          <input type="submit"></input>
        </p>
      </form>
    </div>
  );
}
// This is the version we want
// Yes!
