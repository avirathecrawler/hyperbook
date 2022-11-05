$(document).ready(function () {

    //alert("clicked");
    $('.label, .sub_label, .sub_list').on('click', function () {
	$('.label, .sub_label, .sub_list').removeClass('selected');
	$(this).addClass('selected');
}); 

    /*
    $('#new_folder').on('click', function () {
	alert("New folder clicked");
	
});*/
    
   
}
);



/* '#top_tab', function () {
	$('ul.main_list li').removeClass('selected'); $(this).addClass('selected');}); */

