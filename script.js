(function () {
  console.log("Act on Press Initialized.");

  function actOnPress(element) {
    let runs = 0;

    element.addEventListener("mousedown", () => {
      element.click();
    });

    element.addEventListener("click", (e) => {
      runs += 1;
      if (runs > 1) {
        runs = 0;
        e.preventDefault();
      }
    });
  }

  function triggerOnPress(tagname) {
    const elements = document.querySelectorAll(tagname);

    for (const el of elements) {
      actOnPress(el);
    }

    const observer = new MutationObserver(function (mutation) {
      for (const record of mutation) {
        if (record.type === "childList") {
          for (const node of record.addedNodes) {
            if (node.nodeName === tagname.toUpperCase()) {
              actOnPress(node);
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  }

  function overloadOnclick(element) {
    if (element.onclick !== null) {
      const originalOnClick = element.onclick;
      element.onmousedown = originalOnClick;
      element.removeAttribute("onclick");
    }
    element.onclick = element.onmousedown;
  }

  function overloadOnclickOnEverything() {
    const elements = document.querySelectorAll("*");

    for (const el of elements) {
      overloadOnclick(el);
    }

    const observer = new MutationObserver(function (mutation) {
      for (const record of mutation) {
        if (record.type === "childList") {
          for (const node of record.addedNodes) {
            overloadOnclick(node);
          }
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  }

  function setupPressTriggers() {
    triggerOnPress("a");
    triggerOnPress("button");
    overloadOnclickOnEverything();
  }

  function overloadAddEventListener() {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (
      type,
      listener,
      options,
    ) {
      if (type === "click") {
        type = "mousedown";
      }
      originalAddEventListener.call(this, type, listener, options);
    };
  }

  setupPressTriggers();
  overloadAddEventListener();
})();
