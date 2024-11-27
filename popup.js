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
      document.querySelectorAll('tr').forEach((row) => {
        // Check if the row contains any <img> tags
        const imgTags = row.querySelectorAll('img');
        
        // Check if the row has no img tags, or contains an img with valid src
        const validImg = imgTags.length === 0 || Array.from(imgTags).some(img => {
          const src = img.src;
          return src === 'https://brokersnapshot.com/images/icons/icon48_rating2_1.png' || src === '/images/icons/icon48_rating2_1.png';
        });
  
        // If there's a valid image or no image tag, extract the MC link
        if (validImg) {
          const mcLink = row.querySelector('a[href*="MC"]');
          if (mcLink) {
            links.push(mcLink.href);  // Add the link to the result
          }
        }
      });
      return links;
    }
  });
  