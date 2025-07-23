import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadForm from "./pages/UploadForm";
import PhotoList from "./pages/PhotoList";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Info from "./pages/Info";

function App() {
  return (
    <GoogleOAuthProvider clientId="459527241165-g48vjfufceg5havhol27af534ilir872.apps.googleusercontent.com></GoogleOAuthProvider">
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/listpic" element={<PhotoList />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
