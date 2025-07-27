// Improved form validation, animation, and email logic with spinner

/* 
document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.querySelector(".btn");
  const nameInput = document.querySelector("#Name");
  const messageTextarea = document.querySelector("#Message");
  const errorMessage = document.querySelector("#error-message");
  let isProcessing = false;

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  }

  function hideError() {
    errorMessage.style.display = "none";
  }

  function showSpinner() {
    if (!sendButton.querySelector(".spinner")) {
      const spinner = document.createElement("span");
      spinner.className = "spinner";
      sendButton.appendChild(spinner);
    }
  }

  function hideSpinner() {
    const spinner = sendButton.querySelector(".spinner");
    if (spinner) spinner.remove();
  }

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (isProcessing) return; // Prevent double submissions
    hideError();

    const nameValue = nameInput.value.trim();
    const messageValue = messageTextarea.value.trim();

    if (!nameValue || !messageValue) {
      sendButton.classList.add("shake");
      setTimeout(() => {
        sendButton.classList.remove("shake");
      }, 500);
      showError("Please fill in all fields before sending!");
      return;
    }

    isProcessing = true;
    sendButton.classList.add("clicked");
    sendButton.disabled = true;
    showSpinner();

    // Send email
    emailjs.init("rnxtI0TDXY_4BKQUw");
    emailjs.send("service_dmwtiaf", "template_g6kf96e", {
      from_name: nameValue,
      subject: `Suggestion from ${nameValue}`,
      message: messageValue,
    }).then(
      function () {
        // Show overlay background and thanks card
        const overlay = document.querySelector('.overlay');
        const thanksCard = document.querySelector('.thanks-card');
        overlay.classList.remove('hidden');
        thanksCard.classList.remove('hidden');

        // Reset button and form
        sendButton.classList.remove("clicked");
        hideSpinner();
        sendButton.textContent = "SEND";
        sendButton.style.background = "linear-gradient(90deg, #ed3237, #3e4095)";
        sendButton.disabled = false;
        isProcessing = false;
        nameInput.value = "";
        messageTextarea.value = "";

        // Optionally, retrigger header animation
        const headerText = document.querySelector(".header-text");
        if (headerText) {
          headerText.classList.remove("animate");
          void headerText.offsetWidth;
          headerText.classList.add("animate");
        }
      },
      function () {
        // Handle error
        showError("Failed to send message. Please check your connection and try again.");
        sendButton.disabled = false;
        isProcessing = false;
      }
    );
  });
});
*/
document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.querySelector(".btn");
  const nameInput = document.querySelector("#Name");
  const messageTextarea = document.querySelector("#Message");
  const errorMessage = document.querySelector("#error-message");
  const overlay = document.querySelector('.overlay'); // Select overlay here
  let isProcessing = false;

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  }

  function hideError() {
    errorMessage.style.display = "none";
  }

  function showSpinner() {
    if (!sendButton.querySelector(".spinner")) {
      const spinner = document.createElement("span");
      spinner.className = "spinner";
      sendButton.appendChild(spinner);
    }
  }

  function hideSpinner() {
    const spinner = sendButton.querySelector(".spinner");
    if (spinner) spinner.remove();
  }

  function hideOverlay() {
    overlay.classList.add('hidden');
    const thanksCard = document.querySelector('.thanks-card');
    if (thanksCard) thanksCard.classList.add('hidden');
    // Reset form fields
    nameInput.value = "";
    messageTextarea.value = "";
    sendButton.disabled = false;
    isProcessing = false;
    hideError();
    sendButton.classList.remove("clicked");
    sendButton.textContent = "SUBMIT";
    sendButton.style.background = " #ed3237";
    // Retrigger header animation ONLY here
    const headerText = document.querySelector(".header-text");
    if (headerText) {
      headerText.classList.remove("animate");
      void headerText.offsetWidth; // Force reflow
      headerText.classList.add("animate");
    }
  }

  // Close overlay when clicking anywhere on overlay
  overlay.addEventListener('click', function (e) {
    // Only close if clicking the overlay background, not the card itself
    if (e.target === overlay) {
      hideOverlay();
    }
  });

  // Close overlay on Escape key
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('hidden') && e.key === 'Escape') {
      hideOverlay();
    }
  });

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (isProcessing) return; // Prevent double submissions
    hideError();

    const nameValue = nameInput.value.trim();
    const messageValue = messageTextarea.value.trim();

    if (!nameValue || !messageValue) {
      sendButton.classList.add("shake");
      setTimeout(() => {
        sendButton.classList.remove("shake");
      }, 500);
      showError("Please fill in all fields before sending!");
      return;
    }

    isProcessing = true;
    sendButton.classList.add("clicked");
    sendButton.disabled = true;
    showSpinner();

    // Send email
    emailjs.init("rnxtI0TDXY_4BKQUw");
    emailjs.send("service_dmwtiaf", "template_g6kf96e", {
      from_name: nameValue,
      subject: `Suggestion from ${nameValue}`,
      message: messageValue,
    }).then(
      function () {
        // Hide spinner and reset button BEFORE showing overlay
        sendButton.classList.remove("clicked");
        hideSpinner();
        sendButton.textContent = "SUBMIT";
        sendButton.style.background = "linear-gradient(90deg, #ed3237, #3e4095)";
        sendButton.disabled = false;
        isProcessing = false;

    
        // Show overlay background and thanks card
        overlay.classList.remove('hidden');
        const thanksCard = document.querySelector('.thanks-card');
        if (thanksCard) thanksCard.classList.remove('hidden');

        // Reset form fields
        nameInput.value = "";
        messageTextarea.value = "";
      },
      function () {
        // Handle error
        showError("Failed to send message. Please check your connection and try again.");
        sendButton.disabled = false;
        isProcessing = false;
      }
    );
  });
});