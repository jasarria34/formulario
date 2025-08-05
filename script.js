const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseout", () => drawing = false);
canvas.addEventListener("mousemove", dibujar);
function dibujar(event) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
}

document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});

document.getElementById("flightForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const firma = canvas.toDataURL();

  const datos = {
    fecha: formData.get("fecha"),
    piloto: formData.get("piloto"),
    aeronave: formData.get("aeronave"),
    origen: formData.get("origen"),
    destino: formData.get("destino"),
    duracion: formData.get("duracion"),
    observaciones: formData.get("observaciones"),
    firma: firma
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwoVRpgaXER3jopD58_4qpg5_JcRjYwQXPYc5Ck1_gdmtXAfgTefH0vPp4PFykrtIUPWQ/exec", {
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
