// Function to check for assignments due today
function checkDueToday() {
  chrome.storage.sync.get(['assignments'], (result) => {
    const assignments = result.assignments || [];
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Find if any assignment is due today and not completed
    const hasDueToday = assignments.some((a) => {
      const due = new Date(a.dueDate);
      const dueStr = due.toISOString().split('T')[0];
      return dueStr === today && !a.completed;
    });

    if (hasDueToday) {
      // Show exclamation mark badge
      chrome.action.setBadgeText({ text: "!" });
      // chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
    } else {
      // Clear badge
      chrome.action.setBadgeText({ text: "" });
    }
  });
}

// Run on startup
chrome.runtime.onStartup.addListener(checkDueToday);

// Run whenever the extension is installed/updated
chrome.runtime.onInstalled.addListener(checkDueToday);

// Also re-check whenever storage changes (real-time updates)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.assignments) {
    checkDueToday();
  }
});

// Optional: Check periodically (e.g., every 6 hours)
setInterval(checkDueToday, 1000);
