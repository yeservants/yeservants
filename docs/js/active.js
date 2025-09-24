 $('#counter-block').ready(function () {
     $('.client').owlCarousel({
         loop: true,
         margin: 10,
         nav: true,
         items: 1,
         autoplayTimeout: 6000,
         autoplay: true,
         navText: [
        "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
     });

     $('.our_cuauses_single').owlCarousel({
         loop: true,
         margin: 50,
         nav: true,
         items: 3,
         autoplayTimeout: 6000,
         autoplay: true,
         navText: [
        "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
         responsive: {
             992: {
                 items: 3,
                 nav: true,
                 loop: true
             },
             500: {
                 items: 2,
                 nav: true,
                 loop: true
             },
             0: {
                 items: 1,
                 nav: true,
                 loop: true
             }
         },
     });

     $('.donors_featured').owlCarousel({
         loop: true,
         margin: 10,
         nav: true,
         items: 1,
         autoplayTimeout: 6000,
         autoplay: true,
         navText: [
        "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
     });

     $('.volunteer_single').owlCarousel({
         loop: true,
         margin: 10,
         nav: true,
         items: 3,
         autoplayTimeout: 6000,
         autoplay: true,
         navText: [
        "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
         responsive: {
             1400: {
                 items: 3,
                 nav: true,
                 loop: true
             },
             768: {
                 items: 2,
                 nav: true,
                 loop: true
             },
             500: {
                 items: 2,
                 nav: true,
                 loop: true
             },
             0: {
                 items: 1,
                 nav: true,
                 loop: true
             }
         },
     });

     $('.carosal_bottom_single').owlCarousel({
         loop: true,
         margin: 10,
         nav: true,
         items: 1,
         autoplayTimeout: 6000,
         autoplay: true,
         navText: [
        "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
     });

     $('.footer_carosal_icon').owlCarousel({
         loop: true,
         margin: 10,
         nav: true,
         items: 5,
         autoplayTimeout: 6000,
         autoplay: true,
         navText: [
        "<i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>",
        "<i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>"],
         responsive: {
             1400: {
                 items: 5,
                 nav: true,
                 loop: true
             },
             991: {
                 items: 4,
                 nav: true,
                 loop: true
             },
             768: {
                 items: 4,
                 nav: true,
                 loop: true
             },
             500: {
                 items: 3,
                 nav: true,
                 loop: true
             },
             0: {
                 items: 2,
                 nav: true,
                 loop: true
             }
         },
     });


     $('.fb').animationCounter({
         start: 0,
         end: 15000,
         step: 2,
         delay: 300
     });
     $('.bike').animationCounter({
         start: 0,
         end: 7500,
         step: 1,
         delay: 300,
     });
     $('.code').animationCounter({
         start: 0,
         end: 22500,
         step: 3,
         delay: 300,
     });
     $('.coffee').animationCounter({
         start: 0,
         end: 30000,
         step: 4,
         delay: 300,
     });
 });


    document.addEventListener("DOMContentLoaded", function() {
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
});

////// js to update the year on footer 

document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const footers = document.querySelectorAll(".footer_bottom");

  if (footers.length > 0) {
    footers.forEach(footer => {
      footer.innerHTML = `
        <p>
          Yielded Evangelical Servants © 2002-${currentYear} All Rights Reserved <br>
          Yielded Evangelical Servants is Registered under 501(c)(3) as not-for-profit.
        </p>
      `;
    });
  }
});


//////// js to change footer po box and remove phone -----
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".footer-text.one");

  if (footer) {
    // Hide the phone <li>
    const phoneLi = footer.querySelector('li a[href^="tel:"]')?.closest("li");
    if (phoneLi) {
      phoneLi.style.display = "none";
    }

    // Update PO Box address (find the one with location_on icon)
    const addressLi = Array.from(footer.querySelectorAll("li a"))
      .find(a => a.querySelector("i")?.textContent.trim() === "location_on"); 

    if (addressLi) {
      addressLi.innerHTML = `<i class="material-icons">location_on</i>PO Box 770308, Orlando Florida 32837, United States of America`;
    }
  }
});


////// remove phone from header

let phoneElementHeader = document.querySelector(".phone")
phoneElementHeader.style.display = "none"
