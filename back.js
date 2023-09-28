//change images :
let imagePrincipale = "imagesProduit/machianeAlavie.jpg";

function changerImage(image) {
  const imgPrincipale = document.getElementById("imgprincipale");
  const nouvelleImage = image.src;
  image.src = imagePrincipale;
  imgPrincipale.src = nouvelleImage;
  imagePrincipale = nouvelleImage;
}

//theme :
function toggleTheme() {
  const bgtheme = document.getElementById("bgtheme");
  const text_theme = document.getElementById("text_theme");
  const infos = document.getElementById("infos");
  const formthme = document.getElementById("form");
  const imgPrincipale = document.getElementById("imgprincipale");
  const Copyright_theme = document.getElementById("Copyright_theme");

  bgtheme.classList.toggle("bg-dark");

  text_theme.classList.toggle("bg-light");

  infos.classList.toggle("bg-secondary");
  infos.classList.toggle("text-light");

  formthme.classList.toggle("bg-secondary");
  formthme.classList.toggle("text-light");
  
  if (bgtheme.classList.contains("bg-dark")) {
    imgPrincipale.classList.remove("shadow");
    imgPrincipale.classList.add("shadow_white");
  } else {
    imgPrincipale.classList.remove("shadow_white");
    imgPrincipale.classList.add("shadow");
  }

  Copyright_theme.classList.toggle("text-light");
}


const msgValidation = document.getElementById("msg_validation");

//incrementchampQuantity
function incrementQuantity() {
  let quantityElement = document.getElementById("quantity");
  let currentQuantity = parseInt(quantityElement.value);
  if (currentQuantity < 10) {
    quantityElement.value = currentQuantity + 1;
  } else {
    afficherDiv()
    msgValidation.innerHTML=`<div class='Almarai_font d-flex justify-content-center align-items-center gap-2 m-1'><span>الحد الأقصى هو 10</span><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-exclamation-circle' viewBox='0 0 16 16'>
    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>
    <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z'/>
  </svg></div>`
    }
}

//decrementchampQuantity
function decrementQuantity() {
  let quantityElement = document.getElementById("quantity");
  let currentQuantity = parseInt(quantityElement.value);
  if (currentQuantity > 1) {
    quantityElement.value = currentQuantity - 1;
  }
}

//sheets
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwjHfNEoJ2-yBD1t1hsRqveitTpIxnlTQyXU0LqwZ9mb3Wmg9TjlKxkS2w676m0ND8L/exec";
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;
  const systemDate = new Date().toISOString(); 
  const btn_confirm=document.getElementById('btn_confirm')

  const errorMessages = [];

  if (!firstname) {
    errorMessages.push("الرجاء إدخال اسمك الشخصي");
  }

  if (!lastname) {
    errorMessages.push("الرجاء إدخال اسمك العائلي");
  }

  if (!phone) {
    errorMessages.push("الرجاء إدخال رقم الهاتف");
  } else if (isNaN(Number(phone))) {
    errorMessages.push("الرجاء إدخال أرقام");
  }
  if (!city) {
    errorMessages.push("الرجاء إدخال إسم مدينتك ");
  }

 
  msgValidation.innerHTML = errorMessages
    .map(
      (
        msg
      ) => `<div class='Almarai_font d-flex justify-content-center align-items-center gap-2 m-1'> <span>${msg}</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg></div>`
    )
    .join("");

  if (errorMessages.length === 0) {
    if (!document.getElementById("date").value) {
      document.getElementById("date").value = systemDate;
    }
    btn_confirm.innerHTML="جاري التحميل"
    btn_confirm.type="button"
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(() => {
        afficherMessage();
      })
      .catch((error) => console.error("Error!", error.message));
  } else {
    afficherDiv();
  }
});

//msg_validation
function afficherMessage() {
  const modal = document.getElementById("customAlert");
  modal.style.display = "block";
}

function fermerMessage() {
  const modal = document.getElementById("customAlert");
  modal.style.display = "none";
  btn_confirm.type="submit"
  btn_confirm.innerHTML="تأكيد الطلب"
  city.value="";
  phone.value="";
  lastname.value=""
  firstname.value=""
}

function afficherDiv() {
  const divAlert = document.getElementById("divAlert");
  divAlert.classList.remove("d-none");

  setTimeout(function () {
    divAlert.classList.add("d-none");
  }, 5000);
}

function cacherDiv() {
  const divAlert = document.getElementById("divAlert");
  divAlert.classList.add("d-none");
}
