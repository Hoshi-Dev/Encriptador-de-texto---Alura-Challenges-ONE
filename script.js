/*----------------------CAPTURA TODOS LOS ELEMENTOS DEL DOM----------------------*/
const btnEncryp = document.getElementById("js-btn-encrypt");
const btnDecrypt = document.getElementById("js-btn-decrypt");
const btnCopy = document.getElementById("js-btn-copy");

const noResult = document.querySelector(
  ".js-container__encrypted-message__no-result"
);
const result = document.querySelector(
  ".js-container__encrypted-message__result"
);
const resultMessage = document.getElementById("js-result-message");

const textArea = document.querySelector(".js-container__message__text-input");
const verifyRed = document.querySelector(
  ".js-container__message__verification-red"
);
const verifyGreen = document.querySelector(
  ".js-container__message__verification-green"
);

/*--------------------verifica el texto que se ingresa en el textarea----------------------*/
//minúsculas, sin acentos, acepta números y espacios en blanco

let regex = /^[a-z0-9\s]+$/; //Expresión regular para la verificación

function verifyText() {
  const capturedText = textArea.value;

  if (regex.test(capturedText)) {
    textArea.style.outline = "2px solid green";
    verifyGreen.classList.remove("hidden");
    verifyRed.classList.add("hidden");
    btnEncryp.disabled = false;
    btnDecrypt.disabled = false;
  } else if (capturedText == "") {
    textArea.style.outline = "none";
    verifyRed.classList.add("hidden");
    verifyGreen.classList.add("hidden");
    btnEncryp.disabled = true;
    btnDecrypt.disabled = true;

  } else {
    textArea.style.outline = "2px solid red";
    verifyRed.classList.remove("hidden");
    verifyGreen.classList.add("hidden");
  }
}
//Se activa la verificación cada vez que se levanta una tecla al escribir
textArea.addEventListener("keyup", verifyText);


/*--------------------EVENTOS DE BOTONES ENCRIPTAR/DESENCRIPTAR----------------------*/
//Captura el texto verificado al clickear el boton 'encriptar'
btnEncryp.addEventListener("click", () => {
  const capturedTextVerified = textArea.value;
  encryptText(capturedTextVerified);
});

//Captura el texto al clickear el boton 'desencriptar'
btnDecrypt.addEventListener("click", () => {
  let newEncryptedText = textArea.value;
  decryptText(newEncryptedText);
});

/*--------------------ENCRIPTA EL TEXTO YA PREVIAMENTE VERIFICADO----------------------*/
function encryptText(params) {
  let encryptedResult = params
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
 
  showHideMessage(encryptedResult);
}

/*--------------------DESENCRIPTA EL TEXTO----------------------*/
function decryptText(newEncryptedText) {
  let newDecryptedText = newEncryptedText
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");
  
  showHideMessage(newDecryptedText);
}

/*--------------------COPIA EL TEXTO ENCRIPTADO AL PORTAPAPELES----------------------*/
function copyEncryptedText(encryptedText) {
  navigator.clipboard
    .writeText(encryptedText)
 }

/*--------------------MUESTRA LOS MENSAJES ENCRIPTADOS/DESENCRIPTADOS----------------------*/

function showHideMessage(params) {
  if (params.length != 0) {
    result.classList.remove("hidden");
    noResult.classList.add("hidden");
    resultMessage.textContent = params;

    //Captura el texto al clickear el boton 'copiar'
    btnCopy.addEventListener("click", () => {
      copyEncryptedText(params);
    });
  }
}
