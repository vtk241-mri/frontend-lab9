class Form {
  constructor(container, fields = []) {
    this.container = container;
    this.fields = fields;
    this.form = document.createElement("form");
    this.form.className = "form-container";

    this.fields.forEach((field) => this.addField(field));

    this.addSubmitButton();

    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.container.appendChild(this.form);
  }

  createInput(field) {
    const input = document.createElement("input");
    input.type = field.type || "text";
    input.name = field.name;
    input.placeholder = field.placeholder || "";
    input.required = field.required || false;
    return input;
  }
  createLabel(text) {
    const label = document.createElement("label");
    label.innerText = text;
    return label;
  }

  createErrorMessage() {
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    return errorMessage;
  }

  addField(field) {
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    formGroup.appendChild(this.createLabel(field.label));
    formGroup.appendChild(this.createInput(field));
    formGroup.appendChild(this.createErrorMessage());

    this.form.appendChild(formGroup);
  }

  addSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "form-button";
    submitButton.innerText = "Відправити";
    this.form.appendChild(submitButton);
  }

  getFormElements() {
    return Array.from(this.form.elements).filter((el) => el.type !== "submit");
  }

  handleSubmit(event) {
    event.preventDefault();

    let isValid = true;
    const formData = {};

    Array.from(this.form.elements).forEach((element) => {
      if (element.type !== "submit") {
        if (!this.validateField(element)) isValid = false;
        else formData[element.name] = element.value;
      }
    });

    if (isValid) {
      this.processFormData(formData);
    }
  }

  validateField(element) {
    const errorMessage = element.parentElement.querySelector(".error-message");
    if (!element.checkValidity()) {
      errorMessage.innerText = `Поле ${element.name} не заповнене коректно`;
      return false;
    } else {
      errorMessage.innerText = "";
      return true;
    }
  }

  processFormData(data) {
    console.log("Дані форми:", data);
    alert("Форма відправлена успішно!");
    this.form.reset();
  }
}

const formContainer = document.getElementById("formContainer");
const form = new Form(formContainer, [
  {
    label: "Ім'я",
    name: "name",
    type: "text",
    placeholder: "Введіть ім'я",
    required: true,
  },
  {
    label: "Електронна пошта",
    name: "email",
    type: "email",
    placeholder: "Введіть email",
    required: true,
  },
  {
    label: "Пароль",
    name: "password",
    type: "password",
    placeholder: "Введіть пароль",
    required: true,
  },
]);
