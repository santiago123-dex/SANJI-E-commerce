import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoAdmin";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function NavbarAdmin() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [logueo, setLogueo] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleBuscar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/eventos/buscar_nombre?nombre_evento=${encodeURIComponent(busqueda)}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },   
            }
            );

            const data = await res.json();

            if (res.ok) {
                navigate(`/resultados_admin?nombre_evento=${encodeURIComponent(busqueda)}`);
            } else {
                Swal.fire({
                    title: data.message || "No se encontraron resultados",
                    icon: "info",
                    draggable: true
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error al buscar eventos",
                icon: "error",
                draggable: true
            });
        }
    };

    useEffect(() => {
    if (location.pathname === "/resultados_admin") {
        setBusqueda("");
    }
    }, [location]);

    function toggle() {
        setMenuAbierto(!menuAbierto);
    }

    return (
        <div>
            <div className="NavBar">
                <div className="Hamburger" onClick={toggle}>
                    {menuAbierto ? '✖' : '☰'}
                </div>
                <div className="Logo-principal">
                    <LogoMiboleta />
                </div>
                <form className="Search" onSubmit={handleBuscar}>
                    <input
                        type="text"
                        placeholder="Buscar evento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="Search__Input"
                    />
                    <button type="submit" className="Search__Button">🔍</button>
                </form>

                <nav className={menuAbierto ? "NavBar__Menu--Open" : "NavBar__Menu--Close"}>
                    <Link className='Menu__Item' to="/inicio">INICIO</Link>
                    {!logueo && (
                        <>
                            <Link className='Menu__Item' to="/admin_login">INICIO SESION</Link>
                        </>
                    )}
                </nav>
            </div>
            {menuAbierto && <div className="overlay" onClick={toggle}></div>}

            <Outlet />
        </div>
    );
}
