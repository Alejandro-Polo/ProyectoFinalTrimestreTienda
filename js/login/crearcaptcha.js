
const crearCaptcha = () =>{
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Letras y números
    const longitud = 9;
    let captcha = '';
    
    /* Bucle que genera un captcha totalmente aleatorio entre letras mayúsculas y minusculas ademas de números */
    for (let i = 0; i < longitud; i++) {
        const numeroRandom = Math.floor(Math.random() * caracteres.length);
        captcha += caracteres[numeroRandom];
    }

    const divCaptcha = document.createElement("div")
    divCaptcha.classList.add("captcha"); 

    const textoCaptcha = document.createElement("p")
    textoCaptcha.classList.add("captcha__texto");
    textoCaptcha.textContent= captcha;
    divCaptcha.appendChild(textoCaptcha) 

    const inputCaptcha = document.createElement("input")
    inputCaptcha.classList.add("captcha__input");
    inputCaptcha.type="text"
    divCaptcha.appendChild(inputCaptcha) 

    const botonCaptcha =document.createElement("button")
    botonCaptcha.classList.add("captcha__boton");
    botonCaptcha.textContent="Verificar"
    botonCaptcha.type="button"
    divCaptcha.appendChild(botonCaptcha)

    document.body.appendChild(divCaptcha)

    // Evento que al hacer click comprueba si se ha superado el captcha
    botonCaptcha.addEventListener("click", () => {
        const userInput = inputCaptcha.value; 
        
        if (userInput === captcha) {
            window.location.href = "index.html";
        } else {
            alert("Captcha incorrecto");
            window.location.href = "captcha.html";
        }
    })
}
    

crearCaptcha()