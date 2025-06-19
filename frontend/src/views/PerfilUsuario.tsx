    import "../styles/PerfilUsuario.css"
    import { useState, useEffect } from "react"
    import { useNavigate } from "react-router-dom"


    interface Perfil {
        nombre_usuario: string
        email_usuario: string
    }

    export function PerfilUsuario() {

        const navigate = useNavigate()

        const handleLogout = () => {
            localStorage.removeItem("token")
            navigate("/inicio")
        }

        const [perfil, setPerfil] = useState<Perfil | null>(null)
        const [loading, setLoading] = useState<boolean>(true)
        const [error, setError] = useState<string>("")

        useEffect(() => {
            const obtenerPerfil = async () => {
                try {
                    const token = localStorage.getItem('token')
                    const response = await fetch('http://localhost:3000/usuario/perfil', {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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
        return (
            <div>
                <div className="container">
                    <div className="logo-perfil">
                        <img src="../../public/logoUser.png" alt="" />
                    </div>
                    <div className="datos-usuario">
                        <p><strong>Nombre:</strong> {perfil.nombre_usuario}</p>
                        <p><strong>Email:</strong> {perfil.email_usuario}</p>
                        <button onClick={handleLogout}>Cerrara Sesion</button>
                    </div>
                </div>
            </div>
        )
    }