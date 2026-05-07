import Login from "./pages/Login";
import TestApi from "./pages/TestApi";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<TestApi />} />
    </Routes>
  );
}

export default App;