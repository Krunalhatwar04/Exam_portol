using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamPortol.Models
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long QuesId { get; set; }

        [Required]
        public string? Answer { get; set; }
          
        [Required]
        public string? Question1 { get; set; }

        [Required]
        public string? Image { get; set; }

        [Required]
        public string? Option1 { get; set; }

        [Required]
        public string? Option2 { get; set; }

         [Required]
        public string? Option3 { get; set; }

        [Required]
        public string? Option4 { get; set; }

         [Required]
        public long? QuizQuizId { get; set; }

        [ForeignKey("Quiz")]
        public long? QuizId { get; set; }

        public virtual Quiz? Quiz { get; set; }
    }
}
