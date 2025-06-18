import { Link, Outlet } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useState } from "react";

export function Navbar() {

    const [menuAbierto, setMenuAbierto] = useState(false)

    function toggle() {
        setMenuAbierto(!menuAbierto)
    }

    return (
        <div>
            <div className="navbar">
                <div className="hamburger" onClick={toggle}>
                    {menuAbierto ? '✖' : '☰'}
                </div>
                <div>
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "nav-menu open" : "nav-menu"}>
                    <ul className="eventos">
                        <li><Link to="/inicio">Conciertos</Link></li>
                        <li><Link to="/inicio">Teatro</Link></li>
                        <li><Link to="/inicio">Deportes</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/inicio">Contactanos</Link></li>
                        <li><Link to="/registrar">Registrar</Link></li>
                    </ul>
                </nav>
                <div className="logo-user">
                    <Link to="/perfil">
                        <img src="../../public/logoUser.png" alt="" />
                    </Link>
                </div>
            </div>
            <div>
                {menuAbierto && <div className="overlay"></div>}
            </div>
            <Outlet />
        </div>
    );
}
