// updated token
class AudioComponent {
constructor (audio, node) {
this.audio = audio;
this._silentBypass = false;
this._mix = 1;

this.input = audio.createGain();
this.output = audio.createGain();
this.wet = audio.createGain();
this.dry = audio.createGain();
this._bypass = audio.createGain();

this.input.connect(this.dry).connect(this.output);
this.input.connect(this._bypass);
this.wet.connect(this.output);

if (node) {
this.node = node;
this.input.connect(node).connect(this.wet);
} // if

this.mix(1.0);
this.bypass(false);
} // constructor

silentBypass (value) {
//console.debug(`silentBypass: ${value}`);
if (value) {
this._silentBypass = true;
this._bypass.gain.value = 0;
} else {
this._silentBypass = false;
this._bypass.gain.value = 1.0;
} // if

return this;
} // silentBypass

mix (value) {
value = this.clamp(value);
//console.debug(`mix: ${this.name} ${this.value} ${!this.output} ${!this.wet}`);
this.dry.gain.value = 1-Math.abs(value);
this._mix = this.wet.gain.value = value;
return this;
} // mix

bypass (value) {
if (!this.output) return this;
//console.debug(`${this.name}.bypass ${value} ${this.wet.gain.value} ${this.dry.gain.value} ${this._bypass}`);
if (value) {
this.dry.disconnect();
this.wet.disconnect();
this._bypass.connect(this.output);
} else {
this.dry.connect(this.output);
this.wet.connect(this.output);
this._bypass.disconnect();
} // if
//console.debug(`- ${this.wet.gain.value} ${this.dry.gain.value} ${this._bypass}`);

return this;
} // bypass

connect (component) {
if (component instanceof AudioComponent) this.output.connect(component.input);
else if (component instanceof AudioNode) this.output.connect(component);
else alert(`${this}: cannot connect to ${component}`);

return component;
} // connect

clamp (value, min = -1, max = 1) {
if (value > max) value = max;
else if (value < min) value = min;
return value;
} // clamp

} // Component
