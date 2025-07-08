import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { LogoMiboleta } from "./LogoMiboleta";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Define la interfaz para los items del carrito
interface CarritoItem {
    id_carrito:number;
    id_boleto: number;
    cantidad: number;
    descripcion_boleto?: string;
}

export function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [logueo, setLogueo] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [modalCarrito, setModalCarrito] = useState(false);
    const [carrito, setCarrito] = useState<CarritoItem[]>([]);
    const [loadingCarrito, setLoadingCarrito] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleBuscar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/eventos/buscar_nombre?nombre_evento=${encodeURIComponent(busqueda)}`,
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
                    "http://localhost:3000/api/usuario/perfil",
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

    // Fetch carrito
    const fetchCarrito = async () => {
        setLoadingCarrito(true);
        try {
            const res = await fetch("http://localhost:3000/api/usuario/carrito", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setCarrito(data);
            } else {
                setCarrito([]);
            }
        } catch {
            setCarrito([]);
        }
        setLoadingCarrito(false);
    };

    // Abrir modal carrito y cargar datos
    const handleAbrirCarrito = () => {
        fetchCarrito();
        setModalCarrito(true);
    };

    // Eliminar un producto del carrito
    const eliminarItem = async (id_carrito: number) => {
        await fetch(`http://localhost:3000/api/usuario/eliminarCarrito?id_carrito=${id_carrito}`, {
            method: "DELETE",
            credentials: "include",
        });
        fetchCarrito();
    };

    // Eliminar todo el carrito
    const eliminarTodo = async () => {
        await fetch("http://localhost:3000/api/usuario/eliminarTodoCarrito", {
            method: "DELETE",
            credentials: "include",
        });
        fetchCarrito();
    };

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


                    <button className='Menu__Item' onClick={() => navigate('/categoria?nombre_categoria=CONCIERTOS')}>CONCIERTOS</button>
                    <button className='Menu__Item' onClick={() => navigate('/categoria?nombre_categoria=TEATRO')}>TEATRO</button>
                    <button className='Menu__Item' onClick={() => navigate('/categoria?nombre_categoria=DEPORTES')}>DEPORTES</button>

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
                                    {loadingCarrito ? (
                                        <p>Cargando...</p>
                                    ) : carrito.length === 0 ? (
                                        <p>No tienes productos aún.</p>
                                    ) : (
                                        <ul>
                                            {carrito.map((item) => (
                                                <li key={item.id_carrito} style={{ marginBottom: "10px", marginLeft: "10px" }}>
                                                    {item.descripcion_boleto || `Boleto #${item.id_boleto}`} x{item.cantidad}
                                                    <button className ="Eliminar" onClick={() => eliminarItem(item.id_carrito)}>
                                                        Eliminar
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="CarritoFooter">
                                    <button className="Comprar" onClick={() => {
                                        setModalCarrito(false);    
                                        navigate("/pago");          
                                    }}>
                                        Comprar
                                    </button>

                                    <button className= "EliminarTodo" onClick={eliminarTodo}>Eliminar todo</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="carrito-icono" onClick={handleAbrirCarrito}>
                        <img className="LogoUser" src="../../public/logoCarrito.png" alt="" />
                    </div>
                    <Link className="user-icono" to="/perfil">
                        <img className="LogoUser" src="../../public/logoUser.png" alt="" />
                    </Link>
                </nav>
            </div>
            {menuAbierto && <div className="overlay" onClick={toggle}></div>}

            <Outlet />
        </div>
    );
}
