import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Workout from './Workout.tsx'
import Routine from './Routine.tsx';

import CreateWorkout from './Create/CreateWorkout.tsx'
import { createBrowserRouter, RouterProvider, }
    from 'react-router-dom';
import AllWorkoutsInRoutine from './AllWorkoutsInRoutine.tsx'


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
                path: "/workouts-in-routine", // dit op een of andere manier dynamisch maken uiteindelijk
                element: <AllWorkoutsInRoutine/>
            },
            {
                path: "/workout",
                element: <CreateWorkout/>
            }            
        ]
    },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
