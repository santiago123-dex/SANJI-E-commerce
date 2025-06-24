import { useEffect, useState } from "react";
import "../styles/PerfilAdmin.css";
import { EventoDestacado } from "../components/EventosDestacados";

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
    const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);

useEffect(() => {
    fetch("http://localhost:3000/api/eventos")
    .then((res) => res.json())
    .then((data) => setEventos(data));
}, []);

const eliminarEvento = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de eliminar este evento?");
    if (!confirmar) return;

const res = await fetch(`http://localhost:3000/api/eventos/${id}`, {
    method: "DELETE",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
    },
});
    if (res.ok) {
        setEventos(eventos.filter((e) => e.id_evento !== id));
    }   
}

const guardarCambios = async () => {
    if (!eventoEditando) return

    const res = await fetch(`http://localhost:3000/api/eventos/${eventoEditando.id_evento}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("tokenAdmin"),
        },
            body: JSON.stringify(eventoEditando),
        });

        if (res.ok) {
        const nuevosEventos = eventos.map((e) =>
            e.id_evento === eventoEditando.id_evento ? eventoEditando : e
        );
        setEventos(nuevosEventos);
        setEventoEditando(null); // Cerrar formulario
        }
    };

    return (
        <div className="perfil-admin">
        <h2>Panel del Administrador</h2>
            <div className="evento-contenedor">
                {eventos.map(evento => (
                <>
                    <EventoDestacado
                        key={evento.id_evento}
                        titulo={evento.nombre_evento}
                        fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                        ubicacion={evento.ubicacion}
                        imagen={evento.imagen_evento}
                    />  
                    <div className="botones-admin">
                        <button onClick={() => setEventoEditando(evento)}>✏️ Editar</button>
                        <button onClick={() => eliminarEvento(evento.id_evento)}>🗑️ Eliminar</button>
                    </div>
                </>
            ))}
            </div>

        {eventoEditando && (
            <div className="modal">
            <h3>Editar evento</h3>
            <input
                type="text"
                value={eventoEditando.nombre_evento}
                onChange={(e) =>
                setEventoEditando({ ...eventoEditando, nombre_evento: e.target.value })
                }
            />
            <input
                type="date"
                value={eventoEditando.fecha_evento}
                onChange={(e) =>
                setEventoEditando({ ...eventoEditando, fecha_evento: e.target.value })
                }
            />
            <input
                type="text"
                value={eventoEditando.ubicacion}
                onChange={(e) =>
                setEventoEditando({ ...eventoEditando, ubicacion: e.target.value })
                }
            />
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setEventoEditando(null)}>Cancelar</button>
            </div>
        )}
        </div>
    );
    }
