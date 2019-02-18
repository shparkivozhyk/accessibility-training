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
  if (e.keyCode !== 37 && e.keyCode !== 39) {
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