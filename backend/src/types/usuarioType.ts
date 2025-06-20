export interface DatosUsuario {
    nombre_usuario: string
    apellido_usuario: string
    email_usuario: string
    password_usuario: string
    telefono?: string | null
}

export interface DatosUsuarioLogin{
    email_usuario: string
    password_usuario: string
}