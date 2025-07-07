import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";

export function Navbar() {
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
                navigate(`/resultados?nombre_evento=${encodeURIComponent(busqueda)}`);
            } else {
                alert(data.message || "No se encontraron resultados");
            }
        } catch (error) {
            alert("Error al buscar eventos");
        }
    };

    useEffect(() => {
    if (location.pathname === "/resultados") {
        setBusqueda("");
    }
    }, [location]);

    function toggle() {
        setMenuAbierto(!menuAbierto);
    }

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/usuario/perfil",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                console.log(response)
                if (response.status === 200) {
                    setLogueo(true)
                } else {
                    setLogueo(false)
                }
            } catch {
                setLogueo(false);
            }
        }
        verificarSesion();
    }, [location, navigate]);

    useEffect(() => {
        document.body.style.overflow = menuAbierto ? "hidden" : "auto";
    }, [menuAbierto]);

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

                    <Link className='Menu__Item' to="/inicio">CONCIERTOS</Link>
                    <Link className='Menu__Item' to="/inicio">TEATRO</Link>
                    <Link className='Menu__Item' to="/inicio">DEPORTES</Link>

                    {!logueo && (
                        <>
                            <Link className='Menu__Item' to="/registrar">REGISTRARSE</Link>
                            <Link className='Menu__Item' to="/login">INICIO SESION</Link>
                        </>
                    )}
                    <Link to="/perfil">
                        <img className="LogoUser" src="../../public/logoUser.png" alt="" />
                    </Link>
                </nav>
            </div>
            {menuAbierto && <div className="overlay" onClick={toggle}></div>}

            <Outlet />
        </div>
    );
}
