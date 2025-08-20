const box2 = document.getElementById("box2");
const addPersonBtn = document.getElementById("add-person-btn");
const btnClose = document.getElementById("btn-close");
const addBtn = document.getElementById("add-btn");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const phoneNumber = document.getElementById("phonenumber");
const newPerson = document.querySelector(".box1 table tbody");
const search = document.querySelector(".search-box input");
let newItem = 1;
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/contacts")
    .then(res => res.json())
    .then(data => {
      data.forEach(person => {
        newPerson.insertAdjacentHTML("beforeend", `
          <tr>
            <td>${person.id}</td>
            <td>${person.firstname}</td>
            <td>${person.lastname}</td>
            <td>${person.phone}</td>
          </tr>
        `);
      });
    });
});
function add(){
      if(firstName.value == "" || lastName.value == "" || phoneNumber.value == ""){
        alert("لطفا همه فیلد هارا پر کنید");
    } else{
         fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        phone: phoneNumber.value
      })
    })
      .then(res => res.json())
      .then(data => {
          newPerson.insertAdjacentHTML("beforeend",`
        </tr>
            <td>
               ${newItem++}
            </td>
            <td>
                 ${firstName.value}
            </td>
            <td>
                 ${lastName.value}
            </td>
            <td>
                 ${phoneNumber.value}
            </td>
        </tr>`);
        firstName.value = "";
        lastName.value = "";
        phoneNumber.value = "";
       box2.classList.remove("show");
    });
   }
 }
addPersonBtn.addEventListener("click", function(){
    box2.classList.add("show")
    firstName.focus();
});
btnClose.addEventListener("click", function(){
    box2.classList.remove("show")
});
document.addEventListener("click", function(e) {
  if (!box2.contains(e.target) && !addPersonBtn.contains(e.target)) {
    box2.classList.remove("show");
  }
});
addBtn.addEventListener("click",add);
box2.addEventListener("keyup",function(e){
    if(e.key === "Enter"){
        add();
    };
});
search.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();
  let rows = newPerson.querySelectorAll("tr");
  
  rows.forEach(row => {
    let text = row.textContent.toLowerCase();
    if (text.includes(value)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
