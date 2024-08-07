using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPortol.Models
{
    public class QuizResult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long QuizResId { get; set; }

        [Required]
        public string AttemptDatetime { get; set; }

        [Required]
        public double TotalObtainedMarks { get; set; }

        [ForeignKey("Quiz")]
        public long QuizId { get; set; } // Foreign key to Quiz

        [ForeignKey("User")]
        public long UserId { get; set; } // Foreign key to User

        public virtual Quiz Quiz { get; set; }
        public virtual User User { get; set; }
    }
}
