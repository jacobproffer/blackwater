var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var mobileNavButton = document.querySelector(".main-header__mobile-nav-button");
var mobileNavigation = document.querySelector(".main-header__mobile-nav");
var aboutTopContent = document.querySelectorAll(".home-about-top-content");
var aboutBottomContent = document.querySelectorAll('.home-about-bottom-content');
var mediaGrid = document.querySelector(".home-media__grid");
var lazyImg = document.querySelectorAll("img");
var card = document.querySelectorAll(".home-operations .card");

var headroom = new Headroom(mainHeader, {
  offset: 0,
  tolerance: 0,
  classes: {
    pinned: "pinned",
    unpinned: "unpinned",
    top: "onTop",
    bottom: "onBottom",
    notTop: "scrolled"
  },

  onUnpin: function() {
    if (mainHeader.classList.contains("main-header--nav-open")) {
      mainHeader.classList.remove("unpinned");
    }
  },

  onTop: function() {
    mainHeader.classList.remove("pinned");
  }
});

headroom.init();

mobileNavButton.addEventListener("click", function() {
  mainHeader.classList.toggle("main-header--nav-open");
  mobileNavigation.classList.toggle("main-header__mobile-nav--open")
  this.classList.toggle("nav-open");
});

var controller = new ScrollMagic.Controller();

if (lazyImg) {
  lazyImg.forEach(function (el) {
    var LazyScene = new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 1,
      offset: -300,
      duration: 0,
      reverse: false
    })
      .on('enter', function () {
        if (el.getAttribute('data-src')) {
          el.src = el.getAttribute('data-src')
        }
        if (el.getAttribute('data-srcset')) {
          el.setAttribute('srcset', el.getAttribute('data-srcset'))
        }
      })
      .addTo(controller);
  });
}

if (aboutBottomContent) {
  var aboutTL = gsap.timeline();

  aboutTL
    .from(aboutBottomContent, {duration: 0.5, opacity: 0});

  var aboutTrigger = new ScrollMagic.Scene({
    triggerElement: aboutBottomContent,
    triggerHook: 0.5,
    duration: 0,
  }).setTween(aboutTL).addTo(controller);
}

if (mediaGrid) {
  var imageTL = gsap.timeline();

  imageTL.from(".animate-image", {duration: 0.5, opacity: 0});

  var imageTrigger = new ScrollMagic.Scene({
    triggerElement: mediaGrid,
    triggerHook: 0.5,
    duration: 0,
  }).setTween(imageTL).addTo(controller);
}

if (card) {
  var cardTL = gsap.timeline();

  cardTL.from(card, {duration: 0.5, opacity: 0, stagger: 0.25});

  var cardTrigger = new ScrollMagic.Scene({
    triggerElement: card,
    triggerHook: 0.5,
    duration: 0,
  }).setTween(cardTL).addTo(controller);
}
