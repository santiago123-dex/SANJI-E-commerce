import React from "react";
import { useState } from "react";
import "../styles/EventosAdmin.css"

interface EventoDestacadoProps {
    id_evento: number;
    titulo: string;
    fecha: string;
    ubicacion: string;
    imagen?: string;
    onEditar: () => void
}

export const EventoAdmin: React.FC<EventoDestacadoProps> = ({ id_evento, titulo, fecha, ubicacion, imagen, onEditar, }) => {

    const [error, setError] = useState<string>("")

    const eliminarEvento = async () => {
        try {
            const eliminar = await fetch(`http://localhost:3000/api/admin/eventos/eliminarEvento?id_evento=${id_evento}`, {
                method: "GET",
                credentials: "include"
            });
            if (eliminar.ok) {
                alert("El evento se eliminó correctamente");
                window.location.reload(); // Recarga la página automáticamente
            } else {
                alert("Error al borrar el evento");
            }
        } catch (error) {
            setError("No se pudo eliminar el evento");
        }
    };



    return (
        <div className="FeaturedEvent">
            <img src={imagen} alt={titulo} loading="lazy" className="FeaturedEvent__Img" />
            <div className="FeaturedEvent__Info">
                <h3 className="Info__Title">{titulo}</h3>
                <p className="Info__Date">Fecha: {fecha}</p>
                <p className="Info__Place">Lugar: {ubicacion}</p>
                <div className="AdminButtons">
                    <button className="btn-editar" onClick={onEditar}>
                        ✏️ Editar
                    </button>
                    <button className="btn-eliminar" onClick={eliminarEvento}>
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};
