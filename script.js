// Improved form validation, animation, and email logic with spinner

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
    emailjs
      .send("service_dmwtiaf", "template_g6kf96e", {
        from_name: nameValue,
        subject: `Suggestion from ${nameValue}`,
        message: messageValue,
      })
      .then(
        function () {
          // Show SENT and green background, clear fields
          sendButton.classList.remove("clicked");
          hideSpinner();
          sendButton.classList.add("sent");
          sendButton.textContent = "SENT";
          nameInput.value = "";
          messageTextarea.value = "";
          setTimeout(() => {
            sendButton.classList.remove("sent");
            sendButton.textContent = "SEND";
            sendButton.style.background =
              "linear-gradient(90deg, #ed3237, #3e4095)";
            sendButton.disabled = false;
            isProcessing = false;
          }, 3000);
        },
        function () {
          // Keep spinning, show error, allow retry
          showError(
            "Failed to send message. Please check your connection and try again."
          );
          sendButton.disabled = false;
          isProcessing = false;
          // The button stays in the spinning state (clicked) until user retries
        }
      );
  });
});
