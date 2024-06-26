import { useState, useEffect } from "react";
import CreateExercise from "./Create/CreateExercise";
import Exercise from "./ExerciseTemplate";

type Exercise = {
    id: number,
    name: string,
}

type Workout = {
    id: number,
    name: string,
    exercises: Array<Exercise>;
}

function Workout() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [modal, setModal] = useState(false);
    const [workoutId, setId] = useState(-1);

    const fetchWorkouts = () => {
        fetch('https://localhost:7012/workout/get')
            .then(response => response.json())
            .then(data => setWorkouts(data))
            .catch(error => console.error('Error fetching workouts', error));
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const modalClick = (workoutId: number) => {
        setModal(!modal)
        setId(workoutId)
    }

    return (
        <>
            <div className="flex flex-row flex-wrap justify-evenly">
                {workouts.map((workout: Workout) => {
                    return (
                        <div className="rounded-md border-2 border-sky-300 shadow-xl m-10 w-1/3" key={workout.id} >
                            <div className="bg-sky-200 p-2 text-lg font-medium ">
                            {workout.name}
                            </div>

                            {workout.exercises.map((exercise: Exercise) => {
                                return (
                                    <div>
                                         <Exercise name={exercise.name} id={exercise.id}/>
                                    </div>
                                )
                            })}
                            <button className="bg-sky-200 font-semibold border-2 border-sky-400 p-1 rounded-md hover:bg-sky-300 m-1">Track Workout</button>
                            <button className="bg-sky-200 font-semibold border-2 border-sky-400 p-1 rounded-md hover:bg-sky-300 m-1" onClick={() => modalClick(workout.id)} >Add Exercise</button>
                        </div>
                    )
                })}
            </div>

            {modal && <CreateExercise workoutId={workoutId} open={modal} onClose={() =>  setModal(false)} />}

        </>
    );
}

export default Workout;