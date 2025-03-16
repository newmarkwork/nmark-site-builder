(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const switchers = document.querySelectorAll(".ui-switcher");
if (switchers.length) {
  const sections = document.querySelectorAll(".ui__section");
  let active = document.querySelector(".ui-switcher.active");
  sections.forEach((section) => {
    if (section.dataset.id !== active.dataset.id) {
      section.style.display = "none";
    }
  });
  switchers.forEach((switcher) => {
    switcher.addEventListener("click", () => {
      const sectionId = switcher.dataset.id;
      active.classList.remove("active");
      switcher.classList.add("active");
      active = switcher;
      sections.forEach((section) => {
        if (section.dataset.id === sectionId) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
}
