import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { Toaster } from 'react-hot-toast'
import AuthPage from './pages/AuthPage.tsx'
import HeroSection from './pages/HeroSection.tsx'
import MyBookingsPage from './pages/MyBookingsPage.tsx'
import AddMoviePage from './pages/AddMoviePage.tsx'
import AddTheatrePage from './pages/AddTheatrePage.tsx'
import MovieDetailsPage from './pages/MovieDetailsPage.tsx'
import RoleProtectedRoute from './components/RoleProtectedRoute.tsx'
import BookTicketsPage from './pages/BookTicketsPage.tsx'
import AuthProtectedRoute from './components/AuthProtectedRoute.tsx'
import TheatresPage from './pages/TheatresPage.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:(
    <AuthProtectedRoute>
      <AuthPage/>
    </AuthProtectedRoute>
    )
  },
  {
    path:'/',
    element:<App></App>,
    children:[
      {
        path:"movies",
        element:<HeroSection></HeroSection>
      },
      {
        path:"theatres",
        element:(<RoleProtectedRoute allowedRoles={['theatre-owner']}>
          <TheatresPage></TheatresPage>
        </RoleProtectedRoute>
      )
      },
      {
        path:"mybookings",
        element:(<RoleProtectedRoute allowedRoles={['user']}>
          <MyBookingsPage></MyBookingsPage>
        </RoleProtectedRoute>
      )
      },
      {
        path:"addmovie",
        element:(
        <RoleProtectedRoute allowedRoles={['movie-owner']}>
          <AddMoviePage/>
        </RoleProtectedRoute>
        )
      },
      {
        path:"addtheatre",
        element:(
        <RoleProtectedRoute allowedRoles={['theatre-owner']}>
          <AddTheatrePage/>
        </RoleProtectedRoute>
        )
      },
      {
        path:"moviedetails/:movieId",
        element:<MovieDetailsPage></MovieDetailsPage>
      },
      {
        path:"booktickets/:movieId",
        element:(<RoleProtectedRoute allowedRoles={['user']}>
          <BookTicketsPage></BookTicketsPage>
        </RoleProtectedRoute>
      )
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    <Toaster/>
  </Provider>
)
