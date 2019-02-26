(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
  burger.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");

      if (burger.classList.contains("is-active")) {
        menu.querySelector("a:first-child").focus();
      }
    }
  })
  menu.addEventListener("keyup", function (e) {
    if (e.keyCode === 27) {
      burger.classList.remove("is-active");
      menu.classList.remove("is-active");
      burger.focus();
    }
  }) 
  
  menu.querySelector(".navbar-item:last-child a").addEventListener("keydown", function (e) {
    if (e.keyCode === 9) {
      burger.classList.remove("is-active");
      menu.classList.remove("is-active");
      burger.focus();
    }
  })
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

var randomNumberField = document.getElementById("randomNumberField");

setInterval(function () {
  randomNumberField.innerHTML = Math.random();
}, 5000);


document.getElementById("topic-tablist").addEventListener("keyup", function (e) {
  if (e.keyCode !== 35 && e.keyCode !== 36 && e.keyCode !== 37 && e.keyCode !== 39) {
    return;
  }
  var target = e.target.getAttribute("data-target");
  var targetNumber = target.slice(-1);

  if (e.keyCode === 39) {
    var nextTargetNumber  = +targetNumber + 1;
    var nextTab = document.getElementById(nextTargetNumber);
    if (!nextTab) {
      nextTargetNumber = 1;
      nextTab = document.getElementById("1");
    }
  }
  if (e.keyCode === 37) {
    var nextTargetNumber = +targetNumber - 1;
    var nextTab = document.getElementById(nextTargetNumber);
    if (!nextTab) {
      nextTargetNumber = 4;
      nextTab = document.getElementById("4");
    }
  }

  if (e.keyCode === 35) {
    var nextTargetNumber = 4;
    nextTab = document.getElementById("4");
  }

  if (e.keyCode === 36) {
    var nextTargetNumber = 1;
    nextTab = document.getElementById("1");
  }

  var currentTabPanel = document.getElementById("pane-" + targetNumber);
  var nextTabPanel = document.getElementById("pane-" + nextTargetNumber);

  e.target.setAttribute("tabindex", "-1");
  e.target.classList.remove('is-active');
  currentTabPanel.style.display = "none";
  currentTabPanel.setAttribute("aria-selected", false);

  nextTab.setAttribute("tabindex", "0");
  document.getElementById('' + nextTargetNumber).classList.add('is-active');
  nextTabPanel.style.display = "block";
  nextTabPanel.setAttribute("aria-selected", true);
  nextTab.focus(); 
})

// Register my team form
var savedUsers = [];
var formInputs = document.querySelectorAll(".contact-us-form input[aria-required]:not([disabled])");
var allInputsCollection = Array.prototype.slice.apply(document.querySelectorAll(".contact-us-form input"));
var inputsCollection = Array.prototype.slice.apply(formInputs);
var errorMessagesBlock = document.querySelector(".error-messages-block");
var errorMessages = document.querySelector(".error-messages");
var successMessageBlock = document.querySelector(".success-message-block");
var birthYearField = document.getElementById("birth-year");

document.querySelector(".js-submit-button").addEventListener("click", submitForm);

function submitForm (e) {
  e.preventDefault();

  var userData = {};
  var errors = '';
  hideMessagesBlock();

  inputsCollection.forEach(function (input) {
    var validationsResults = validateField(input);
    if (validationsResults.error) {
      errors += validationsResults.error;
    } else {
      userData = _.assign(userData, validationsResults.user);
    }
  })
  
  if (errors) {  
    errorMessagesBlock.classList.add("active-block");
    errorMessages.innerHTML = errors;
    errorMessagesBlock.focus();
  } else {
    isExistingUser = _.find(savedUsers, {"first-name": userData["first-name"], "last-name": userData["last-name"]});
    
    if (isExistingUser && birthYearField.disabled) {
      birthYearField.removeAttribute("disabled");
      processInvalidInputAttributes(birthYearField);
      birthYearField.focus();
      updateCollections();
    } else {
      successMessageBlock.classList.add("active-block");
      savedUsers.push(userData);
      clearInputs();  
    }
  }
}
function validateField (input) {
  var inputName = input.getAttribute("name");

  if (!input.value) {
    var inputHelpMessage = input.placeholder;
    return processError(input, inputHelpMessage);
  } 

  if (input.name === "user-name" && _.find(savedUsers, {"user-name": input.value})) {
    var inputHelpMessage = "This username is in use yet, please choose another username";
    return processError(input, inputHelpMessage);
  } 

  if (input.name === "phone-number" && !/^[0-9]*$/.test(input.value)) {
    var inputHelpMessage = "The phone number should contain numbers only";
    return processError(input, inputHelpMessage);
  }

  if (input.name === "user-email" && !/[^@]+@[^\.]+\..+/g.test(input.value)) {
    var inputHelpMessage ="The email should look like example@me.com";
    return processError(input, inputHelpMessage);
  }

  if (input.name === "birth-year" && (!/^[0-9]*$/.test(input.value) || input.value.length !== 4)) {
    var inputHelpMessage = "The birth year should be 4-digits number";
    return processError(input, inputHelpMessage);
  }
  processValidInputAttributes(input);
  return {
    user: {
      [inputName]: input.value
    }
  }
}

function processError (input, inputHelpMessage) {
  var inputName = input.getAttribute("name");
  var inputHelpId = inputName + "-help";
  var error = `<li><a href="#${inputName}">${inputHelpMessage}</a></li>`;

  processInvalidInputAttributes(input, inputHelpId);
  return {
    error: error
  }
}

function processInvalidInputAttributes (input, inputHelpId) {
  input.setAttribute("aria-describedby", inputHelpId);
  input.setAttribute("aria-invalid", true);
  input.parentNode.parentNode.classList.add("invalid-field");
}

function processValidInputAttributes (input) {
  input.removeAttribute("aria-describedby");
  input.removeAttribute("aria-invalid");
  input.parentNode.parentNode.classList.remove("invalid-field");
}

function clearInputs () {
  allInputsCollection.forEach(function (input) {
    input.value = '';
  })
  birthYearField.setAttribute("disabled", true);
  updateCollections();
}

function hideMessagesBlock ()  {
  successMessageBlock.classList.remove("active-block");
  errorMessagesBlock.classList.remove("active-block");
}

function updateCollections () {
  formInputs = document.querySelectorAll(".contact-us-form input[aria-required]:not([disabled])");
  inputsCollection = Array.prototype.slice.apply(formInputs);
}