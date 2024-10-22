package com.telusko.quizservice.feign;

import com.telusko.quizservice.model.QuestionWrapper;
import com.telusko.quizservice.model.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

//feign automativally handles load balancing b/w the instances of the service used by it, here load balancing is happening b/w 2 instances of question-service(8080 and 8081)
//if one instance is busy it uses another......
@FeignClient("QUESTION-SERVICE") //name is same as given in the spring eureka server...
public interface QuizInterface {
    @GetMapping("question/generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String category, @RequestParam int numQ);

    @PostMapping("question/getQuestions")
    public ResponseEntity<List<QuestionWrapper>> getQuestions(@RequestBody List<Integer> questions);

    @PostMapping("question/getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses);

    @PostMapping("question/getMaxScore")
    public ResponseEntity<Integer> getMaxScore(@RequestBody List<QuestionWrapper> questions);
}
