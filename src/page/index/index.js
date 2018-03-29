

require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');

require("node_modules/swiper/dist/css/swiper.min.css")
var _mm=require("util/mm.js")
var templateBanner  = require('./banner.string');
require('./index.css')
var Swiper=require("swiper");

$(function() {
    // 渲染banner的html
    var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var swiper = new Swiper('.swiper-container', {
      spaceBetween: 100,
      centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
   
});

