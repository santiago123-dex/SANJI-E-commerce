import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import "../styles/Navbar.css"

export function Navbar() {
    return (
        <div>
            <div className="container-header">
                <div className="navbar">
                    <nav>
                        <ul className="eventos">
                            <li><Link to="/">Conciertos</Link></li>
                            <li><Link to="/">Teatro</Link></li>
                            <li><Link to="/">Deportes</Link></li>
                        </ul>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/registrar">Registrar</Link></li>
                            <li><Link to="/">Sobre nosotros</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Outlet />
        </div>
    )
}