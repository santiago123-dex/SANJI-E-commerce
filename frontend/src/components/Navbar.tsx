import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";

export function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [logueo, setLogueo] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const location = useLocation();
    const navigate = useNavigate(); // 👈 Para redirigir

    const handleBuscar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/eventos/buscar-nombre?nombre_evento=${encodeURIComponent(busqueda)}`,
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
                // Guardar resultados en localStorage
                localStorage.setItem("resultadosBusqueda", JSON.stringify(data));
                localStorage.setItem("nombreBuscado", busqueda);
                navigate("/resultados"); // Redirigir a la página de resultados
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
        const verificarToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLogueo(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/usuario/perfil", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    setLogueo(false);
                    navigate("/inicio");
                } else {
                    setLogueo(true);
                }
            } catch (error) {
                localStorage.removeItem("token");
                setLogueo(false);
                navigate("/inicio");
            }
        };

        verificarToken();
    }, [location, navigate]);

    return (
        <div>
            <div className="NavBar">
                <div className="Hamburger" onClick={toggle}>
                    {menuAbierto ? '✖' : '☰'}
                </div>

                <div>
                    <LogoMiboleta />
                </div>

                <form className="form-busqueda" onSubmit={handleBuscar}>
                    <input
                        type="text"
                        placeholder="Buscar evento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="input-busqueda"
                    />
                    <button type="submit" className="boton-busqueda">🔍</button>
                </form>

                <nav className={menuAbierto ? "NavBar__Menu--Open" : "NavBar__Menu--Close"}>
                        <Link className='Menu__Item' to="/inicio">CONCIERTOS</Link>
                        <Link className='Menu__Item' to="/inicio">TEATRO</Link>
                        <Link className='Menu__Item' to="/inicio">DEPORTES</Link>
                        <Link className='Menu__Item' to="/inicio">CONTACTANOS</Link>
                        {!logueo && (
                            <>
                                <Link className='Menu__Item' to="/registrar">REGISTRARSE</Link>
                                <Link className='Menu__Item' to="/login">INICIO SESION</Link>
                            </>
                        )}
                </nav>

                <Link to="/perfil">
                    <img className="LogoUser" src="../../public/logoUser.png" alt="" />
                </Link>
            </div>

            {menuAbierto && <div className="overlay"></div>}
            <Outlet />
        </div>
    );
}
