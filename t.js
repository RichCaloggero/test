console.time("test");
let t = 0;

for (let i=0; i<5 * 1024*1024*1024; i += 1) t += 1;

console.timeEnd("test");
