package com.telusko.question_service.service;

import com.telusko.question_service.dao.QuestionDao;
import com.telusko.question_service.model.Question;
import com.telusko.question_service.model.QuestionWrapper;
import com.telusko.question_service.model.Response;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            return new ResponseEntity<>(questionDao.findAll(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Question>> getQuestionsByCategory(String category) {
        try {
            return new ResponseEntity<>(questionDao.findByCategory(category),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);

    }

    public ResponseEntity<String> addQuestion(Question question) {
        try {
            questionDao.save(question);
            return new ResponseEntity<>("success",HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("failure",HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<List<Integer>> getQuestionsForQuiz(String category, int numQ) {
        List<Integer> questions = questionDao.findRandomQuestionsByCategory(category, numQ);
        return new ResponseEntity<>(questions,HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(List<Integer> questionIds) {
        List<QuestionWrapper> wrappers= new ArrayList<>();
        List<Question> questions = new ArrayList<>();
        for(Integer id:questionIds)
            questions.add(questionDao.findById(id).get());
        for(Question question : questions)
            wrappers.add(new QuestionWrapper(question.getId(),question.getQuestionTitle(),question.getOption1(),question.getOption2(),question.getOption3(),question.getOption4(), question.getDifficultylevel()));
        return new ResponseEntity<>(wrappers,HttpStatus.OK);
    }



    public ResponseEntity<Integer> getScore(List<Response> responses) {
        int score=0;
        for(Response response:responses){
            Question question = questionDao.findById(response.getId()).get();
            if(response.getResponse().equals(question.getRightAnswer())){
                if(question.getDifficultylevel().equals("Easy")){
                    score+=1;
                }
                else if(question.getDifficultylevel().equals("Medium")){
                    score+=2;
                }
                else{
                    score+=3;
                }
            }
        }
        return new ResponseEntity<>(score, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getMaxScore(List<QuestionWrapper> qw){
        int score=0;
        for(QuestionWrapper questionW:qw) {
            Question question = questionDao.findById(questionW.getId()).get();
            if (question.getDifficultylevel().equals("Easy")) {
                score += 1;
            } else if (question.getDifficultylevel().equals("Medium")) {
                score += 2;
            } else {
                score += 3;
            }
        }
        return new ResponseEntity<>(score, HttpStatus.OK);
    }
}
