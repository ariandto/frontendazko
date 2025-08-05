import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Layouts
import Navigation from "./layouts/TopNavigation";
import BottomNavigation from "./layouts/BottomNavigation";

// Pages
import Home from "./pages/Home";
import UploadForm from "./pages/UploadForm";
import Info from "./pages/Info";
import Form from "./pages/Form";
import PicList from "./pages/PicList";
import VisitorStats from "./pages/VisitorStats";
import EditUserForm from "./pages/EditUserForm";
import EditUserForm from "./pages/ManageUser";

function App() {
  return (
    <GoogleOAuthProvider clientId="459527241165-g48vjfufceg5havhol27af534ilir872.apps.googleusercontent.com">
      <Router>
        <Navigation />
        <Routes>
          {/* Halaman Utama */}
          <Route path="/" element={<Home />} />

          {/* Form Upload PIC Baru */}
          <Route path="/upload" element={<UploadForm />} />

          {/* Daftar PIC */}
          <Route path="/listpic" element={<PicList />} />
          <Route path="/listpic/:divisi" element={<PicList />} />

          {/* Halaman Tambahan */}
          <Route path="/info" element={<Info />} />
          <Route path="/form-request" element={<Form />} />
          <Route path="/visitor" element={<VisitorStats />} />
          <Route path="/manage" element={<ManageUser />} />

          {/* Edit User */}
          <Route path="/update-user" element={<EditUserForm />} />
          {/* Optional: dukung versi lama */}
          <Route path="/update-user/:id" element={<EditUserForm />} />
        </Routes>
        <BottomNavigation />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
