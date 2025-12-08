const cardFooter = document.getElementById("cardFooter");
const btnShare = document.getElementById("btnShare");
const authorContent = document.getElementById("author");
const socialNav = document.getElementById("socialNav");

btnShare.addEventListener("click", () => {
  /* Change the cardFooter background color:  
  very dark grayish blue - white */
  cardFooter.classList.toggle("active");

  /* Hide / show the author content profile */
  authorContent.classList.toggle("active");

  /* Hide / show the social nav bar mobile - social tooltip desktop */
  socialNav.classList.toggle("active");
});
