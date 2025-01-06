package com.startdown.cascinacaccia.services;

import com.startdown.cascinacaccia.exceptions.EmailSendException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// The EmailService class provides the methods to send emails to someone or to the admins
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserServiceImpl userService;

    /**
     * Sends an email to the person given, throws an exception if something went wrong
     *
     * @param to the email of the person to send the email to
     */
    public void sendEmailConfirm(String to) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            String subject = "Conferma richiesta ricevuta";
            String body = "Abbiamo ricevuto la tua richiesta, ti preghiamo di attendere una risposta." +
                    "\n\nQuesta è una mail generata automaticamente, non rispondere.";

            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            throw new EmailSendException("Errore durante l'invio dell'email: " + e.getMessage());
        }
    }

    /**
     * Sends an email to all the admins, throws an exception if something went wrong
     */
    public void sendEmailToAdmins(){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            String[] to = userService.getEmails();
            String subject = "Avviso ricezione richiesta";
            String body = "È stata ricevuta una nuova richiesta." +
                    "\n\nQuesta è una mail generata automaticamente, non rispondere.";

            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);

        } catch (Exception e) {
            throw new EmailSendException("Errore durante l'invio dell'email: " + e.getMessage());
        }
    }
}
