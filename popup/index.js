const btn = document.querySelector("#btn");

async function setBtnText() {
  let { enabled } = await browser.storage.local.get("enabled");

  if (enabled === undefined) {
    await browser.storage.local.set({ enabled: true });
    enabled = true;
  }

  console.log(enabled);

  if (enabled) {
    btn.textContent = "Disable Act on Press";
  } else {
    btn.textContent = "Enable Act on Press";
  }
}

setBtnText();

btn.addEventListener("click", async () => {
  let { enabled } = await browser.storage.local.get("enabled");
  await browser.storage.local.set({
    enabled: !enabled,
  });
  setBtnText();
});
