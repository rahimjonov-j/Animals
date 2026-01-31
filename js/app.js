import {
  elContainer,
  elFormName,
  elTemplate,
  elCardBody,
  elInfo,
  elLoader,
  elLoaderTemp,
  elEditBtn,
  elDeleteBtn,
  elAddModalBtn,
  elAddFrom,
  elToastTemp,
  eltoastCont,
  elLogIn,
  elAddBtn,
  elTostTemp,
  elSearch,
} from "./elements.js";
import { animals } from "./data.js";

// ui fetch main
loader(true);
fetch("https://json-api.uz/api/project/game-over/animals")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    ui(res.data);
  })
  .catch((err) => {
    // console.log(err);
  })
  .finally(() => {
    loader(false);
  });

function ui(data) {
  const elBtnHover = document.querySelector(".group");
  data.forEach((element) => {
    const clone = elTemplate.cloneNode(true).content;

    clone.querySelector(".js-name").innerText = element.name
      ? element.name
      : "Animal name not found!";
    clone.querySelector(".js-category").innerText = element.category
      ? element.category
      : "Animal category not found!";
    clone.querySelector(".js-year").innerText = element.year
      ? element.year
      : "Animal category not found!";
    clone.querySelector("button").id = element.id;
    clone.querySelector(".js-delete-btn").id = element.id;
    clone.querySelector("a").href = `/info/information.html?id=${element.id}`;
    elContainer.appendChild(clone, elBtnHover);
  });
}
// Skeleton
function loader(bool) {
  if (bool) {
    elLoader.innerHTML = null;
    Array.from({ length: 10 }, (_, index) => index).forEach(() => {
      elLoader.appendChild(elLoaderTemp.cloneNode(true).content);
    });
  } else {
    elLoader.innerHTML = null;
  }
}
// delete addevenlisener
elContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("js-delete-btn")) {
    evt.target.disabled = true;
    evt.target.innerHTML = `
    <div class="justify-center flex">
       <svg aria-hidden="true" class="w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
       </svg>Deleted...
    </div>
    `;

    if (login()) {
      deleteCard(evt.target.id, evt.target);
    } else {
      location.href = "./login/login.html";
    }
  }
});

// Delete function
function deleteCard(id, buttonElement) {
  const token = localStorage.getItem("token");

  fetch("https://json-api.uz/api/project/game-over/animals/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      const cardElement = buttonElement.closest(".js-cards, [data-id]");
      //

      if (cardElement) {
        cardElement.style.opacity = "0.5";

        setTimeout(() => {
          cardElement.remove();
        }, 300);
      }
    })
    .catch(() => {})
    .finally(() => {});
}
// login
elLogIn.addEventListener("click", (evt) => {
  if (localStorage.getItem("token")) {
    elLogIn.style.display = "none";
  } else {
    elLogIn.style.display = "flex";
    window.location.href = "/login/login.html";
  }
});
window.onload = function () {
  if (localStorage.getItem("token")) {
    elLogIn.style.display = "hidden";
  } else {
    elLogIn.style.display = "flex";
  }
};
setInterval(() => {
  if (localStorage.getItem("token")) {
  } else {
    elLogIn.style.display = "flex";
  }
}, 10000);
// add
elAddBtn.addEventListener("click", (evt) => {
  const check = login();
  if (check) {
    document.getElementById(`[data-modal-toggle="crud-modal"]`);
  } else {
    location.href = "./login/login.html";
  }
});

function login() {
  if (localStorage.getItem("token") === null) {
    return false;
  } else {
    return true;
  }
}

elAddFrom.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(elAddFrom);
  const result = {};

  formData.forEach((value, key) => {
    result[key] = value;
  });

  if (result.isWild === "true") result.isWild = true;
  if (result.isWild === "false") result.isWild = false;

  fetch("https://json-api.uz/api/project/game-over/animals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(result),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then((data) => {
      console.log("Added:", data);
      // location.href = "./index.html";
    })
    .catch((err) => console.error(err));
  console.log(localStorage.getItem("token"));
});
// search
// elSearch.addEventListener("input", (evt) => {
//   let nameAnimal = evt.target.value.trim();
//   if (nameAnimal === "") {
//     ui(res);
//     return;
//   }
//   searchAnimal(nameAnimal);
// });
// // search function
// function searchAnimal(nameAnimal) {
//   fetch(`https://restcountries.com/v3.1/name/${nameAnimal}`)
//     .then((res) => res.json())
//     .then((res) => {
//       ui(res);
//     });
// }
