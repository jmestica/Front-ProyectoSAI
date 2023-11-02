//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Error404 from "./pages/404/Error404";
import AltaReactivo from "./pages/AltaReactivo/AltaReactivo";
import GestionarReactivoEscaneado from "./pages/GestionarReactivoEscaneado/GestionarReactivoEscaneado";
import BuscarReactivo from "./pages/BuscarReactivo/BuscarReactivo";
import QRPage from "./pages/QRPage/QRPage";

//Styles
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import Historial from "./pages/Historial/Historial";
import RequireAuth from "./components/RequireAuth/RequireAuth";

import Consumo from "./pages/Consumo/Consumo";
import ConsultaStock from "./pages/ConsultaStock/ConsultaStock";
import Impresion from "./pages/Impresion/Impresion";
import EditarReactivo from "./pages/EditarReactivo/EditarReactivo";

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
              element={<BuscarReactivo />}
            />

            <Route path="/tracker/stock" exact element={<ConsultaStock />} />

            <Route
              path="/tracker/gestionar-reactivo/:id"
              exact
              element={<GestionarReactivoEscaneado />}
            />

            <Route
              path="/tracker/crear-reactivo"
              exact
              element={<AltaReactivo />}
            />

            <Route path="/tracker/qr/:id" exact element={<QRPage />} />

            <Route
              path="/tracker/historial/:id"
              exact
              element={<Historial />}
            />

            <Route path="/tracker/consumo/:id" exact element={<Consumo />} />

            <Route path="/tracker/editar/:id" exact element={<EditarReactivo/>}/>

            <Route path="/tracker/impresion" exact element={<Impresion />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
