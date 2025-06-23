import { NavbarSesion } from "./components/NavbarSesion"

import { Formulario } from "./views/FormularioLogin"
import { FormularioRegistro } from "./views/FormularioRegistro"
import { FormularioLoginAdmin } from "./views/FormularioLoginAdmin"

import { Navbar } from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import { Inicio } from "./views/Inicio"
import { PerfilUsuario } from "./views/PerfilUsuario"
import { PerfilAdmin } from "./views/PerfilAdmin"

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="perfil" element={<PerfilUsuario />} />
            </Route>

            <Route path="/" element={<NavbarSesion />}>
                <Route index element={<FormularioRegistro />} />
                <Route path="registrar" element={<FormularioRegistro />} />
            </Route>

            <Route path="/" element={<NavbarSesion />}>
                <Route index element={<Formulario />} />
                <Route path="login" element={<Formulario />} />
            </Route>

            <Route path="/" element={<NavbarSesion />}>
                <Route index element={<FormularioLoginAdmin />} />
                <Route path="admin-login" element={<FormularioLoginAdmin />} />
                <Route path="perfil-admin" element={<PerfilAdmin />} />
            </Route>
        </Routes>
    )
}
