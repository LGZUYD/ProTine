import { useState } from 'react';
function CreateWorkout() {
    const [submitAlert, setSubmitAlert] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch('https://localhost:7012/workout/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(({ name: formData.get('name') }))
        })
            .then(() => setSubmitAlert(true))
            .catch(error => {
                console.error("Error", error)
            })
    }


    return (
        <>
            <div className="border-red">
                Create new workout: <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>

            </div>
            {submitAlert &&
                <div>New workout created.</div>}
        </>


    );
}

export default CreateWorkout;