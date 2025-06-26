import { Routes, Route } from "react-router-dom"
import { Inicio } from "./views/Inicio"
import { DetallesEvento } from "./views/DetallesEvento"
import { ResultadosBusqueda } from "./views/ResultadosBusqueda"
import { Navbar } from "./components/Navbar"
import { NavbarSesion } from "./components/NavbarSesion"
import { Formulario } from "./views/FormularioLogin"
import { FormularioRegistro } from "./views/FormularioRegistro"
import { FormularioLoginAdmin } from "./views/FormularioLoginAdmin"
import { PerfilUsuario } from "./views/PerfilUsuario"
import { PerfilAdmin } from "./views/PerfilAdmin"
import { Footer } from "./components/Footer"

function Layout() {
    return (
        <>
            <Navbar />
            <Footer />
        </>
    );
}

function LayoutSesion() {
    return (
        <>
            <NavbarSesion />
            <Footer />
        </>
    );
}

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Inicio />} />
                <Route path="inicio" element={<Inicio />} />
                <Route path="resultados" element={<ResultadosBusqueda />} />
                <Route path="perfil" element={<PerfilUsuario />} />
                <Route path="DetallesEvento/:id" element={<DetallesEvento />} />
            </Route>
            <Route element={<LayoutSesion />}>
                <Route path="registrar" element={<FormularioRegistro />} />
                <Route path="login" element={<Formulario />} />
                <Route path="admin-login" element={<FormularioLoginAdmin />} />
                <Route path="perfil-admin" element={<PerfilAdmin />} />
            </Route>
        </Routes>
    );
}
