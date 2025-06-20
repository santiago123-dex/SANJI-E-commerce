import { NavbarSesion } from "./components/NavbarSesion"
import { Formulario } from "./components/FormularioLogin"
import { FormularioRegistro } from "./components/FormularioRegistro"
import { Navbar } from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import { Inicio } from "./views/Inicio"

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
            </Route>    

            <Route path="registrar" element={<NavbarSesion />}>  
                <Route index element={<FormularioRegistro />} />
                <Route path="registrar" element={<FormularioRegistro />} />
            </Route>  

            <Route path="login" element={<NavbarSesion />}>
                <Route index element={<Formulario />} />
                <Route path="login" element={<Formulario />} />
            </Route>
        </Routes>
    )
}
