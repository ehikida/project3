// I didn't implement any changes; I had a perfect score on previous assignments.

document.addEventListener("DOMContentLoaded", function () {
  initValidation("myform", "success");
});

function openMenu(main_item) {
  var i;
  var x = document.getElementsByClassName("main-item");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(main_item).style.display = "block";
  if (main_item == "past") {
    document.getElementById("video").style.display = "block";
  }
}

function addCss() {
  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "css/toggle.css";
  link.id = "style2";

  head.appendChild(link);
}

function removeCss() {
  var ele = document.getElementById("style2");
  ele.remove();
}

var toggle = 0;
function toggleStylesheet() {
  if (toggle == 0) {
    addCss();
    toggle = 1;
  } else {
    removeCss();
    toggle = 0;
  }
  console.log("clicked!");
}
