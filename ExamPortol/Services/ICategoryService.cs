using ExamPortol.Models;

namespace ExamPortol.Services
{
    public interface ICategoryService
    {
        Task<Category> AddCategory(CategoryDto categoryDto);
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(long catId);
        Task<Category> UpdateCategory(long catId, CategoryDto categoryDto);
        Task DeleteCategory(long categoryId);
    }
}
