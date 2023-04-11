import React from "react";
import { googleLogout } from "@react-oauth/google";

function Home({ user, userObj, blog }) {
  function handleLogout() {
    googleLogout();
    localStorage.clear();
    console.log("loged out");
    location.reload();
  }

  function save(data) {
    // console.log(id);
    console.log(data._id);
    console.log(user);
    console.log(userObj);
    // localStorage.setItem(
    //   "profile",
    //   JSON.stringify({ ...userObj, fav: [data._id] })
    // );
    // console.log(JSON.parse(localStorage.getItem("profile")));
  }
  // function handle_search(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target),
  //     formDataObj = Object.fromEntries(formData.entries());
  //   console.log(formDataObj.mysearch);
  //   const searchWord = formDataObj.mysearch;
  //   setsearch(searchWord);
  // }

  return (
    <div data-theme="light" className="h-screen">
      <div className="navbar bg-base-100">
        <div className="w-full">
          <img
            alt=""
            className="h-12 w-12 mr-2"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
          {/*   */}
          <input type="text" placeholder="Search" className="input w-96" />
        </div>
        <div className="flex-none gap-2">
          <a href="/writeblog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-9 h-9 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </a>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-9 h-9 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                  {user?.picture ? (
                    <img
                      className="bg-neutral-focus text-neutral-content"
                      src={user?.picture}
                      alt="pic"
                    />
                  ) : (
                    <span>{user?.name.charAt(0)}</span>
                  )}
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-80 "
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Favourite</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {blog.map((data) => {
        return (
          <div key={data._id}>
            <div className="flex flex-col gap-2 m-1">
              <div>
                <h1 className=" text-4xl">{data.title}</h1>
                <p className="text-sm">{data.description}</p>
              </div>
            </div>
            <button onClick={() => save(data)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Home;
