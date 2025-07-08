import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Pago.css";

export function Pago() {
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [cvc, setCvc] = useState("");
  const [nombrePaga, setNombrePaga] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("cc");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [metodoPago, setMetodoPago] = useState(1);
  const [pedido, setPedido] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const generarPedido = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuario/generarPedido", {
          method: "GET",
          credentials: "include"
        });

        const data = await res.json();

            if (res.ok && data && typeof data.id_pedido === "number") {
                setPedido(data);
            } else {
                console.error("Error al generar el pedido:", data);
            }


      } catch (error) {
        Swal.fire("Error de conexión al generar pedido", "", "error");
      }
    };

    generarPedido();
  }, []);



  const handlePago = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const verificacion = await fetch("http://localhost:3000/api/usuario/verificarDatosPago", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero_tarjeta: numeroTarjeta, cvc })
      });

      if (!verificacion.ok) {
        return Swal.fire("Tarjeta inválida", "", "error");
      }

      const res = await fetch(`http://localhost:3000/api/usuario/pagarPedido?id_pedido=${pedido.id_pedido}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_metodo: metodoPago,
          nombre_paga: nombrePaga,
          tipo_documento: tipoDocumento,
          numero_documento: numeroDocumento,
          monto: pedido.total_pedido
        })
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Pago realizado con éxito", "", "success").then(() => {
          navigate("/");
        });
      } else {
        Swal.fire(data.message || "Error al realizar el pago", "", "error");
      }
    } catch (error) {
      Swal.fire("Error al procesar el pago", "", "error");
    }
  };

  if (!pedido) {
    return (
      <div className="detalle-cargando">
        <div className="spinner"></div>
        <p>Cargando pedido...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handlePago} className="formulario-pago">
      <h2>Realizar Pago</h2>
      <p className="total-pago">Total a pagar: <strong>${pedido.total_pedido}</strong></p>

      <select
        value={metodoPago}
        onChange={(e) => setMetodoPago(Number(e.target.value))}
        required
    >
        <option value={1}>Tarjeta de crédito</option>
        <option value={2}>PSE</option>
        <option value={3}>Efecty</option>
    </select>


      <input
        type="text"
        placeholder="Número de tarjeta"
        value={numeroTarjeta}
        onChange={(e) => setNumeroTarjeta(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="CVC"
        value={cvc}
        onChange={(e) => setCvc(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nombre del pagador"
        value={nombrePaga}
        onChange={(e) => setNombrePaga(e.target.value)}
        required
      />

      <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required>
        <option value="cc">Cédula de Ciudadanía (C.C.)</option>
        <option value="ce">Cédula de Extranjería (C.E.)</option>
        <option value="ti">Tarjeta de Identidad (T.I.)</option>
        <option value="te">Tarjeta de Extranjería (T.E.)</option>
      </select>

      <input
        type="text"
        placeholder="Número de documento"
        value={numeroDocumento}
        onChange={(e) => setNumeroDocumento(e.target.value)}
        required
      />

      <button type="submit" className="btn-pagar">Pagar</button>
    </form>
  );
}
