// Ponteiros do relógio analógico
let hr = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

// Elemento do relógio digital
let digitalClock = document.getElementById("digital-clock");

function displayTime() {
  let date = new Date();

  // Obtém as horas, minutos e segundos
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  // Rotação dos ponteiros
  let hRotation = 30 * hh + mm / 2;
  let mRotation = 6 * mm;
  let sRotation = 6 * ss;

  hr.style.transform = `rotate(${hRotation}deg)`;
  min.style.transform = `rotate(${mRotation}deg)`;
  sec.style.transform = `rotate(${sRotation}deg)`;

  // Atualiza o relógio digital
  digitalClock.textContent = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

// Atualiza o relógio a cada segundo
setInterval(displayTime, 1000);
