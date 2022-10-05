"use strict";
//1
const form = document.forms.todoList;
const { todoItem } = form;
const errorMessage = document.querySelector(".errorMessage");
const todoItemValue = document.getElementById("todoItemValue");
const addBtn = document.getElementById("addBtn");
const listNode = document.getElementById("list");

const isEmptyField = (field) => {
  return field.value.trim().length === 0;
};

form.onsubmit = (event) => {
  event.preventDefault();
  if (isEmptyField(todoItem)) {
    todoItem.classList.add("error");
    errorMessage.innerHTML = "Please, enter valid nickname";
      return;
    }
  else {
    addTodo(todoItemValue.value);
    todoItemValue.value = "";
  }
}

todoItem.oninput = () => {
  const isErrorField = todoItem.classList.contains("error");
  if (isErrorField) {
    todoItem.classList.remove("error");
    errorMessage.innerHTML = "";
  }
};

function addTodo(value){
  const listItemNode = document.createElement('li');
  const itemButtonNode = document.createElement('button');
  const checkNode = document.createElement('input');
  checkNode.setAttribute("type", "checkbox");
  itemButtonNode.classList.add("remove-button");
  listItemNode.classList.add("listItem");
  listItemNode.innerHTML = value;
  listItemNode.prepend(checkNode);
  itemButtonNode.innerHTML = "delete";
  listItemNode.append(itemButtonNode);
  listNode.append(listItemNode);
  listNode.onchange = (event) => {
    const isChecked = event.target.checked;
    itemButtonNode.setAttribute("disabled", "disabled");
    listItemNode.classList.add("done");
    checkNode.setAttribute("disabled", "disabled");
  };
}

listNode.addEventListener("click", (event) => {
  const isRemoveButton = event.target.className === "remove-button";
  if (isRemoveButton) {
    const removeButton = event.target;
    const listTitleBlock = removeButton.closest(".listItem");
    listTitleBlock.remove();
  }
});