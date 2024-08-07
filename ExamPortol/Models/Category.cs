using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamPortol.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long CatId { get; set; }
        [Required]
        public string? Description { get; set; }
        [Required]
        public string? Title { get; set; }


       public virtual ICollection<Quiz> Quizes { get; set; } = new List<Quiz>();
    }
}
