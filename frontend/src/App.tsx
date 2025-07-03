import { Routes, Route } from "react-router-dom"
import { Inicio } from "./views/Inicio"
import { DetallesEvento } from "./views/DetallesEvento"
import { ResultadosBusqueda } from "./views/ResultadosBusqueda"
import { Navbar } from "./components/Navbar"
import { NavbarSesion } from "./components/NavbarSesion"
import { Formulario } from "./views/FormularioLogin"
import { FormularioRegistro } from "./views/FormularioRegistro"
import { FormularioLoginAdmin } from "./admin/FormularioLoginAdmin"
import { PerfilUsuario } from "./views/PerfilUsuario"
import { InicioAdmin } from "./admin/InicioAdmin"
import { Footer } from "./components/Footer"
import { NavbarAdmin } from "./admin/NavbarAdmin"
import { ResultadosBusquedaAdmin } from "./admin/ResultadosBusquedaAdmin"

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

function LayoutAdmin() {
    return (
        <>
            <NavbarAdmin />
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
            </Route>
            <Route element={<LayoutAdmin />}>
                <Route path="admin_login" element={<FormularioLoginAdmin />} />
                <Route path="inicio_admin" element={<InicioAdmin />} />
                <Route path="resultados_admin" element={<ResultadosBusquedaAdmin />} />

            </Route>
        </Routes>
    );
}
