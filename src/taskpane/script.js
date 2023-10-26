// Function to retrieve data from the URL
function getDataFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const dataParam = urlParams.get("data");
  return JSON.parse(decodeURIComponent(dataParam));
}

// Function to display the data in the modal
function displayData() {
  const data = getDataFromUrl();
  const dataDisplay = document.getElementById("dataDisplay");
  dataDisplay.innerHTML = `Name: ${data.name}, Phone: ${data.phone}`;

  // Create a dynamic label and input for age
  const ageLabel = document.createElement("label");
  ageLabel.setAttribute("for", "ageInput");
  ageLabel.textContent = "Age: ";
  dataDisplay.appendChild(ageLabel);

  const ageInput = document.createElement("input");
  ageInput.setAttribute("type", "text");
  ageInput.setAttribute("id", "ageInput");
  ageInput.value = data.age;
  dataDisplay.appendChild(ageInput);

  // Create a button dynamically
  const sendButton = document.createElement("button");
  sendButton.innerHTML = "Send Data Back";
  sendButton.onclick = sendDataBack;

  // Append the button to the dataDisplay div
  dataDisplay.appendChild(sendButton);
}

function sendDataBack() {
  const data = getDataFromUrl();
  const age = document.getElementById("ageInput").value;
  data.age = age;

  localStorage.setItem("receivedData", JSON.stringify(data));

  const message = JSON.stringify(data);

  // Send the message to the parent window
  window.postMessage(message, "*");
}

// Display the data when the content is loaded
document.addEventListener("DOMContentLoaded", displayData);
console.log("Script is running");
