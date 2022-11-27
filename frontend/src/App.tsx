import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEmail } from "./components/Auth/ChangeEmail";
import { FirebaseProvider } from "./components/Auth/firebase.context";
import { Login } from "./components/Auth/Login";
import { Logout } from "./components/Auth/Logout";
import { PasswordReset } from "./components/Auth/PasswordReset";
import { Register } from "./components/Auth/Register";
import { DashboardDay } from "./components/Dashboard/dashboard.day.component";
import { DashboardWeek } from "./components/Dashboard/dashboard.week.component";
import { E404 } from "./components/Errors";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Settings } from "./components/Settings";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter basename="/">
        <header>
          <Navbar />
        </header>
        <main>
          <ToastContainer role="alert" />
          <Routes>
            <Route path="/" element={<DashboardDay />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/day" element={<DashboardDay />} />
            <Route path="/dashboard/week" element={<DashboardWeek />} />
            <Route
              path="/dashboard"
              element={<Navigate replace to="/dashboard/day" />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/change-email" element={<ChangeEmail />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
