import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Home from "./Services/Home/Home";
import LoginForm from "./Components/Login/LoginForm";
import SignupForm from "./Components/Signup/SignupForm";
import Dashboard from "./Services/Dashboard/Dashboard";
import { auth } from "./Services/api";

function App() {
  const isAuthenticated = auth.isAuthenticated();

  return (
    <Router>
      <div className="App_Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupForm />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated} /> : <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const NotFound = () => (
  <div>
    <h2>404 Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
);

export default App;
