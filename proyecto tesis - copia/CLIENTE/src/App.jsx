import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsuarioLogin  from "./pages/UsuarioLogin"
import RegistroUsuario from "./pages/RegistroUsuario"
import LoginAdm from "./pages/AdmLogin";
import RegisterAdministracion from "./pages/RegisterAdministracion"
import Maqueta from "./pages/maqueta"
 
 function App() {
  return (
    <BrowserRouter >
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/LoginAdm" element={<LoginAdm />} />
    <Route path="/UsuarioLogin" element={<UsuarioLogin/>} />
    <Route path="/Registroadm" element={<RegisterAdministracion />} />
    <Route path="/registrousuario" element={<RegistroUsuario />} />
    <Route path="/maqueta" element={<Maqueta/>}/>
 
 
    </Routes>
    </BrowserRouter>
  )
 }
 export default App