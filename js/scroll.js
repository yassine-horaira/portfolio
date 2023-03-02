$(document).ready(function(){
  var docEl = $(document),
      linkScroll = $('.scroll');

  
  linkScroll.click(function(e){
      e.preventDefault();
      $('body, html').animate({
         scrollTop: $(this.hash).offset().top
      }, 700);
   });
});