import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./component/home_page";
import EditorPage from "./component/editor_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;