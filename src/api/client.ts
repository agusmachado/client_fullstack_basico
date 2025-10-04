// 1 - Importamos axios, la librería que hará las llamadas HTTP
import axios from "axios";

// 2 - Instancia api con configuración general
// baseURL => la ruta del server
// headers => avisamos que enviaremos un JSON
// timeout => si el server no responde en 8000 ms === a 8 segundos, abortamos y evitamos colgar la UI
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE as string,
    headers: { 'Content-Type' : 'application/json'},
    timeout: 8000,
})

// 3 - Interceptor de Respuesta
api.interceptors.response.use(
    // 3.1 - Respuesta exitosa, la dejamos pasar sin tocarla
    (res) => res,

    // 3.2 - Error => transformamos la respuesta de error en un Error "amigable"
    (error) => {
        // axios nos da acceso a "response" => tenemos el status y el body (data) del server
        const status = error.response?.status   // el status puede ser 400, 404, 500...
        const data = error.response?.data       // lo que devuelve el backend en el body

        // intentamos sacar un texto que nos explique o nos diga el error
        /* 
        Lo que puede mandar el back:
            { message: "..."} => usamos ese message
            { errors: [...] } => por ejemplo, validaciones => lo convertimos en un string que se pueda leer
            Si no hay nada, usamos error.message (genérico)      
        */
        const mensaje =
                        data?.message ??
                        (data?.errors ? JSON.stringify(data.errors, null, 2) : error.message)
        
        return Promise.reject(new Error(`HTTP ${status ?? '??'} - ${ mensaje }`))
    }
)