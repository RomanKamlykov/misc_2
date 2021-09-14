function openPage(pageName, elmnt, color) {
  //var i, tabcontent, tablinks;

  //tabcontent = document.getElementsByClassName("tabcontent");
  //for (i = 0; i < tabcontent.length; i++) {
  //  tabcontent[i].style.display = "none";
  //}

  //tablinks = document.getElementsByClassName("tablink");
  //for (i = 0; i < tablinks.length; i++) {
  //  tablinks[i].style.backgroundColor = "";
  //}

  // весть контент display = "none" и все вкладки backgroundColor = "", затем избранной устанавливаем значения
  [].forEach.call(document.getElementsByClassName("tabcontent"), el => el.style.display = "none");
  [].forEach.call(document.getElementsByClassName("tablink"), el => el.style.backgroundColor = "");
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
