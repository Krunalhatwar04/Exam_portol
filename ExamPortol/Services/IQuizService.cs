using ExamPortol.Models;
using System.Collections.Generic;

namespace ExamPortol.Services
{
    public interface IQuizService
    {
        Quiz AddQuiz(Quiz quiz);
        List<Quiz> GetQuizzes();
        Quiz GetQuiz(long quizId);
        Quiz UpdateQuiz(Quiz quiz);
        void DeleteQuiz(long quizId);
        List<Quiz> GetQuizByCategory(long categoryId);
    }
}
