const mainHeader = document.querySelector(".main-header");
const mobileNavButton = document.querySelector(".main-header__mobile-nav-button");
const mobileNavigation = document.querySelector(".main-header__mobile-nav");
const fadeIns = document.querySelectorAll('.gsap-fade-in');
const staggerIn = document.querySelectorAll('.gsap-stagger-in');

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: 'main',
  start: 'top top',
  end: 'max',
  onEnter: () => mainHeader.classList.add('pinned'),
  onLeaveBack: () => mainHeader.classList.remove('pinned'),
});

if (fadeIns.length > 0) {
  fadeIns.forEach((fadeIn) => {
    gsap.from(fadeIn, {
      y: 30,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: fadeIn,
        start: 'top 90%',
        end: 'bottom top',
        once: true,
      }
    })
  });
}

if (staggerIn.length > 0) {
  staggerIn.forEach((staggers) => {
    const staggerElements = staggers.children;

    if (staggerElements.length > 0) {
      ScrollTrigger.batch(staggerElements, {
        start: 'top 90%',
        end: 'bottom top',
        once: true,
        onEnter: batch => gsap.from(batch, {
          y: 30,
          autoAlpha: 0,
          stagger: 0.2,
        }),
      });
    }
  });
}

mobileNavButton.addEventListener("click", function() {
  mainHeader.classList.toggle("main-header--nav-open");
  mobileNavigation.classList.toggle("main-header__mobile-nav--open")
  this.classList.toggle("nav-open");

  if (mobileNavigation.classList.contains('main-header__mobile-nav--open')) {
    this.setAttribute('aria-expanded', 'true');
  } else {
    this.setAttribute('aria-expanded', 'false');
  }
});
