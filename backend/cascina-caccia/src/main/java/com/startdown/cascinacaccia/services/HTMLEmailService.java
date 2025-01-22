package com.startdown.cascinacaccia.services;


import com.startdown.cascinacaccia.entities.Information;
import com.startdown.cascinacaccia.entities.Reservation;
import com.startdown.cascinacaccia.exceptions.EmailSendException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class HTMLEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    private File header = new File("src/main/resources/email-templates/header.html");
    private File footer = new File("src/main/resources/email-templates/footer.html");

    public void sendEmailConfirm(String to, Object request){
        try{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String path = "src/main/resources/email-templates/body/";

            String subject = "Conferma richiesta di ";
            String body = Files.readString(header.toPath());

            if (request instanceof Information information) {
                subject += "informazioni ricevuta";
                path += "information-user.html";
                body += "<p>Ciao " + information.getName() + ",</p>";
            } else {
                subject += "prenotazione ricevuta";
                path += "reservation-user.html";
                Reservation reservation = (Reservation) request;
                body += "<p>Ciao " + reservation.getName() + ",</p>" +
                        "<p>Grazie per aver effettuato una prenotazione presso Cascina Caccia! " +
                        "Ecco un breve riepilogo delle informazioni che ci hai fornito:</p>" +
                        "<ul class=\"booking-details\">" +
                        "<li>Nome: " + reservation.getName() + "</li>" +
                        "<li>Cognome " + reservation.getSurname() + "</li>" +
                        "<li>Tipo di visita: " + reservation.getTypeGroup() + "</li>" +
                        "</ul>";
            }

            File bodyFile = new File(path);
            body += Files.readString(bodyFile.toPath());

            body += Files.readString(footer.toPath());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
        } catch (Exception e){
            throw new EmailSendException(e.getMessage());
        }
    }





    public void sendEmails(String to, Object request) {
        sendEmailConfirm(to, request);
//        sendEmailToAdmins();
    }
}
