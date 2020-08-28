import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const AddPost = (props) => {
  const [formState, setFormState] = useState({
    form: [{ id: "", title: "", body: "" }],
  });

  const [touchedState, setTouchedState] = useState({ touched: false });

  const onChangeForm = (event, element) => {
    setTouchedState({ touched: false });
    event.preventDefault();
    const updatedForm = { ...formState.form };
    updatedForm[element] = event.target.value;
    setFormState({ form: updatedForm });
    setTouchedState({ touched: true });
  };

  const addPost = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: "/all-posts",
      state: { form: formState.form },
    });
  };

  return (
    <div>
      <form>
        <input
          className="Input"
          onChange={(event) => onChangeForm(event, "id")}
          type="number"
          placeholder="USERID"
          value={formState.form.id || ""}
        ></input>
        <input
          className="Input"
          onChange={(event) => onChangeForm(event, "title")}
          type="text"
          placeholder="TITLE"
          value={formState.form.title || ""}
        ></input>
        <input
          className="Input"
          onChange={(event) => onChangeForm(event, "body")}
          type="text"
          placeholder="BODY"
          value={formState.form.body || ""}
        ></input>
        <button
          className="Button"
          disabled={
            touchedState.touched === false ||
            formState.form.id === "" ||
            formState.form.title === "" ||
            formState.form.body === ""
              ? true
              : false
          }
          onClick={(event) => addPost(event)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default withRouter(AddPost);
