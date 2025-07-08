import { useState, useEffect } from "react";
import "../styles/AñadirBoleta.css"; 

interface Boleto {
    id_boleto: number;
    id_evento: number;
    id_tipo: number;
    precio_boleto: string;
    stock: number;
    descripcion_boleto: string;
    estado_boleto: number;
}

interface AñadirBoletaProps {
    id_evento: number;
    onClose: () => void;
    onAdd: (id_boleto: number, cantidad: number) => void;
}

export function AñadirBoleta({ id_evento, onClose, onAdd }: AñadirBoletaProps) {
    const [boletos, setBoletos] = useState<Boleto[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [cantidad, setCantidad] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(
            `http://localhost:3000/api/eventos/id_evento_boleto?id_evento=${id_evento}`,
            {
                method: "GET",
                credentials: "include",
            }
        )
            .then(res => res.json())
            .then((data: Boleto[]) => {
                if (Array.isArray(data) && data.length > 0) {
                    setBoletos(data);
                    setSelected(data[0].id_boleto);
                } else {
                    setError("No hay boletos disponibles para este evento.");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar los boletos.");
                setLoading(false);
            });
    }, [id_evento]);

    const boletoSeleccionado = boletos.find(
        b => b.id_boleto === selected
    );

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <p>Cargando boletos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <p style={{ color: "red" }}>{error}</p>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Selecciona tipo y cantidad de boleto</h3>
                <select
                    className="select-boleta"
                    value={selected ?? ""}
                    onChange={e => setSelected(Number(e.target.value))}
                >
                    {boletos.map(b => (
                        <option key={b.id_boleto} value={b.id_boleto}>
                            {b.descripcion_boleto} - ${b.precio_boleto}
                        </option>
                    ))}
                </select>
                <input
                    className="input-cantidad"
                    type="number"
                    min={1}
                    max={boletoSeleccionado?.stock || 10}
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
                <div className="modal-actions">
                    <button
                        className="btn-confirmar"
                        onClick={() => selected && onAdd(selected, cantidad)}
                        disabled={selected === null || cantidad < 1}
                    >
                        Añadir
                    </button>
                    <button className="btn-cancelar" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}