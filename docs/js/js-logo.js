document.addEventListener("DOMContentLoaded", function () {
  // Replace old Facebook icon
  var oldFacebookIcon = document.querySelector('.footer-charity-text .fa-facebook');
  if (oldFacebookIcon) {
    var newFacebookIcon = document.createElement('i');
    newFacebookIcon.className = 'bi bi-facebook';
    oldFacebookIcon.parentNode.replaceChild(newFacebookIcon, oldFacebookIcon);
  }

  // Add click redirect to image inside .main-logo
  const logoImg = document.querySelector(".main-logo img");
  if (logoImg) {
    logoImg.style.cursor = "pointer"; // optional: make it look clickable
    logoImg.addEventListener("click", () => {
      window.location.href = "https://yeservants.org/";
    });
  }
});
