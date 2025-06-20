import { Link, Outlet, useLocation} from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";


export function Navbar() {

    const [menuAbierto, setMenuAbierto] = useState(false)

    function toggle() {
        setMenuAbierto(!menuAbierto)
    }


    const [logueo, setLogueo] = useState(false)
    /*LOCATION ME DA ACCESO A LA RUTA ACTUAL*/
    const location = useLocation()

    useEffect(() => {
        const token = localStorage.getItem("token")
        /*LO CONVIERTE EN BOOLEANO*/
        setLogueo(!!token)
        /*VUELVE EJECUTAR CADA QUE CAMBIE LOCATION*/
    }, [location])

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
            <div>
                {menuAbierto && <div className="overlay"></div>}
            </div>
            <Outlet />
        </div>
    );
}
