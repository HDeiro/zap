const submit = document.querySelector("#submit");
const number = document.querySelector("#number");
const country = document.querySelector("#countryCode");
const message = document.querySelector("#message");

number.onkeyup = _ => submit.disabled = number.isInvalid();

// On start
(() => {
    const language = navigator.language || navigator.userLanguage; 

    if(language === "pt-BR") {
        // Language treatment
        countryCode.title = "Código do País";
        number.placeholder = "Telefone (Ex.: 7188888888)";
        number.title = "Telefone (Ex.: 7188888888)";
        message.placeholder = "Mensagem a ser enviada (Max. 225 caracteres)";
        message.title = "Mensagem a ser enviada (Max. 225 caracteres)";
        submit.textContent = "Enviar Mensagem";
        // Number checking for Brazil
        number.maxlength = 11;
        number.minlength = 10;
        number.isInvalid = _ => !/\d{11}|\d{10}/.test(number.value) && country.value === '55';
    } else {
        // Language treatment
        countryCode.title = "Country Code";
        number.placeholder = "Phone number";
        number.title = "Phone number";
        message.placeholder = "Message to be sent (Max 225 characters)";
        message.title = "Message to be sent (Max 225 characters)";
        submit.textContent = "Enviar Mensagem";
        // No number check for other countries
        number.isInvalid = _ => false;
    }

    number.focus();
    number.click();
})();

// Handle pasting of number
number.addEventListener("paste", event => {
    event.stopPropagation();
    event.preventDefault();

    // Get pasted data
    let pasted = event.clipboardData || window.clipboardData;
    number.value = pasted.getData("Text")
        .replace(" ", "")
        .replace("-", "");
});

// Event Handlers
submit.onclick = _ => {
    if(number.isInvalid())
        alert("Número inválido");

    let link = `https://api.whatsapp.com/send?phone=${country.value}${number.value}`;

    if(message.value.length)
        link += `&text=${message.value}`;

    window.location.href = link;
}