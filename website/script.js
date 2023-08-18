function showDropdown(contentId) {
    var dropdownContent = document.getElementById(contentId);
    dropdownContent.style.display = "block";
}

function hideDropdown(contentId) {
    var dropdownContent = document.getElementById(contentId);
    dropdownContent.style.display = "none";
}

const newsImages = ["/images/news-images/John_Sharon_Official_1.jpg",
    "/images/news-images/oversized-tshirt.jpeg",
    "/images/news-images/pexels-photo-10034631.jpeg",
    "/images/news-images/pexels-photo-9558684.jpeg",
    "/images/news-images/pexels-photo-9558925.jpeg",
    "/images/news-images/Raafey_Presse_Bilder_Schweiz.jpg"];

const popularImages = ["/images/popular/Elegant_colours_of_Navratri.jpg",
    "/images/popular/pexels-photo-1804666.jpeg",
    "/images/popular/pexels-photo-6065951.jpeg",
    "/images/popular/pexels-photo-6069560.jpeg",
    "/images/popular/woman.jpeg",
    "/images/popular/bs2160-image-kwvyl7u6.jpg"];

const saleImages = ["/images/sale/5550676712_bdfe1c4506_b.jpg",
    "/images/sale/beard-bow-tie-brooch-fashion.jpg",
    "/images/sale/fashion-design-fashion-style-fashion-model-vintage-luxury-style.jpg",
    "/images/sale/images-vintage-hat.jpeg",
    "/images/sale/pexels-photo-7505246.jpeg",
    "/images/sale/redhead-woman-in-vintage-clothing-with-coke-bottle--looking-at-camera-.jpg"];

const inspirationImages = ["/images/inspiration/adult_autumn_casual_clothes_colors_fall_fashion_fine_looking-1514707-133368789.jpeg",
    "/images/inspiration/fashion_woman_clothing_female_standing_beauty_beautiful_caucasian-527810-1673447503.jpeg",
    "/images/inspiration/fast-fashion.jpeg",
    "/images/inspiration/men-inspired.jpg",
    "/images/inspiration/pexels-photo-9052320.jpeg",
    "/images/inspiration/Stylish-boy-posing-while-walking-354318-pixahive.jpg"];

function change2x2GridImages(imageId, imagesArray) {
    var image = document.getElementById(imageId);
    while (true) {
        var random = Math.floor(Math.random() * imagesArray.length);
        if (image.src != imagesArray[random]) {
            image.src = imagesArray[random];
            break;
        }
    }
}

function openNewTabContainingImage(contentId) {
    var image = document.getElementById(contentId);
    window.open(image.src);
}

function showOverlayText(contentId, overlayTextId) {
    var image = document.getElementById(contentId);
    image.style.opacity = "0.5";
    var overlayText = document.getElementById(overlayTextId);
    overlayText.style.display = "block";
}

function hideOverlayText(contentId, overlayTextId) {
    var image = document.getElementById(contentId);
    image.style.opacity = "1";
    var overlayText = document.getElementById(overlayTextId);
    overlayText.style.display = "none";
}

function start2x2ImageGridParty(imagesArrays, imageIDs) {
    var j = 0;
    function changeImages() {
        for (var i = 0; i < imageIDs.length; i++) {
            var image = document.getElementById(imageIDs[i]);
            var imageArray = imagesArrays[i];
            var random = Math.floor(Math.random() * imageArray.length);
            while (true) {
                if (image.src !== imageArray[random]) {
                    image.src = imageArray[random];
                    break;
                }
            }
        }
        j++;
        if (j < 200) {
            setTimeout(changeImages, 500);
        }
    }

    changeImages();
}

async function fetchProductsFromAPI() {
    const response = await fetch("http://api.brilliantwear.se/get-latest-products/4");
    const products = await response.json();
    console.log(products);
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