import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/EventosCategoria.css";
import { EventosDestacados } from "../components/EventosDestacados";

interface Evento {
    id_evento: number;
    nombre_evento: string;
    fecha_evento: string;
    ubicacion: string;
    descripcion_evento: string;
    imagen_evento?: string;
}

export function EventosCategoria() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [error, setError] = useState("");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nombre_categoria = params.get("nombre_categoria");
        if (!nombre_categoria) {
            setError("No se encontró la categoría");
            setEventos([]);
            return;
        }
        fetch(`http://localhost:3000/api/eventos/evento_categoria?nombre_categoria=${encodeURIComponent(nombre_categoria)}`, {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setEventos(data);
                    setError("");
                } else {
                    setEventos([]);
                    setError(data.message || "No se encontraron eventos.");
                }
            })
            .catch(() => {
                setEventos([]);
                setError("Error al cargar eventos.");
            });
    }, [location]);

    return (
        <div className="resultados-busqueda">
            <h2>Eventos de la categoría seleccionada</h2>
            {error && <p style={{ color: 'red', textAlign: "center" }}>{error}</p>}
            <div className="grid-eventos">
                {eventos.map((evento) => (
                    <EventosDestacados
                        key={evento.id_evento}
                        id={evento.id_evento}
                        titulo={evento.nombre_evento}
                        fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                        ubicacion={evento.ubicacion}
                        imagen={evento.imagen_evento}
                    />
                ))}
            </div>
        </div>
    );
}