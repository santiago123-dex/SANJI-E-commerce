import "../styles/PerfilUsuario.css"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


interface Perfil {
    nombre_usuario: string
    email_usuario: string
    apellido_usuario?: string
    telefono_usuario?: string
}

export function PerfilUsuario() {

    const navigate = useNavigate()

    const [perfil, setPerfil] = useState<Perfil | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [editar, setEditar] = useState<boolean>(false)

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

    useEffect(() => {
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

    const editarPerfil = async () => {
        try {
            console.log("Enviando perfil:", perfil);
            const response = await fetch('http://localhost:3000/api/usuario/actualizarPerfil', {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(perfil),
            })
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Error al editar perfil");
                return;
            }
            const data = await response.json()
            setPerfil(data)
            setEditar(false)
            obtenerPerfil() // Actualizar el perfil después de editar
        } catch (error) {
            setError("No se pudo editar el perfil")
        }
    }


    const handleLogout = async () => {
        try {
            const logout = await fetch('http://localhost:3000/api/usuario/logout', {
                method: "GET",
                credentials: "include"
            })
            if (logout.ok) {
                Swal.fire({
                    title: "Sesión cerrada correctamente",
                    icon: "success",
                    draggable: true
                });
                navigate("/inicio")
            } else {
                Swal.fire({
                    title: "Error al cerrar la sesión",
                    icon: "success",
                    draggable: true
                });
            }
        } catch (error) {
            setError("No se pudo cerrar sesion")
        }
    }

    return (
        <div>
            <div className="profile">
                <img src="../../public/logoUser.png" alt="" className="profile__logo" />
                <div className="profile__content">
                    <div className="content__info">
                        <p><strong>Nombre:</strong> {perfil.nombre_usuario}</p>
                        <p><strong>Apellido:</strong> {perfil.apellido_usuario}</p>
                        <p><strong>Email:</strong> {perfil.email_usuario}</p>
                        <p><strong>Teléfono:</strong> {perfil.telefono_usuario}</p>
                        <button className="content__logout" onClick={handleLogout}>Cerrara Sesion</button>
                        <button className="content__logout" onClick={() => setEditar(true)}>editar Perfil</button>
                    </div>
                    {editar && (
                        <div className="editar-perfil">
                            <div className="editar-perfil-contenido">

                                <input
                                    type="text"
                                    value={perfil.nombre_usuario}
                                    onChange={(e) => setPerfil({ ...perfil, nombre_usuario: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={perfil.apellido_usuario}
                                    onChange={(e) => setPerfil({ ...perfil, apellido_usuario: e.target.value })}
                                />
                                <input
                                    type="email"
                                    value={perfil.email_usuario}
                                    onChange={(e) => setPerfil({ ...perfil, email_usuario: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    value={perfil.telefono_usuario}
                                    onChange={(e) => setPerfil({ ...perfil, telefono_usuario: e.target.value })}
                                />
                                <button onClick={editarPerfil}>Guardar Cambios</button>
                                <button onClick={() => setEditar(false)}>Cancelar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}