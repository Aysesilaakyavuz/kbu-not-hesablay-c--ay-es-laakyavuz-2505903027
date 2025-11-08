
const vizeEl = document.getElementById("vize");
const yiliciEl = document.getElementById("yilici");
const finalEl = document.getElementById("final");
const butEl = document.getElementById("butunleme");
const devamsizEl = document.getElementById("devamsiz");
const girdiEl = document.getElementById("girdi");

const sonucCard = document.getElementById("sonuc");
const basariEl = document.getElementById("basari");
const harfEl = document.getElementById("harf");
const durumEl = document.getElementById("durum");
const aciklamaEl = document.getElementById("aciklama");

const errVize = document.getElementById("err-vize");
const errYilici = document.getElementById("err-yilici");
const errFinal = document.getElementById("err-final");
const errBut = document.getElementById("err-butunleme");
const errGirdi = document.getElementById("err-girdi");

const form = document.getElementById("notForm");

function clearErrors() {
  [errVize, errYilici, errFinal, errBut, errGirdi].forEach(e => e.textContent = "");
}

function isValid(val) {
  const n = Number(val);
  return !isNaN(n) && n >= 0 && n <= 100;
}

butEl.addEventListener("input", () => {
  if (butEl.value.trim() !== "") {
    finalEl.disabled = true;
  } else {
    finalEl.disabled = false;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  hesapla();
});

form.addEventListener("reset", () => {
  clearErrors();
  finalEl.disabled = false;
  sonucCard.classList.add("hidden");
});

function hesapla() {
  clearErrors();
  sonucCard.classList.add("hidden");

  if (devamsizEl.checked) {
    gosterSonuc(0, "F1", "Kaldı (F1)", "Öğrenci devamsız olduğu için F1.");
    return;
  }

  const girdi = girdiEl.value;
  if (!girdi) {
    errGirdi.textContent = "Bu alan seçilmelidir.";
    return;
  }
  if (girdi === "hayir") {
    gosterSonuc(0, "F2", "Kaldı (F2)", "Sınava girilmediği için F2.");
    return;
  }

  if (!vizeEl.value.trim()) {
    errVize.textContent = "Vize notu gerekli.";
    return;
  }
  if (!isValid(vizeEl.value)) {
    errVize.textContent = "0-100 arasında olmalı.";
    return;
  }
  const vize = Number(vizeEl.value);

  let yilici = vize;
  if (yiliciEl.value.trim() !== "") {
    if (!isValid(yiliciEl.value)) {
      errYilici.textContent = "0-100 arasında olmalı.";
      return;
    }
    yilici = Number(yiliciEl.value);
  }

  let sinav;
  if (butEl.value.trim() !== "") {
    if (!isValid(butEl.value)) {
      errBut.textContent = "0-100 arasında olmalı.";
      return;
    }
    sinav = Number(butEl.value);
  } else {
    if (!finalEl.value.trim()) {
      errFinal.textContent = "Final notu gerekli.";
      return;
    }
    if (!isValid(finalEl.value)) {
      errFinal.textContent = "0-100 arasında olmalı.";
      return;
    }
    sinav = Number(finalEl.value);
  }

  if (sinav < 50) {
    const basari = 0.4 * yilici + 0.6 * sinav;
    gosterSonuc(basari, "F3", "Kaldı (F3)", `Sınav notu ${sinav} < 50 olduğu için F3.`);
    return;
  }

  const basari = 0.4 * yilici + 0.6 * sinav;
  const basariYuvarla = basari.toFixed(2);

  if (basari < 60) {
    gosterSonuc(basariYuvarla, "F3", "Kaldı (F3)", `Başarı notu ${basariYuvarla} < 60 olduğu için F3.`);
    return;
  }

  let harf = "";
  if (basari >= 90) harf = "A1 (4.00)";
  else if (basari >= 80) harf = "A2 (3.50)";
  else if (basari >= 70) harf = "B1 (3.00)";
  else if (basari >= 65) harf = "B2 (2.75)";
  else if (basari >= 60) harf = "C (2.50)";

  gosterSonuc(basariYuvarla, harf, "Geçti", `Sınav ${sinav} ≥ 50 ve Başarı ${basariYuvarla} ≥ 60 — Dersten geçti.`);
}

function gosterSonuc(basari, harf, durum, aciklama) {
  basariEl.textContent = basari;
  harfEl.textContent = harf;
  durumEl.textContent = durum;
  aciklamaEl.textContent = aciklama;
  sonucCard.classList.remove("hidden");
}
