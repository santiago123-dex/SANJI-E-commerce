import {PrismaClient} from '@prisma/client'
import { DatosAdminLogin } from '../types/adminType'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const loginAdmin = async (data: DatosAdminLogin) => {
    const {email_admin, password_admin} = data

    const admin = await prisma.administradores.findUnique({where: {email_admin}})

    if(!admin) throw new Error("Usuario no encontrado");

    const passwordValido = await bcrypt.compare(password_admin, admin.password_admin)

    if(!passwordValido) throw new Error("Contraseña incorrecta");

    return {id_admin: admin.id_admin, email_admin: admin.email_admin, tipo_admin: 'admin'}
}
