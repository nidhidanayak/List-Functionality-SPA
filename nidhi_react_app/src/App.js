import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import LoadablePost from "./container/Route";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LoadablePost />
      </div>
    </BrowserRouter>
  );
}

export default App;
