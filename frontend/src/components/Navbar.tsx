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
            <div className="NavBar">
                <div className="Hamburger" onClick={toggle}>
                    {menuAbierto ? '✖' : '☰'}
                </div>
                <div>
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "NavBar__Menu--Open" : "NavBar__Menu--Close"}>
                        <Link className='Menu__Item' to="/inicio">CONCIERTOS</Link>
                        <Link className='Menu__Item' to="/inicio">TEATRO</Link>
                        <Link className='Menu__Item' to="/inicio">DEPORTES</Link>
                        <Link className='Menu__Item' to="/inicio">CONTACTANOS</Link>
                        {!logueo && (
                            <>
                                <Link className='Menu__Item' to="/registrar">REGISTRARSE</Link>
                                <Link className='Menu__Item' to="/login">INICIO SESION</Link>
                            </>
                        )}
                </nav>
                <Link to="/perfil">
                    <img className="LogoUser" src="../../public/logoUser.png" alt="" />
                </Link>
            </div>
            <div>
                {menuAbierto && <div className="overlay"></div>}
            </div>
            <Outlet />
        </div>
    );
}
