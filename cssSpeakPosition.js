document.body.addEventListener('click', function (event) {
const el = event.target;

// Get bounding rectangle
const rect = el.getBoundingClientRect();

// Get viewport dimensions
const vw = window.innerWidth;
const vh = window.innerHeight;

// Calculate center of the element
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

// Determine relative position in viewport
const horizontal = centerX < vw / 3 ? 'left'
: centerX > 2 * vw / 3 ? 'right'
: "center";
const vertical = centerY < vh / 3 ? 'top'
: centerY > 2 * vh / 3 ? 'bottom'
: 'middle';

// Describe location
const location = `${horizontal}, ${vertical}`;

// Describe the element and its position
console.log(`Clicked element: <${el.tagName.toLowerCase()}>`);
console.log(`Position in viewport: ${location}`);
console.log(`Bounding box: top=${rect.top}, left=${rect.left}, width=${rect.width}, height=${rect.height}`);
});