import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";

export function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [logueo, setLogueo] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

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
                <div>
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "NavBar__Menu--Open" : "NavBar__Menu--Close"}>
                    <ul className="Menu__Item__Father">
                        <Link className='Menu__Item' to="/inicio">CONCIERTOS</Link>
                        <Link className='Menu__Item' to="/inicio">TEATRO</Link>
                        <Link className='Menu__Item' to="/inicio">DEPORTES</Link>
                    </ul>
                    {!logueo && (
                        <ul className="Menu__Item__Father">
                            <Link className='Menu__Item' to="/registrar">REGISTRARSE</Link>
                            <Link className='Menu__Item' to="/login">INICIO SESION</Link>
                        </ul>
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
