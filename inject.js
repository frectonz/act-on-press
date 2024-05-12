(async function () {
  const b = typeof browser !== "undefined" ? browser : chrome;

  let { enabled } = await browser.storage.local.get("enabled");
  if (enabled === undefined) {
    await browser.storage.local.set({ enabled: true });
    enabled = true;
  }

  if (enabled) {
    const script = document.createElement("script");
    script.src = b.runtime.getURL("act-on-press.js");
    document.head.appendChild(script);
  }
})();
