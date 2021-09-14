$(function() {
  $("#add").on("click", function() {
    var val = $("input").val(); // получаем значение элемента input
    if(val !== '') {
      // добавление записи
      var elem = $("<li></li>").text(val);
      $(elem).append("<button class='rem'>X</button>");
      $("#mylist").append(elem);
      
      // очищаем input
      $("input").val("");
	 
	    // удаление записи
      $(".rem").on("click", function() {
        $(this).parent().remove();
      });
    }
  });
});
