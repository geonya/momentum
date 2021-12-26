const bgImages = [
  "bg1.jpeg",
  "bg2.jpeg",
  "bg3.jpeg",
  "bg4.jpeg",
  "bg5.jpeg",
  "bg6.jpg",
  "bg7.jpeg",
  "bg8.jpeg",
  "bg9.jpg",
  "bg10.jpeg",
  "bg11.jpg",
  "bg12.jpg",
];
const randomNumber = Math.floor(Math.random() * bgImages.length);
const selectedBgImages = bgImages[randomNumber];
document.body.style.backgroundImage = `url('img/${selectedBgImages}')`;
