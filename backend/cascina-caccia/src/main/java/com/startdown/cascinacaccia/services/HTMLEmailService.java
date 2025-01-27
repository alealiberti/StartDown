package com.startdown.cascinacaccia.services;

import com.startdown.cascinacaccia.entities.Information;
import com.startdown.cascinacaccia.entities.Reservation;
import com.startdown.cascinacaccia.exceptions.EmailSendException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.time.format.DateTimeFormatter;

// The EmailService class provides the methods to send emails to someone or to the admins
@Service
public class HTMLEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    private final File header = new File("src/main/resources/email-templates/header.html");
    private final File footer = new File("src/main/resources/email-templates/footer.html");

    /**
     * Sends an email to the person given to confirm their request (information or reservation) has gone alright,
     * throws an exception if something went wrong
     *
     * @param to the email of the person to send the email to
     * @param request the object containing the Information or Reservation request
     */
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
                body += "<p>Ciao " + information.getName() + ",</p>" +
		                "<p>Abbiamo ricevuto la tua richiesta di informazioni presso Cascina Caccia!</p>";
            } else if (request instanceof Reservation reservation) {
                subject += "prenotazione ricevuta";
                path += "reservation-user.html";
                body += "<p>Ciao " + reservation.getName() + ",</p>" +
                        "<p>Grazie per aver effettuato una prenotazione presso Cascina Caccia! " +
                        "Ecco un breve riepilogo delle informazioni che ci hai fornito:</p>" +
                        "<ul class=\"booking-details\">" +
                        "<li>Nome: " + reservation.getName() + "</li>" +
                        "<li>Cognome: " + reservation.getSurname() + "</li>" +
                        "<li>Tipo di visita: " + reservation.getTypeGroup() + "</li>" +
                        "<li>Data della visita: " + reservation.getDateStart().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "</li>" +
                        "</ul>";
            } else {
                throw new IllegalArgumentException("Invalid request");
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

    /**
     * Sends a notification email to all the admins about a new request (information or reservation),
     * throws an exception if something went wrong
     *
     * @param request the object containing the Information or Reservation request
     */
    public void sendEmailToAdmins(Object request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            String path = "src/main/resources/email-templates/body/";

            String subject = "Avviso richiesta di ";
            String body = Files.readString(header.toPath());

            String[] to = userService.getEmails();

            if(request instanceof Information information) {
                subject += "informazioni";
                path += "information-admin.html";
                File bodyFile = new File(path);
                body += Files.readString(bodyFile.toPath());
                body += "<ul class=\"request-details\">\n" +
                        "  <li>Nome: " + information.getName() + "</li>\n" +
                        "  <li>Cognome: " + information.getSurname() + "</li>\n" +
                        "  <li>Messaggio: " + information.getText() + "</li>\n" +
                        "</ul>";

            } else if (request instanceof Reservation reservation) {
                subject += "prenotazione";
                path += "reservation-admin.html";
                File bodyFile = new File(path);
                body += Files.readString(bodyFile.toPath());
                body += "<ul class=\"request-details\">\n" +
                        "  <li>Nome: " + reservation.getName() + "</li>\n" +
                        "  <li>Cognome: " + reservation.getSurname() + "</li>\n" +
                        "  <li>Tipo di visita: " + reservation.getTypeGroup() + "</li>\n" +
                        "<li>Data della visita: " + reservation.getDateStart().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "</li>" +
                        "</ul>";
            } else {
                throw new IllegalArgumentException("Invalid request");
            }

            body += Files.readString(footer.toPath());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new EmailSendException("Errore durante l'invio dell'email: " + e.getMessage());
        }
    }

    /**
     * Sends confirmation email to the user and the notification emails to the admins
     *
     * @param to the email of the person to send the email to
     * @param request the object containing the Information or Reservation request
     */
    public void sendEmails(String to, Object request) {
        sendEmailConfirm(to, request);
        sendEmailToAdmins(request);
    }

}
