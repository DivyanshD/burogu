import React from "react";
import axios from "axios";

function WriteBlog() {
  const user = JSON.parse(localStorage.getItem("profile")).data;
  function handle_submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    console.log(user);
    axios.post("http://localhost:3000/blogs/", {
      ...formDataObj,
      user: user.name,
    });
    location.replace("/");
  }

  return (
    <div data-theme="light" className="flex justify-center h-screen">
      <form onSubmit={handle_submit} className="flex flex-col w-full m-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered"
        />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="20"
          className="textarea textarea-bordered"
          placeholder="description"
        />

        <button type="submit" className="btn btn-error">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WriteBlog;
