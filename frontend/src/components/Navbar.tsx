import { Link, Outlet } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";

export function Navbar() {
    return (
        <div>
            <div className="container-header">
                <div className="navbar">
                    <nav>
                        <div>
                            <LogoMiboleta />
                        </div>

                        <ul className="categorias-navbar">
                            <li><Link to="/inicio">Conciertos</Link></li>
                            <li><Link to="/inicio">Teatro</Link></li>
                            <li><Link to="/inicio">Deportes</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/inicio">Inicio</Link></li>
                            <li><Link to="/registrar">Registrar</Link></li>
                            <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
