import { api } from "./client";

// 1 - Tipo de datos que el server (backend) nos devuelve en el listado y al crear
export type Product = { id: number; name: string; price: number }

// 2 - Tipo de dato que el frontend envía cuando crea un producto
export type ProductInput = { name: string; price: number }

// 3 - GET => /api/products => Traemos todos los productos
// - axios => nos devuelve { data, status, headers,... } => nos quedamos con data
export async function listProducts(): Promise<Product[]>{
    const { data } = await api.get<Product[]>('/api/products')
    return data
}

// 4 - POST => /apri/products => Creamos un producto con el body { name, price }
// - el backend responde con el producto creado que incluye un id
export async function createProduct(input: ProductInput): Promise<Product> {
    const { data } = await api.post<Product>('/api/products', input)
    return data
}