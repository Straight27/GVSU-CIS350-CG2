// Checks whether the user has any assignments due today or if any are past due. 
function checkDueToday() {
  chrome.storage.sync.get(['assignments'], (result) => {
    const assignments = result.assignments || [];

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Determines if any assignments are due today or previously and are not completed.
    const hasDueToday = assignments.some((a) => {
      const due = new Date(a.dueDate);
      const dueStr = due.toISOString().split('T')[0];
      return dueStr <= today && !a.completed;
    });

    // Used to calculate how many assignments the user has due today or previously and returns that number
    function checkAmountDue() {
        var return_val = 0
        for (let i = 0; i < assignments.length; i++) {
            const due = new Date(assignments[i].dueDate);
            const dueStr = due.toISOString().split('T')[0];
            if (dueStr <= today && !assignments[i].completed){
                return_val += 1;
            }
        }
        return return_val;
    }

    if (hasDueToday > 0) {
      // Shows the number of assignments due in the top right as a notification
      amount_due = checkAmountDue();
      chrome.action.setBadgeText({ text: String(amount_due) });
      chrome.action.setBadgeTextColor({color: "#ff0000ff"})
      chrome.action.setBadgeBackgroundColor({ color: "#ffffff" });
    } else {
      // If no assignments are due, display no notifications
      chrome.action.setBadgeText({ text: "" });
    }
  });
}

// Check when Google Chrome is started
chrome.runtime.onStartup.addListener(checkDueToday);

// Check when the extension is installed/updated
chrome.runtime.onInstalled.addListener(checkDueToday);

// Check when there is a real-time update
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.assignments) {
    checkDueToday();
  }
});

// Checks for any due assignments every hour
setInterval(checkDueToday, 1000*60*60);
