import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [logueo, setLogueo] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [modalCarrito, setModalCarrito] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleBuscar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://sanji-e-commerce.onrender.com/api/eventos/buscar_nombre?nombre_evento=${encodeURIComponent(busqueda)}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (res.ok) {
                navigate(`/resultados?nombre_evento=${encodeURIComponent(busqueda)}`);
            } else {
                Swal.fire({
                    title: data.message || "No se encontraron resultados",
                    icon: "info",
                    draggable: true
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error al buscar eventos",
                icon: "error",
                draggable: true
            });
        }
    };

    useEffect(() => {
        if (location.pathname === "/resultados") {
            setBusqueda("");
        }
    }, [location]);

    function toggle() {
        setMenuAbierto(!menuAbierto);
    }

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const response = await fetch(
                    "https://sanji-e-commerce.onrender.com/api/usuario/perfil",
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
                <div className="Logo-principal">
                    <LogoMiboleta />
                </div>
                <nav className={menuAbierto ? "NavBar__Menu--Open" : "NavBar__Menu--Close"}>
                           <form className="Search" onSubmit={handleBuscar}>
                    <input
                        type="text"
                        placeholder="Buscar evento..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="Search__Input"
                    />
                    <button type="submit" className="Search__Button">🔍</button>
                </form>


                    <Link className='Menu__Item' to="/inicio">CONCIERTOS</Link>
                    <Link className='Menu__Item' to="/inicio">TEATRO</Link>
                    <Link className='Menu__Item' to="/inicio">DEPORTES</Link>

                    {!logueo && (
                        <>
                            <Link className='Menu__Item' to="/registrar">REGISTRARSE</Link>
                            <Link className='Menu__Item' to="/login">INICIO SESION</Link>
                        </>
                    )}
                    {modalCarrito && (
                        <div className="CarritoOverlay" onClick={() => setModalCarrito(false)}>
                            <div
                                className="CarritoSidebar"
                                onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro
                            >
                                <div className="CarritoHeader">
                                    <h3>Tu Carrito</h3>
                                    <button
                                        className="CerrarCarrito"
                                        onClick={() => setModalCarrito(false)}
                                    >
                                        ✖
                                    </button>
                                </div>
                                <div className="CarritoContenido">
                                    {/* Aquí pones los productos del carrito */}
                                    <p>No tienes productos aún.</p>
                                </div>
                                <div className="CarritoFooter">
                                    <button className="IrAlCheckout">Ir al Checkout</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="carrito-icono" onClick={() => setModalCarrito(true)}>
                        <img className="LogoUser" src="/logoCarrito.png" alt="" />
                    </div>
                    <Link className="user-icono" to="/perfil">
                        <img className="LogoUser" src="/logoUser.png" alt="" />
                    </Link>
                </nav>
            </div>
            {menuAbierto && <div className="overlay" onClick={toggle}></div>}

            <Outlet />
        </div>
    );
}
