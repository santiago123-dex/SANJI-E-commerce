import { useEffect, useState } from "react";
import "../styles/PerfilAdmin.css";


import { EventoAdmin } from "../components/EventosAdmin";



interface Evento {
    id_evento: number
    nombre_evento: string
    fecha_evento: string
    ubicacion: string
    descripcion?: string
    imagen_evento?: string
}

interface Boleto {
    id_evento: number | null,
    id_tipo: number,
    precio_boleto: number,
    stock: number,
    descripcion_boleto: string,
    estado_boleto: number
}

export function PerfilAdmin() {

    const [eventos, setEventos] = useState<Evento[]>([]);
    const [error, setError] = useState<string>("")
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false)
    const [eventoEditando, setEventoEditando] = useState<Evento | null>(null)
    const [mostrarModalBoleto, setMostrarModalBoleto] = useState(false)
    const [nuevoBoleto, setNuevoBoleto] = useState<Boleto>({
        id_evento: null,
        id_tipo: 0,
        precio_boleto: 0,
        stock: 0,
        descripcion_boleto: "",
        estado_boleto: 1
    })

    const [nuevoEvento, setNuevoEvento] = useState({
        id_categoria: 1,
        nombre_evento: "",
        descripcion_evento: "",
        fecha_evento: "",
        ubicacion: "",
        imagen_evento: "",
        estado_evento: 1
    })

    const crearEvento = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/admin/eventos/crearEvento", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoEvento)
            });

            if (res.ok) {
                const eventoCreado = await res.json();
                setEventos([...eventos, eventoCreado]);
                setMostrarModalCrear(false);
                setNuevoEvento({
                    id_categoria: 1,
                    nombre_evento: "",
                    descripcion_evento: "",
                    fecha_evento: "",
                    ubicacion: "",
                    imagen_evento: "",
                    estado_evento: 1,
                });
                window.alert("Evento creado correctamente");
            } else {
                setMostrarModalCrear(false);
                window.alert("ha ocurrido un error");
            }
        } catch (error) {
            setMostrarModalCrear(false);
            window.alert("Error de conexión o inesperado");
        }
    }

    const crearBoleto = async () => {
        console.log("Enviando boleto:", nuevoBoleto);
        const res = await fetch("http://localhost:3000/api/admin/eventos/crearBoleto", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoBoleto)
        });
        if (res.ok) {
            alert("Boleto creado correctamente")
            setMostrarModalBoleto(false)
        } else {
            const errorData = await res.json();
            console.error("Error al crear boleto:", errorData);
            alert("Error al crear boleto")
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/eventos")
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar eventos")
                return res.json()
            })
            .then(data => setEventos(data))
            .catch(err => setError(err.message))
    }, [])


    return (
        <main>
            <section className='Hero'>
                <h1 className='Hero__title'>Bienvenido a Miboleta</h1>
                <p className='Hero__description'>Compra entradas para tus eventos favoritos</p>
            </section>
            <section className='FeaturedEvents'>
                <h2 className="FeaturedEvents__Title">Eventos destacados</h2>
                <div className="FeaturedEvents__Content">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {eventos.map(evento => (
                        <div key={evento.id_evento} style={{ marginBottom: '2rem' }}>
                            <EventoAdmin
                                id_evento={evento.id_evento}
                                titulo={evento.nombre_evento}
                                fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                                ubicacion={evento.ubicacion}
                                imagen={evento.imagen_evento}
                                onEditar={() => setEventoEditando(evento)}
                            />
                        </div>
                    ))}
                    <div className="crear-evento">
                        <button onClick={() => setMostrarModalCrear(true)}>➕ Crear nuevo evento</button>
                    </div>
                    <div className="crear-boleto">
                        <button onClick={() => setMostrarModalBoleto(true)}>➕ Crear Boleto</button>
                    </div>

                </div>
            </section>
            {mostrarModalCrear && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <h3>Crear nuevo evento</h3>
                        <input
                            type="text"
                            placeholder="Nombre del evento"
                            value={nuevoEvento.nombre_evento}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre_evento: e.target.value })}
                        />
                        <textarea
                            placeholder="Descripción"
                            value={nuevoEvento.descripcion_evento}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion_evento: e.target.value })}
                        />
                        <input
                            type="date"
                            value={nuevoEvento.fecha_evento}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha_evento: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Ubicación"
                            value={nuevoEvento.ubicacion}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, ubicacion: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="URL de imagen"
                            value={nuevoEvento.imagen_evento}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, imagen_evento: e.target.value })}
                        />

                        <div className="botones">
                            <button className="boton-crear" onClick={crearEvento}>Crear</button>
                            <button className="boton-cancelar" onClick={() => setMostrarModalCrear(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {mostrarModalBoleto && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <h3>Crear boleto</h3>
                        <select
                            value={nuevoBoleto.id_evento !== null ? String(nuevoBoleto.id_evento) : ""}
                            onChange={e => {
                                const value = e.target.value;
                                setNuevoBoleto({ ...nuevoBoleto, id_evento: value ? Number(value) : null });
                            }}
                        >
                            <option value="">Selecciona un evento</option>
                            {eventos.map(ev => (
                                <option key={ev.id_evento} value={ev.id_evento}>
                                    {ev.nombre_evento}
                                </option>
                            ))}
                        </select>
                        <select
                            value={nuevoBoleto.id_tipo || ""}
                            onChange={(e) =>
                                setNuevoBoleto({ ...nuevoBoleto, id_tipo: Number(e.target.value) })}
                        >
                            <option value="">Selecciona un tipo de boleto</option>
                            <option value="1">General</option>
                            <option value="2">VIP</option>
                            <option value="3">Preferencial</option>
                        </select>
                        <input type="number" placeholder="Precio" value={nuevoBoleto.precio_boleto} onChange={e => setNuevoBoleto({ ...nuevoBoleto, precio_boleto: Number(e.target.value) })} />

                        <input type="number" placeholder="Stock" value={nuevoBoleto.stock} onChange={e => setNuevoBoleto({ ...nuevoBoleto, stock: Number(e.target.value) })} />

                        <input type="text" placeholder="Descripción" value={nuevoBoleto.descripcion_boleto} onChange={e => setNuevoBoleto({ ...nuevoBoleto, descripcion_boleto: e.target.value })} />

                        <button onClick={crearBoleto}>Crear</button>

                        <button onClick={() => setMostrarModalBoleto(false)}>Cancelar</button>
                    </div>
                </div>
            )}
            {eventoEditando && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <h3>Editar evento</h3>
                        <input
                            type="text"
                            value={eventoEditando.nombre_evento}
                            onChange={(e) =>
                                setEventoEditando({ ...eventoEditando, nombre_evento: e.target.value })
                            }
                        />
                        <textarea
                            value={eventoEditando.descripcion}
                            onChange={(e) =>
                                setEventoEditando({ ...eventoEditando, descripcion: e.target.value || "" })
                            }
                        />
                        <input
                            type="date"
                            value={eventoEditando.fecha_evento}
                            onChange={(e) =>
                                setEventoEditando({ ...eventoEditando, fecha_evento: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            value={eventoEditando.ubicacion}
                            onChange={(e) =>
                                setEventoEditando({ ...eventoEditando, ubicacion: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            value={eventoEditando.imagen_evento}
                            onChange={(e) =>
                                setEventoEditando({ ...eventoEditando, imagen_evento: e.target.value })
                            }
                        />
                        <div className="botones">
                            <button
                                className="boton-crear"
                                onClick={async () => {
                                    try {
                                        const res = await fetch(`http://localhost:3000/api/admin/eventos/actualizarEvento`, {
                                            method: "POST",
                                            credentials: "include",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                id_evento: eventoEditando.id_evento,
                                                id_categoria: 1,
                                                nombre_evento: eventoEditando.nombre_evento,
                                                descripcion_evento: eventoEditando.descripcion,
                                                fecha_evento: eventoEditando.fecha_evento,
                                                ubicacion: eventoEditando.ubicacion,
                                                imagen_evento: eventoEditando.imagen_evento,
                                                estado_evento: 1,
                                            }),
                                        });
                                        if (res.ok) {
                                            alert("Evento actualizado correctamente");
                                            setEventoEditando(null);
                                            window.location.reload();
                                        } else {
                                            alert("Error al actualizar el evento");
                                        }
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }}
                            >
                                Guardar
                            </button>
                            <button
                                className="boton-cancelar"
                                onClick={() => setEventoEditando(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>

    );
}
