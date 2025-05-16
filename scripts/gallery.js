
let storedPictures = JSON.parse(localStorage.getItem("pictures"));
let pictures = storedPictures || window.pictures;  // uses your picture.js data if no localStorage

const galleryDiv = document.getElementById("gallery");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");

let currentIndex = 0;
const pageSize = 5;

function showGallery() {
  galleryDiv.innerHTML = "";

  const pagePics = pictures.slice(currentIndex, currentIndex + pageSize);
  pagePics.forEach(pic => {
    const img = document.createElement("img");
    img.src = `images/${pic.id}.jpg`; // Or .png based on your files
    img.alt = pic.name;
    img.onclick = () => showPopup(pic);
    galleryDiv.appendChild(img);
  });

 }

/*function showPopup(pic) {
    popupImg.src = `images/${pic.id}.jpg`;
    popupTitle.textContent = pic.name;
    popupDescription.textContent = pic.description;
    popup.style.display = "flex"; // was block before
  }

  */
  
  function closePopup() {
    popup.style.display = "none";
  }
  

function prevPage() {
  if (currentIndex > 0) {
    currentIndex -= pageSize;
    showGallery();
  }
}

function nextPage() {
  if (currentIndex + pageSize < pictures.length) {
    currentIndex += pageSize;
    showGallery();
  }
}

window.addEventListener("DOMContentLoaded", showGallery);
const commentForm = document.getElementById("comment-form");
const emailInput = document.getElementById("visitor-email");
const nameInput = document.getElementById("visitor-name");
const commentInput = document.getElementById("visitor-comment");
const commentMessage = document.getElementById("comment-message");

let currentPictureId = "";

function showPopup(pic) {
  currentPictureId = pic.id;
  popupImg.src = `images/${pic.id}.jpg`;
  popupTitle.textContent = pic.name;
 /* popupDescription.textContent = pic.description;*/
  popup.style.display = "flex";

  emailInput.value = "";
  nameInput.value = "";
  commentInput.value = "";
  commentMessage.textContent = "";
}

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const visitorEmail = emailInput.value.trim();
  const visitorName = nameInput.value.trim();
  const visitorComment = commentInput.value.trim();

  if (!visitorEmail || !visitorName || !visitorComment) {
    commentMessage.textContent = "All fields are required.";
    return;
  }

  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  // Try to find existing visitor
  let visitor = visitors.find(v => v.email === visitorEmail || v.id === visitorEmail);

  if (visitor) {
    // Update name and comment
    visitor.name = visitorName;
    visitor.comment = visitorComment;

    // Add pictureId to pictureIds array if not already present
    if (!visitor.pictureIds) visitor.pictureIds = [];
    if (!visitor.pictureIds.includes(currentPictureId)) {
      visitor.pictureIds.push(currentPictureId);
    }

  } else {
    // New visitor
    visitor = {
      email: visitorEmail,
      name: visitorName,
      comment: visitorComment,
      pictureIds: [currentPictureId]
    };
    visitors.push(visitor);
  }

  localStorage.setItem("visitors", JSON.stringify(visitors));
  commentMessage.textContent = "Thanks for your comment!";
  commentForm.reset();
});

const selectBtn = document.getElementById("select-picture-btn");

selectBtn.addEventListener("click", () => {
  const visitorEmail = emailInput.value.trim();
  const visitorName = nameInput.value.trim();

  if (!visitorEmail || !visitorName) {
    commentMessage.textContent = "Please enter your name and email to select a picture.";
    return;
  }

  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  let visitor = visitors.find(v => v.email === visitorEmail || v.id === visitorEmail);

  if (visitor) {
    if (!visitor.pictureIds) visitor.pictureIds = [];
    if (!visitor.pictureIds.includes(currentPictureId)) {
      visitor.pictureIds.push(currentPictureId);
    }
  } else {
    visitor = {
      email: visitorEmail,
      name: visitorName,
      comment: "",
      pictureIds: [currentPictureId]
    };
    visitors.push(visitor);
  }

  localStorage.setItem("visitors", JSON.stringify(visitors));
  commentMessage.textContent = "Picture selected!";
  commentForm.reset();
});



