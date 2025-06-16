import React from "react";
import "../styles/EventosDestacados.css"

interface EventoDestacadoProps {
    titulo: string;
    fecha: string;
    ubicacion: string;
    imagen?: string;
}

export const EventoDestacado: React.FC<EventoDestacadoProps> = ({ titulo, fecha, ubicacion, imagen }) => {
    return (
        <div className="evento-destacado">
            <img src={imagen} alt={titulo} loading="lazy" className="evento-imagen" />
            <div className="evento-info">
                <h3>{titulo}</h3>
                <p>Fecha: {fecha}</p>
                <p>Lugar: {ubicacion}</p>
            </div>
        </div>
    );
};
