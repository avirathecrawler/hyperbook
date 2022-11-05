(function() {
  (function($) {
    'use strict';
    $.fn.paperCollapse = function(options) {
      var settings;
      settings = $.extend({}, $.fn.paperCollapse.defaults, options);
      $(this).click(function() {

        $(this).find('.body').toggle();
        $(this).toggleClass('active');
        /*
        if ($(this).hasClass('active')) {
        //  settings.onHide.call(this);
          $(this).removeClass('active');
          $(this).find('.body').hide();
        //  $(this).find('.body').slideUp(settings.animationDuration, settings.onHideComplete);
        } else {
         // settings.onShow.call(this);
          $(this).addClass('active');
          //$(this).find('.body').slideDown(settings.animationDuration, settings.onShowComplete);
          $(this).find('.body').show();
        }

        */
      });
      return this;
    };
    $.fn.paperCollapse.defaults = {
      animationDuration: 0,
       onShow: function() {},
      onHide: function() {},
      onShowComplete: function() {},
      onHideComplete: function() {}
    };
  })(jQuery);

  (function($) {
    $(function() {
      $('.collapse-card').paperCollapse({});
    });
  })(jQuery);

}).call(this);
