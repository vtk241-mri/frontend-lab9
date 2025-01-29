class Notification {
  constructor(container) {
    this.container = container;
  }

  createNotification(
    message,
    type = "info",
    autoClose = true,
    duration = 3000
  ) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button class="close-btn">×</button>
        `;

    const closeButton = notification.querySelector(".close-btn");
    closeButton.addEventListener("click", () => notification.remove());

    this.container.appendChild(notification);

    if (autoClose) {
      setTimeout(() => notification.remove(), duration);
    }
  }
}

const notificationContainer = document.getElementById("notificationContainer");
const notifier = new Notification(notificationContainer);
