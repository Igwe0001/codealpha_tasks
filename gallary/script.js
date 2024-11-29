
const body = document.querySelector("body");
const nav = document.querySelector("nav");
const lines = document.querySelectorAll(".line");
const closeBtn = document.querySelector(".close");
const links = document.querySelectorAll(".link");
const header = document.querySelector("header");
const main = document.querySelector("main");
const galleryImages = document.querySelectorAll(".image");

let latestOpenImg = null;
const windowWidth = window.innerWidth;

// Get Header Height
const headerHeight = header.getBoundingClientRect().height;


// Sticky Header with Scroll Event
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Image Viewer Functionality
if (galleryImages.length > 0) {
  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      const imageStyle = window.getComputedStyle(image);
      const fullImageUrl = imageStyle.getPropertyValue("background-image");
      const imageUrlParts = fullImageUrl.split("/ade/thumbs/");
      const newImageName = imageUrlParts[1].replace('")', "");

      latestOpenImg = index + 1;

      // Create and Display Image Viewer
      const container = document.body;
      const imgWindow = document.createElement("div");
      imgWindow.classList.add("img-window");
      imgWindow.onclick = closeImageViewer;

      const newImg = document.createElement("img");
      newImg.id = "current-img";
      newImg.src = `ade/${newImageName}`;

      imgWindow.appendChild(newImg);
      container.appendChild(imgWindow);

      newImg.onload = () => {
        const imgWidth = newImg.width;
        const calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

        createNavigationButton("Next", "img-btn-next", calcImgToEdge, 1);
        createNavigationButton("Prev", "img-btn-prev", calcImgToEdge, 0);
      };
    });
  });
}

function closeImageViewer() {
  document.querySelector(".img-window")?.remove();
  document.querySelector(".img-btn-next")?.remove();
  document.querySelector(".img-btn-prev")?.remove();
}

function createNavigationButton(text, className, offset, direction) {
  const container = document.body;
  const btn = document.createElement("a");
  btn.textContent = text;
  btn.classList.add(className);
  btn.style.cssText = direction === 1 ? `right: ${offset}px` : `left: ${offset}px`;
  btn.onclick = () => changeImage(direction);

  container.appendChild(btn);
}

function changeImage(direction) {
  document.querySelector("#current-img")?.remove();

  const imgWindow = document.querySelector(".img-window");
  const newImg = document.createElement("img");
  newImg.id = "current-img";

  let calcNewImg = direction === 1 ? latestOpenImg + 1 : latestOpenImg - 1;

  // Wrap image index if it exceeds limits
  if (calcNewImg > galleryImages.length) calcNewImg = 1;
  if (calcNewImg < 1) calcNewImg = galleryImages.length;

  newImg.src = `ade/img${calcNewImg}.jpg`;
  imgWindow.appendChild(newImg);

  latestOpenImg = calcNewImg;

  newImg.onload = () => {
    const imgWidth = newImg.width;
    const calcImgToEdge = (windowWidth - imgWidth) / 2 - 80;

    const nextBtn = document.querySelector(".img-btn-next");
    const prevBtn = document.querySelector(".img-btn-prev");

    nextBtn.style.cssText = `right: ${calcImgToEdge}px`;
    prevBtn.style.cssText = `left: ${calcImgToEdge}px`;
  };
}
