function loadEmployees() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const select = document.getElementById("empSelect");
    select.innerHTML = `<option value="">--Select Employee--</option>`;
    employees.forEach(emp => {
      const option = document.createElement("option");
      option.value = JSON.stringify({ empId: emp.empId, name: emp.name }); // store both
      option.textContent = `${emp.name} (${emp.empId})`;
      select.appendChild(option);
    });
  }

  

  const attendanceForm = document.getElementById("attendanceForm");
let attendanceRecords = JSON.parse(localStorage.getItem("attendance")) || [];

attendanceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedValue = document.getElementById("empSelect").value;
  const status = document.getElementById("status").value;

  if (!selectedValue || !status) {
    alert("Please select employee and status");
    return;
  }

  const { empId, name } = JSON.parse(selectedValue);
  const now = new Date();
  const record = {
    empId,
    name,
    status,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

  attendanceRecords.push(record);
  localStorage.setItem("attendance", JSON.stringify(attendanceRecords));
  renderAttendance();
  attendanceForm.reset();
});



function renderAttendance() {
    const attendanceTable = document.querySelector("#attendanceTable tbody");
    attendanceTable.innerHTML = "";
  
    attendanceRecords.forEach(record => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${record.name} (${record.empId})</td>
        <td>${record.status}</td>
        <td>${record.date}</td>
        <td>${record.time}</td>
      `;
      attendanceTable.appendChild(tr);
    });
  }

  

  function searchAttendance() {
    const empIdInput = document.getElementById("searchEmpId").value.trim().toLowerCase();
    const resultTable = document.querySelector("#employeeHistoryTable tbody");
    const searchResultsDiv = document.getElementById("searchResults");
    const noHistoryMsg = document.getElementById("noHistoryMsg");
  
    resultTable.innerHTML = "";
    noHistoryMsg.style.display = "none";
  
    if (!empIdInput) {
      alert("Please enter an Employee ID.");
      searchResultsDiv.style.display = "none";
      return;
    }
  
    const matchedRecords = attendanceRecords.filter(r => r.empId.toLowerCase() === empIdInput);
  
    if (matchedRecords.length === 0) {
      searchResultsDiv.style.display = "block";
      noHistoryMsg.style.display = "block";
      return;
    }
  
    searchResultsDiv.style.display = "block";
    noHistoryMsg.style.display = "none";
  
    matchedRecords.forEach(record => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${record.name} (${record.empId})</td>
        <td>${record.status}</td>
        <td>${record.date}</td>
        <td>${record.time}</td>
      `;
      resultTable.appendChild(tr);
    });
  }

  

  function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Employee Attendance Records", 10, 10);
    let y = 20;
  
    attendanceRecords.forEach((r, i) => {
      doc.text(`${i + 1}. ${r.name} (${r.empId}) - ${r.status} - ${r.date} - ${r.time}`, 10, y);
      y += 10;
    });
  
    doc.save("All_Attendance_Records.pdf");
  }

  


  function downloadEmployeePDF() {
    const { jsPDF } = window.jspdf;
    const empId = document.getElementById("searchEmpId").value.trim();
    const filtered = attendanceRecords.filter(r => r.empId === empId);
  
    if (filtered.length === 0) {
      alert("No data to export.");
      return;
    }
  
    const empName = filtered[0].name;
    const doc = new jsPDF();
    doc.text(`Attendance for ${empName} (${empId})`, 10, 10);
    let y = 20;
  
    filtered.forEach((r, i) => {
      doc.text(`${i + 1}. ${r.status} - ${r.date} - ${r.time}`, 10, y);
      y += 10;
    });
  
    doc.save(`${empName}_${empId}_Attendance_History.pdf`);
  }

  
  window.onload = () => {
    loadEmployees();
    renderAttendance();
  };

  

  function downloadEmployeePDF() {
    const { jsPDF } = window.jspdf;
    const empId = document.getElementById("searchEmpId").value.trim();
    const filtered = attendanceRecords.filter(r => r.empId === empId);
  
    if (filtered.length === 0) {
      alert("No data to export.");
      return;
    }
  
    const empName = filtered[0].name;
    const doc = new jsPDF();
    doc.text(`Attendance for ${empName} (${empId})`, 10, 10);
    let y = 20;
  
    filtered.forEach((r, i) => {
      doc.text(`${i + 1}. ${r.status} - ${r.date} - ${r.time}`, 10, y);
      y += 10;
    });
  
    doc.save(`${empName}_${empId}_Attendance_History.pdf`);
  }
  