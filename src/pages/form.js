import * as React from "react";

export default function FormPage() {
  return (
    <div>
      <form
        name="file-upload"
        method="POST"
        data-netlify="true"
        enctype="multipart/form-data"
      >
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required></input>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required></input>
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone"></input>
        <label for="comments">Comments:</label>
        <textarea id="comments" name="comments" rows="4" required></textarea>
        <input type="file" name="file-upload" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
