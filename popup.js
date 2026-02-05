document.addEventListener("DOMContentLoaded", () => {
    const linkList = document.getElementById("link-list");
    const copyButton = document.getElementById("copy-button");
  
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: extractMCLinks,
        },
        ([result]) => {
          if (result && result.result) {
            const links = result.result;
            links.forEach((link) => {
              const li = document.createElement("li");
              const a = document.createElement("a");
              a.href = link;
              a.textContent = link;
              a.target = "_blank";
              li.appendChild(a);
              linkList.appendChild(li);
            });
  
            copyButton.addEventListener("click", () => {
              const textToCopy = links.join("\n");
              navigator.clipboard.writeText(textToCopy).then(() => {
                alert("Links copied to clipboard!");
              });
            });
          }
        }
      );
    });
  
    // Function to extract MC links based on specific img src or no img tag
  function extractMCLinks() {
  const links = [];

  const allowedImages = [
    '/images/icons/icon48_sos.png?v=Fupjh-ELjzhaztw0ZVLzIuHWshLxgRcxTa2-zMYSEig',
    'https://brokersnapshot.com/images/icons/icon48_sos.png?v=Fupjh-ELjzhaztw0ZVLzIuHWshLxgRcxTa2-zMYSEig',
    'https://brokersnapshot.com/images/icons/icon48_intrastate.png?v=aoMlfLa38oZaf2tSWuUyKwhq0Al4Fn-xkR50kmm4IVU'
  ];

  const allowedStatuses = [
    'Authorized for Property',
    'Authorized for Property, Private'
  ];

  document.querySelectorAll('tr').forEach((row) => {
    const imgTags = row.querySelectorAll('img');

    // Rule 1: Image filtering
    let imageRulePassed = false;

    if (imgTags.length === 0) {
      imageRulePassed = true;
    } else {
      imageRulePassed = Array.from(imgTags).every(img =>
        allowedImages.includes(img.src)
      );
    }

    if (!imageRulePassed) return;

    // Rule 2: Status filtering
    const statusSpan = row.querySelector('span.green.bold');
    if (!statusSpan) return;

    const statusText = statusSpan.textContent.trim();
    if (!allowedStatuses.includes(statusText)) return;

    // Rule 3: Extract MC link
    const mcLink = row.querySelector('a[href*="MC"]');
    if (mcLink) {
      links.push(mcLink.href);
    }
  });

  return links;
}


})