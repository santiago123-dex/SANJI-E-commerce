import { useEffect, useState } from "react";
import "../styles/ResultadosBusqueda.css";
import { useLocation } from "react-router-dom";
import { EventoAdmin } from "../admin/EventosAdmin";
import Swal from "sweetalert2";

interface Evento {
    id_evento: number;
    nombre_evento: string;
    fecha_evento: string;
    ubicacion: string;
    descripcion_evento?: string;
    imagen_evento?: string;
}

export function ResultadosBusquedaAdmin() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [error, setError] = useState<string>("")
    const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nombre = params.get("nombre_evento");

        if (!nombre) {
            setError("No se encontró término de búsqueda");
            setEventos([]);
            return;
        }


        fetch(`http://localhost:3000/api/eventos/buscar_nombre?nombre_evento=${encodeURIComponent(nombre)}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (res) => {
                const json = await res.json();
                if (!res.ok) {
                    throw new Error(json.message || "Error al cargar eventos");
                }
                setEventos(json);
                setError("");
            })
            .catch((err) => {
                setError(err.message);
                setEventos([]);
            });
    }, [location]);


    return (
        <div className="resultados-busqueda">
            <h2>Resultados de búsqueda</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="grid-eventos">
                {eventos.map((evento) => (
                    <EventoAdmin
                        key={evento.id_evento}
                        id_evento={evento.id_evento}
                        titulo={evento.nombre_evento}
                        fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                        ubicacion={evento.ubicacion}
                        imagen={evento.imagen_evento}
                        onEditar={() => setEventoEditando(evento)}
                    />
                ))}
            </div>
            {eventoEditando && (
                <div className="modal-overlay">
                    <div className="modal-contenido">
                        <h3>Editar evento</h3>
                        <input
                            type="text"
                            value={eventoEditando.nombre_evento}
                            onChange={e => setEventoEditando({ ...eventoEditando, nombre_evento: e.target.value })}
                        />
                        <input
                            type="date"
                            value={eventoEditando.fecha_evento}
                            onChange={e => setEventoEditando({ ...eventoEditando, fecha_evento: e.target.value })}
                        />
                        <input
                            type="text"
                            value={eventoEditando.ubicacion}
                            onChange={e => setEventoEditando({ ...eventoEditando, ubicacion: e.target.value })}
                        />
                        <input
                            type="text"
                            value={eventoEditando.imagen_evento}
                            onChange={e => setEventoEditando({ ...eventoEditando, imagen_evento: e.target.value })}
                        />
                        <div className="botones">
                            <button
                                className="boton-crear"
                                onClick={async () => {
                                    try {
                                        const res = await fetch(`http://localhost:3000/api/admin/eventos/actualizarEvento`, {
                                            method: "PUT",
                                            credentials: "include",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                id_evento: eventoEditando.id_evento,
                                                id_categoria: 1,
                                                nombre_evento: eventoEditando.nombre_evento,
                                                descripcion_evento: eventoEditando.descripcion_evento,
                                                fecha_evento: eventoEditando.fecha_evento,
                                                ubicacion: eventoEditando.ubicacion,
                                                imagen_evento: eventoEditando.imagen_evento,
                                                estado_evento: 1,
                                            }),
                                        });
                                        if (res.ok) {
                                            Swal.fire({
                                                title: "Evento actualizado correctamente",
                                                icon: "success",
                                                draggable: true
                                            });
                                            setEventoEditando(null);
                                            window.location.reload();
                                        } else {
                                            Swal.fire({
                                                title: "Error al actualizar el evento",
                                                icon: "error",
                                                draggable: true
                                            });
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
        </div>
    );
}
