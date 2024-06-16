const nav = document .querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerra = document.querySelector("#cerrar");


abrir.addEventListener("click",()=> {
    nav.classList.add("visible");
})

cerra.addEventListener("click",()=>{
    nav.classList.remove("visible");
})


document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav");
    const logo = document.querySelector(".logo");
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        nav.classList.add("scrolled");
        logo.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
        logo.classList.remove("scrolled");
      }
  
      // Agrega clase específica para el footer
      const footer = document.querySelector("footer");
      const logoFooter = document.querySelector(".logo.footer");
  
      if (footer.getBoundingClientRect().top <= window.innerHeight) {
        logoFooter.classList.add("scrolled");
      } else {
        logoFooter.classList.remove("scrolled");
      }
    });
  });
  



  // Variables globales para realizar un seguimiento de los intentos fallidos y el estado de bloqueo
let intentosFallidos = 0;
let bloqueado = false;

// Función para validar el inicio de sesión
function validateLogin() {
    // Verifica si el usuario está bloqueado
    if (bloqueado) {
        alert("Has intentado iniciar sesión 3 veces sin éxito. Por seguridad, debes esperar 3 minutos antes de intentarlo nuevamente.");
        return;
    }

    // Obtiene los valores de los campos de usuario y contraseña del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica si el nombre de usuario es "Jonathan" y la contraseña es "123456"
    if (username === "Jonathan" && password === "123456") {
        // Restablece el contador de intentos fallidos al tener éxito en el inicio de sesión
        intentosFallidos = 0;

        // Solicita los datos adicionales del usuario
        const edad = prompt("Por favor, ingresa tu edad:");
        const nombre = prompt("Por favor, ingresa tu nombre:");
        const apellido = prompt("Por favor, ingresa tu apellido:");
        const destino = prompt("¿A dónde deseas viajar?");
        
        // Registra los datos en la consola
        console.log("Edad: " + edad);
        console.log("Nombre: " + nombre);
        console.log("Apellido: " + apellido);
        console.log("Lugar al que desea viajar: " + destino);
        // Redirige al usuario a ingreso.html después de obtener todos los datos adicionales
        window.location.href = "ingreso.html";
    } else {
   
        // Incrementa el contador de intentos fallidos
        intentosFallidos++;

        // Verifica si el usuario ha tenido 3 intentos fallidos
        if (intentosFallidos >= 3) {
            bloqueado = true;

            // Informa al usuario que debe esperar 3 minutos
            alert("Has intentado iniciar sesión 3 veces sin éxito. Por seguridad, debes esperar 3 minutos antes de intentarlo nuevamente.");

            // Bloquea al usuario por 3 minutos (180,000 milisegundos)
            setTimeout(() => {
                bloqueado = false;
                intentosFallidos = 0;
                alert("Ahora puedes intentar iniciar sesión nuevamente.");
            }, 180000); // 3 minutos en milisegundos
        } else {
            // Muestra un mensaje de error si el nombre de usuario o contraseña son incorrectos
            alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        }
    }
}

// Asigna la función validateLogin al evento de clic en el botón de inicio de sesión
document.querySelector("button[type='button']").onclick = validateLogin;



// Primero, obtenemos el elemento que estamos intentando manipular
var elemento = document.getElementById("idDelElemento");

document.addEventListener("DOMContentLoaded", function () {
    var elemento = document.getElementById("idDelElemento");
    
    if (elemento !== null) {
        elemento.classList.add("claseEjemplo");
    } else {
        console.warn("El elemento con el ID especificado no existe.");
    }
});




function calcularCuota() {
  // Obtener los valores ingresados por el usuario
  const monto = parseFloat(document.getElementById("monto").value);
  const plazo = parseInt(document.getElementById("plazo").value, 10);
  const tasa = parseFloat(document.getElementById("tasa").value);

  // Calcular la tasa de interés mensual
  const tasaMensual = (tasa / 100) / 12;

  // Calcular la cuota mensual utilizando la fórmula de amortización
  const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));

  // Mostrar el resultado en el elemento con el ID "resultado"
  document.getElementById("resultado").textContent = `La cuota mensual es de: $${cuota.toFixed(2)}`;
}





// Esta función se ejecutará cuando se cargue el documento
document.addEventListener("DOMContentLoaded", function () {
    // Verifica si el usuario ha iniciado sesión
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    
    if (isLoggedIn) {
        // Si el usuario ha iniciado sesión, actualiza la navegación
        const navList = document.querySelector(".nav-list");
        
        if (navList) {
            // Elimina el enlace de inicio de sesión
            const loginLink = navList.querySelector(".btn a[href='login.html']");
            
            if (loginLink) {
                const li = loginLink.parentElement;
                li.remove();
            }
            
            // Agrega un mensaje de bienvenida
            const username = sessionStorage.getItem("username");
            const welcomeMessage = document.createElement("li");
            welcomeMessage.classList.add("item");
            welcomeMessage.textContent = `Bienvenido, ${username}`;
            navList.appendChild(welcomeMessage);
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".ver-mas-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const targetElement = document.querySelector(targetId);

            if (targetElement.classList.contains("show")) {
                // Si el elemento ya está expandido, lo retraemos
                targetElement.classList.remove("show");
                this.textContent = "Ver más";
            } else {
                // Si el elemento está oculto, lo expandimos
                targetElement.classList.add("show");
                this.textContent = "Ver menos";
            }
        });
    });
});



let carrito = [];

function agregarAlCarrito(destino, precio) {
    carrito.push({ destino, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    let total = 0;
    let detalleCarrito = "";
    carrito.forEach(item => {
        detalleCarrito += `${item.destino}: $${item.precio}<br>`;
        total += parseInt(item.precio);
    });
    document.getElementById('carrito-detalle').innerHTML = detalleCarrito;
    document.getElementById('total-carrito').innerHTML = `Total: $${total}`;
}




const express = require('express');
const app = express();
const path = require('path');

// Ruta estática para servir archivos del cliente
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página del carrito
app.get('/carrito', (req, res) => {
    // Aquí deberías renderizar tu página del carrito
    res.sendFile(path.join(__dirname, 'public', 'carrito.html'));
});

// Otros middleware y rutas

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));



function agregarAlCarrito(destino, precio) {
    fetch('http://localhost:3000/agregar-al-carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destino, precio }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Solo para depuración, puedes omitir esta línea
        actualizarCarrito(); // Actualizar el carrito en el frontend después de agregar un producto
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
