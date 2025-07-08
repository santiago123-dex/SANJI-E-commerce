import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/DetallesEvento.css";

interface Evento {
    id_evento: number;
    categoria: number;
    nombre_evento: string;
    fecha_evento: string;
    ubicacion: string;
    descripcion_evento: string;
    estado_evento: string;
    imagen_evento: string;
    boletos?: { ubicacion: string; precio: string; aforo: number }[];
}

export function DetallesEvento() {
    const { id } = useParams();
    const [evento, setEvento] = useState<Evento | null>(null);

    useEffect(() => {
    fetch(`https://sanji-e-commerce.onrender.com/api/eventos/id_evento?id_evento=${id}`, {
        method: "GET",
        credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => setEvento(data));
}, [id]);

    if (!evento) return (
    <div className="detalle-cargando">
        <div className="spinner"></div>
        <p>Cargando los detalles del evento, por favor espera...</p>
    </div>
    )

    return (
        <div className="detalle-evento">
        <div className="detalle-top">
            <img src={evento.imagen_evento} alt={evento.nombre_evento} loading= "lazy" className="detalle-imagen"/>
            <div className="detalle-info">
            <h1>{evento.nombre_evento}</h1>
            <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
            <p><strong>Fecha:</strong> {new Date(evento.fecha_evento).toLocaleDateString()}</p>
            <button className="btn-comprar">Comprar</button>
            </div>
        </div>

        {evento.descripcion_evento && (
            <div className="detalle-descripcion">
            <h2>Descripción</h2>
            <p>{evento.descripcion_evento}</p>
            </div>
        )}

        {evento.boletos && (
            <div className="detalle-precios">
            <h2>Ubicación y Precio</h2>
            <table>
                <thead>
                <tr>
                    <th>Ubicación</th>
                    <th>Precio</th>
                    <th>Aforo</th>
                </tr>
                </thead>
                <tbody>
                {evento.boletos.map((p, i) => (
                    <tr key={i}>
                    <td>{p.ubicacion}</td>
                    <td>{p.precio}</td>
                    <td>{p.aforo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
    </div>
);
}
