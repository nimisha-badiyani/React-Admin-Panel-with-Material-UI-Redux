import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout/layout";
import { checkAuthStatus } from "./redux/thunks/authThunk";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import { privateRoutes, publicRoutes } from "./routes/routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Protected Layout Routes */}
        <Route path="/" element={<Layout />}>
          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoute>{route.component}</ProtectedRoute>}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
