const button = document.querySelector(".talk");
const content = document.querySelector(".content");
const ownerBio =
  "Asutosh Sahoo is currently pursuing an MCA at OUTR and has a strong passion for programming.";

window.addEventListener("contextmenu", () => {
  speak("Right click is disabled for security purposes.");
  alert("Right click is disabled for security purposes.");
});

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

function wish() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 11) {
    greeting = "Good morning";
  } else if (hour < 16) {
    greeting = "Good afternoon";
  } else if (hour < 20) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  speak(`${greeting}, Boss. How may I help you?`);
}

window.addEventListener("load", () => {
  speak("Initializing ZARA.");
  wish();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript);
  };

  recognition.onerror = (event) => {
    content.textContent = `Speech recognition failed: ${event.error}.`;
  };
}

button.addEventListener("click", () => {
  if (!recognition) {
    content.textContent = "Speech recognition is not supported in this browser.";
    return;
  }

  content.textContent = "Listening...";
  recognition.start();
});

function normalizeCommand(message) {
  return message.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function hasPhrase(message, phrase) {
  return ` ${message} `.includes(` ${normalizeCommand(phrase)} `);
}

function takeCommand(transcript) {
  const message = normalizeCommand(transcript);

  if (hasPhrase(message, "hello zara")) {
    wish();
  } else if (hasPhrase(message, "upload my details of instagram")) {
    speak("Uploading your details. Ready, Boss.");
  } else if (
    hasPhrase(message, "who is asutosh") ||
    hasPhrase(message, "who is ashutosh")
  ) {
    speak(`${ownerBio} Here is his Instagram profile.`);
    window.open("https://www.instagram.com/dear_asutosh/", "_blank");
  } else if (
    hasPhrase(message, "who is satyajit") ||
    hasPhrase(message, "who is satyajeet")
  ) {
    speak("Satyajit is one of Asutosh's friends.");
  } else if (hasPhrase(message, "who is gitanjali")) {
    speak("Gitanjali is one of Asutosh's friends.");
  } else if (hasPhrase(message, "who is raja")) {
    speak("Raja is one of my friends.");
  } else if (hasPhrase(message, "who are you")) {
    window.open("https://github.com/DearAsutosh", "_blank");
    speak(
      `I am ZARA, a voice assistant created by Asutosh Sahoo. ${ownerBio}`
    );
  } else if (hasPhrase(message, "open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google.");
  } else if (hasPhrase(message, "open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening YouTube.");
  } else if (hasPhrase(message, "open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook.");
  } else if (hasPhrase(message, "your owner")) {
    window.open("https://www.instagram.com/dear_asutosh/", "_blank");
    speak("Opening Asutosh's Instagram profile.");
  } else if (
    hasPhrase(message, "owner") ||
    hasPhrase(message, "boss")
  ) {
    speak(`My creator is Asutosh Sahoo. ${ownerBio}`);
    window.open("https://www.instagram.com/dear_asutosh/", "_blank");
  } else if (hasPhrase(message, "wikipedia")) {
    const topic = message.replace(/\bwikipedia\b/g, "").trim();
    window.open(
      `https://en.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/\s+/g, "_"))}`,
      "_blank"
    );
    speak(`Here is what I found on Wikipedia about ${topic}.`);
  } else if (hasPhrase(message, "time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(`The current time is ${time}.`);
  } else if (hasPhrase(message, "date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak(`Today's date is ${date}.`);
  } else if (hasPhrase(message, "calculator")) {
    window.open("Calculator:///");
    speak("Opening Calculator.");
  } else if (
    hasPhrase(message, "hello") ||
    hasPhrase(message, "hey") ||
    hasPhrase(message, "hi")
  ) {
    speak("Hello, Boss. How may I help you?");
  } else {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(message)}`,
      "_blank"
    );
    speak(`I found some information about ${message} on Google.`);
  }
}
