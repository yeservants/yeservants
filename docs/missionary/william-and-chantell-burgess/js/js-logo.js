    document.addEventListener("DOMContentLoaded", function() {
            var oldFacebookIcon = document.querySelector('.footer-charity-text .fa-facebook');

            if (oldFacebookIcon) {
                var newFacebookIcon = document.createElement('i');
                newFacebookIcon.className = 'bi bi-facebook';
                oldFacebookIcon.parentNode.replaceChild(newFacebookIcon, oldFacebookIcon);
            }
        });