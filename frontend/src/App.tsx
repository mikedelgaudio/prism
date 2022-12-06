import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEmail } from "./components/Auth/ChangeEmail";
import { DeleteAccount } from "./components/Auth/DeleteAccount";
import {
  FirebaseGuards,
  FirebaseProvider,
} from "./components/Auth/firebase.context";
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
            <Route
              path="/"
              element={
                <FirebaseGuards.RequireAuth>
                  <DashboardDay />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <FirebaseGuards.RequireUnAuth>
                  <Login />
                </FirebaseGuards.RequireUnAuth>
              }
            />
            <Route
              path="/logout"
              element={
                <FirebaseGuards.RequireAuth>
                  <Logout />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/register"
              element={
                <FirebaseGuards.RequireUnAuth>
                  <Register />
                </FirebaseGuards.RequireUnAuth>
              }
            />
            <Route
              path="/delete-account"
              element={
                <FirebaseGuards.RequireAuth>
                  <DeleteAccount />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/dashboard/day"
              element={
                <FirebaseGuards.RequireAuth>
                  <DashboardDay />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/dashboard/week"
              element={
                <FirebaseGuards.RequireAuth>
                  <DashboardWeek />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={<Navigate replace to="/dashboard/day" />}
            />
            <Route
              path="/settings"
              element={
                <FirebaseGuards.RequireAuth>
                  <Settings />
                </FirebaseGuards.RequireAuth>
              }
            />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route
              path="/change-email"
              element={
                <FirebaseGuards.RequireAuth>
                  <ChangeEmail />
                </FirebaseGuards.RequireAuth>
              }
            />
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
