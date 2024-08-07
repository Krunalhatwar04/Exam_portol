using ExamPortol.Data;
using ExamPortol.Models;
using ExamPortol.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ExamPortol.Services
{
    public class QuizServiceImpl : IQuizService
    {
        private readonly DataContext _context;

        public QuizServiceImpl(DataContext context)
        {
            _context = context;
        }

        public Quiz AddQuiz(Quiz quiz)
        {
            if (_context.Categories.Any(c => c.CatId == quiz.CategoryId))
            {
                _context.Quizzes.Add(quiz);
                _context.SaveChanges();
                return quiz;
            }
            return null;
        }

        public List<Quiz> GetQuizzes()
        {
            return _context.Quizzes.Include(q => q.Category).ToList();
        }

        public Quiz GetQuiz(long quizId)
        {
            return _context.Quizzes.Include(q => q.Category).FirstOrDefault(q => q.QuizId == quizId);
        }

        public Quiz UpdateQuiz(Quiz quiz)
        {
            if (_context.Categories.Any(c => c.CatId == quiz.CategoryId))
            {
                _context.Quizzes.Update(quiz);
                _context.SaveChanges();
                return quiz;
            }
            return null;
        }

        public void DeleteQuiz(long quizId)
        {
            var quiz = _context.Quizzes.Find(quizId);
            if (quiz != null)
            {
                _context.Quizzes.Remove(quiz);
                _context.SaveChanges();
            }
        }

        public List<Quiz> GetQuizByCategory(long categoryId)
        {
            return _context.Quizzes.Include(q => q.Category).Where(q => q.CategoryId == categoryId).ToList();
        }

    }
}
