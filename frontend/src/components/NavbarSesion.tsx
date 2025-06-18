import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { LogoMiboleta } from "./LogoMiboleta"
import "../styles/NavbarSesion.css"


export function NavbarSesion() {
    /*ESTADO PARA EL MENU DESPLEGABLE*/
    const [menuAbierto, setMenuAbierto] = useState(false)

    function toggleMenu() {
        setMenuAbierto(!menuAbierto)
    }
    function cerrarMenu() {
        setMenuAbierto(false)
    }

    return (
        <div>
            <div className="header">
                <div className="hamburgerSesion" onClick={toggleMenu}>
                    {menuAbierto ? '✖' : '☰'}
                </div>
                <div >
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "nav-menu open" : "nav-menu"}>
                    <ul>
                        <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
                        <li><Link to="/" onClick={cerrarMenu}>Registrarse</Link></li>
                    </ul>
                    <ul>
                        <li> <Link to="/" onClick={cerrarMenu}>About</Link></li>
                        <li><Link to="/registrar" onClick={cerrarMenu}>Registrase</Link></li>
                        <li><Link to="/login" onClick={cerrarMenu}>Iniciar Sesion</Link></li>
                    </ul>
                </nav>
                <div className="logo-usuario">
                    <Link to="/perfil">
                        <img src="../../public/logoUser.png" alt="" />
                    </Link>
                </div>
            </div>
            {menuAbierto && <div className="overlay" onClick={cerrarMenu}>
            </div>}
            <Outlet />
        </div>
    )
}