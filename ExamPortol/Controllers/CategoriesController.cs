using ExamPortol.Models;
using ExamPortol.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPortol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CategoryDto categoryDto)
        {
            var category = await _categoryService.AddCategory(categoryDto);
            return Ok(category);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetCategories();
            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetCategory(long categoryId)
        {
            var category = await _categoryService.GetCategory(categoryId);
            return Ok(category);
        }

        [HttpPut("{categoryId}")]
        public async Task<IActionResult> UpdateCategory(long categoryId, [FromBody] CategoryDto categoryDto)
        {
            var updatedCategory = await _categoryService.UpdateCategory(categoryId, categoryDto);
            if (updatedCategory != null)
            {
                return Ok(updatedCategory);
            }

            return BadRequest($"Category with id: {categoryId} doesn't exist");
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(long categoryId)
        {
            await _categoryService.DeleteCategory(categoryId);
            return Ok(true);
        }
    }
}
