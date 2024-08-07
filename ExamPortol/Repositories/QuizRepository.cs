using ExamPortol.Data;
using ExamPortol.Models;

namespace ExamPortol.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly DataContext _context;

        public QuizRepository(DataContext context)
        {
            _context = context;
        }

        public Quiz Save(Quiz quiz)
        {
            if (quiz.QuizId == 0)
            {
                _context.Quizzes.Add(quiz);
            }
            else
            {
                _context.Quizzes.Update(quiz);
            }
            _context.SaveChanges();
            return quiz;
        }

        public List<Quiz> FindAll()
        {
            return _context.Quizzes.ToList();
        }

        public Quiz FindById(long quizId)
        {
            return _context.Quizzes.Find(quizId);
        }

        public void Delete(long quizId)
        {
            var quiz = _context.Quizzes.Find(quizId);
            if (quiz != null)
            {
                _context.Quizzes.Remove(quiz);
                _context.SaveChanges();
            }
        }

        public List<Quiz> FindByCategory(Category category)
        {
            return _context.Quizzes.Where(q => q.CategoryId == category.CatId).ToList();
        }
    }
}
