let ulEle = document.getElementById("unordering");

let addBtn = document.getElementById("adding");

let saveEle = document.getElementById("saving");

function getLocalStorageData() {
  let strigyedData = localStorage.getItem("itemsCon");
  let parsedata = JSON.parse(strigyedData);
  if (parsedata === null) {
    return [];
  } else {
    return parsedata;
  }
}

// let itemsCon = [
//   {
//     item: "Learn HTML",
//     uniqueNo: 1,
//   },
//   {
//     item: "Learn CSS",
//     uniqueNo: 2,
//   },
//   {
//     item: "Learn javascript",
//     uniqueNo: 3,
//   },
//   {
//     item: "bootstrap",
//     uniqueNo: 4,
//   },
// ];
let itemsCon = getLocalStorageData();
saveEle.onclick = function () {
  localStorage.setItem("itemsCon", JSON.stringify(itemsCon));
};
let todoCount = itemsCon.length;

function onCheckStrike(checkId, labelId) {
  let checkStr = document.getElementById(checkId);
  let labelStr = document.getElementById(labelId);
  labelStr.classList.toggle("strike");
}
function onDeleteItem(todoId) {
  let getTodo = document.getElementById(todoId);

  ulEle.removeChild(getTodo);

  let delIndex = itemsCon.findIndex(function (each) {
    let eachId = "todo" + each.uniqueNo;
    if (eachId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  itemsCon.splice(delIndex, 1);
}
function createAndAppend(todo) {
  let checkId = "checkbox" + todo.uniqueNo;
  //console.log(checkId);

  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let listEle = document.createElement("li");
  listEle.id = todoId;
  listEle.classList.add("list", "d-flex", "flex-row");
  ulEle.appendChild(listEle);

  let checkEle = document.createElement("input");
  checkEle.type = "checkbox";
  checkEle.classList.add("checking");
  checkEle.id = checkId;
  checkEle.onclick = function () {
    onCheckStrike(checkId, labelId);
  };
  listEle.appendChild(checkEle);

  let divCon = document.createElement("div");
  divCon.classList.add("d-flex", "flex-row", "divi");
  listEle.appendChild(divCon);

  let labelEle = document.createElement("label");
  labelEle.classList.add("labeling");
  labelEle.htmlFor = checkId;
  labelEle.id = labelId;
  labelEle.textContent = todo.item;
  divCon.appendChild(labelEle);

  let delBtn = document.createElement("button");
  delBtn.classList.add("btn", "btn-primary");
  delBtn.textContent = "Delete";
  delBtn.onclick = function () {
    onDeleteItem(todoId);
  };
  divCon.appendChild(delBtn);
}
for (let todo of itemsCon) {
  createAndAppend(todo);
}

//adding new data
function newData() {
  let inputCheck = document.getElementById("texting");
  let valueing = inputCheck.value;
  if (inputCheck.value === "") {
    alert("Enter the data");
    return;
  }

  todoCount = todoCount + 1;
  let newList = {
    item: valueing,
    uniqueNo: todoCount,
  };

  itemsCon.push(newList);
  createAndAppend(newList);
  inputCheck.value = "";
}

addBtn.onclick = function () {
  newData();
};
