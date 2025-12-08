const cardFooter = document.getElementById("cardFooter");
const btnShare = document.getElementById("btnShare");

btnShare.addEventListener("click", () => {
  /* the css controls the elements author and social nav, childs of card-footer  */
  cardFooter.classList.toggle("active");
});
