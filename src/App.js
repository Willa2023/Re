// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Articles } from "./components/Articles";
import ShowArticle from "./components/ShowArticle";
import CreateArticle from "./components/CreateArticle";
import UpdateArticle from "./components/UpdateArticle";
import ListByTopic from "./components/ListByTopic";
import ListByTitle from "./components/ListByTitle";
import PersonalPage from "./components/PersonalPage";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/listByTopic/:topic" element={<ListByTopic />} />
          <Route path="/listByTitle/:title" element={<ListByTitle />} />
          <Route path="/showArticle/:title" element={<ShowArticle />} />
          <Route path="/create-article/:username" element={<CreateArticle />} />
          <Route
            path="/update-article/:username/:articleId"
            element={<UpdateArticle />}
          />
          <Route path="/personal-page/:username" element={<PersonalPage />} />
          <Route path="/user/:username" element={<Articles />} />
          <Route path="/" element={<Articles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
