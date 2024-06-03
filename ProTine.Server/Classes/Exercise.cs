namespace ProTine.Server.Classes
{
    public class Exercise
    {
        public int id { get; set; }
        public string Name { get; set; }
        public List<int>? Weight { get; set; }
        public List<int> Sets { get; set; }
        public List<int> Reps { get; set; }
        public int? WorkoutId { get; set; }

        public Exercise() { }

        public Exercise(string name)
        {
            Name = name;
        }
        public Exercise(int id, string name, List<int>? weight, List<int> sets, List<int> reps)
        {
            this.id = id;
            Name = name;
            Weight = weight;
            Sets = sets;
            Reps = reps;
        }

    }
}
