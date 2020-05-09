import React from "react";
import "./App.css";
import BooksPage from "./library/library-page";

const App: React.FC = () => {
  return (
    <div>
      <header className="App-header">Header</header>
      <div><BooksPage></BooksPage></div>
      <footer className="App-footer">Footer</footer>
    </div>
  );
};

export default App;
