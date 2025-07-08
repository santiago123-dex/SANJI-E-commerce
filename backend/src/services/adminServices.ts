import {Prisma, PrismaClient} from '@prisma/client'
import { DatosAdminLogin } from '../types/adminType'
import bcrypt from 'bcrypt'
import { HttpError } from '../utils/errorManager'
import {prisma} from '../utils/prisma'

export const loginAdmin = async (data: DatosAdminLogin) => {
    const {email_admin, password_admin} = data

    const admin = await prisma.administradores.findUnique({where: {email_admin}})

    if(!admin) throw new HttpError("Usuario no encontrado", 404);

    const passwordValido = await bcrypt.compare(password_admin, admin.password_admin)

    if(!passwordValido) throw new HttpError("Contraseña incorrecta", 401);

    try{
        return {id_admin: admin.id_admin, email_admin: admin.email_admin, tipo_admin: 'admin'}
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error.code === 'P2025') throw new HttpError("Usuario no encontrado", 404);
        }
        throw error
    }
}
