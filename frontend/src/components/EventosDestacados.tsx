import "../styles/EventosDestacados.css"
import { useNavigate } from "react-router-dom";

interface EventoDestacadoProps {
    id: number;
    titulo: string;
    fecha: string;
    ubicacion: string;
    imagen?: string;
}

export const EventosDestacados: React.FC<EventoDestacadoProps> = ({ id, titulo, fecha, ubicacion, imagen }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/DetallesEvento/${id}`)} className="FeaturedEvent">
            <img src={imagen ? imagen : "../../public/placeholder.jpg"} loading="lazy" alt={titulo} className="FeaturedEvent__Img"/>
            <div className="FeaturedEvent__Info">
                <h3 className="Info__Title">{titulo}</h3>
                <p className="Info__Date">Fecha: {fecha}</p>
                <p className="Info__Place">Lugar: {ubicacion}</p>
            </div>
        </div>
    );
};

        
            