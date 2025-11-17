// Save a new assignment
const userTokens = 0;
document.getElementById('closeButton').addEventListener('click', closeForm());
document.getElementById('saveBtn').addEventListener('click', () => {
  const className = document.getElementById('classInput').value.trim();
  const assignment = document.getElementById('assignmentInput').value.trim();
  const dueDateYear = document.getElementById('dueDateYear').value.trim();
  const dueDateMonth = document.getElementById('dueDateMonth').value.trim();
  const dueDateDay = document.getElementById('dueDateDay').value.trim();
  const dueDate = dueDateMonth + "/" + dueDateDay + "/" + dueDateYear;

  if (!className || !assignment || !dueDate) {
    document.getElementById('status').textContent = 'Please fill all fields.';
    setTimeout(() => (document.getElementById('status').textContent = ''), 1500);
    return;
  }

  chrome.storage.sync.get(['assignments'], (result) => {
    const assignments = result.assignments || [];
    const newEntry = {
      id: Date.now(),
      className,
      assignment,
      dueDate,
      completed: false,
    };

    assignments.push(newEntry);
    console.log(assignments);
    chrome.storage.sync.set({ assignments }, () => {
      document.getElementById('status').textContent = 'Saved!';
      setTimeout(() => (document.getElementById('status').textContent = ''), 1000);
      clearInputs();
      updateDisplay(assignments);
    });
  });
});

// Get a quote from an API
function getDailyQuote(){
      fetch('https://motivational-spark-api.vercel.app/api/quotes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the response body as JSON
        })
        .then(data => {
        document.getElementById("inspirationalQuote").innerHTML =
        `${data.quote}  <span style="font-size: 0.8em;">- ${data.author || "Unknown"}</span>`;
})        
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Load data on startup
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['assignments'], (result) => {
    updateDisplay(result.assignments || []);
  });
  chrome.storage.sync.get(["userTokens"], (result) => {
        document.getElementById("tokenDisplay").textContent =
            "Tokens " + result.userTokens || 0;
        
  });
  selectedHatLocation = chrome.storage.sync.get(["selectedHat"], result => {
    const image = document.getElementById("spriteLocation");
    image.src = result.selectedHat || "/closet/study_sprite_logo.png";
  });
  getDailyQuote();
});

// Listen for changes across devices/popups
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.assignments) {
    updateDisplay(changes.assignments.newValue || []);
  }
});

// Clear input fields after save
function clearInputs() {
  document.getElementById('classInput').value = '';
  document.getElementById('assignmentInput').value = '';
  document.getElementById('dueDateMonth').value = 'Month';
  document.getElementById('dueDateDay').value = 'Day';
  document.getElementById('dueDateYear').value = 'Year';
}

// Update display div with all assignments
function updateDisplay(assignments) {
  const displayDiv = document.getElementById('displayDiv');
  if (assignments.length === 0) {
    displayDiv.textContent = 'No assignments saved yet.';
    return;
  }

  displayDiv.innerHTML = assignments
  .map(
      (item) => `
      <div style="border-bottom: 1px solid #ccc; padding: 4px; display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <input style="display: flex; float: left;" type="checkbox" class="completeBox" data-id="${item.id}" ${item.completed ? 'checked disabled' : ''}>
          <div style="display: flex; float: left; align-items: center; height: 20px;">
            <strong style="${item.completed ? 'text-decoration: line-through; color: gray;' : 'font-size: 15px;'}">${item.className}</strong>
          </div>
          <div style="display: flex; float: right; align-items: center; padding-right: 100px;">
            <span style="${item.completed ? 'text-decoration: line-through; color: gray;' : ''}">
              ${item.assignment} - <em>${item.dueDate}</em>
            </span>
          </div>
        </div>
        <button class="deleteBtn" data-id="${item.id}" style="margin-left: 6px;">&#128465</button>
      </div>
    `
    )
    .join('');

  // Attach delete listeners
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    btn.addEventListener('click', () => deleteAssignment(btn.dataset.id));
  });

  // Attach checkbox listeners
  document.querySelectorAll('.completeBox').forEach((box) => {
    box.addEventListener('change', () => toggleComplete(box.dataset.id, box.checked));
  });
}

// Delete an assignment
function deleteAssignment(id) {
  chrome.storage.sync.get(['assignments'], (result) => {
    const updated = (result.assignments || []).filter((item) => item.id != id);
    chrome.storage.sync.set({ assignments: updated }, () => {
      updateDisplay(updated);
    });
  });
}

// Toggle completion
function toggleComplete(id, isChecked) {
  chrome.storage.sync.get(['assignments'], (result) => {
    const updated = (result.assignments || []).map((item) =>
      item.id == id ? { ...item, completed: isChecked } : item
    );
    chrome.storage.sync.set({ assignments: updated }, () => {
      updateDisplay(updated);
    });
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        tokens += 1; // Give reward

        chrome.storage.sync.set({ userTokens: tokens }, () => {
            // Update UI
            document.getElementById("tokenDisplay").textContent = tokens;
        });
    });
  });
}

//Open pop-up form
document.getElementById("openFormButton").addEventListener('click', () => {
  openForm()
});

function openForm() {
  document.getElementById("AssignmentForm").style.display = "block";
}


// closes pop-up form
function closeForm() {
  document.getElementById("AssignmentForm").style.display = "none";
}
