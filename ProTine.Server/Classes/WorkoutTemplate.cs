namespace ProTine.Server.Classes
{
    public class WorkoutTemplate
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public List<ExerciseTemplate>? Exercises { get; set; }        

        public WorkoutTemplate()
        {

        }
        public WorkoutTemplate(int id, string name, List<ExerciseTemplate> exercises)
        {
            Id = id;
            Name = name;
            Exercises = exercises;
        }
        public WorkoutTemplate(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
