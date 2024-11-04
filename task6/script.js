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
            <button class="close-btn" onclick="this.parentElement.remove()">×</button>
        `;

    this.container.appendChild(notification);

    if (autoClose) {
      setTimeout(() => {
        notification.remove();
      }, duration);
    }

    notification.addEventListener("click", () => notification.remove());
  }
}

const notificationContainer = document.getElementById("notificationContainer");
const notifier = new Notification(notificationContainer);
