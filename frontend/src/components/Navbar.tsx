import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";

export function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [logueo, setLogueo] = useState(false);

    const location = useLocation();
    const navigate = useNavigate(); // 👈 Para redirigir

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
            <div className="navbar">
                <div className="hamburger" onClick={toggle}>
                    {menuAbierto ? '✖' : '☰'}
                </div>
                <div>
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "nav-menu open" : "nav-menu-inicio"}>
                    <ul className="eventos">
                        <li><Link to="/inicio">CONCIERTOS</Link></li>
                        <li><Link to="/inicio">TEATRO</Link></li>
                        <li><Link to="/inicio">DEPORTES</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/inicio">CONTACTANOS</Link></li>
                        {!logueo && (
                            <>
                                <li><Link to="/registrar">REGISTRARSE</Link></li>
                                <li><Link to="/login">INICIO SESION</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="logo-user">
                    <Link to="/perfil">
                        <img src="../../public/logoUser.png" alt="" />
                    </Link>
                </div>
            </div>
            {menuAbierto && <div className="overlay"></div>}
            <Outlet />
        </div>
    );
}
