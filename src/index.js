/**
 * @Author: francesco
 * @Date:   2021-04-08T22:41:21+02:00
 * @Last edit by: francesco
 * @Last edit at: 2021-04-10T00:45:42+02:00
 */

console.log("Hello from Xevolab");

/*
  Dealing with landing view
 */
const hideLandingView = () => {
  document.getElementById("site-content").scrollIntoView({behavior: "smooth"});
  setTimeout(() => {
    document.getElementById("landing-view").classList.add("hidden");
  }, 1000)
}
document.getElementById("landing-view").addEventListener("wheel", e => {
  if (e.deltaY <= 0) return e.preventDefault();

  hideLandingView()
});
document.querySelector(".action-button-area").addEventListener("click", hideLandingView);

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
  focusAt: "center",
  gap: 0,
  startAt: 1,
  ...bakeThemCookies()
}).mount()

glider.on(["mount.before", "resize"], () => {

  return glider.update(bakeThemCookies())

})

/*let caretPages = document.querySelectorAll(".caret-page")
for (let i=0; i<caretPages.length; i++) {
  caretPages[i].style.backgroundColor = 'hsl(0, 0%, '+(50+Math.floor(Math.random() * 50))+'%)';
}*/

/*
  Popups
 */
// Opening just one popup
document.querySelectorAll(".content-popup .action-container").forEach((item, i) => {

  item.addEventListener("click", (e) => {
    let popupID = document.querySelector(".content-popup .action-container").getAttribute("popupID");
    document.querySelector(".popup#popupID"+popupID).style.display = "block";
  });
});
// And then closing it
document.querySelectorAll(".popup .popup-content .close-me").forEach((item, i) => {

  item.addEventListener("click", (e) => {

    e.target.parentElement.parentElement.style.display = "none";

  });
});
