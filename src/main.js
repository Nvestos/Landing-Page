window.addEventListener("load", function () {
  document.body.classList.add("loaded");
  setTimeout(() => {
    document.querySelector("#preloader").style.display = "none";
  }, 1000);
});
