export interface DatosToken {
    id_usuario: number
    email_usuario: string
}

export interface DatosTokenAdmin {
    id_admin: number
    email_admin: string
    tipo_admin: string
}


declare global {
    namespace Express {
        interface Request {
            usuario?: DatosToken
            usuarioAdmin?: DatosTokenAdmin
        }
    }
}