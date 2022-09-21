// The locale our app first shows
var setlang = localStorage.getItem('savedlang');
if (setlang == null) {
  saveData("hu");
}

var savedLang = localStorage.getItem('savedlang');  
const defaultLocale = savedLang;


// Save selected lang to local storage
function saveData(x) {
  localStorage.setItem('savedlang', x);
  console.log("New Lanugage is:", x)
}

// The active locale
let locale;

// Gets filled with active locale translations
let translations = {};

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  // Translate the page to the default locale
  setLocale(defaultLocale);
  bindLocaleSwitcher(defaultLocale);
});

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
  if (newLocale === locale) return;
  const newTranslations = 
    await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;
  translatePage();
}

// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
  // Open a log file

  try {
    console.log("Trying first path, ...")
    const response = await fetch(`./assets/lang/${newLocale}.json`);
    return await response.json();
  } catch {
    console.log("First path not available trying secondary path, ...")

    const response = await fetch(`../assets/lang/${newLocale}.json`);
    return await response.json();
  }
}

// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];
  element.innerText = translation;
}

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher(initialValue) {
  var enSwitch = document.getElementById("enSwitch");
  var huSwitch = document.getElementById("huSwitch");

  if (initialValue === "en") {
    enSwitch.classList.add("dnone");
    huSwitch.classList.remove("dnone");
  }
}

function langToEn() {
  var enSwitch = document.getElementById("enSwitch");
  var huSwitch = document.getElementById("huSwitch");
  var lang = "en";

  enSwitch.classList.add("dnone");
  huSwitch.classList.remove("dnone");

  setLocale(lang);
  saveData(lang);
}

function langToHu() {
  var enSwitch = document.getElementById("enSwitch");
  var huSwitch = document.getElementById("huSwitch");
  var lang = "hu";

  huSwitch.classList.add("dnone");
  enSwitch.classList.remove("dnone");

  setLocale(lang);
  saveData(lang);
}