import {
  elFormName,
  elAddFrom,
  eltoastCont,
  elToastTemp,
  elAddModalBtn,
  elFormHabitat,
  elFormSoundText,
  elFormIsWild,
  elFormColor,
  elFormWeight,
  elFormSpeed,
  elFormYear,
  elFormCategory,
} from "./elements.js";

elAddModalBtn.addEventListener("click", (evt) => {
  // evt.preventDefault();
  const obj = {
    name: elFormName.value,
    year: elFormYear.value,
    category: elFormCategory.value,
    speed: elFormSpeed.value,
    weight: elFormWeight.value,
    color: elFormColor.value,
    isWild: elFormIsWild.value,
    soundText: elFormSoundText.value,
    habitat: elFormHabitat.value,
  };

  if (obj.soundText === "") {
    const clone = elToastTemp.cloneNode(true).content;
    clone.getElementById("textAlert").innerText =
      "Plase enter animal sountext!";
    eltoastCont.appendChild(clone);
    elFormSoundText.focus();
    setTimeout(() => {
      document.querySelector(` [role="alert"]`).remove();
    }, 1500);
  }

  if (obj.color === "") {
    const clone = elToastTemp.cloneNode(true).content;
    clone.getElementById("textAlert").innerText = "Plase enter animal color!";
    eltoastCont.appendChild(clone);
    elFormColor.focus();
    setTimeout(() => {
      document.querySelector(` [role="alert"]`).remove();
    }, 1500);
  }
  if (obj.weight === "") {
    const clone = elToastTemp.cloneNode(true).content;
    clone.getElementById("textAlert").innerText = "Plase enter animal weight!";
    eltoastCont.appendChild(clone);
    elFormWeight.focus();
    setTimeout(() => {
      document.querySelector(` [role="alert"]`).remove();
    }, 1500);
  }
  if (obj.speed === "") {
    const clone = elToastTemp.cloneNode(true).content;
    clone.getElementById("textAlert").innerText = "Plase enter animal speed!";
    eltoastCont.appendChild(clone);
    elFormSpeed.focus();
    setTimeout(() => {
      document.querySelector(` [role="alert"]`).remove();
    }, 1500);
  }

  if (obj.year === "") {
    const clone = elToastTemp.cloneNode(true).content;
    clone.getElementById("textAlert").innerText = "Plase enter animal year!";
    eltoastCont.appendChild(clone);
    elFormYear.focus();
    setTimeout(() => {
      document.querySelector(` [role="alert"]`).remove();
    }, 1500);
  }
  if (obj.name.trim() === "") {
    const clone = elToastTemp.cloneNode(true).content;
    clone.getElementById("textAlert").innerText = "Plase enter animal name!";
    eltoastCont.appendChild(clone);
    elFormName.focus();
    setTimeout(() => {
      document.querySelector(` [role="alert"]`).remove();
    }, 1500);
  }
  // elFormName.value = "";
  // elFormYear.value = "";
  // elFormCategory.value = "";
  // elFormSpeed.value = "";
  // elFormWeight.value = "";
  // elFormColor.value = "";
  // elFormIsWild.value = "";
  // elFormSoundText.value = "";
  // elFormHabitat.value = "";
  add(obj);
});

// add function
function add(data) {
  fetch("https://json-api.uz/api/project/game-over/animals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then((data) => {
      console.log("Added:", data);
      location.href = "./index.html";
    })
    .catch((err) => console.error(err));
  console.log(localStorage.getItem("token"));
}
