import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { DashboardDay } from "./components/Dashboard/dashboard.day.component";
import { DashboardWeek } from "./components/Dashboard/dashboard.week.component";
import { E404 } from "./components/Errors";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <BrowserRouter basename="/">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/day" element={<DashboardDay />} />
          <Route path="/dashboard/week" element={<DashboardWeek />} />
          <Route
            path="/dashboard"
            element={<Navigate replace to="/dashboard/day" />}
          />
          <Route path="*" element={<E404 />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
