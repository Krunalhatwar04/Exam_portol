using System.ComponentModel.DataAnnotations;

namespace ExamPortol.Models
{
    public class CategoryDto
    {
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
        
    }
}
