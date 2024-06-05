import CreateWorkout from "./Create/CreateWorkout";
import { useState, useEffect } from "react";
import ExerciseTemplate from "./ExerciseTemplate";
import { useNavigate } from 'react-router-dom';

type Exercise = {
    id: number,
    name: string,
}

type Workout = {
    id: number,
    name: string,
    exercises: Array<Exercise>;
}

function AllWorkoutsInRoutine() {
    const [templates, setTemplates] = useState([]);
    const navigate = useNavigate();

    const fetchTemplates = () => {
        fetch('https://localhost:7012/workout/get-templates')
            .then(response => response.json())
            .then(data => setTemplates(data))
            .catch(error => console.error('Error fetching workout templates', error));
    }

    useEffect(() => {
        fetchTemplates();
    }, []);

    const trackWorkout = (templateId: number) => {
        navigate(`/track-workout/${templateId}`);
    }

    return (
        <>
            <div className="flex flex-row flex-wrap justify-evenly">
                {templates.map((workout: Workout) => {
                    return (
                        <div className="rounded-md border-2 border-sky-300 shadow-xl m-10 w-1/3" key={workout.id} >
                            <div className="bg-sky-200 p-2 text-lg font-medium ">
                                {workout.name}
                            </div>

                            {workout.exercises.map((exercise:Exercise) => {
                                return (
                                    <div>
                                        <ExerciseTemplate name={exercise.name} id={exercise.id} />
                                    </div>
                                )
                            })}
                            <button className="bg-sky-200 font-semibold border-2 border-sky-400 p-1 rounded-md hover:bg-sky-300 m-1" onClick={() => { trackWorkout(workout.id) }} >Track Workout</button>
                            <button className="bg-sky-200 font-semibold border-2 border-sky-400 p-1 rounded-md hover:bg-sky-300 m-1" onClick={() => modalClick(workout.id)} >Add Exercise</button>
                        </div>
                    )
                })}
            </div>
            <div className="border border-red">
                <CreateWorkout />
            </div>
        </>
    );
}

export default AllWorkoutsInRoutine;