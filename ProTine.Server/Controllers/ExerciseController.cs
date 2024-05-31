using Microsoft.AspNetCore.Mvc;
using ProTine.Server.Classes;
using static ProTine.Server.DAL.DataAccessLayer;

namespace ProTine.Server.Controllers
{
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        [HttpPost]
        [Route("/exercise/create")]
        public IActionResult CreateExercise([FromBody] Exercise exercise)
        {
            ExerciseDAL exerciseDAL = new ExerciseDAL();
            exerciseDAL.CreateExercise(exercise);
            return Ok("New exercise created.");
        }
    }
}
