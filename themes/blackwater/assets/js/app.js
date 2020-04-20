var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var logo = document.querySelector(".main-header__logo img");
var mobileNavButton = document.querySelector(".main-header__mobile-nav-button");
var mobileNavigation = document.querySelector(".main-header__mobile-nav");
var aboutGrid = document.querySelector(".home-about__grid");
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

gsap.from(logo, {duration: 0.75, opacity: 0, y: -200});

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
      .addTo(controller)
  });
}

if (aboutGrid) {
  var aboutTL = gsap.timeline();

  aboutTL
    .from(".home-about__image-left img", {duration: 0.5, opacity: 0, stagger: 0.25, x: -200})
    .from(".home-about__image-right img", {duration: 0.5, opacity: 0, stagger: 0.25, x: 200});

  var aboutTrigger = new ScrollMagic.Scene({
    triggerElement: aboutGrid,
    triggerHook: 0.4,
    duration: 0,
  }).setTween(aboutTL).addTo(controller);
}

if (mediaGrid) {
  var imageTL = gsap.timeline();

  imageTL.from(".animate-image", {duration: 0.5, opacity: 0, stagger: 0.25});

  var imageTrigger = new ScrollMagic.Scene({
    triggerElement: mediaGrid,
    triggerHook: 0.4,
    duration: 0,
  }).setTween(imageTL).addTo(controller);
}
