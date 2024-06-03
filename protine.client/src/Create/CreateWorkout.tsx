import { useState, useEffect } from 'react';
export default function CreateWorkout() {
    const [submitAlert, setSubmitAlert] = useState(false);
    const [exerciseCount, setExerciseCount] = useState(1);
    const [exerciseNames, setExerciseNames] = useState(['']);

    const handleExerciseAdd = () => {
        setExerciseCount(prevCount => prevCount + 1);
        setExerciseNames(prevNames => [...prevNames, '']);
    };

    const handleExerciseRemove = (indexToRemove: number) => {
        if (exerciseCount === 1) {
            return;
        }

        setExerciseCount(prevCount => prevCount - 1);
        setExerciseNames(prevNames => prevNames.filter((_, index) => index !== indexToRemove)); 
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        let correctedExercisesFormat = [];

        exerciseNames.forEach((x) => {

            let newObj = {
                "id": null,
                "name": x,
                "templateId": null
            }

            correctedExercisesFormat.push(newObj);
        })

        const correctFormat = JSON.stringify({
            id:null,
            name: formData.get('name'),
            exercises: correctedExercisesFormat
        });        

        //console.log(correctFormat);
        //return;
        

        fetch('https://localhost:7012/workout/create-template', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: correctFormat
        })
            .then(() => setSubmitAlert(true))
            .catch(error => {
                console.error("Error", error);
            });
    };

    const handleExerciseNameChange = (index: number, value: string) => {
        const newExerciseNames = [...exerciseNames];
        newExerciseNames[index] = value;
        setExerciseNames(newExerciseNames);
    };

    return (
        <>
            <div className="rounded-md border-2 border-sky-300 shadow-xl m-10 w-1/3">
                <div className="bg-sky-200 p-2 text-lg font-medium">
                    Create new workout: <br />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="font-bold" htmlFor="name">Name</label>
                        <br />
                        <input
                            className="bg-white border"
                            type="text"
                            id="name"
                            name="name"
                            required
                        />
                    </div>

                    {exerciseNames.map((exerciseName, index) => (
                        <div key={index}>
                            <label className="font-bold" htmlFor={`exercise-${index}`}>Exercise {index + 1}</label>
                            <br />
                            <input
                                className="bg-white border"
                                type="text"
                                id={`exercise-${index}`}
                                name={`exercise-${index}`}
                                value={exerciseName}
                                onChange={(e) => handleExerciseNameChange(index, e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => handleExerciseRemove(index)}
                                className="bg-sky-200 font-semibold border-2 border-sky-400 px-2 rounded-md hover:bg-sky-300 m-1 text-md"
                            >
                                -
                            </button>
                            <br />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleExerciseAdd}
                        className="bg-sky-200 font-semibold border-2 border-sky-400 px-1 rounded-md hover:bg-sky-300 m-1 text-lg"
                    >
                        +
                    </button>
                    <br />
                    <button
                        className="bg-sky-200 font-semibold border-2 border-sky-400 p-1 rounded-md hover:bg-sky-300 m-1"
                        type="submit"
                    >
                        Create
                    </button>
                </form>
            </div>
            {submitAlert && <div>New workout created.</div>}
        </>
    );
}
