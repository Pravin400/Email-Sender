package org.example.emailsenderbackend.Controller;


import org.example.emailsenderbackend.Model.EmailRequest;
import org.example.emailsenderbackend.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*")  // Allow React to connect
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmails(@RequestBody EmailRequest request) {
        emailService.sendPrankEmails(request);
        return "Emails sent successfully!";
    }
}
