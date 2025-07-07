export class HttpError extends Error {
    public codigoEstado: number

    constructor(message: string, codigoEstado: number){
        super(message)
        this.codigoEstado = codigoEstado
        this.name = 'HttpError'
    }
}