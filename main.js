window.addEventListener("load", hideLoad);

function hideLoad() {
  const hide = document.getElementById("preloader");
  if (hide) {
    hide.style.display = "none";
  } else {
    console.error("Element with ID 'preloader' not found.");
  }
}
