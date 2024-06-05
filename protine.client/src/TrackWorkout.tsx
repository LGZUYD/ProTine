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
}

function TrackWorkout() {
    const { templateId } = useParams<{ templateId: string }>();
    const [template, setTemplate] = useState<TemplateProps | null>(null);

    const fetchTemplate = () => {
        fetch(`https://localhost:7012/workout/track-workout/${templateId}`)
            .then(response => response.json())
            .then(data => setTemplate(data))
            .catch(error => console.error('Error fetching workout template', error));
    }

    useEffect(() => {
        if (templateId) {
            fetchTemplate();
        }
    }, [templateId]);


    return (
        <>
            <div className="border border-red">
                <div className="bg-sky-500 p-2">{template?.name}</div>

                {template?.exercises.map(
                    (exercise) => {
                        return (
                            <div className="py-1 border border-black">{exercise.name}</div>
                            <Exercise/>
                        )
                    })}

                    
        </div >
        </>
    );
}

export default TrackWorkout;