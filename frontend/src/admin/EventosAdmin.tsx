import React from "react";
import { useState } from "react";
import "../styles/EventosAdmin.css"
import Swal from "sweetalert2";


interface EventoDestacadoProps {
    id_boleto?: number;
    id_evento: number;
    titulo: string;
    fecha: string;
    ubicacion: string;
    imagen?: string;
    onEditar?: () => void
}

export const EventoAdmin: React.FC<EventoDestacadoProps> = ({ id_evento, titulo, fecha, ubicacion, imagen, onEditar, }) => {

    const [, setError] = useState<string>("")

    const eliminarEvento = async () => {
        try {
            // Luego eliminar el evento
            const eliminar = await fetch(`https://sanji-e-commerce.onrender.com/api/admin/eventos/eliminarEvento?id_evento=${id_evento}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (eliminar.ok) {
                Swal.fire({
                    title: "El evento y sus boletos se eliminaron correctamente",
                    icon: "success",
                    draggable: true
                });
            } else {
                Swal.fire({
                    title: "Error al borrar el evento",
                    icon: "error",
                    draggable: true
                });
            }
        } catch (error) {
            setError("No se pudo eliminar el evento o sus boletos");
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
