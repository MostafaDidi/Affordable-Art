document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("selections-list");
  
    const visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    const pictures = JSON.parse(localStorage.getItem("pictures")) || [];
  
    if (visitors.length === 0) {
      container.innerHTML = "<p>No selections yet.</p>";
      return;
    }
  
    visitors.forEach(visitor => {
      const div = document.createElement("div");
      div.className = "visitor-item";
  
      const selectedPictures = (visitor.pictureIds || []).map(id => {
        const pic = pictures.find(p => p.id === id);
        if (!pic) return "";
        return `
  <div style="text-align: center;" data-picture-id="${id}" data-visitor-email="${visitor.email || visitor.id}">
    <img src="images/${id}.jpg" alt="${pic.name}" style="width: 100px; border-radius: 6px;">
    <p>${pic.name}</p>
    <button class="remove-btn">Remove</button>
  </div>
`;

      }).join("");
  /*
      div.innerHTML = `
        <p><span>Name:</span> ${visitor.name}</p>
        <p><span>Email:</span> ${visitor.email}</p>
        <p><span>Comment:</span> ${visitor.comment}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 10px;">
          ${selectedPictures || "<p>No pictures selected.</p>"}
        </div>
      `;
  */
      div.innerHTML = `
      <p><span>Name:</span> ${visitor.name}</p>
      <p><span>Email:</span> ${visitor.email}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 10px;">
        ${selectedPictures || "<p>No pictures selected.</p>"}
      </div>
    `;


      container.appendChild(div);
    });

    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-btn")) {
        const picDiv = e.target.closest("div[data-picture-id]");
        const pictureId = picDiv.dataset.pictureId;
        const visitorEmail = picDiv.dataset.visitorEmail;
    
        let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    
        const visitor = visitors.find(v => v.email === visitorEmail || v.id === visitorEmail);
        if (visitor && visitor.pictureIds) {
          visitor.pictureIds = visitor.pictureIds.filter(id => id !== pictureId);
        }
    
        // Remove visitor if no selections and no comment
        if (visitor && visitor.pictureIds.length === 0 && !visitor.comment) {
          visitors = visitors.filter(v => (v.email || v.id) !== visitorEmail);
        }
    
        localStorage.setItem("visitors", JSON.stringify(visitors));
    
        // Refresh the page or just remove this item from DOM
        location.reload(); // simpler approach for now
      }
    });
    

  });
  