var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var logo = document.querySelector(".main-header__logo img");
var heroContent = document.querySelector("#hero-content");
var mobileNavButton = document.querySelector(".main-header__mobile-nav-button");
var mobileNavigation = document.querySelector(".main-header__mobile-nav");
var aboutTopContent = document.querySelectorAll(".home-about-top-content");
var aboutBottomContent = document.querySelectorAll('.home-about-bottom-content');
var mediaGrid = document.querySelector(".home-media__grid");
var lazyImg = document.querySelectorAll("img");

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

if (heroContent && aboutTopContent) {
  var homeTL = gsap.timeline();

  homeTL.from(logo, {duration: 0.75, opacity: 0, ease: "power1.out", y: -100})
  homeTL.from(heroContent, {duration: 1, opacity: 0, ease: "power2.out", y: 100})
  homeTL.from(aboutTopContent, {duration: 1.25, opacity: 0});
}

if (aboutBottomContent) {
  var aboutTL = gsap.timeline();

  aboutTL
    .from(aboutBottomContent, {duration: 1.25, opacity: 0});

  var aboutTrigger = new ScrollMagic.Scene({
    triggerElement: aboutBottomContent,
    triggerHook: 1,
    duration: 0,
  }).setTween(aboutTL).addTo(controller);
}

if (mediaGrid) {
  var imageTL = gsap.timeline();

  imageTL.from(".animate-image", {duration: 1.25, opacity: 0});

  var imageTrigger = new ScrollMagic.Scene({
    triggerElement: mediaGrid,
    triggerHook: 0.8,
    duration: 0,
  }).setTween(imageTL).addTo(controller);
}
