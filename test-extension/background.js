// Function to check for assignments due today
function checkDueToday() {
  chrome.storage.sync.get(['assignments'], (result) => {
    const assignments = result.assignments || [];
    console.log(assignments);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Find if any assignment is due today and not completed
    const hasDueToday = assignments.some((a) => {
      console.log(a);
      const due = new Date(a.dueDate);
      const dueStr = due.toISOString().split('T')[0];
      return dueStr === today && !a.completed;
    });

    // Used to calculate how many assignments the user has due today and returns that number
    function checkAmountDue() {
        var return_val = 0
        for (let i = 0; i < assignments.length; i++) {
            const due = new Date(assignments[i].dueDate);
            const dueStr = due.toISOString().split('T')[0];
            if (dueStr === today && !assignments[i].completed){
                return_val += 1;
            }
        }
        return return_val;
    }

    if (hasDueToday > 0) {
      // Shows the number of assignments due in the top right as a notification
      amount_due = checkAmountDue();
      console.log(amount_due);
      chrome.action.setBadgeText({ text: String(amount_due) });
      chrome.action.setBadgeTextColor({color: "#ff0000ff"})
      chrome.action.setBadgeBackgroundColor({ color: "#ffffffff" });
    } else {
      // If no assignments are due today, display no notifications
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
setInterval(checkDueToday, 10000);
