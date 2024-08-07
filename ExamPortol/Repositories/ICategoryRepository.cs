
using ExamPortol.Models;
using System.Threading.Tasks;
namespace ExamPortol.Repositories
{
    public interface ICategoryRepository
    {
        Task<Category> AddCategory(Category category);
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(long catId);
        Task<Category> UpdateCategory(Category category);
        Task DeleteCategory(long categoryId);
    }
}
