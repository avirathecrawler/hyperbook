$(document).ready(function() {  
     
    $(".nicrol").niceScroll({
        cursoropacitymin: 0.3,
        cursorcolor: "#FFF",
        cursorwidth: "10px",
        cursorborderradius: "0",
        cursorborder: "0"
    }); 
     //console.log("DISPLAYFEED1");

        InitializeHB(); 
});

$(function() {
    function reposition() {
        var modal = $(this),
        dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });
});

$(function(){

    var originalLeave = $.fn.popover.Constructor.prototype.leave;
    $.fn.popover.Constructor.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
        var container, timeout;

        originalLeave.call(this, obj);

        if(obj.currentTarget) {
            container = $(obj.currentTarget).siblings('.popover')
            timeout = self.timeout;
            container.one('mouseenter', function(){
        //We entered the actual popover – call off the dogs
        clearTimeout(timeout);
        //Let's monitor popover content instead
        container.one('mouseleave', function(){
            $.fn.popover.Constructor.prototype.leave.call(self, self);
        });
        })
                }
            };

    // Enabling Popover Example 1 - HTML (content and title from html tags of element)
    $("[data-toggle=popover]").popover();

    // Enabling Popover Example 2 - JS (hidden content and title capturing)
    $("#categoryPopOver").popover({
        html : true, 
        placement: 'bottom',
        content: function() {
          return $('#category-list').html();
      },
      trigger: "click"
  });

$('html').on('mouseup', function(e) {
    if(!$(e.target).closest('.popover').length) {
        $('.popover').each(function(){
            $(this.previousSibling).popover('hide');
        });
    }
});
 

   
});




