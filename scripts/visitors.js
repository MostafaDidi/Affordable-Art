const visitors = [
    { email: "alice@example.com", name: "Alice", comment: "I love this piece!", pictureId: "b12" },
    { email: "bob@example.com", name: "Bob", comment: "Amazing colors and composition.", pictureId: "b34" },
    { email: "carol@example.com", name: "Carol", comment: "Reminds me of summer.", pictureId: "b7" },
    { email: "david@example.com", name: "David", comment: "This is truly inspiring!", pictureId: "b100" },
    { email: "eve@example.com", name: "Eve", comment: "Beautiful brushwork.", pictureId: "b1" }
  ];


// Load from localStorage or initialize with sample data

// Save to localStorage whenever the array is updated
function saveVisitors() {
  localStorage.setItem('visitors', JSON.stringify(visitors));
}
