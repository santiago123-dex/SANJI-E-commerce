export interface DatosPedidoDetallado {
    id_pedido: number
    id_boleto: number
    cantidad: number
}

export interface DatosActualizarPedido {
    total_pedido: number
}

export interface DatosPago {
    id_metodo: number
    nombre_paga: string
    tipo_documento: "cc" | "ce" | "ti" | "te"
    numero_documento: string
    monto: number
}