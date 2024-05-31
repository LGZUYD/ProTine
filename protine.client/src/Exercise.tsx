type ExerciseProps = {
    id: number,
    name: string,

}

function Exercise(exercise:ExerciseProps) {
  return (
      <>
          <div>              
              {exercise.name}
          </div>
      </>
  );
}

export default Exercise;