import React from "react";
import { useState } from "react";
import "../styles/EventosDestacados.css"

interface EventoDestacadoProps {
    titulo: string;
    fecha: string;
    ubicacion: string;
    imagen?: string;
}

export const EventoAdmin: React.FC<EventoDestacadoProps> = ({ titulo, fecha, ubicacion, imagen }) => {

    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [nuevaFecha, setNuevaFecha] = useState(fecha);
    const [nuevaUbicacion, setNuevaUbicacion] = useState(ubicacion);

    const confirmarEliminacion = () => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar este evento?");
        if (confirmacion) {
            // Aquí llamas a tu función para eliminar (ej. fetch DELETE)
            alert("Evento eliminado");
        }
    };

    const guardarCambios = () => {
        // Aquí haces el fetch PUT o PATCH para actualizar el evento
        console.log("Cambios guardados:", {
            nuevoTitulo,
            nuevaFecha,
            nuevaUbicacion,
        });
        setModalAbierto(false);
    };


    return (
        <div className="FeaturedEvent">
            <img src={imagen} alt={titulo} loading="lazy" className="FeaturedEvent__Img" />
            <div className="FeaturedEvent__Info">
                <h3 className="Info__Title">{titulo}</h3>
                <p className="Info__Date">Fecha: {fecha}</p>
                <p className="Info__Place">Lugar: {ubicacion}</p>
                <div className="AdminButtons">
                    <button className="btn-editar" onClick={() => setModalAbierto(true)}>
                        ✏️ Editar
                    </button>
                    <button className="btn-eliminar" onClick={confirmarEliminacion}>
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
            {modalAbierto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Editar Evento</h2>
                        <label>Título:</label>
                        <input
                            type="text"
                            value={nuevoTitulo}
                            onChange={(e) => setNuevoTitulo(e.target.value)}
                        />

                        <label>Fecha:</label>
                        <input
                            type="date"
                            value={nuevaFecha}
                            onChange={(e) => setNuevaFecha(e.target.value)}
                        />

                        <label>Ubicación:</label>
                        <input
                            type="text"
                            value={nuevaUbicacion}
                            onChange={(e) => setNuevaUbicacion(e.target.value)}
                        />

                        <div className="modal-actions">
                            <button className="btn-guardar" onClick={guardarCambios}>
                                💾 Guardar
                            </button>
                            <button className="btn-cancelar" onClick={() => setModalAbierto(false)}>
                                ❌ Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
