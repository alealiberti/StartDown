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
     * Sends an email to the person given to confirm their request (information or reservation) or has gone alright,
     * throws an exception if something went wrong
     *
     * @param to the email of the person to send the email to
     * @param isInformation if the request is an information request or a reservation request
     */
    public void sendEmailConfirm(String to, boolean isInformation) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            String subject = "Conferma richiesta di ";
            String body = "Abbiamo ricevuto la tua richiesta di ";

            if(isInformation) {
                subject += "informazioni ricevuta";
                body += " informazioni";
            } else {
                subject += "prenotazione ricevuta";
                body += "prenotazione";
            }
            body += ", ti preghiamo di attendere una risposta." +
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
     * Sends a notification email to all the admins about a new request (information or reservation),
     * throws an exception if something went wrong
     *
     * @param isInformation if the request is an information request or a reservation request
     */
    public void sendEmailToAdmins(boolean isInformation) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            String[] to = userService.getEmails();
            String subject = "Avviso richiesta di ";
            String body = "È stata ricevuta una nuova richiesta di ";

            if(isInformation) {
                subject += "informazioni";
                body += "informazioni.";
            } else {
                subject += "prenotazione";
                body += "prenotazione.";
            }
            body += "\n\nQuesta è una mail generata automaticamente, non rispondere.";

            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);

        } catch (Exception e) {
            throw new EmailSendException("Errore durante l'invio dell'email: " + e.getMessage());
        }
    }

    /**
     * Sends confirmation email to the user and the notification emails to the admins
     *
     * @param to the email of the person to send the email to
     * @param isInformation if the request is an information request or a reservation request
     */
    public void sendEmails(String to, boolean isInformation) {
        sendEmailConfirm(to, isInformation);
        sendEmailToAdmins(isInformation);
    }
}
