import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navigation from "./components/Navigation";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./pages/Home";
import UploadForm from "./pages/UploadForm";
import Info from "./pages/Info";
import Form from "./pages/Form";
import PicList from "./pages/PicList";
import VisitorStats from "./pages/VisitorStats";

function App() {
  return (
    <GoogleOAuthProvider clientId="459527241165-g48vjfufceg5havhol27af534ilir872.apps.googleusercontent.com">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/listpic" element={<PicList />} />
          <Route path="/listpic/:divisi" element={<PicList />} />
          <Route path="/info" element={<Info />} />
          <Route path="/form-request" element={<Form />} />
          <Route path="/visitor" element={<VisitorStats />} />
        </Routes>
        <BottomNavigation />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
