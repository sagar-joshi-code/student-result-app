//selecting inputs
const nameInput = document.querySelector("#nameInput");
const marksInput = document.querySelector("#marksInput");

//selecting btn
const addBtn = document.querySelector("#addBtn");
const allBtn = document.querySelector(".all");
const passBtn = document.querySelector(".pass");
const failBtn = document.querySelector(".fail");

//selecting UL
const studentList = document.querySelector("#studentList");

//making student array list
const students = [];

//adding functionality on addBtn
addBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const marks = Number(marksInput.value);
  if (name !== "" && marks >= 0 && marks <= 100) {
    students.push({ name: name, marks: marks });
  } else {
    alert("Please Enter a Name and Marks");
  }
  renderStudent(students);
});

function renderStudent(studentArr) {
  studentList.textContent = "";
  studentArr.forEach((student, index) => {
    const li = document.createElement("li");
    li.textContent = `Name: ${student.name} - Marks: ${student.marks}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.width = "40px";
    deleteBtn.addEventListener("click", () => {
      students.splice(index, 1);
      renderStudent(students);
    });
    li.appendChild(deleteBtn);
    studentList.appendChild(li);
  });
  nameInput.value = "";
  marksInput.value = "";
}
renderStudent(students);

//showing all students
allBtn.addEventListener("click", () => {
  console.log("All Clicked", students);

  renderStudent(students);
});

//showing passed student
passBtn.addEventListener("click", () => {
  const passedStudent = students.filter((s) => {
    return s.marks >= 40;
  });
  renderStudent(passedStudent);
});

//showing failed student
failBtn.addEventListener("click", () => {
  const failedStudent = students.filter((s) => {
    return s.marks < 40;
  });
  renderStudent(failedStudent);
});

//topper logic
function getTopper() {
  //finding highest marks
  const maxMarks = students.reduce((max, student) => {
    return student.marks > max ? student.marks : max;
  }, 0);
  return students.filter((s) => s.marks === maxMarks);
}

//adding functionality on topperBtn
const topperBtn = document.querySelector(".topper");
topperBtn.addEventListener("click", () => {
  const topper = getTopper();
  renderStudent(topper);
});

//calculating total marks
const totalBtn = document.querySelector(".Total");
totalBtn.addEventListener("click", () => {
  function getTotalMarks() {
    return students.reduce((acc, student) => acc + student.marks, 0);
  }
  const total = getTotalMarks();
  alert("Total Marks: " + total);
});

//calculating average  marks
const averageMarks = document.querySelector(".average");
averageMarks.addEventListener("click", () => {
  function getAverageMarks() {
    return students.reduce((acc, student) => acc + student.marks, 0);
  }
  const total = getAverageMarks();
  const average = total / students.length;
  alert("Average:" + average);
});

//arranging in marks in ascending
const sortBtn = document.querySelector(".sort");
sortBtn.addEventListener("click", () => {
  function getSortedStudent() {
    return students.slice().sort((a, b) => b.marks - a.marks);
  }
  const sortedStudent = getSortedStudent();
  renderStudent(sortedStudent);
});

//adding functionality on search btn
const searchBtn = document.querySelector("#SearchBtn");
searchBtn.addEventListener("input", () => {
  const value = searchBtn.value;
  const filteredStudent = students.filter((eachStudent) => {
    return eachStudent.name.toLowerCase().includes(value.trim().toLowerCase());
  });
  renderStudent(filteredStudent);
});
