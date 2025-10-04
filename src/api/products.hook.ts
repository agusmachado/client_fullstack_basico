// useQuery => para el GET /api/products
// useMutation => para el POST /api/products
// useQueryClient => para hablar con la "caché"

import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import { listProducts, type Product, createProduct, type ProductInput } from "./products";

// - Hook para Listar los Productos
export function useProducts() {
    return useQuery<Product[]>({
        // queryKey es nuestro caché de la lista y elegimos de nombre 'products'
        queryKey:['products'],
        // Función que llama al backend con GET /api/products
        queryFn: listProducts,
    })
}

// - Hook para Crear los Productos
export function useCreateProduct() {
    // Control para hablar con la caché
    const queryClient = useQueryClient()

    return useMutation<
        Product,            // Lo que devuelve el POST si sale bien (si Product creado)
        Error,              // El tipo de error ( usamos Error para mostrar .message)
        ProductInput        // Lo que pasamos a mutate({ name, price })
    >({
        // Se ejecuta cuando llamamos: mutate({ name, price })
        mutationFn: (input: ProductInput) => createProduct(input),

        // Si el POST fue exitoso
        onSuccess: () => {
            // - queryKey => identifica la caché del listado
            // - invalidate lo que hace es marcar como desactualizado el cahé
            // - Si ProductList está montado, TanStack Query hace REFETCH en el momento
            // - Si no hay nada, no hay ninguna lista hecha, entonces hace REFETCH cuando vuelva al listado
            queryClient.invalidateQueries({ queryKey: ['products']})
        },
    })
}