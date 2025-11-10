(function(){


function setAccent(rgb){
const v = rgb.join(',');
root.style.setProperty('--accent-rgb', v);
}


function setIntensity(val){
const i = Math.max(0, Math.min(100, Number(val)||70));
const alpha = i/100; // 0..1
if (previewGlow) previewGlow.style.opacity = (0.2 + 0.9*alpha).toFixed(2);
}


// Static
function modeStatic(){
document.body.classList.remove('rgb-flow');
}


// Pulse
let pulseTimer = null; let t = 0;
function modePulse(){
document.body.classList.remove('rgb-flow');
cancelAnimationFrame(pulseTimer);
const base = hexToRgb(color.value);
const loop = ()=>{
t += 0.02;
const k = 0.6 + 0.4*Math.sin(t*2*Math.PI*0.5); // 0.2..1.0
const rgb = base.map(c=>Math.round(c*k));
setAccent(rgb);
pulseTimer = requestAnimationFrame(loop);
};
loop();
}


// RGB Flow
function modeRgbFlow(){
cancelAnimationFrame(pulseTimer);
document.body.classList.add('rgb-flow');
}


// Events
if (color){
color.addEventListener('input', ()=>{
setAccent(hexToRgb(color.value));
localStorage.setItem('oni_color', color.value);
});
const saved = localStorage.getItem('oni_color');
if (saved){ color.value = saved; setAccent(hexToRgb(saved)); }
else setAccent(hexToRgb(color.value));
}


if (intensity){
intensity.addEventListener('input', ()=>{
setIntensity(intensity.value);
localStorage.setItem('oni_intensity', intensity.value);
});
const savedI = localStorage.getItem('oni_intensity');
if (savedI){ intensity.value = savedI; setIntensity(savedI); }
else setIntensity(intensity.value);
}


buttons.forEach(btn=>{
btn.addEventListener('click', ()=>{
const mode = btn.dataset.mode;
localStorage.setItem('oni_mode', mode);
if (mode === 'static') modeStatic();
if (mode === 'pulse') modePulse();
if (mode === 'rgb') modeRgbFlow();
});
});


// Restore mode
const savedMode = localStorage.getItem('oni_mode') || 'static';
({'static':modeStatic,'pulse':modePulse,'rgb':modeRgbFlow})[savedMode]();
})();