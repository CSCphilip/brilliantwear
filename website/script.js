function showDropdown(contentId) {
    var dropdownContent = document.getElementById(contentId);
    dropdownContent.style.display = "block";
}

function hideDropdown(contentId) {
    var dropdownContent = document.getElementById(contentId);
    dropdownContent.style.display = "none";
}

const arrayNewsImages = ["/images/news-images/John_Sharon_Official_1.jpg",
    "/images/news-images/oversized-tshirt.jpeg",
    "/images/news-images/pexels-photo-10034631.jpeg",
    "/images/news-images/pexels-photo-9558684.jpeg",
    "/images/news-images/pexels-photo-9558925.jpeg"];

function changeNewsImage() {
    var newsImage = document.getElementById("news-image");
    var random = Math.floor(Math.random() * arrayNewsImages.length);
    newsImage.src = arrayNewsImages[random];
}

function openNewTabContainingImage() {
    var image = document.getElementById("news-image");
    window.open(image.src);
}

function showOverlayText() {
    var image = document.getElementById("news-image");
    image.style.opacity = "0.5";
    var overlayText = document.getElementById("overlay-text");
    overlayText.style.display = "block";
}

function hideOverlayText() {
    var image = document.getElementById("news-image");
    image.style.opacity = "1";
    var overlayText = document.getElementById("overlay-text");
    overlayText.style.display = "none";
}

/* Old for learning JS:
// Example of an object in JS!
const person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};

console.log(person.fullName());
*/