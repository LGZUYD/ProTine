using Microsoft.AspNetCore.Mvc;
using ProTine.Server.Classes;
using static ProTine.Server.DAL.DataAccessLayer;

namespace ProTine.Server.Controllers
{
    public class WorkoutTemplateController : Controller
    {

        [HttpPost]
        [Route("/workout/create-template")]
        public IActionResult CreateTemplate([FromBody] WorkoutTemplate template)
        {
            //if (template == null)
            //{
            //    System.Diagnostics.Debug.WriteLine("Template is null");
            //    return BadRequest("Template is null");
            //}

            //if (string.IsNullOrEmpty(template.Name))
            //{
            //    System.Diagnostics.Debug.WriteLine("Template Name is null or empty");
            //    return BadRequest("Template Name is null or empty");
            //}

            //if (template.Exercises == null || !template.Exercises.Any())
            //{
            //    System.Diagnostics.Debug.WriteLine("Exercises list is null or empty");
            //    return BadRequest("Exercises list is null or empty");
            //}

            System.Diagnostics.Debug.WriteLine($"Template Name: {template.Name}");
            System.Diagnostics.Debug.WriteLine($"Template Exercises: {string.Join(", ", template.Exercises.Select(e => e.Name))}");
            
            WorkoutTemplateDAL templateDAL = new WorkoutTemplateDAL();
            templateDAL.CreateWorkoutTemplate(template);
            return Ok();
        }

        [HttpGet]
        [Route("/workout/get-templates")]
        public IActionResult GetTemplates()
        {
            WorkoutTemplateDAL templateDAL = new WorkoutTemplateDAL();
            return Ok(templateDAL.GetWorkoutTemplates());
            
        }
    }
}
