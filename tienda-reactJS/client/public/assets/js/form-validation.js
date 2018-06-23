document.addEventListener("DOMContentLoaded", function(event) {
    var emailInput = document.getElementsByTagName('input');
    for (var i = 0; i < emailInput.length; i++) {
        emailInput[i].addEventListener("input", function() {
            this.classList.remove('is-invalid');
        });
    }
});
