document.getElementById('submitButton').addEventListener('click', async () => {

    const nome = document.getElementById('name').value;
    const cognome = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('phone').value;
    const messaggio = document.getElementById('text').value;

    const payload = {
        name: nome,
        surname: cognome,
        phone: telefono || "", 
        email: email,
        text: messaggio,
    };

    try {
        const response = await fetch('http://localhost:8080/cascina-caccia/informations/create-information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert('Richiesta inviata con successo!');
        } else {
            const error = await response.json();
            alert(`Errore: ${error.message}`);
        }
    } catch (error) {
        console.error('Errore durante l\'invio:', error);
        alert('Si è verificato un errore durante l\'invio dei dati.');
    }
});