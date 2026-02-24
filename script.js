// Get references to DOM elements
const checkInForm = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greetingElement = document.getElementById("greeting");
const attendeeCountElement = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCountElement = document.getElementById("waterCount");
const zeroCountElement = document.getElementById("zeroCount");
const powerCountElement = document.getElementById("powerCount");
const waterListElement = document.getElementById("waterList");
const zeroListElement = document.getElementById("zeroList");
const powerListElement = document.getElementById("powerList");
const clearListBtn = document.getElementById("clearListBtn");

// Initialize counters
let totalAttendees = 0;
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

let teamNames = {
  water: [],
  zero: [],
  power: [],
};

const maxAttendees = 50;

// Load data from localStorage when page loads
function loadData() {
  const savedTotal = localStorage.getItem("totalAttendees");
  const savedTeamCounts = localStorage.getItem("teamCounts");
  const savedTeamNames = localStorage.getItem("teamNames");

  if (savedTotal) {
    totalAttendees = parseInt(savedTotal);
  }

  if (savedTeamCounts) {
    teamCounts = JSON.parse(savedTeamCounts);
  }

  if (savedTeamNames) {
    teamNames = JSON.parse(savedTeamNames);
  }

  updateDisplay();
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("totalAttendees", totalAttendees.toString());
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("teamNames", JSON.stringify(teamNames));
}

// Update all display elements
function updateDisplay() {
  // Update total attendee count
  attendeeCountElement.textContent = totalAttendees;

  // Update progress bar
  const progressPercent = (totalAttendees / maxAttendees) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // Update team counts
  waterCountElement.textContent = teamCounts.water;
  zeroCountElement.textContent = teamCounts.zero;
  powerCountElement.textContent = teamCounts.power;

  // Update team name lists
  renderTeamList(waterListElement, teamNames.water);
  renderTeamList(zeroListElement, teamNames.zero);
  renderTeamList(powerListElement, teamNames.power);
}

function renderTeamList(listElement, names) {
  listElement.innerHTML = "";

  if (names.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No attendees yet";
    listElement.appendChild(emptyItem);
    return;
  }

  for (let i = 0; i < names.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = names[i];
    listElement.appendChild(listItem);
  }
}

// Show success message
function showMessage(name, team) {
  const teamNames = {
    water: "Team Water Wise",
    zero: "Team Net Zero",
    power: "Team Renewables",
  };

  greetingElement.textContent = `Welcome, ${name}! You've been checked in to ${teamNames[team]}.`;
  greetingElement.className = "success-message";
  greetingElement.style.display = "block";

  // Hide message after 4 seconds
  setTimeout(function () {
    greetingElement.style.display = "none";
  }, 4000);
}

// Handle form submission
function handleCheckIn(event) {
  event.preventDefault();

  const attendeeName = attendeeNameInput.value.trim();
  const selectedTeam = teamSelect.value;

  if (attendeeName && selectedTeam) {
    // Increment counters
    totalAttendees++;
    teamCounts[selectedTeam]++;
    teamNames[selectedTeam].push(attendeeName);

    // Update display
    updateDisplay();

    // Save to localStorage
    saveData();

    // Show success message
    showMessage(attendeeName, selectedTeam);

    // Clear form
    attendeeNameInput.value = "";
    teamSelect.value = "";
  }
}

// Handle clear list
function handleClearList() {
  const confirmClear = confirm(
    "Are you sure you want to clear all attendance data?",
  );

  if (confirmClear) {
    // Reset counters
    totalAttendees = 0;
    teamCounts = {
      water: 0,
      zero: 0,
      power: 0,
    };
    teamNames = {
      water: [],
      zero: [],
      power: [],
    };

    // Update display
    updateDisplay();

    // Clear localStorage
    localStorage.removeItem("totalAttendees");
    localStorage.removeItem("teamCounts");
    localStorage.removeItem("teamNames");

    // Hide greeting message
    greetingElement.style.display = "none";
  }
}

// Add event listeners
checkInForm.addEventListener("submit", handleCheckIn);
clearListBtn.addEventListener("click", handleClearList);

// Load data when page loads
loadData();



