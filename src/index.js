/**
 * @Author: francesco
 * @Date:   2021-04-08T22:41:21+02:00
 * @Last edit by: francesco
 * @Last edit at: 2021-04-11T15:09:41+02:00
 */

console.log(`  @@@@   @@@@
   @@@@ @@@@
    @@@@@@@
      @@@
    @@@@@@@
   @@@@ @@@@
  @@@@   @@@@
`);

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

/*
  Dealing with landing view
 */
const hideLandingView = () => {
  if (document.getElementById("App-main").classList.contains("one-off-scrolling")) return

  document.getElementById("App-main").classList.add("one-off-scrolling");
  document.getElementById("site-content").scrollIntoView({behavior: "smooth"});
}
document.getElementById("App-main").addEventListener("scroll", e => {
  e.preventDefault();
  hideLandingView()

  if (e.target.scrollTop >= window.innerHeight) {
    document.getElementById("landing-view").classList.add("hidden");
    window.scrollTo(0, 0)
  }

});
document.getElementById("landing-view").addEventListener("touchmove", e => {
  e.preventDefault();
  document.getElementById("site-content").scrollIntoView({behavior: "smooth"});

}, {passing: false});
document.querySelector(".action-button-area").addEventListener("click", () => {

  document.getElementById("site-content").scrollIntoView({behavior: "smooth"});

});

window.addEventListener('resize', () => {
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
  })
});
document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);

/*
  glide.js for carousel management
 */
import Glide from '@glidejs/glide'

// Calculate the number of slides and the peek value when the
// page resizes, in order to have fixed-width
const pagesWidth = 450;
const bakeThemCookies = () => {

  let w = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )

  let perView = Math.floor(w / pagesWidth);
  perView -= (perView % 2 == 0 ? 1 : 0)

  if (perView < 1)
    return {perView: 1, peek: {before: 0, after: 0}}

  let peekValue = (w - (perView * pagesWidth)) / 2;

  return {perView, peek: {before: peekValue, after: peekValue}}
}

var glider = new Glide('.glide', {
  type: "carousel",

  touchAngle: 35,

  focusAt: "center",
  gap: 0,
  startAt: 0,
  ...bakeThemCookies()
}).mount()

glider.on(["mount.after", "resize"], () => {

  glider.update(bakeThemCookies())

})

const bindSyncScroll = () => {
  document.querySelectorAll(".caret-page").forEach((item, i) => {

    item.removeEventListener("scroll", syncScroll);
    item.addEventListener("scroll", syncScroll);
  });
}
const syncScroll = (e) => {
  window.requestAnimationFrame(() => {
    document.querySelectorAll(".caret-page:not(.glide__slide--active)#"+e.target.id).forEach((item, i) => {
      item.scrollTop = e.target.scrollTop;
    });
  });
}
glider.on("update", () => {

  bindSyncScroll()

})
bindSyncScroll();

/*
  Popups
 */
// Opening just one popup
document.querySelectorAll(".content-popup .action-container").forEach((item, i) => {

  item.addEventListener("click", (e) => {
    // Searching for the parent that has the content-popup class
    e = e.target;
    while (!e.classList.contains("content-popup"))
      e = e.parentElement

    // From there extract the popupID to show
    let popupID = e.getAttribute("popupID");

    document.querySelector(".popup#popupID"+popupID).style.display = "block";
  });
});
// And then closing it
document.querySelectorAll(".popup .popup-content .close-me").forEach((item, i) => {

  item.addEventListener("click", (e) => {

    e.target.parentElement.parentElement.style.display = "none";

  });
});
