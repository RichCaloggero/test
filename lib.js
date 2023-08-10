const speech = window.speechSynthesis;

function speak (text) {
const utterance = new SpeechSynthesisUtterance(text);
speech.speak(utterance);
} // speak
function not (x) {return !x;}
function $ (selector, context = document) {return context.querySelector(selector);}
function $$ (selector, context = document) {return [...context.querySelectorAll(selector)];}

