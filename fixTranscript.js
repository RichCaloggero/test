function fixTranscript (onlyOpen) {
document.querySelector("#expand").click();

setTimeout(() => {
document.querySelector("[aria-label='Show transcript']").click();
if (onlyOpen) return;

setTimeout(() => {
const root = document.querySelector("#segments-container");
const l = root.querySelectorAll(".segment");

l.forEach(x => {
const s = x.querySelector("yt-formatted-string");

x.removeAttribute("role");
x.setAttribute("aria-label", s.textContent);
const x1 = x.cloneNode();
x.replaceWith(x1);
});
}, 2000);
}, 2000);
} // fixTranscript
