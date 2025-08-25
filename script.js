const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const addPersonBtn = document.getElementById("add-person-btn");
const btnClose1 = document.getElementById("btn-close1");
const btnClose2 = document.getElementById("btn-close2");
const addBtn = document.getElementById("add-btn1");
const editBtn = document.getElementById("add-btn2");
const removeBtn = document.getElementById("add-btn3");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const phoneNumber = document.getElementById("phonenumber");
const firstNameEdit = document.getElementById("firstname-edit");
const lastNameEdit = document.getElementById("lastname-edit");
const phoneNumberEdit = document.getElementById("phonenumber-edit");
const newPerson = document.querySelector(".box1 table tbody");
const search = document.querySelector(".search-box input");
let newItem = 1;
let selectedRow = null;
function reNumber() {
  const rows = newPerson.querySelectorAll("tr");
  let counter = 1;
  rows.forEach((row) => {
    row.children[0].textContent = counter++;
  });
}
function add() {
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    phoneNumber.value == ""
  ) {
    alert("لطفا همه فیلد هارا پر کنید");
  } else {
        newPerson.insertAdjacentHTML(
          "beforeend",
          `
        <tr>
            <td>0</td>
            <td>${firstName.value}</td>
            <td>${lastName.value}</td>
            <td>${phoneNumber.value}</td>
        </tr>`
        );
        reNumber();
        firstName.value = "";
        lastName.value = "";
        phoneNumber.value = "";
        box2.classList.remove("show");
  }
}
addPersonBtn.addEventListener("click", function () {
  box2.classList.add("show");
  firstName.focus();
});
btnClose1.addEventListener("click", function () {
  box2.classList.remove("show");
});
addBtn.addEventListener("click", add);
box2.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    add();
  }
});
search.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();
  let rows = newPerson.querySelectorAll("tr");
  rows.forEach((row) => {
    let text = row.textContent.toLowerCase();
    if (text.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
btnClose2.addEventListener("click", function () {
  box3.classList.remove("show");
});
const tbody = document.querySelector("tbody");
tbody.addEventListener("dblclick", function (e) {
  const clickedRow = e.target.closest("tr");
  if (clickedRow) {
    selectedRow = clickedRow;
    firstNameEdit.value = clickedRow.children[1].textContent;
    lastNameEdit.value = clickedRow.children[2].textContent;
    phoneNumberEdit.value = clickedRow.children[3].textContent;
    box3.classList.add("show");
  }
});
document.addEventListener("click", function (e) {
  if (!box2.contains(e.target) && !addPersonBtn.contains(e.target)) {
    box2.classList.remove("show");
  }
});
document.addEventListener("click", function (e) {
  if (!box3.contains(e.target)) {
    box3.classList.remove("show");
  }
});
removeBtn.addEventListener("click", function () {
  if (selectedRow) {
    selectedRow.remove();
    reNumber();
    box3.classList.remove("show");
    selectedRow = null;
  }
});
editBtn.addEventListener("click", function () {
  if (selectedRow) {
    selectedRow.children[1].textContent = firstNameEdit.value ;
    selectedRow.children[2].textContent = lastNameEdit.value ;
    selectedRow.children[3].textContent = phoneNumberEdit.value ;
    box3.classList.remove("show");
    selectedRow = null;
  }
});

