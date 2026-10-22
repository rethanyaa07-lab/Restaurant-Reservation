
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RestaurantList from "./components/RestaurantList";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingPage from "./components/LoadingPage";
import { AuthProvider } from "./context/AuthContext";

const RestaurantDetail = lazy(() =>
  import("./components/RestaurantDetail")
);
const TableSelection = lazy(() =>
  import("./components/TableSelection")
);
const ReservationSummary = lazy(() =>
  import("./components/ReservationSummary")
);
const Reservations = lazy(() =>
  import("./components/Reservations")
);
const Login = lazy(() =>
  import("./components/Login")
);
const Signup = lazy(() =>
  import("./components/Signup")
);

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Header />

      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantList />} />

          <Route
            path="/restaurant/:id"
            element={<RestaurantDetail />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/tables"
            element={
              <ProtectedRoute>
                <TableSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reservation"
            element={
              <ProtectedRoute>
                <ReservationSummary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <Reservations />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
