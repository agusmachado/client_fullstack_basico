import { useState, type FormEvent } from "react"
import { useCreateProduct } from "../api/products.hook"
import { useNavigate } from "react-router-dom"


export default function ProductNew() {

    const [ name, setName ] = useState<string>("")
    const [ price, setPrice ] = useState<string>("")

    // Hook para el POST
    const create = useCreateProduct()

    // Si el producto se crea correctamente, volvemos al listado
    const navigate = useNavigate()

    // Creamos una función para manejar el Submit
    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Validación mínima del lado del front
        const nombre = name.trim()
        const precio = Number(price.replace(",", ".")) // Soporta "10,5" cambiando la coma por un punto

        if (!nombre) {
            alert("El nombre es requerido")
            return
        }
        if (!Number.isFinite(precio) || precio < 0) {
            alert("El precio debe ser un número > 0")
            return
        }


        // Ejecutamos el POST 
        try {
            await create.mutateAsync({ name: nombre, price: precio})
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-4 max-w-lg">
        <h2 className="text-xl font-semibold text-slate-900 mb-3 text-center">Nuevo Producto</h2>

        <form 
            onSubmit={onSubmit}
            className="grid gap-3"
        >
            <label className="grid gap-1">
                <span className="text-sm text-slate-700">Nombre</span>
                <input 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Lapicera"
                />
            </label>

            <label className="grid gap-1">
                <span className="text-sm text-slate-700">Precio</span>
                <input 
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="10.50"
                />
            </label>

            <button
                className="px-4 py-2 rounded-xl font-semibold hover:cursor-pointer"
            >
                { create.isPending ? "Creando..." : "Crear" }
            </button>

           { create.isError && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl whitespace-pre-line text-center">
                <p>{ (create.error as Error).message }</p>
            </div>
        )}
        </form>
    </section>
  )
}
