using System.ComponentModel.DataAnnotations;

namespace ExamPortol.Models
{
    public class QuizDto
    {
      
        public string Title { get; set; }

       
        public string Description { get; set; }
       
     

        public long CategoryId { get; set; }
    }
}
