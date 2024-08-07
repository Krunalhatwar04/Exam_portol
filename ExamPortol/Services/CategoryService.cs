using ExamPortol.Models;
using ExamPortol.Repositories;

namespace ExamPortol.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<Category> AddCategory(CategoryDto categoryDto)
        {
            var category = new Category
            {
                Description = categoryDto.Description,
                Title = categoryDto.Title
            };

            return await _categoryRepository.AddCategory(category);
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _categoryRepository.GetCategories();
        }

        public async Task<Category> GetCategory(long catId)
        {
            return await _categoryRepository.GetCategory(catId);
        }

        public async Task<Category> UpdateCategory(long catId, CategoryDto categoryDto)
        {
            var category = await _categoryRepository.GetCategory(catId);
            if (category != null)
            {
                category.Description = categoryDto.Description;
                category.Title = categoryDto.Title;
                return await _categoryRepository.UpdateCategory(category);
            }

            return null;
        }

        public async Task DeleteCategory(long categoryId)
        {
            await _categoryRepository.DeleteCategory(categoryId);
        }
    }
}
