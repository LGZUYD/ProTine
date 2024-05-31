namespace ProTine.Server.Classes
{
    public class Exercise
    {

        public int id { get; set; }
        public string Name { get; set; }
        public int? Weight { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public int? WorkoutId { get; set; }

        public Exercise() { }

        public Exercise(string name)
        {
            Name = name;
        }
        public Exercise(int id, string name, int? weight, int sets, int reps)
        {
            this.id = id;
            Name = name;
            Weight = weight;
            Sets = sets;
            Reps = reps;
        }

    }
}
