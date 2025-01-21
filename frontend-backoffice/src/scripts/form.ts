/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description 
 */



document.querySelector("form")?.addEventListener("submit", async (event) => {

    // prevent the event of the form action
    event.preventDefault();

    // take from the DOM the email && password input at the moment when form is subbmitted
    const usernameInput = (document.querySelector("input.username") as HTMLInputElement).value.trim();
    const passwordInput = (document.querySelector("input.password") as HTMLInputElement).value.trim();

    // block the submit of login fetch POST
    if (!usernameInput || !passwordInput) {
        alert("compila i campi di input!");
        return;
    }

    const submitButton = document.querySelector("button[type='submit']") as HTMLElement;
    submitButton.textContent = "Attendere...";


    try {
        // let's take the inputs of the username and password, and send them into an autoziation
        const credentials = btoa(`${usernameInput}:${passwordInput}`);

        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials}`,
            },
        });

        if (!response.ok) {
            throw new Error("Credenziali inserite errate! riprova!");
        }

        // parse the response data if the fetch it successfully gone
        const responseData = await response.json();
        console.log("Login effettuato con successo:", responseData);

        // save the token into the localStorage of the admin and drop him into the dashboard
        if (responseData.token) {
            localStorage.setItem("authToken", responseData.token);
            window.location.href = "/src/pages/dashboard/index.html";
        }

    } catch (err) {
        console.log(err);
        submitButton.textContent = "Errore!";
    }
});