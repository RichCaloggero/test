var State = require ("ampersand-state");

var audio = new AudioContext();

var PannerWrapper = State.extend ({
extraProps: "allow",
node: null,

input: audio.createGain(),
output: audio.createGain (),

props: {
panningModel: "string",
distanceModel: "string",
refDistance: "number",
maxDistance: "number",
rolloffFactor: "number",
coneInnerAngle: "number",
coneOuterAngle: "number",
coneOuterGain: "number",
}, // props

initialize: function () {
var self = this;
self.node = audio.createPanner();

} // initialize

}); // extend
var p = new PannerWrapper ();


p.on ("change", function (state) {
var value = state._values;
console.log ("value:", Object.keys(value));
for (var k in value) {
if (value.hasOwnProperty(k) && typeof(value[k]) !== "undefined") {
p.node[k] = value[k];
console.log ("assigning ", k, value[k]);
} // if
} // for
}); // change

p.panningModel= "hrtf";
p.set ("refDistance", 7);
console.log (p.node.panningModel, p.node.refDistance, p.panningModel, p.refDistance);
