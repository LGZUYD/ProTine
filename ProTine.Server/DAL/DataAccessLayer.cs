using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ProTine.Server.Classes;
using System.Data.SqlClient;
using System.Runtime.InteropServices;
using System.Xml.Linq;

namespace ProTine.Server.DAL
{
    public class DataAccessLayer
    {
        readonly static public string connString = "Data Source=LUCAS;Initial Catalog=ProTine;Integrated Security=True;Connect Timeout=30;Encrypt=False;";

        public class WorkoutDAL()
        {
            private List<Workout> allWorkouts = new List<Workout>();
            public void CreateWorkout(Workout workout)
            {
                using (var connection = new SqlConnection(connString))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "INSERT INTO Workout (Name) VALUES (@Name)";
                        command.Parameters.AddWithValue("@Name", workout.Name);
                        command.ExecuteNonQuery();
                    }
                }
            }
            public List<Workout> GetWorkouts()
            {
                allWorkouts.Clear();
                ExerciseDAL exerciseDAL = new ExerciseDAL();

                using (SqlConnection connection = new SqlConnection(connString))
                {
                    connection.Open();

                    string query = "Select * from [Workout]";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int id = reader.GetInt32(0);
                                string name = reader.GetString(1);
                                List<Exercise> exercises = exerciseDAL.GetExercisesByWorkoutId(id);

                                Workout workoutToAdd = new Workout(id, name, exercises);
                                allWorkouts.Add(workoutToAdd);
                            }
                        }
                    }
                }
                return allWorkouts;
            }
            
        }

        public class ExerciseDAL()
        {
            public void CreateExercise(Exercise exercise)
            {
                using (var connection = new SqlConnection(connString))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = "INSERT INTO Exercise (name, workoutId) VALUES (@name, @WorkoutId)";
                        command.Parameters.AddWithValue("@name", exercise.Name);
                        command.Parameters.AddWithValue("@workoutId", exercise.WorkoutId);
                        command.ExecuteNonQuery();
                    }
                }
            }

            public List<Exercise> GetExercisesByWorkoutId(int workoutId)
            {
                List<Exercise> exercises = new List<Exercise>();

                using (SqlConnection connection = new SqlConnection(connString))
                {
                    connection.Open();

                    string query = "Select * from [Exercise] where workoutId = @workoutId;";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@workoutId", workoutId);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                //int id = reader.GetInt32(0);
                                string name = reader.GetString(1);
                                Exercise exercise = new Exercise(name);

                                exercises.Add(exercise);                                                                              
                            }
                        }
                    }
                }
                return exercises;
            }

        }



    }
}
