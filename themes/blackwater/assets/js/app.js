var mainHeader = document.querySelector(".main-header");
var headerHeight = mainHeader.offsetHeight;
var mobileNavButton = document.querySelector(".main-header__mobile-nav-button");
var mobileNavigation = document.querySelector(".main-header__mobile-nav");

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

var lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy"
});
