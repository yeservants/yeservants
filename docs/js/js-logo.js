document.addEventListener("DOMContentLoaded", function () {
  // Replace old Facebook icon
  var oldFacebookIcon = document.querySelector('.footer-charity-text .fa-facebook');
  if (oldFacebookIcon) {
    var newFacebookIcon = document.createElement('i');
    newFacebookIcon.className = 'bi bi-facebook';
    oldFacebookIcon.parentNode.replaceChild(newFacebookIcon, oldFacebookIcon);
  }


});

document.addEventListener("DOMContentLoaded", () => {
  const logoImages = document.querySelectorAll(".main-logo img");

  if (logoImages.length > 0) {
    logoImages.forEach((img) => {
      img.style.cursor = "pointer"; // Opcional, da feedback visual

      img.addEventListener("click", () => {
        window.location.href = "https://yeservants.org/";
      });
    });
  }


document.querySelectorAll('a[href*="missionaries.html"]').forEach(a => {
  a.href = 'https://yeservants.org/missionaries.html';
});


});
