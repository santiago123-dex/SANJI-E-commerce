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
                <div className="logo-sesion">
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "nav-menu open" : "nav-menu"}>
                    <ul>
                        <li><Link className="menu_item" to="/registrar" onClick={cerrarMenu}>REGISTRARSE</Link></li>
                        <li><Link className="menu_item" to="/login" onClick={cerrarMenu}>INICIAR SESION</Link></li>
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