import "../styles/PerfilUsuario.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


interface Perfil {
    nombre_usuario: string
    email_usuario: string
}

export function PerfilUsuario() {

    const navigate = useNavigate()

    const [perfil, setPerfil] = useState<Perfil | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/usuario/perfil', {
                    method: "GET",
                    credentials: "include"
                })

                if (!response.ok) throw new Error("Error al obtener el perfil")

                const data = await response.json()
                setPerfil(data)
            } catch (error) {
                setError("No estas logueado")
            } finally {
                setLoading(false)
            }
        }
        obtenerPerfil()
    }, [])

    if (loading) {
        return <p>Cargando perfil.....</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (!perfil) {
        return null
    }

    
    const handleLogout = async () => {
        try {
            const logout = await fetch('http://localhost:3000/api/usuario/logout', {
                method: "GET",
                credentials: "include"
            })
            if (logout.ok) {
                alert("se cerro la sesion correctamente")
                navigate("/inicio")
            } else {
                alert("Error al cerrar la sesion")
            }
        } catch (error) {
            setError("No se pudo cerrar sesion")
        }
    }

    return (
        <div>
            <div className="profile">
                <img src="../../public/logoUser.png" alt="Foto de perfil"  className="profile__logo"/>
                <div className="profile__content">
                    <div className="content__info">
                        <p className="info__name"><strong>Nombre:</strong> {perfil.nombre_usuario}</p>
                        <p className="info__email"><strong>Email:</strong> {perfil.email_usuario}</p>
                    </div>
                    <button className="content__logout" onClick={handleLogout}>Cerrar Sesion</button>
                </div>
            </div>
        </div>
    )
}