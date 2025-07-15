package org.example.emailsenderbackend.Service;

import org.example.emailsenderbackend.Model.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

//    public void sendPrankEmails(EmailRequest request) {
//        for (String to : request.getRecipients()) {
//            for (int i = 0; i < request.getRepeat(); i++) {
//                SimpleMailMessage message = new SimpleMailMessage();
//                message.setTo(to);
//                message.setSubject(request.getSubject());
//                message.setText(request.getMessage());
//                message.setFrom("your_email@gmail.com");
//
//                mailSender.send(message);
//                System.out.println("Sent to: " + to + " [" + (i+1) + "/" + request.getRepeat() + "]");
//            }
//        }
//    }

    public void sendPrankEmails(EmailRequest request) {
        for (String to : request.getRecipients()) {
            for (int i = 0; i < request.getRepeat(); i++) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(to);
                message.setSubject(request.getSubject());
                message.setText(request.getMessage());
                message.setFrom("abyz5671@gmail.com"); // Must match your SMTP config

                mailSender.send(message); // <-- This was failing before
            }
        }
    }
}
