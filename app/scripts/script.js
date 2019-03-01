const submit = document.querySelector("#submit");
const number = document.querySelector("#number");
const message = document.querySelector("#message");

number.isInvalid = _ => !/\d{11}|\d{10}/.test(number.value);
number.onkeyup = _ => submit.disabled = number.isInvalid();

submit.onclick = _ => {
    if(number.isInvalid())
        alert("Número inválido");

    let link = `https://api.whatsapp.com/send?phone=55${number.value}`;

    if(message.value.length)
        link += `&text=${message.value}`;
    
    console.log(link);

    window.location.href = link;
}