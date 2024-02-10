/*----------------------inserta la posición del cursor----------------------*/

const injectCursorPosition = ({x, y}) => {
  document.documentElement.style.setProperty("--x", x);
  document.documentElement.style.setProperty("--y", y);
};

document.body.addEventListener("pointermove", injectCursorPosition);

/*----------------------botones----------------------*/
const btnEncryp = document.getElementById("btn-encrypt");
const btnDecrypt = document.getElementById("btn-decrypt");
const btnCopy = document.getElementById("btn-copy");

const noMessage = document.getElementById("no-message");

const showMessage = document.getElementById("show-message");

const result = document.getElementById("result");

//Captura el texto al clickear el boton 'encriptar'
btnEncryp.addEventListener("click", () => {
  const capturedText = document.getElementById("message").value;
  encryptText(capturedText);
});

//Captura el texto al clickear el boton 'desencriptar'
btnDecrypt.addEventListener("click", () => {
  let newEncryptedText = document.getElementById("message").value;
  decryptText(newEncryptedText);
});

// Encripta el texto
function encryptText(capturedText) {
  let encryptedText;
  
  // Llama a la función que verifica el formato del mensaje capturado
  if (verifyText(capturedText)) {
    encryptedText = capturedText
      .replace(/e/g, "enter")
      .replace(/i/g, "imes")
      .replace(/a/g, "ai")
      .replace(/o/g, "ober")
      .replace(/u/g, "ufat");

    showHideMessage(encryptedText);
  } else {
    Swal.fire({
      title: 'FORMATO INVÁLIDO',
      text: 'Solo minúsculas y sin acentos.',
      icon: 'error',
      background: '#052051',
      color: '#fff',
      confirmButtonColor:'#609ed4',
    });
  }

  console.log(encryptedText);
}

// Copia el texto encriptado al portapapeles
function copyEncryptedText(encryptedText) {
  navigator.clipboard
    .writeText(encryptedText)
    .then(() => {
      console.log("Texto copiado al portapapeles:", encryptedText);
    })
    .catch((err) => {
      console.error("Error al copiar texto al portapapeles:", encryptedText);
    });
}

// Desencriptar el texto
function decryptText(newEncryptedText) {
  let newDecryptedText = newEncryptedText
    .replace(/enter/gi, "e")
    .replace(/imes/gi, "i")
    .replace(/ai/gi, "a")
    .replace(/ober/gi, "o")
    .replace(/ufat/gi, "u");

  console.log(newDecryptedText);
  showHideMessage(newDecryptedText);
}

// Muestra los mensajes encriptados o desencriptados

function showHideMessage(params) {
  if (params.length != 0) {
    noMessage.setAttribute("class", "hidden");

    showMessage.classList.remove("hidden");

    result.textContent = params;

    //Captura el texto al clickear el boton 'copiar'
    btnCopy.addEventListener("click", () => {
      copyEncryptedText(params);
    });
  }
}

// Verifica el formato del mensaje: minúsculas, sin acentos, acepta números
function verifyText(params) {
  let regex = /^[a-z0-9]+$/; //Expresión regular para la verificación
  return regex.test(params)
}
