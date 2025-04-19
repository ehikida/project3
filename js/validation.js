let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const stateAbbreviations = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
let form = null;
let successMsg = null;

function initValidation(formId, successId) {
  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  let inputs = document.querySelectorAll("input");
  for (input of inputs) {
    input.addEventListener("change", inputChanged);
  }
  form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
  let el = ev.currentTarget;
  validateForm();
  el.classList.add("was-validated");
}

function submitForm(ev) {
  console.log("in submit");
  let form = ev.currentTarget;
  ev.preventDefault();
  ev.stopPropagation();

  validateForm();

  if (!form.checkValidity()) {
    let inputs = document.querySelectorAll("input", "textarea");
    for (let input of inputs) {
      input.classList.add("was-validated");
    }
  } else {
    form.style.display = "none";
    successMsg.style.display = "block";
  }
}

function validateForm() {
  checkRequired("first-name", "First Name is Required");
  checkRequired("last-name", "Last Name is Required");
  checkRequired("address", "Address is Required");
  checkRequired("city", "City is Required");

  if (checkRequired("state", "State is Required")) {
    validateState("state", "Not a valid State, enter two digit code e.g., UT");
  }

  if (checkRequired("email", "Email Address is required")) {
    checkFormat("email", "email format is bad", emailRegex);
  }
  if (checkRequired("zip", "Zip Code is Required")) {
    checkFormat(
      "zip",
      `malformed zip-code, please use either "#####", or "#####-#### format.`,
      zipCodeRegex
    );
  }
  if (checkRequired("phone", "Phone is required")) {
    checkFormat("phone", "phone format is bad", phoneRegex);
  }
  checkRequired("newspaper", "You must select at least one!");
}

function validateState(id, msg) {
  let el = document.getElementById(id);
  let valid = false;
  let value = el.value.trim().toUpperCase();

  if (stateAbbreviations.includes(value)) {
    valid = true;
  }

  setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
  let valid = false;
  let el = document.getElementById(id);
  if (regex.test(el.value)) {
    valid = true;
  }

  setElementValidity(id, valid, msg);
  return valid;
}

function checkRequired(id, message) {
  let el = document.getElementById(id);
  let valid = false;
  let type = el.type;
  switch (type) {
    case "text":
    case "password":
      if (el.value != "") {
        valid = true;
      }
      break;

    case "checkbox":
    case "radio":
      eles = document.getElementsByName("find-page");
      for (let el of eles) {
        if (el.checked == true) {
          valid = true;
        }
      }
  }
  setElementValidity(id, valid, message);

  return valid;
}

function setElementValidity(id, valid, message) {
  let el = document.getElementById(id);

  if (valid) {
    el.setCustomValidity("");
    els = el.parentElement.children;
    errorElement = els[2];
    errorElement.textContent = "";
  } else {
    el.setCustomValidity(message);
    els = el.parentElement.children;
    errorElement = els[2];
    errorElement.textContent = message;
  }
  el.validity.valid = valid;
}
