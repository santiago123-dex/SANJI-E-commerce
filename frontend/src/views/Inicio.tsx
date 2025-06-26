import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { EventoDestacado } from '../components/EventosDestacados.tsx'
import "../styles/Inicio.css"

interface Evento {
    id_evento: number
    nombre_evento: string
    fecha_evento: string
    ubicacion: string
    descripcion?: string
    imagen_evento?: string
}

export function Inicio() {
    const [eventos, setEventos] = useState<Evento[]>([])
    const [error, setError] = useState<string>("")

    useEffect(() => {
        fetch("http://localhost:3000/api/eventos")
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar eventos")
                return res.json()
            })
            .then(data => setEventos(data))
            .catch(err => setError(err.message))
    }, [])

    return (
        <main>
            <section className='Hero'>
                <h1 className='Hero__title'>Bienvenido a Miboleta</h1>
                <p  className='Hero__description'>Compra entradas para tus eventos favoritos</p>
            </section>
            <section className='FeaturedEvents'>
                <h2 className="FeaturedEvents__Title">Eventos destacados</h2>
                <div className="FeaturedEvents__Content">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {eventos.map(evento => (
                            <>
                                <EventoDestacado
                                    key={evento.id_evento}
                                    titulo={evento.nombre_evento}
                                    fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                                    ubicacion={evento.ubicacion}
                                    imagen={evento.imagen_evento}
                                />
                                <EventoDestacado
                                    key={evento.id_evento}
                                    titulo={evento.nombre_evento}
                                    fecha={new Date(evento.fecha_evento).toLocaleDateString()}
                                    ubicacion={evento.ubicacion}
                                    imagen={evento.imagen_evento}
                                />
                            </>

                    ))}
                </div>
            </section>

            <section className='categorias'>
                <h2>Categorías</h2>
                <div className='grid-categorias'>
                    <Link to="" className='categoria'>CONCIERTOS</Link>
                    <Link to="" className='categoria'>TEATRO</Link>
                    <Link to="" className='categoria'>DEPORTES</Link>
                    <Link to="" className='categoria'>OTROS</Link>
                </div>
            </section>
            <Footer />
        </main>
    )
}