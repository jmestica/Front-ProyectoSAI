//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Error404 from "./pages/404/Error404";
import GestionarReactivoEscaneado from "./pages/GestionarReactivoEscaneado/GestionarReactivoEscaneado";
import AltaReactivo from "./pages/AltaReactivo/AltaReactivo";
import GestionarReactivo from "./pages/GestionarReactivo/GestionarReactivo";
import QRPage from "./pages/QRPage/QRPage";

//Styles
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import Historial from "./pages/Historial/Historial";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Movimiento from "./pages/Movimiento/Movimiento";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Root path */}
          <Route path="/" element={<Login />} />

          <Route path="*" element={<Error404 />} />

          {/* Requires authentication before access */}
          <Route element={<RequireAuth />}>
            <Route path="/tracker" exact element={<Home />} />

            <Route
              path="/tracker/gestionar-reactivo"
              exact
              element={<GestionarReactivo />}
            />

            <Route
              path="/tracker/gestionar-reactivo/:id"
              exact
              element={<GestionarReactivoEscaneado />}
            />

            <Route path="/tracker/crear-reactivo" exact element={<AltaReactivo />} />

            <Route path="/tracker/qr/:id" exact element={<QRPage />} />

            <Route
              path="/tracker/historial/:id"
              exact
              element={<Historial />}
            />


            <Route
              path="/tracker/movimiento/:id"
              exact
              element={<Movimiento/>}

            />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
