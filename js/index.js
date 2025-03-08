function openMenu(main_item) {
  var i;
  var x = document.getElementsByClassName("main-item");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(main_item).style.display = "inherit";
  if (main_item == "past") {
    document.getElementById("video").style.display = "inherit";
  }
}
