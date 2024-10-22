package com.telusko.quizservice.controller;

import com.telusko.quizservice.model.QuestionWrapper;
import com.telusko.quizservice.model.Quiz;
import com.telusko.quizservice.model.QuizDto;
import com.telusko.quizservice.model.Response;
import com.telusko.quizservice.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
//@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin
public class QuizController {

    @Autowired
    QuizService quizService;

    @GetMapping("{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Integer id) {
        return quizService.getQuizById(id);
    }

    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestBody QuizDto quizDto){
        return quizService.createQuiz(quizDto.getCategoryName(), quizDto.getNumQuestions(), quizDto.getTitle());
    }

    @GetMapping("getQuestions/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("submit")
    public ResponseEntity<Integer> submitAnswer(@RequestBody List<Response> responses){
        return quizService.calculateResult( responses);
    }

    @PostMapping("getMaxScore")
    public ResponseEntity<Integer> getMaxScore(@RequestBody List<QuestionWrapper> qW){
        return quizService.getMaxScore(qW);
    }

}
