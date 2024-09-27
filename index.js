/**
 * if there is data in my localstorage, then use that data, or else do the server call
 */
const container = document.getElementById("container");
const removeButton = document.getElementById("remove");
let dataFromLocalStorage = JSON.parse(localStorage.getItem("data")) ?? [];
localStorage.setItem("shiva", "My name is shiva");

removeButton.addEventListener("click", () => {
  localStorage.removeItem("shiva");
});

let dataArray = []; // default data array

if (dataFromLocalStorage.length !== 0) {
  dataArray = dataFromLocalStorage;
  console.log("if the data is in local");
  appendData(dataArray);
} else {
  fetch("https://reqres.in/api/users?page=2").then((res) => {
    res.json().then((response) => {
      console.log(response.data);

      localStorage.setItem("data", JSON.stringify(response.data));
      dataArray = response.data;
      appendData(dataArray);
    });
    console.log("if the data is not in local");
  });
}

function deleteHandler(inputIndex) {
  dataArray = dataArray.filter((element, index) => {
    return inputIndex !== index;
  });

  localStorage.setItem("data", JSON.stringify(dataArray));
  appendData(dataArray);
}

function appendData(inputArray) {
  container.innerHTML = ""; // resetting the ui

  inputArray.forEach((element, index) => {
    const userContainer = document.createElement("div");

    const nameElement = document.createElement("h2");
    nameElement.innerText = element.first_name;

    const emailElement = document.createElement("h3");
    emailElement.innerText = element.email;

    const deleteElement = document.createElement("button");
    deleteElement.innerText = "Delete";
    deleteElement.addEventListener("click", () => {
      deleteHandler(index);
    });

    const updateElement = document.createElement("button");
    updateElement.innerText = "Update";
    updateElement.addEventListener("click", () => {
      window.location.href = `./information.html?user=${index}`;
    });

    userContainer.append(
      nameElement,
      emailElement,
      updateElement,
      deleteElement
    );
    container.appendChild(userContainer);
  });
}
