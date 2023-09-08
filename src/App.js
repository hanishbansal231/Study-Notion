import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import DashBoard from './pages/DashBoard';
import About from './pages/About';
import Navbar from "./components/common/Navbar";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Index from "./components/core/Dashboard/Settings/Index";
function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/signup" element={< Signup />} />
        <Route path="/login" element={< Login />} />
        <Route path="/forgot-password" element={< ForgotPassword />} />
        <Route path="/update-password/:id" element={< UpdatePassword />} />
        <Route path="/verify-email" element={< VerifyEmail />} />
        <Route path="/about" element={< About />} />
        <Route path="/dashboard" element={< DashBoard />}>
          <Route path="/dashboard/myprofile" element={< MyProfile />} />
          <Route path="/dashboard/settings" element={< Index />} />
        </Route>
        <Route path="*" element={< Error />} />
      </Routes>
    </div>
  );
}

export default App;
