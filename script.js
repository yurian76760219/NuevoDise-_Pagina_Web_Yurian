const mensaje = `
Querida Evelin,

Tu esencia es como un jardín de rosas suaves que florecen con cada sonrisa tuya.

Tu mirada, serena y dulce, ilumina el alma de quienes tienen el privilegio de conocerte.

Eres ternura hecha persona, y tu presencia convierte cualquier día gris en primavera. 🌷

Gracias por ser tan única, tan hermosa... tan tú.

Con admiración sincera, alguien que aprecia profundamente tu luz. 💖
`;

let i = 0;
function escribirMensaje() {
  const span = document.getElementById("mensaje-escrito");
  if (i < mensaje.length) {
    span.innerHTML += mensaje.charAt(i);
    i++;
    setTimeout(escribirMensaje, 40); // velocidad máquina de escribir
  }
}

// Inicia el mensaje al cargar
window.onload = escribirMensaje;
