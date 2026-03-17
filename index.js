// Load data from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");

// Display Data
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        let row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    // Save to localStorage
    localStorage.setItem("students", JSON.stringify(students));
}

// Validation Function
function validate(name, id, email, contact) {

    const nameRegex = /^[A-Za-z ]+$/;
    const idRegex = /^[0-9]+$/;
    const contactRegex = /^[0-9]{10,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters");
        return false;
    }

    if (!idRegex.test(id)) {
        alert("Student ID must be numeric");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return false;
    }

    if (!contactRegex.test(contact)) {
        alert("Contact must be at least 10 digits");
        return false;
    }

    return true;
}

// Add / Update Student
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const editIndex = document.getElementById("editIndex").value;

    if (!name || !id || !email || !contact) {
        alert("All fields are required!");
        return;
    }

    if (!validate(name, id, email, contact)) return;

    const studentData = { name, id, email, contact };

    if (editIndex === "") {
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        document.getElementById("editIndex").value = "";
    }

    form.reset();
    displayStudents();
});

// Edit
function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    document.getElementById("editIndex").value = index;
}

// Delete
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        displayStudents();
    }
}

// Initial display
displayStudents();