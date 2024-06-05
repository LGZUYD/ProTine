type ExerciseProps = {
    id: number,
    name: string,

}

function Exercise(exercise:ExerciseProps) {
  return (
      <>
          <div className="border-b-2 p-1">              
             + {exercise.name}
          </div>
      </>
  );
}

export default Exercise;