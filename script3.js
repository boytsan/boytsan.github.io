document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shopping-form");
    const input = document.getElementById("new-item");
    const shoppingList = document.getElementById("shopping-list");
  
    // Додавання нового елементу
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const itemName = input.value.trim();
  
      if (itemName !== "") {
        addItemToList(itemName);
        input.value = ""; // Очистка поля вводу
        input.focus(); // Фокус на поле вводу
      }
    });
  
    // Функція додавання елемента до списку
    function addItemToList(name) {
      const listItem = document.createElement("li");
  
      const itemText = document.createElement("span");
      itemText.textContent = name;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this item?")) {
          shoppingList.removeChild(listItem);
        }
      });
  
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "edit";
      editButton.addEventListener("click", () => {
        editItem(listItem, itemText);
      });
  
      listItem.appendChild(itemText);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
  
      shoppingList.appendChild(listItem);
    }
  
    // Функція редагування елемента
    function editItem(listItem, itemText) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = itemText.textContent;
      editInput.className = "edit-input";
  
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.className = "edit";
      saveButton.addEventListener("click", () => {
        const newValue = editInput.value.trim();
        if (newValue !== "") {
          itemText.textContent = newValue;
          listItem.replaceChild(itemText, editInput);
          listItem.replaceChild(editButton, saveButton);
        } else {
          alert("Item name cannot be empty!");
        }
      });
  
      listItem.replaceChild(editInput, itemText);
      listItem.replaceChild(saveButton, listItem.querySelector(".edit"));
      editInput.focus();
    }
  });
  