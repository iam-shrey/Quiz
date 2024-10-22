package com.telusko.quizservice.service;

import com.telusko.quizservice.dao.QuizDao;
import com.telusko.quizservice.feign.QuizInterface;
import com.telusko.quizservice.model.QuestionWrapper;
import com.telusko.quizservice.model.Quiz;
import com.telusko.quizservice.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuizInterface quizInterface;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Integer> questions = quizInterface.getQuestionsForQuiz(category, numQ).getBody();
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionIds(questions);
        quizDao.save(quiz);
        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Quiz quiz = quizDao.findById(id).get();
        return quizInterface.getQuestions(quiz.getQuestionIds());
    }

    public ResponseEntity<Integer> calculateResult( List<Response> responses) {
        return quizInterface.getScore(responses);
    }

    public ResponseEntity<Integer> getMaxScore(List<QuestionWrapper> qW) {
        return quizInterface.getMaxScore(qW);
    }

    public ResponseEntity<Quiz> getQuizById(Integer id) {
        return new ResponseEntity<>(quizDao.findById(id).get(), HttpStatus.OK);
    }
}
