// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const clearBtn = document.getElementById("clearBtn");

// Track attendance
let count = 0;
const maxCount = 50; // Set a maximum count for demonstration purposes

// Track attendees by team
const teamAttendees = {
  water: [],
  zero: [],
  power: [],
};

// Load data from localStorage on page load
function loadData() {
  const savedData = localStorage.getItem("attendanceData");
  if (savedData) {
    const data = JSON.parse(savedData);
    count = data.count;
    teamAttendees.water = data.water;
    teamAttendees.zero = data.zero;
    teamAttendees.power = data.power;

    // Update displays
    document.getElementById("attendeeCount").textContent = count;
    document.getElementById("waterCount").textContent =
      teamAttendees.water.length;
    document.getElementById("zeroCount").textContent =
      teamAttendees.zero.length;
    document.getElementById("powerCount").textContent =
      teamAttendees.power.length;

    // Update progress bar
    const percentage = Math.round((count / maxCount) * 100);
    document.getElementById("progressBar").style.width = percentage + "%";

    // Update attendee lists
    updateAttendeeList("water");
    updateAttendeeList("zero");
    updateAttendeeList("power");
  }
}

// Save data to localStorage
function saveData() {
  const data = {
    count: count,
    water: teamAttendees.water,
    zero: teamAttendees.zero,
    power: teamAttendees.power,
  };
  localStorage.setItem("attendanceData", JSON.stringify(data));
}

// Load data when page loads
loadData();

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text; // Get the text of the selected option

  console.log(name, teamName); // For testing purposes, you can replace this with actual form handling logic

  // Increment count
  count++;
  console.log("Total check-ins: " + count);

  // Update attendance count display
  const attendeeCountElement = document.getElementById("attendeeCount");
  attendeeCountElement.textContent = count;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage + "%";

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Add attendee to team list
  teamAttendees[team].push(name);
  updateAttendeeList(team);

  // Show personalized welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  const greetingElement = document.getElementById("greeting");
  greetingElement.textContent = message;
  greetingElement.style.display = "block";
  greetingElement.className = "success-message";

  // Save data to localStorage
  saveData();

  // Reset form
  form.reset();
});

// Function to update attendee list for a team
function updateAttendeeList(team) {
  const listElement = document.getElementById(team + "List");
  listElement.innerHTML = "";

  teamAttendees[team].forEach(function (attendeeName) {
    const listItem = document.createElement("li");
    listItem.textContent = attendeeName;
    listElement.appendChild(listItem);
  });
}

// Function to toggle attendee list visibility
function toggleAttendees(team) {
  const listElement = document.getElementById(team + "List");
  const teamCard = listElement.closest(".team-card");
  const button = teamCard.querySelector(".toggle-attendees");
  const icon = button.querySelector("i");

  if (listElement.style.display === "block") {
    listElement.style.display = "none";
    icon.className = "fas fa-chevron-down";
    button.innerHTML = '<i class="fas fa-chevron-down"></i> View Attendees';
  } else {
    listElement.style.display = "block";
    icon.className = "fas fa-chevron-up";
    button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Attendees';
  }
}

// Function to clear all attendance data
function clearAllData() {
  count = 0;
  teamAttendees.water = [];
  teamAttendees.zero = [];
  teamAttendees.power = [];

  // Update all displays
  document.getElementById("attendeeCount").textContent = 0;
  document.getElementById("waterCount").textContent = 0;
  document.getElementById("zeroCount").textContent = 0;
  document.getElementById("powerCount").textContent = 0;
  document.getElementById("progressBar").style.width = "0%";

  // Clear all attendee lists
  updateAttendeeList("water");
  updateAttendeeList("zero");
  updateAttendeeList("power");

  // Clear greeting message
  document.getElementById("greeting").style.display = "none";

  // Clear localStorage
  localStorage.removeItem("attendanceData");
}

// Add click listener to clear button
clearBtn.addEventListener("click", function () {
  clearAllData();
});
