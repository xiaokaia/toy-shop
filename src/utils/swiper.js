
export function swiperInit(){
  var mySwiper = new Swiper('.swiper-container',{
    slidesPerView : 'auto',
    centeredSlides : true,
    watchSlidesProgress: true,
    pagination : '.swiper-pagination',
    preventClicks:false,
    autoplayDisableOnInteraction:false,
    paginationClickable: true,
    onProgress: function(swiper){
        for (var i = 0; i < swiper.slides.length; i++){
          var slide = swiper.slides[i];
          var progress = slide.progress;
          var scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
          var es = slide.style;
          es.opacity = 1 - Math.min(Math.abs(progress/2),1);
          es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0px,0,'+(-Math.abs(progress*150))+'px)';

        }
      },
    onSetTransition: function(swiper, speed) {
      for (var i = 0; i < swiper.slides.length; i++) {
        var es = swiper.slides[i].style;
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
      }
    }
  });
}

