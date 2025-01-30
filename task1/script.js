class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";

    this.header = document.createElement("div");
    this.header.className = "modal-header";
    this.header.textContent = "Модальне вікно";

    this.closeButton = document.createElement("span");
    this.closeButton.className = "modal-close";
    this.closeButton.textContent = "×";
    this.closeButton.onclick = () => this.close();

    this.body = document.createElement("div");
    this.body.className = "modal-body";

    this.header.appendChild(this.closeButton);
    this.modal.appendChild(this.header);
    this.modal.appendChild(this.body);
    document.body.appendChild(this.modal);
  }

  open(content) {
    this.setContent(content);
    this.modal.style.display = "block";
    this.modal.style.left = "50%";
    this.modal.style.top = "50%";
    this.modal.style.transform = "translate(-50%, -50%)";
  }

  setContent(content) {
    this.body.innerHTML = content;
  }
}

close() {
    this.modal.style.display = "none";
  }

  setContent(content) {
    this.body.innerHTML = content;
  }

  initDrag() {
    let isDragging = false;
    let offsetX, offsetY;

    this.header.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - this.modal.offsetLeft;
      offsetY = e.clientY - this.modal.offsetTop;
      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("mouseup", this.stopDrag);
    });

    this.handleDrag = (e) => {
      if (isDragging) {
        this.modal.style.left = e.clientX - offsetX + "px";
        this.modal.style.top = e.clientY - offsetY + "px";
      }
    };

    this.stopDrag = () => {
      isDragging = false;
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    };
  }
}

const modal = new Modal();
