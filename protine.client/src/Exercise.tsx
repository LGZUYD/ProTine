import { useState } from 'react';

function Exercise({ name, exerciseIndex, onExerciseChange }) {
    const [weight, setWeight] = useState<number | ''>('');
    const [results, setResults] = useState<number[]>([""]);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWeight = parseInt(e.target.value, 10) || 0;
        setWeight(newWeight);
        onExerciseChange(exerciseIndex, { weight: newWeight, results });
    };

    const handleResultChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newResults = [...results];
        newResults[index] = parseInt(e.target.value, 10) || 0;
        setResults(newResults);
        onExerciseChange(exerciseIndex, { weight, results: newResults });
    };

    const addResultField = () => {
        setResults([...results, ""]);
    };

    const removeResultField = () => {
        if (results.length > 0) {
            results.pop();
            setResults([...results]);
        }
    };

    return (
        <>
            <div className="border">
                <div className="font-bold px-3">{name}</div>
                <div>
                    <input
                        name={`weight-${exerciseIndex}`}
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className="px-1 w-14 m-3 bg-sky-100 text-lg border border-black rounded-md"
                    /> kg x
                    {results.map((result, index) => (
                        <>
                            <input
                                key={index}
                                name={`result-${exerciseIndex}-${index}`}
                                value={result}
                                onChange={(e) => handleResultChange(e, index)}
                                type="number"
                                className="w-10 m-1 bg-sky-100 border border-black rounded-md"
                            />
                            {results[index + 1] != results[-1] && <>+</>}

                        </>
                    ))}
                    <button className="text-md px-1.5 m-1 border border-black rounded-xl hover:bg-sky-100" type="button" onClick={addResultField}>+</button>
                    <button className="text-md px-2 m-1 border border-black rounded-xl hover:bg-sky-100" type="button" onClick={removeResultField}>-</button>
                </div>
            </div>
        </>
    );
}

export default Exercise;
