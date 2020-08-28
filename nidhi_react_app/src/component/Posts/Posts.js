import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Posts.css";

const Posts = (props) => {
  const [postState, setPostState] = useState({
    post: [],
  });

  const [editableState, setEditableState] = useState({ editable: "-1" });

  const [touchedState, setTouchedState] = useState({ touched: false });

  const [errorState, setErrorState] = useState({ error: false });

  useEffect(() => {
    let outputData = [...postState.post];
    if (props.location.state !== null) {
      let addedPost = props.location.state.form;
      outputData = outputData.concat(addedPost);
    }

    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        outputData.push(res.data);
        setPostState({ post: outputData.flat() });
      })
      .catch((err) => setErrorState({ error: true }));
  }, []);

  const update = (idx) => {
    if (editableState.editable > -1 && editableState.editable === idx) {
      setEditableState({ editable: -1 });
    } else setEditableState({ editable: idx });
  };

  const handleOnChange = (event, index, element) => {
    let updatedValue = [...postState.post];
    let updatedValueDeep = {
      ...updatedValue[index],
      [element]: event.target.value,
    };
    updatedValue[index] = { ...updatedValueDeep };
    setTouchedState({ touched: true });
    setPostState({ post: updatedValue });
  };

  const deletePost = (idx) => {
    let filtered = postState.post.filter((value, index, arr) => index !== idx);
    setPostState({ post: filtered });
  };

  let loader = (
    <div>
      {postState.post.length > 0
        ? postState.post.map((prod, idx) => (
            <div className="Posts" key={idx}>
              <button
                style={{ marginLeft: " 90%" }}
                onClick={() => deletePost(idx)}
              >
                Delete
              </button>
              {editableState.editable === idx ? (
                <button
                  style={{ marginLeft: " 90%" }}
                  onClick={() => update(idx)}
                  disabled={
                    touchedState.touched === false ||
                    prod.id === "" ||
                    prod.title === "" ||
                    prod.body === ""
                      ? true
                      : false
                  }
                >
                  Update
                </button>
              ) : (
                <button
                  style={{ marginLeft: " 90%" }}
                  onClick={() => update(idx)}
                >
                  Edit
                </button>
              )}
              {editableState.editable === idx ? (
                <form>
                  <input
                    className="Form"
                    type="number"
                    placeholder="USERID"
                    value={prod.id}
                    onChange={(event) => handleOnChange(event, idx, "id")}
                  />
                  <input
                    className="Form"
                    type="text"
                    placeholder="TITLE"
                    value={prod.title}
                    onChange={(event) => handleOnChange(event, idx, "title")}
                  />
                  <input
                    className="Form"
                    type="text"
                    placeholder="BODY"
                    value={prod.body}
                    onChange={(event) => handleOnChange(event, idx, "body")}
                  />
                </form>
              ) : (
                <div>
                  <p>{prod.id}</p>
                  <p>{prod.title}</p>
                  <p>{prod.body}</p>
                </div>
              )}
            </div>
          ))
        : null}
    </div>
  );

  if (errorState.error)
    loader = (
      <h1>
        <strong>Something went wrong!</strong>
      </h1>
    );
  return loader;
};

export default withRouter(Posts);
