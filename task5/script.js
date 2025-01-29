class Tab {
  constructor(container) {
    this.container = container;
    this.tabButtons = document.createElement("div");
    this.tabButtons.className = "tab-buttons";
    this.container.appendChild(this.tabButtons);

    this.tabContents = document.createElement("div");
    this.tabContents.className = "tab-contents";
    this.container.appendChild(this.tabContents);

    this.tabs = [];
  }

  createTabButton(title, index) {
    const tabButton = document.createElement("button");
    tabButton.className = "tab-button";
    tabButton.innerText = title;
    tabButton.addEventListener("click", () => this.switchTab(index));
    return tabButton;
  }

  createTabContent(content) {
    const tabContent = document.createElement("div");
    tabContent.className = "tab-content";
    tabContent.innerHTML = content;
    return tabContent;
  }

  addTab(title, content) {
    const tabIndex = this.tabs.length;

    const tabButton = this.createTabButton(title, tabIndex);
    const tabContent = this.createTabContent(content);

    this.tabButtons.appendChild(tabButton);
    this.tabContents.appendChild(tabContent);

    this.tabs.push({ button: tabButton, content: tabContent });

    if (this.tabs.length === 1) {
      this.switchTab(0);
    }
  }

  switchTab(index) {
    this.tabs.forEach((tab, i) => {
      tab.button.classList.toggle("active", i === index);
      tab.content.classList.toggle("active", i === index);
    });
  }
}

const tabContainer = document.getElementById("tabContainer");
const tabComponent = new Tab(tabContainer);

function addNewTab() {
  const title = document.getElementById("tabTitle").value;
  const content = document.getElementById("tabContent").value;

  if (title.trim() === "" || content.trim() === "") {
    alert("Будь ласка, заповніть усі поля");
    return;
  }

  tabComponent.addTab(title, content);

  document.getElementById("tabTitle").value = "";
  document.getElementById("tabContent").value = "";
}
