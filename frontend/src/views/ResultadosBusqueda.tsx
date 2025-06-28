import { useEffect, useState } from "react";
import "../styles/ResultadosBusqueda.css";
import { useLocation } from "react-router-dom";

interface Evento {
    id_evento: number;
    nombre_evento: string;
    fecha_evento: string;
    ubicacion: string;
    descripcion?: string;
    imagen_evento?: string;
}

export function ResultadosBusqueda() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [error, setError] = useState<string>("")
    const location = useLocation();

    useEffect(() => {
        const nombre = localStorage.getItem("nombreBuscado");

    if (!nombre) {
        setError("No se encontró término de búsqueda");
        setEventos([]);
        return;
    }
    

    fetch(`http://localhost:3000/api/eventos/buscar-nombre?nombre_evento=${encodeURIComponent(nombre)}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(async (res) => {
            const json = await res.json();
            if (!res.ok) {
                console.error("Respuesta con error:", json);
                throw new Error(json.message || "Error al cargar eventos");
            }
            setEventos(json);
        })
        .catch((err) => {
            console.error("Error en fetch:", err);
            setError(err.message);
        });
}, [location]);


    return (
        <div className="resultados-busqueda">
            <h2>Resultados de búsqueda</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="grid-eventos">
                    {eventos.map((evento) => (
                        <div key={evento.id_evento} className="evento-destacado">
                            <img src={evento.imagen_evento ? evento.imagen_evento : "../../public/placeholder.jpg"} alt={evento.nombre_evento} />
                            <div>
                                <h3>{evento.nombre_evento}</h3>
                                <p>{new Date(evento.fecha_evento).toLocaleDateString()}</p>
                                <p>{evento.ubicacion}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    );
}
