
import { ReservationFormData } from "../model/reservation-forming.model";

/**
 * Sends a reservation request to the server.
 * @param formData - The reservation data to be sent to the server.
 * @returns A promise that resolves when the reservation is successfully created.
 */
const createReservation = async (formData: ReservationFormData): Promise<void> => {
    try {
        // Send a POST request to the server with the reservation data
        const response = await fetch('http://localhost:8080/cascina-caccia/reservations/create-reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Convert formData to JSON string
            body: JSON.stringify(formData),
        });
        
        // Check if the response is successful
        if (response.ok) {
            // Parse the response data as JSON
            const data = await response.json();
            console.log('Success:', data);
            alert('Prenotazione inviata con successo!');
        } else {
            // Parse the error response as JSON
            const error = await response.json();
            console.error('Error:', error);
            alert(`Errore: ${error.message}`);
        }
    } catch (error) {
        // Log any network or server errors
        console.error('Errore durante la richiesta:', error);
        alert('Si è verificato un errore durante l\'invio della prenotazione.');
    }
};

// Attach the event listener
document.getElementById('submitButton')?.addEventListener('click', (event) => {
    event.preventDefault();
    
    const formData: ReservationFormData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        surname: (document.getElementById('surname') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        dateStart: (document.getElementById('dateStart') as HTMLInputElement).value,
        dateFinish: (document.getElementById('dateFinish') as HTMLInputElement).value,
        hourStart: (document.getElementById('hourStart') as HTMLInputElement).value,
        hourFinish: (document.getElementById('hourFinish') as HTMLInputElement).value,
        typeGroup: (document.getElementById('typeGroup') as HTMLInputElement).value,
        visitors: parseInt((document.getElementById('visitors') as HTMLInputElement).value, 10),
        companions: parseInt((document.getElementById('companions') as HTMLInputElement).value, 10),
        additionalInfo: (document.getElementById('additionallinfo') as HTMLInputElement).value,
        mobilityProblems: (document.getElementById('mobilityProblems') as HTMLInputElement).checked,
    };
    
    createReservation(formData);
});