import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Workout from './Workout.tsx'
import Routine from './Routine.tsx';

import CreateWorkout from './Create/CreateWorkout.tsx'
import { createBrowserRouter, RouterProvider, }
    from 'react-router-dom';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/routines",
                element: <Routine />
            },
            {
                path: "/workout",
                element: <Workout/>
            }            
        ]
    },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
