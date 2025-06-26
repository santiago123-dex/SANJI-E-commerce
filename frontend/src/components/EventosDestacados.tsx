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
        <div className="FeaturedEvent">
            <img src={imagen} alt={titulo} loading="lazy" className="FeaturedEvent__Img" />
            <div className="FeaturedEvent__Info">
                <h3 className="Info__Title">{titulo}</h3>
                <p className="Info__Date">Fecha: {fecha}</p>
                <p className="Info__Place">Lugar: {ubicacion}</p>
            </div>
        </div>
    );
};
