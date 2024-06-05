using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ProTine.Server.Classes;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Xml.Linq;

namespace ProTine.Server.DAL
{
    public class DataAccessLayer
    {
        readonly static public string connString = "Data Source=LUCAS;Initial Catalog=ProTine;Integrated Security=True;Connect Timeout=30;Encrypt=False;";

        public class WorkoutTemplateDAL()
        {
            public void CreateWorkoutTemplate(WorkoutTemplate template)
            {
                using (var connection = new SqlConnection(connString))
                {
                    connection.Open();
                    using (var command = connection.CreateCommand())
                    {
                        command.CommandText = " INSERT INTO WorkoutTemplate(Name) VALUES(@Name); SELECT SCOPE_IDENTITY();";
                        //command.CommandText = "INSERT INTO WorkoutTemplate (Name) VALUES (@Name)";
                        command.Parameters.AddWithValue("@Name", template.Name);
                        //command.ExecuteNonQuery();
                        // hier dan die ExecuteScalar voor id, en dan die exercise uitvoeren
                        object result = command.ExecuteScalar();

                        int templateId;
                        if (result != null && result != DBNull.Value)
                        {
                            templateId = Convert.ToInt32(result);

                            ExerciseTemplateDAL createExerciseTemplateDAL = new ExerciseTemplateDAL();
                            createExerciseTemplateDAL.CreateExerciseTemplate(template.Exercises, templateId);

                            System.Diagnostics.Debug.WriteLine(templateId);
                        }
                        else
                        {
                            System.Diagnostics.Debug.WriteLine(" BOING!!");
                        }


                        // template.Exercises kan null zijn, als lege workout wordt aangemaakt

                        //List<ExerciseTemplate> exerciseTemplates = new List<ExerciseTemplate>();

                        //foreach (string exerciseTemplateName in template.Exercises)
                        //{
                        //    ExerciseTemplate exerciseTemplate = new ExerciseTemplate(exerciseTemplateName, templateId);
                        //    exerciseTemplates.Add(exerciseTemplate);
                        //}
                        // dit is volgens mij overbodig, kan gewoon template.Exercises meegeven aan method en templateId,
                        // hoeft geen nieuwe objecten aan te maken hiervoor

                    }
                }
            }

            public List<WorkoutTemplate> GetWorkoutTemplates()
            {
                List<WorkoutTemplate> allWorkoutTemplates = new List<WorkoutTemplate>();

                ExerciseTemplateDAL exerciseTemplateDAL = new ExerciseTemplateDAL();

                using (SqlConnection connection = new SqlConnection(connString))
                {
                    connection.Open();

                    string query = "Select * from [WorkoutTemplate]";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                int id = reader.GetInt32(0);
                                string name = reader.GetString(1);
                                List<ExerciseTemplate> exercises = exerciseTemplateDAL.GetExercisesByWorkoutTemplateId(id);

                                WorkoutTemplate workoutToAdd = new WorkoutTemplate(id, name, exercises);
                                allWorkoutTemplates.Add(workoutToAdd);
                            }
                        }
                    }
                    return allWorkoutTemplates;
                }
            }

            public WorkoutTemplate GetWorkoutTemplateById(int templateId)
            {
                ExerciseTemplateDAL exerciseTemplateDAL = new ExerciseTemplateDAL();

                using (SqlConnection connection = new SqlConnection(connString))
                {
                    connection.Open();

                    string query = "Select * from [WorkoutTemplate] where id = @templateId;";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@templateId", templateId);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            
                            if (reader.Read())
                            {
                                int id = reader.GetInt32(0);
                                string name = reader.GetString(1);
                                List<ExerciseTemplate> exercises = exerciseTemplateDAL.GetExercisesByWorkoutTemplateId(id);                           
                            
                                return new WorkoutTemplate(id, name, exercises);

                            }
                        }
                    }

                }
                return null;
            }

        }

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

        public class ExerciseTemplateDAL()
        {
            public void CreateExerciseTemplate(List<ExerciseTemplate> templates, int templateId)
            {
                using (var connection = new SqlConnection(connString))
                {
                    connection.Open();
                    foreach (var template in templates)
                    {
                        using (var command = connection.CreateCommand())
                        {
                            command.CommandText = "INSERT INTO ExerciseTemplate (name, templateId) VALUES (@name, @templateId)";
                            command.Parameters.AddWithValue("@name", template.Name);
                            command.Parameters.AddWithValue("@templateId", templateId);
                            command.ExecuteNonQuery();
                        }
                    }
                }
            }

            public List<ExerciseTemplate> GetExercisesByWorkoutTemplateId(int templateId)
            {
                List<ExerciseTemplate> exercises = new List<ExerciseTemplate>();

                using (SqlConnection connection = new SqlConnection(connString))
                {
                    connection.Open();

                    string query = "Select * from [ExerciseTemplate] where templateId = @templateId;";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@templateId", templateId);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                //int id = reader.GetInt32(0);
                                string name = reader.GetString(1);
                                ExerciseTemplate exercise = new ExerciseTemplate(name);

                                exercises.Add(exercise);
                            }
                        }
                    }
                }
                return exercises;
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
