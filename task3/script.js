class Table {
  constructor(container, headers = []) {
    this.container = container;
    this.headers = headers;
    this.data = [];

    this.table = document.createElement("table");
    this.container.appendChild(this.table);

    this.createHeader();
  }

  createHeader() {
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    this.headers.forEach((header) => {
      const th = this.createCell(header, "th");
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    this.table.appendChild(thead);
  }

  addRow(rowData = []) {
    const tbody = this.getTBody();
    const row = document.createElement("tr");

    this.headers.forEach((header, i) => {
      const cell = this.createCell(rowData[i] || "", "td");
      row.appendChild(cell);
    });

    tbody.appendChild(row);
    this.table.appendChild(tbody);
  }

  addColumn(headerName) {
    this.headers.push(headerName);
    const th = this.createCell(headerName, "th");
    this.table.querySelector("thead tr").appendChild(th);

    const rows = this.table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const cell = document.createElement("td");
      row.appendChild(cell);
    });
  }

  createCell(content, tagName) {
    const cell = document.createElement(tagName);
    cell.innerText = content;
    return cell;
  }

  getTBody() {
    return this.table.querySelector("tbody") || document.createElement("tbody");
  }
}

const tableContainer = document.getElementById("tableContainer");
const table = new Table(tableContainer, ["Ім'я", "Прізвище", "Вік"]);

function addRow() {
  table.addRow(["Іван", "Іванов", "25"]);
}

function addColumn() {
  const newColumnHeader = `Стовпець ${table.headers.length + 1}`;
  table.addColumn(newColumnHeader);
}
