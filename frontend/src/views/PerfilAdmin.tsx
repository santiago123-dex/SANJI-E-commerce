import { useEffect, useState } from "react";
import "../styles/PerfilAdmin.css";
import { EventosDestacados } from "../components/EventosDestacados";

interface Evento {
    id_evento: number
    nombre_evento: string
    fecha_evento: string
    ubicacion: string
    descripcion?: string
    imagen_evento?: string
}

export function PerfilAdmin() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [error, setError] = useState<string>("")
    const [mostrarModalCrear, setMostrarModalCrear] = useState(false)

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
        const res = await fetch("http://localhost:3000/api/admin/eventos/crearEvento", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoEvento)
        })

        if (res.ok) {
            const eventoCreado = await res.json()
            setEventos([...eventos, eventoCreado])
            setMostrarModalCrear(false)

            setNuevoEvento({
                id_categoria: 1,
                nombre_evento: "",
                descripcion_evento: "",
                fecha_evento: "",
                ubicacion: "",
                imagen_evento: "",
                estado_evento: 1,
            })

            alert("Evento creado correctamente")

        } else {
            alert("ha ocurrido un error")
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
        <div className="perfil-admin">
            <h2>Panel del Administrador</h2>
            <div className="evento-contenedor">
                {eventos.map(evento => (
                        <EventosDestacados
                            id={evento.id_evento}
                            titulo={evento.nombre_evento}
                            fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                            ubicacion={evento.ubicacion}
                            imagen={evento.imagen_evento}
                        />
                ))}
                <div className="crear-evento">
                    <button onClick={() => setMostrarModalCrear(true)}>➕ Crear nuevo evento</button>
                </div>
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
            </div>

        </div>
    );
}
