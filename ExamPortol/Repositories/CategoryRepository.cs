using ExamPortol.Data;
using ExamPortol.Models;
using Microsoft.EntityFrameworkCore;

namespace ExamPortol.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;

        public CategoryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Category> AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> GetCategory(long catId)
        {
            return await _context.Categories.FindAsync(catId);
        }

        public async Task<Category> UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task DeleteCategory(long categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public Task<Category> AddCategory(CategoryDto categoryDto)
        {
            throw new NotImplementedException();
        }

        public Task<Category> UpdateCategory(long catId, CategoryDto categoryDto)
        {
            throw new NotImplementedException();
        }
    }
}
