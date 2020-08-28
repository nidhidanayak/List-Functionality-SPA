import React, { Suspense } from "react";
import { NavLink, Route } from "react-router-dom";
import "../component/Posts/Posts.css";

const AllPosts = React.lazy(() => import("../component/Posts/Posts"));
const AddPosts = React.lazy(() => import("../component/AddPost/AddPost"));

const LoadablePost = () => {
  return (
    <div>
      <NavLink to="/all-posts" exact className="Button">
        GET POSTS
      </NavLink>
      <NavLink to="/add-post" className="Button">
        ADD POSTS
      </NavLink>
      <Route
        path="/all-posts"
        exact
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <AllPosts />
          </Suspense>
        )}
      />
      <Route
        path="/add-post"
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <AddPosts />
          </Suspense>
        )}
      />
    </div>
  );
};

export default LoadablePost;
