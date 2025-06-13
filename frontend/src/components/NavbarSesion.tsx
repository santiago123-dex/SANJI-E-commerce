import { Link} from "react-router-dom"
import { Outlet } from "react-router-dom"
import {useState} from "react"
import "../styles/NavbarSesion.css"


export function NavbarSesion() {

    const [showLi, setShowLi] = useState(true) 

    function clicRegistro(){
        setShowLi(true)
    }

    function clicHome(){
        setShowLi(false)
    }

    return (
        <div>
            <div className="header">    
                <div className="header-logo">
                    <img src="../img/logo.png" alt=""></img>
                </div>
                <nav>
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
               <Outlet />
        </div>
    )
}