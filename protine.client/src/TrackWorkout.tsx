import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Exercise from './Exercise';

type ExerciseProps = {
    id: number;
    name: string;
};

type TemplateProps = {
    id: number,
    name: string,
    exercises: Array<ExerciseProps>;
};

function TrackWorkout() {
    const { templateId } = useParams<{ templateId: string }>();
    const [template, setTemplate] = useState<TemplateProps | null>(null);
    const [exerciseData, setExerciseData] = useState<{ [key: string]: { weight: number, results: number[] }}>({});
                                                    //<{ [key: string]: [{ weight: number, results: number[] } ] }>({});

    const fetchTemplate = () => {
        fetch(`https://localhost:7012/workout/track-workout/${templateId}`)
            .then(response => response.json())
            .then(data => setTemplate(data))
            .catch(error => console.error('Error fetching workout template', error));
    };

    useEffect(() => {
        if (templateId) {
            fetchTemplate();
        }
    }, [templateId]);

    const handleExerciseChange = (exerciseIndex: number, data: { weight: number, results: number[] }) => {
        setExerciseData(prevData => ({
            ...prevData,
            [`exercise${exerciseIndex + 1}`]: data
        }));
    };

    const saveWorkout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(exerciseData);

    };

    const addExercise = (newExerciseName) => {
        
        template.exercises.push(
            {
                "id": null,
                "name": newExerciseName,
                "templateId": null
            }
        )
        setTemplate(template);
    }

    return (
        <>
            {template && (                
                <div className="border border-red w-19">
                    <div className="bg-sky-500 font-bold p-2">{template.name}</div>
                    <form onSubmit={saveWorkout}>
                        {template.exercises.map((exercise, index) => (
                            <div key={index}>
                                <Exercise
                                    name={exercise.name}
                                    exerciseIndex={index}
                                    onExerciseChange={handleExerciseChange}
                                />
                            </div>
                        ))}                                                
                        <button className="m-1 font-bold p-2 bg-sky-300" type="submit">Save Workout</button>
                    </form>
                </div>                    
            )}
            <input className="m-1 w-30 bg-sky-50 border border-black"/><br/>
            <button className="m-1 font-bold p-2 bg-sky-100" type="button" onClick={addExercise}>Add Exercise</button>

        </>
    );
}

export default TrackWorkout;