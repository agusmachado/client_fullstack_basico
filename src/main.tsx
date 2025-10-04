import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './pages/NotFound.tsx'
import ProductList from './pages/ProductList.tsx'
import ProductNew from './pages/ProductNew.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Importamos TanStack Query

// Árbol de rutas
const router = createBrowserRouter([
  {
    path: '/',                        // URL Base
    element: <App/>,                  // Layout ( título, navbar, <Outlet /> )
    errorElement: <NotFound />,       // 404 del front si no se encuentra la página o no hay match
    children:[
      { index: true, element: <ProductList /> },   // "/" => Home para probar
      { path: 'new', element: <ProductNew /> },    // "/new" => New para probar
    ]
  }
])

// Creamos la instancia que administrará el caché, reintentos, etc.
const queryClient = new QueryClient

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider  router={router}/>
    </QueryClientProvider>    
  </StrictMode>,
)
