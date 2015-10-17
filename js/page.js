/*---------------------------
  Preload
 ---------------------------*/
var imgUrl = $('#bg1').css('background-image').replace(/url\(("|')?/, '').replace(/("|')?\)/,'');
$.get(imgUrl, function(data){
  $('#preload').delay(2000).fadeOut(500, function(){
    $(".parallax_front").fadeIn();
    $(".parallax_base").fadeIn();
  });
}).fail(function(){
  var msg = $(document.createElement('div')).css('display', 'none').attr('id', 'preload_error').html('Something wrong.<br>Please refresh the page');
  $('#preload').append(msg);
  $("#preload_error").fadeIn(500);
});



/*---------------------------
  Transition
 ---------------------------*/
(function(){
  $( window ).on('scroll', function() {
    progress = parseFloat($(document).scrollTop());
    var e = progress/$(window).height();

    var a=$('#scroll-down-notice'), b=$('#slogan'), c=0.2-e;
    if(c>0){
      a.css("opacity", 4*c);
      b.css("opacity", 3*c);
    }else{
      a.css("opacity", 0);
      b.css("opacity", 0);
    }


    if(($('#quote').offset().top-progress)>0) $('.parallax_front').css('top', -progress*1.5);

    if(progress>0){
      $('#quote').removeClass("transparent");
      $('#about').removeClass("transparent");
    }

    if(($('#skills').offset().top-progress)<$(window).height()/2.5){
      for(var i=0; i<$('.score').length; i++){
        var level = $('.score').eq(i).attr('data-score');
        $('.score').eq(i).addClass('score-'+level);
      }
    }
  });

})();




/*---------------------------
  Skill table
 ---------------------------*/
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  for(var i=0; i<$('.score').length; i++){
    score(i);
  }

  function score(i){
    var e=['No idea', 'Learned', 'Average', 'Good', 'Over average', 'Excellent'];
    var n=$('.score').eq(i), k=n.attr('data-score');
    n.find('.rank').html(e[k]);
    n.attr('data-original-title', e[k]);
  }
});



/*---------------------------
  Alert
 ---------------------------*/
function github_alert(){
  alert("It's a private repository.");
}
function link_alert(){
  alert("The link is empty.");
}



/*---------------------------
  Loading
 ---------------------------*/
$(function(){
  var flag = 0;
  var start_offset = $(window).height()*2;
  $( window ).on('scroll', function() {
    if(($('#timeline').offset().top-progress+50)<start_offset && flag==0){
      flag=1;
      $.getScript('./js/jquery.timeline.min.js');
      $.getScript('./js/jquery.mCustomScrollbar.js');
      $.getScript('./js/jquery.easing.1.3.js');
      $.getScript('./js/image.js');
      $.getScript('./js/lightbox.js');
      $.getScript('./js/timeline.js');
      $.get('./timeline_extend.html', function(extend){
        $('#timeline').append(extend);
        $('#timeline_extend').click(function(){
          var a=$('#toggle').prop("checked");
          $('#extension').animate({height: 'toggle'}, 'slow');

          if(a==0){
            $('#timeline_extend').find('span').html('hide all');
            $('#timeline_extend').find('i').attr('class', 'fa fa-chevron-up');
          }else{
            $('#timeline_extend').find('span').html('view all at once');
            $('#timeline_extend').find('i').attr('class', 'fa fa-chevron-down');
          }
        });
      });
    }

    if(($('#activity').offset().top-progress+50)<start_offset && flag==1){
      flag=2;
      $.get('./activities.html', function(data){
        $('#activity').append(data);
        imgLoader('#activity');
      });
    }
  });
});

$.get('./works.html', function(data){
  $('#works .container').append(data);
  $(function(){
    $('figure.effect-zoe').hover(
      function(){
        $(this).find('.mask').css('opacity', '0.3');
      },
      function(){
        $(this).find('.mask').css('opacity', '');
      });
  });
});

function imgLoader(target){
  var total_images = $(target).find('img').length;
  var images_loaded = 0;
  $(target).find('img').each(function() {
      var fakeSrc = $(this).attr('src');
      $("<img/>").attr("src", fakeSrc).load(function() {
          images_loaded++;
          if (images_loaded >= total_images) {
            $(target).find('.loader').delay(1000).fadeOut();
            $(target).find('.loader').prev().delay(1000).fadeIn();
          }
      });
  });
}
