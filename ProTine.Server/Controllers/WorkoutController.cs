using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProTine.Server.Classes;
using static ProTine.Server.DAL.DataAccessLayer;

namespace ProTine.Server.Controllers
{
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        [HttpPost]
        [Route("/workout/create")]
        public IActionResult CreateWorkout([FromBody] Workout workout)
        {
            System.Diagnostics.Debug.WriteLine(workout.Name);
            WorkoutDAL workoutDAL = new WorkoutDAL();
            workoutDAL.CreateWorkout(workout);
            return Ok();
        }

        [HttpGet]
        [Route("/workout/get")]
        public IActionResult GetWorkouts()
        {
            WorkoutDAL workoutDAL = new WorkoutDAL();
            return Ok(workoutDAL.GetWorkouts());
        }

    }

}
