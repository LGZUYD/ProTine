namespace ProTine.Server.Classes
{
    public class Routine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Workout> Workouts { get; set; }

        public Routine() { }

        public Routine(int id, string name, List<Workout> workouts)
        {
            Id = id;
            Name = name;
            Workouts = workouts;
        }



    }
}
