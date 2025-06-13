import { Link} from "react-router-dom"
import { Outlet } from "react-router-dom"
import {useState} from "react"
import "../styles/NavbarSesion.css"


export function NavbarSesion() {
    /*ESTE ES UN ESTADO QUE SE USA PARA QUE EL OTRO LINK QUE ESTA EN UN LI SE MUESTRE*/
    const [showLi, setShowLi] = useState(true) 
    /*ESTADO PARA EL MENU DESPLEGABLE*/
    const [menuAbierto, setMenuAbierto] = useState(false)

    function clicRegistro(){
        setShowLi(true)
        setMenuAbierto(false)
    }

    function clicHome(){
        setShowLi(false)
        setMenuAbierto(false) /*SE OCULTA EL MENU CUANDO VAMOS A HOME*/
    }

    function toggleMenu(){
        setMenuAbierto(!menuAbierto)
    }
    function cerrarMenu(){
        setMenuAbierto(false)
    }

    return (
        <div>
            <div className="header">    
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>
                <div className="header-logo">
                    <img src="../img/logo.png" alt=""></img>
                </div>
                <nav className={menuAbierto ? "nav-menu open" : "nav-menu"}>
                    <ul>
                        <li><Link to="/inicio" onClick={clicHome}>Inicio</Link></li>
                        <li><Link to="/inicio" onClick={clicHome}>registrarse</Link></li>
                    </ul>
                    <ul>
                        <li> <Link to="/inicio" onClick={clicHome}>About</Link></li>
                        <li><Link to="/registrar" onClick={() => {clicRegistro();}}>Registrase</Link></li>
                        {showLi && <li><Link to="/login">Iniciar Sesion</Link></li>}
                    </ul>
                </nav>
            </div>
            {menuAbierto && <div className="overlay" onClick={cerrarMenu}></div>}
               <Outlet />
        </div>
    )
}