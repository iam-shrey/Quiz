package com.telusko.question_service.controller;

import com.telusko.question_service.model.Question;
import com.telusko.question_service.model.QuestionWrapper;
import com.telusko.question_service.model.Response;
import com.telusko.question_service.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question") //it sets a base URL
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    //used to check which instance of question_service is used by the quiz_service //see getQuestionsForQuiz method.....
    @Autowired
    Environment environment;

    // Endpoint is available at /question/allQuestions
    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category){
        return questionService.getQuestionsByCategory(category);
    }

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

    @GetMapping("generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String category, @RequestParam int numQ){
        System.out.println(environment.getProperty("local.server.port"));
        return questionService.getQuestionsForQuiz(category,numQ);
    }

    @PostMapping("getQuestions")
    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer> questionIds){
        return questionService.getQuestionsFromId(questionIds);
    }

    @PostMapping("getMaxScore")
    public ResponseEntity<Integer> getMaxScore(@RequestBody List<QuestionWrapper> questions){
        return questionService.getMaxScore(questions);
    }

    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses){
        return questionService.getScore(responses);
    }
}
