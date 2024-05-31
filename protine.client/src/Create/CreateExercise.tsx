interface CreateExerciseProps {
    workoutId: number;
    open: boolean;
    onClose: () => void;
}

function CreateExercise({ workoutId, open, onClose }: CreateExerciseProps) {
    if (!open) return null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const exerciseData = {
            name: formData.get('name'),
            workoutId: workoutId
        }

        fetch('https://localhost:7012/exercise/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exerciseData)

        })        
    }

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center visible bg-black/20" >
                <div className="relative border shadow-2xl rounded-md bg-cyan-100 w-96 h-96" onClick={(e) => e.stopPropagation}>
                    <button className="border border-black rounded-md bg-white absolute top-2 right-2 font-semibold px-2" onClick={onClose}>X</button>

                    <form onSubmit={handleSubmit}>
                        <label className="m-1">
                            Name:<br/>
                            <input type="text" name="name" className="bg-white m-1" />
                        </label>
                        <br />
                        <button className="bg-white p-1 m-1 rounded-md" type="submit">Create</button>
                    </form>

                </div>
            </div>
        </>
    );
}

export default CreateExercise;