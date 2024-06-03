using Microsoft.AspNetCore.Mvc;

namespace ProTine.Server.Controllers
{
    public class RoutineController : ControllerBase
    {
        public IActionResult Index()
        {

            return Ok();
        }
    }
}
