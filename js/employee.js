document.getElementById("employeeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const emp = {
    name: document.getElementById("name").value,
    id: document.getElementById("empId").value,
    age: document.getElementById("age").value,
    role: document.getElementById("role").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value
  };

  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(emp);
  localStorage.setItem("employees", JSON.stringify(employees));

  document.getElementById("employeeForm").reset();
  renderEmployeeList();
});

function renderEmployeeList() {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";

  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.forEach(emp => {
    const li = document.createElement("li");
    li.textContent = `${emp.name} - ${emp.role}`;
    list.appendChild(li);
  });
}

window.onload = renderEmployeeList;

document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = document.getElementById("photo").files[0];

  reader.onloadend = function () {
    const employee = {
      photo: reader.result || "", // Base64 image string
      name: document.getElementById("name").value,
      empId: document.getElementById("empId").value,
      age: document.getElementById("age").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      department: document.getElementById("department").value,
      role: document.getElementById("role").value,
      joiningDate: document.getElementById("joiningDate").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value
    };

    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    this.reset();
    displayEmployees();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    // If no file is selected, still store text data
    reader.onloadend();
  }
});

function displayEmployees() {
  const employeeList = document.getElementById("employeeList");
  employeeList.innerHTML = "";

  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  employees.forEach(emp => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="employee-card">
        <img src="${emp.photo || 'default.png'}" alt="Profile Photo" class="emp-photo" />
        <div class="emp-details">
          <strong>${emp.name}</strong> (${emp.empId})<br>
          <small>${emp.role} - ${emp.department}</small>
        </div>
      </div>
    `;
    employeeList.appendChild(li);
  });
}
window.onload = function () {
  displayEmployees();
};


let editIndex = null;

document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emp = {
    name: document.getElementById("name").value,
    id: document.getElementById("empId").value,
    age: document.getElementById("age").value,
    role: document.getElementById("role").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
  };

  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  if (editIndex !== null) {
    employees[editIndex] = emp;
    editIndex = null;
  } else {
    employees.push(emp);
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  document.getElementById("employeeForm").reset();
  renderEmployeeList();
});

function renderEmployeeList() {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";

  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  employees.forEach((emp, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${emp.name}</strong> (${emp.id}) - ${emp.role}<br/>
      Age: ${emp.age}, Phone: ${emp.phone}<br/>
      Address: ${emp.address}
      <br/>
      <button onclick="editEmployee(${index})">✏️ Edit</button>
      <button onclick="deleteEmployee(${index})">🗑️ Delete</button>
    `;
    list.appendChild(li);
  });
}

function editEmployee(index) {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const emp = employees[index];

  document.getElementById("name").value = emp.name;
  document.getElementById("empId").value = emp.id;
  document.getElementById("age").value = emp.age;
  document.getElementById("role").value = emp.role;
  document.getElementById("phone").value = emp.phone;
  document.getElementById("address").value = emp.address;

  editIndex = index;
}

function deleteEmployee(index) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployeeList();
}

window.onload = renderEmployeeList;
