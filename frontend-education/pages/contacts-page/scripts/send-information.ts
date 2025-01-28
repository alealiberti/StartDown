import { InformationPayload } from '../model/model.form';

/**
 * Sends information data to the server via a POST request.
 * 
 * @function sendInformation
 * @param {InformationPayload} payload - The data to be sent to the server. Includes user details such as name, surname, email, phone, and message.
 * @returns {Promise<void>} A promise that resolves when the data is successfully sent or rejects in case of an error.
 * 
 * @example
 * const payload: InformationPayload = {
 *   name: "John",
 *   surname: "Doe",
 *   phone: "123456789",
 *   email: "john.doe@example.com",
 *   text: "This is a message."
 * };
 * 
 * sendInformation(payload).then(() => {
 *   console.log('Data sent successfully!');
 * }).catch((error) => {
 *   console.error('Error:', error);
 * });
 */
const sendInformation = async (payload: InformationPayload): Promise<void> => {
  try {
    // Send a POST request to the server with the payload
    const response = await fetch('http://localhost:8080/cascina-caccia/informations/create-information', {
      method: 'POST',
      headers: {
        // Set the Content-Type header to application/json
        'Content-Type': 'application/json',
      },
      // JSON.stringify the payload to send it as a JSON object
      body: JSON.stringify(payload),
    });
    
    // Check if the response was successful
    if (response.ok) {
      // Show an alert if the response was successful
      alert('Richiesta inviata con successo!');
    } else {
      // Show an alert with the error message if the response was not successful
      const error = await response.json();
      alert(`Errore: ${error.message}`);
    }
  } catch (error) {
    // Log the error to the console
    console.error('Errore durante l\'invio', error);
    // Show an alert if there was an error
    alert('Si è verificato un errore durante l\'invio dei dati.');
  }
};

// Attach the click event listener
document.getElementById('submitButton')?.addEventListener('click', () => {
  const nome = (document.getElementById('name') as HTMLInputElement).value;
  const cognome = (document.getElementById('surname') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const telefono = (document.getElementById('phone') as HTMLInputElement).value;
  const messaggio = (document.getElementById('text') as HTMLInputElement).value;
  
  console.log({ nome, cognome, email, telefono, messaggio });
  
  const payload: InformationPayload = {
    name: nome,
    surname: cognome,
    phone: telefono || "",
    email: email,
    text: messaggio,
  };
  
  sendInformation(payload);
});