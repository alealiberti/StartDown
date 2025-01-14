document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault(); 

    const formData = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        dateStart: document.getElementById('dateStart').value,
        dateFinish: document.getElementById('dateFinish').value,
        hourStart: document.getElementById('hourStart').value,
        hourFinish: document.getElementById('hourFinish').value,
        typeGroup: document.getElementById('typeGroup').value,
        visitors: parseInt(document.getElementById('visitors').value),
        companions: parseInt(document.getElementById('companions').value),
        additionalInfo: document.getElementById('additionallinfo').value,
        mobilityProblems: document.getElementById('mobilityProblems').checked
    };

    fetch('http://localhost:8080/cascina-caccia/reservations/create-reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);

    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
