import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/DetallesEvento.css";
import { AñadirBoleta } from "../components/AñadirBoleta";
import Swal from "sweetalert2";
interface Evento {
  id_evento: number;
  id_categoria: number;
  nombre_evento: string;
  fecha_evento: string;
  ubicacion: string;
  descripcion_evento: string;
  estado_evento: number;
  imagen_evento: string;
  boletos?: { ubicacion: string; precio: string; aforo: number }[];
}

interface DetallesEventoProps {
  fetchCarrito?: () => void;
}

export function DetallesEvento({ fetchCarrito }: DetallesEventoProps) {
  const { id } = useParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/eventos/id_evento?id_evento=${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setEvento(data));
  }, [id]);

  if (!evento)
    return (
      <div className="detalle-cargando">
        <div className="spinner"></div>
        <p>Cargando los detalles del evento, por favor espera...</p>
      </div>
    );

    const categorias: Record<number, string> = {
      1: "Deportes",
      2: "Teatro",
      3: "Conciertos",
};



  return (
    <div className="detalle-evento">
      <div className="detalle-top">
        <img
          src={evento.imagen_evento}
          alt={evento.nombre_evento}
          loading="lazy"
          className="detalle-imagen"
        />
        <div className="detalle-info">
          <h1 className="evento-titulo">{evento.nombre_evento}</h1>
          <div className="evento-categoria-estado">
            <span className="evento-categoria">
              {categorias[evento.id_categoria] || "Otro"}
            </span>

            <span className={`evento-estado ${evento.estado_evento === 1 ? "estado-activo" : "estado-inactivo"}`}>
              {evento.estado_evento === 1 ? "Activo" : "Inactivo"}
            </span>
          </div>
          <p>
            <strong>Ubicación:</strong> {evento.ubicacion}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(evento.fecha_evento).toLocaleDateString()}
            <br />
            <strong>Hora:</strong>{" "}
            {new Date(evento.fecha_evento).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div
            className="recomendacion-descripcion"
            style={{ color: "royalblue", fontWeight: "bold" }}
          >
            ⚠️ Te recomendamos leer la descripción del evento antes de elegir tu
            boletería.
          </div>
          <button className="btn-comprar" onClick={() => setModalAbierto(true)}>
            Añadir al carrito
          </button>
        </div>
      </div>

      {/* Descripción atractiva */}
      <div className="detalle-descripcion">
        <h2>Descripción</h2>
        <p>
          ¡Vive una experiencia inolvidable en el{" "}
          <strong>{evento.nombre_evento}</strong> ! Disfruta de una jornada llena
          de emociones, música y alegría junto a los mejores artistas y un
          público vibrante.
          <br />
          <br />
          El evento se realizará en <strong>{evento.ubicacion}</strong> el{" "}
          <strong>{new Date(evento.fecha_evento).toLocaleDateString()}</strong>{" "}
          a las{" "}
          <strong>
            {new Date(evento.fecha_evento).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </strong>
          .<br />
          <br />
          {evento.descripcion_evento}
        </p>
      </div>

      {/* Información adicional estándar */}
      <div className="detalle-extra-info">
        <h2>Información adicional</h2>
        <ul>
          <li>
            <strong>Edad mínima:</strong> Público general (todas las edades)
          </li>
          <li>
            <strong>Acceso para personas con movilidad reducida:</strong> Sí
          </li>
          <li>
            <strong>Política de ingreso:</strong> Presentar documento de
            identidad. Prohibido el ingreso de alimentos y bebidas. Apertura de
            puertas: 1 hora antes del evento.
          </li>
          <li>
            <strong>Política de reembolso:</strong> No se admiten devoluciones
            salvo cancelación del evento.
          </li>
          <li>
            <strong>Duración estimada:</strong> 2 horas 30 minutos
          </li>
          <li>
            <strong>Organizador:</strong> Eventos Sanji S.A.S.
          </li>
          <li>
            <strong>Estacionamiento:</strong> Disponible en el lugar
          </li>
          <li>
            <strong>Recomendaciones:</strong> Llegar con anticipación, llevar
            ropa cómoda y seguir las indicaciones del personal.
          </li>
        </ul>
      </div>

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
                  <td>${p.precio}</td>
                  <td>{p.aforo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalAbierto && (
        <AñadirBoleta
          id_evento={evento.id_evento}
          onClose={() => setModalAbierto(false)}
          onAdd={async (id_boleto, cantidad) => {
            try {
              const res = await fetch(
                "http://localhost:3000/api/usuario/agregarCarrito",
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id_boleto,
                    cantidad,
                  }),
                }
              );
              if (res.ok) {
                Swal.fire("Boleto añadido al carrito");
                if (typeof fetchCarrito === "function") fetchCarrito();
              } else {
                const data = await res.json();
                if (
                  data.message &&
                  data.message.toLowerCase().includes("token")
                ) {
                  Swal.fire("Debes iniciar sesión para añadir boletos al carrito.");
                } else {
                  Swal.fire(data.message || "No se pudo añadir al carrito");
                }
              }
            } catch (err) {
              Swal.fire("Error al añadir al carrito");
            }
            setModalAbierto(false);
          }}
        />
      )}
    </div>
  );
}
