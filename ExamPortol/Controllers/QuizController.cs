using ExamPortol.Models;
using ExamPortol.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPortol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly ICategoryService _categoryService;

        public QuizController(IQuizService quizService, ICategoryService categoryService)
        {
            _quizService = quizService;
            _categoryService = categoryService;
        }

        [HttpPost]
        public IActionResult AddQuiz([FromBody] QuizDto quizDto)
        {
            var quiz = new Quiz
            {
                Title = quizDto.Title,
                Description = quizDto.Description,
                CategoryId = quizDto.CategoryId
            };

            var createdQuiz = _quizService.AddQuiz(quiz);

            if (createdQuiz == null)
            {
                return BadRequest("Invalid CategoryId");
            }

            return CreatedAtAction(nameof(GetQuiz), new { quizId = createdQuiz.QuizId }, createdQuiz);
        }

        [HttpGet]
        public IActionResult GetQuizzes()
        {
            return Ok(_quizService.GetQuizzes());
        }

        [HttpGet("{quizId}")]
        public IActionResult GetQuiz(long quizId)
        {
            var quiz = _quizService.GetQuiz(quizId);
            if (quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
        }

        [HttpGet("byCategory")]
        public IActionResult GetQuizByCategory(long categoryId)
        {
            var quizzes = _quizService.GetQuizByCategory(categoryId);
            if (quizzes == null || quizzes.Count == 0)
            {
                return NotFound();
            }
            return Ok(quizzes);
        }

        [HttpPut("{quizId}")]
        public IActionResult UpdateQuiz(long quizId, [FromBody] QuizDto quizDto)
        {
            var existingQuiz = _quizService.GetQuiz(quizId);
            if (existingQuiz == null)
            {
                return BadRequest("Quiz with id : " + quizId + " doesn't exist");
            }

            existingQuiz.Title = quizDto.Title;
            existingQuiz.Description = quizDto.Description;
            existingQuiz.CategoryId = quizDto.CategoryId;

            var updatedQuiz = _quizService.UpdateQuiz(existingQuiz);

            if (updatedQuiz == null)
            {
                return BadRequest("Invalid CategoryId");
            }

            return Ok(updatedQuiz);
        }

        [HttpDelete("{quizId}")]
        public IActionResult DeleteQuiz(long quizId)
        {
            _quizService.DeleteQuiz(quizId);
            return Ok(true);
        }
    }
}

