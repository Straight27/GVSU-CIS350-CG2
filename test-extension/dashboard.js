// Save a new assignment
document.getElementById('saveBtn').addEventListener('click', () => {
  const className = document.getElementById('classInput').value.trim();
  const assignment = document.getElementById('assignmentInput').value.trim();
  const dueDate = document.getElementById('dueDateInput').value.trim();

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

    chrome.storage.sync.set({ assignments }, () => {
      document.getElementById('status').textContent = 'Saved!';
      setTimeout(() => (document.getElementById('status').textContent = ''), 1000);
      clearInputs();
      updateDisplay(assignments);
    });
  });
});

// Load data on startup
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['assignments'], (result) => {
    updateDisplay(result.assignments || []);
  });
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
  document.getElementById('dueDateInput').value = '';
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
          <input type="checkbox" class="completeBox" data-id="${item.id}" ${item.completed ? 'checked' : ''}>
          <p style="margin: 0px; width: 50px;">
            <strong style="${item.completed ? 'text-decoration: line-through; color: gray;' : ''}">${item.className}</strong><br>
          </p>
          <p style="margin: 0px; width: 100px; margin-left: 50px; text-align: center;">
            <span style="${item.completed ? 'text-decoration: line-through; color: gray;' : ''}">
              ${item.assignment}
            </span>
          </p>
          <p style="margin: 0px; width: 60px; margin-left: 50px; text-align: center;">
            <span style="${item.completed ? 'text-decoration: line-through; color: gray;' : ''}">
              <em>${item.dueDate}</em>
            </span>
          </p>
        <button class="deleteBtn" data-id="${item.id}" style="margin-left: 50px;">&#128465</button>
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
  });
}