using ExamPortol.Models;

namespace ExamPortol.Repositories
{
    public interface IQuizRepository
    {
        Quiz Save(Quiz quiz);
        List<Quiz> FindAll();
        Quiz FindById(long quizId);
        void Delete(long quizId);
        List<Quiz> FindByCategory(Category category);
    }
}
