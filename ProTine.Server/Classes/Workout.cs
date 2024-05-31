namespace ProTine.Server.Classes
{
    public class Workout
    {      
        public int? Id { get; set; }
        public string Name { get; set; }
        public List<Exercise>? Exercises { get; set; }

        public Workout()
        {

        }
        public Workout(int id, string name, List<Exercise> exercises)
        {
            Id = id;
            Name = name;
            Exercises = exercises;
        }
        public Workout(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
