// Function to toggle the dropdown
function toggleDropdown(dropdownId) {
    var dropdownContent = document.getElementById(dropdownId);
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
}

// Event listener for the button click to toggle the dropdown (first button)
document.getElementById("dropdown1").addEventListener("click", function () {
    toggleDropdown("myDropdown1");
});

// Event listener for the button click to toggle the dropdown (second button)
document.getElementById("dropdown2").addEventListener("click", function () {
    toggleDropdown("myDropdown2");
});

// Event listener to close the dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
    if (!event.target.matches("#dropdown1") && !event.target.matches("#dropdown2")) {
        document.getElementById("myDropdown1").style.display = "none";
        document.getElementById("myDropdown2").style.display = "none";
    }
});
