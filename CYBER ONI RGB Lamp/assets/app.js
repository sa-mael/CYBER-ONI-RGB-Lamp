// Minimal JS. No dependencies. Unique names.
(function(){
const buyBtn = document.querySelector('.lgx-btn-buy');
const qty = document.querySelector('#qty');
if (buyBtn && qty) {
buyBtn.addEventListener('click', () => {
const base = buyBtn.getAttribute('data-checkout') || '#';
try{
const url = new URL(base, window.location.href);
url.searchParams.set('qty', String(qty.value || 1));
window.location.href = url.toString();
}catch{ window.location.href = base; }
});
}


// Knob: mouse + keyboard, clamped -135..135 deg
const knob = document.getElementById('knob');
const arm = document.getElementById('knobArm');
const out = document.getElementById('knobVal');
let angle = 45;


function pct(){ return Math.round((angle + 135) / 270 * 100); }
function render(){ arm.style.transform = `rotate(${angle}deg)`; if(out){ out.textContent = `Brightness: ${pct()}%`; } if(knob){ knob.setAttribute('aria-valuenow', String(pct())); } }
function setFromEvent(e){
const rect = knob.getBoundingClientRect();
const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2;
const a = Math.atan2(e.clientY - cy, e.clientX - cx) * 180/Math.PI;
angle = Math.max(-135, Math.min(135, a));
render();
}
if (knob && arm){
knob.addEventListener('mousedown', (e)=>{ setFromEvent(e); const move=(ev)=>setFromEvent(ev); const up=()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up)}; window.addEventListener('mousemove',move); window.addEventListener('mouseup',up); });
knob.addEventListener('keydown', (e)=>{ if(e.key==='ArrowLeft'||e.key==='ArrowDown'){ angle = Math.max(-135, angle-5); render(); } if(e.key==='ArrowRight'||e.key==='ArrowUp'){ angle = Math.min(135, angle+5); render(); } });
}
render();
})();