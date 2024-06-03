namespace ProTine.Server.Classes
{
    public class ExerciseTemplate
    {
        public int? id { get; set; }
        public string Name { get; set; }     
        public int? TemplateId { get; set; }

        public ExerciseTemplate() { }

        public ExerciseTemplate(string name, int templateId)
        {
            Name = name;
            TemplateId = templateId;
        }
        public ExerciseTemplate(string name)
        {
            Name = name;            
        }
    }
}
