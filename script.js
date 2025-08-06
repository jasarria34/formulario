const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clear");
const preview = document.getElementById("firmaPreview");

// Ajustar tamaño dinámico
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 150; // puedes modificar este valor
}
resizeCanvas(); // ejecutar al cargar
window.addEventListener("resize", resizeCanvas); // adaptar en cambios de tamaño

let isDrawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

function startDraw(e) {
  e.preventDefault();
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDraw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  isDrawing = false;
}

// Eventos para mouse
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);

// Eventos para touch
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);

// Borrar firma
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});

document.getElementById("flightForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const firma = canvas.toDataURL();

  const data = {
      fecha: form.fecha.value,
      hora1: form.hora1.value,
      hora2: form.hora2.value,
      piloto: form.piloto.value,
      modelo: form.modelo.value,
      origen: form.origen.value,
      destino: form.destino.value,
      duracion: form.duracion.value,
      maniobras: form.maniobras.value,
      firma: document.getElementById("firmaImagen").toDataURL("image/png") // firma en base64
    };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyKDvfPSA1OXGPW_hYWW1O42GQ2IIP6GGEyz1bDFhr4zDHB9LQuS4MHu1TsMJGu2wet/exec", {
      method: "POST",  
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    document.getElementById("estado").textContent = "Vuelo guardado correctamente.";
    this.reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } catch (error) {
    document.getElementById("estado").textContent = "Error al guardar: " + error;
  }
});
