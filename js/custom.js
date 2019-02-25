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

var savedUsers = [];
var formInputs = document.querySelectorAll(".contact-us-form input[required]:not([disabled])");
var allInputsCollection = Array.prototype.slice.apply(document.querySelectorAll(".contact-us-form input"));
var inputsCollection = Array.prototype.slice.apply(formInputs);
var errorMessagesBlock = document.querySelector(".error-messages-block");
var errorMessages = document.querySelector(".error-messages");
document.querySelector(".js-submit-button").addEventListener("click", submitForm);

function submitForm (e) {
  e.preventDefault();

  var userData = {};
  var errors = '';
  inputsCollection.forEach(function (input) {
    var inputName = input.getAttribute("name");
    var inputHelpId = inputName + "-help";
    var inputHelp = document.getElementById(inputHelpId);
    var inputHelpMessage = inputHelp.innerHTML;

    if (!input.value) {
      var errorMessage = `<li><a href="#${inputName}">${inputHelpMessage}</a></li>`;
      errors += errorMessage;
      processInvalidInputAttributes(input, inputHelpId);
    } else {
      processValidInputAttributes(input);
      userData[inputName] = input.value;
    }
  })
  
  if (errors) {  
    errorMessagesBlock.classList.remove("visually-hidden");
    errorMessages.innerHTML = errors;
    errorMessagesBlock.focus();
  } else {
    errorMessagesBlock.classList.add("visually-hidden");
    savedUsers.push(userData);
    clearInputs();
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
}