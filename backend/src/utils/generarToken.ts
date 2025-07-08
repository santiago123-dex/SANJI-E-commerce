import jwt from 'jsonwebtoken'
import {DatosToken, DatosTokenAdmin} from '../types/tokenType'

export const generarTokenAcceso = (datos: DatosToken | DatosTokenAdmin) => {
    return jwt.sign(datos, process.env.JWT_SECRET as string, {expiresIn: '20m'})
}

export const generarTokenRefresh = (datos: DatosToken | DatosTokenAdmin) => {
    return jwt.sign(datos, process.env.JWT_SECRET_REFRESH as string, {expiresIn: '7d'})
}