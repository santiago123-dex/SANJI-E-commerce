export interface EventoCompleto {
    id_evento: number
    id_categoria: number
    nombre_evento: string
    descripcion_evento?: string 
    fecha_evento: string
    ubicacion: string
    imagen_evento?: string
    estado_evento: number
}

export interface BoletoCompleto{
    id_boleto: number
    id_evento: number
    id_tipo: number
    precio_boleto: number
    stock: number
    descripcion_boleto: string
}