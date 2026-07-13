// ===== GG SILENCE — Main Script =====

// ===== FORCE ALL IMAGES TO SHOW =====
setTimeout(()=>{document.querySelectorAll('img').forEach(i=>i.classList.add('ld'))},3000);

// ===== MOBILE VIDEO FALLBACK =====
(function(){
    const vid=document.getElementById('heroVideo');
    const btn=document.getElementById('heroPlay');
    if(!vid||!btn)return;
    // Try autoplay — if it fails, show play button
    const p=vid.play();
    if(p!==undefined){
        p.catch(()=>{
            btn.style.display='flex';
            requestAnimationFrame(()=>btn.style.opacity='1');
        });
    }
})();
function playHero(){
    const vid=document.getElementById('heroVideo');
    const btn=document.getElementById('heroPlay');
    if(vid){vid.play();btn.style.opacity='0';setTimeout(()=>btn.style.display='none',500)}
}

// ===== CURSOR =====
const cD=document.getElementById('cDot'),cR=document.getElementById('cRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cD.style.left=mx-2.5+'px';cD.style.top=my-2.5+'px'});
!function cl(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cR.style.left=rx-18+'px';cR.style.top=ry-18+'px';requestAnimationFrame(cl)}();
document.querySelectorAll('.hv,a,button,input').forEach(e=>{e.addEventListener('mouseenter',()=>cR.classList.add('hov'));e.addEventListener('mouseleave',()=>cR.classList.remove('hov'))});

// ===== DUST PARTICLES =====
const dC=document.getElementById('dustCanvas'),dx=dC.getContext('2d');
let dps=[];
let dustActive=true;
let lastScroll=Date.now();
function rD(){dC.width=innerWidth;dC.height=innerHeight}
rD();addEventListener('resize',rD);
class DP{constructor(){this.rs()}rs(){this.x=Math.random()*dC.width;this.y=Math.random()*dC.height;this.s=Math.random()*1.2+.3;this.sx=(Math.random()-.5)*.12;this.sy=(Math.random()-.5)*.08-.03;this.o=Math.random()*.2+.04;this.l=Math.random()*500+200;this.ml=this.l}up(){this.x+=this.sx;this.y+=this.sy;this.l--;if(this.l<=0||this.x<0||this.x>dC.width||this.y<0||this.y>dC.height)this.rs()}dr(){const f=this.l<40?this.l/40:this.l>this.ml-40?(this.ml-this.l)/40:1;dx.beginPath();dx.arc(this.x,this.y,this.s,0,Math.PI*2);dx.fillStyle='rgba(234,234,234,'+(this.o*f)+')';dx.fill()}}
// FASE 2: Reduced particles on mobile
const particleCount=innerWidth<768?30:50;
for(let i=0;i<particleCount;i++)dps.push(new DP);
!function aD(){if(dustActive){dx.clearRect(0,0,dC.width,dC.height);dps.forEach(p=>{p.up();p.dr()})}requestAnimationFrame(aD)}();
// FASE 2: Pause dust when no scroll for 2s
addEventListener('scroll',()=>{lastScroll=Date.now();if(!dustActive){dustActive=true}});
setInterval(()=>{if(Date.now()-lastScroll>2000)dustActive=false},1000);

// ===== UTILITY FUNCTIONS =====
function toggleMM(){const m=document.getElementById('mm'),o=m.classList.contains('opacity-100');m.classList.toggle('opacity-100',!o);m.classList.toggle('pointer-events-auto',!o);m.classList.toggle('opacity-0',o);m.classList.toggle('pointer-events-none',o);m.classList.toggle('open',!o);document.body.style.overflow=o?'':'hidden'}
function selS(b){document.querySelectorAll('.sb').forEach(s=>{s.style.borderColor='rgba(234,234,234,0.08)';s.style.color='rgba(234,234,234,0.3)'});b.style.borderColor='rgba(234,234,234,0.4)';b.style.color='#EAEAEA'}
const emailRx=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function handleSub(){const i=document.getElementById('eIn');if(emailRx.test(i.value.trim())){fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({'form-name':'newsletter',email:i.value.trim()}).toString()}).catch(()=>{});i.value='';i.placeholder='Welcome to the SILENCE.';setTimeout(()=>{i.placeholder='Your email address'},3000)}else{i.style.borderColor='rgba(234,234,234,0.35)';i.placeholder='Enter a valid email';setTimeout(()=>{i.style.borderColor='rgba(234,234,234,0.08)';i.placeholder='Your email address'},2000)}}
document.getElementById('eIn').addEventListener('keypress',e=>{if(e.key==='Enter')handleSub()});

// ===== WAITLIST MODAL =====
let _wlPrev=null;
function openWaitlist(product){
    _wlPrev=document.activeElement;
    document.getElementById('wlProduct').textContent=product+' · Noviembre 2026';
    document.getElementById('wlProductInput').value=product;
    document.getElementById('wlForm').style.display='';
    document.getElementById('wlSuccess').style.display='none';
    document.getElementById('wlSize').value='';
    ['M','L','XL'].forEach(t=>{
        const b=document.getElementById('sz-'+t);
        if(b){b.setAttribute('aria-pressed','false');b.style.borderColor='rgba(234,234,234,0.07)';b.style.color='rgba(234,234,234,0.3)';b.style.background='transparent';}
    });
    const m=document.getElementById('waitlistModal');
    m.style.display='flex';
    document.body.style.overflow='hidden';
    requestAnimationFrame(()=>trapFocus(m));
}
function closeWaitlist(){
    const m=document.getElementById('waitlistModal');
    releaseFocus(m);
    m.style.display='none';
    document.body.style.overflow='';
    if(_wlPrev)_wlPrev.focus();
}
function selectSize(s){
    ['M','L','XL'].forEach(t=>{
        const b=document.getElementById('sz-'+t);
        const active=t===s;
        b.setAttribute('aria-pressed',active?'true':'false');
        b.style.borderColor=active?'rgba(154,127,74,0.55)':'rgba(234,234,234,0.07)';
        b.style.color=active?'#9a7f4a':'rgba(234,234,234,0.3)';
        b.style.background=active?'rgba(154,127,74,0.04)':'transparent';
    });
    document.getElementById('wlSize').value=s;
}
function submitWaitlist(e){
    e.preventDefault();
    if(!document.getElementById('wlSize').value){
        ['M','L','XL'].forEach(t=>{
            const b=document.getElementById('sz-'+t);
            b.style.borderColor='rgba(200,80,80,0.4)';
        });
        setTimeout(()=>['M','L','XL'].forEach(t=>{
            if(!document.getElementById('wlSize').value)document.getElementById('sz-'+t).style.borderColor='rgba(234,234,234,0.07)';
        }),1200);
        return;
    }
    const form=e.target;
    const submitBtn=form.querySelector('button[type="submit"]');
    const origText=submitBtn.textContent;
    submitBtn.textContent='SENDING...';
    submitBtn.disabled=true;
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()})
    .then(()=>{
        form.style.display='none';
        document.getElementById('wlSuccess').style.display='block';
        setTimeout(closeWaitlist,3000);
    }).catch(()=>{submitBtn.textContent=origText;submitBtn.disabled=false;form.submit()});
}

// ===== STRIPE CHECKOUT =====
// TODO: Replace with your actual Stripe Payment Link URL
const STRIPE_URL='https://buy.stripe.com/test_cNibIV9BXgjC6OB6B828800';
function checkout(){
    window.open(STRIPE_URL,'_blank','noopener');
}

// ===== COUNTDOWN DROP 001 (Nov 2026) =====
(function(){
    // FASE: Updated to November 2026 — adjust the exact date when known
    const target=new Date('2026-11-11T06:00:00+01:00').getTime();
    const pad=n=>String(n).padStart(2,'0');
    function tick(){
        const d=target-Date.now();
        if(d<=0){
            clearInterval(iv);
            const c=document.getElementById('drCount');
            if(c)c.innerHTML='<span class="font-bebas" style="font-size:clamp(28px,5vw,44px);letter-spacing:0.1em;color:rgba(154,127,74,0.85)">LIVE NOW</span>';
            return;
        }
        document.getElementById('cD').textContent=pad(Math.floor(d/864e5));
        document.getElementById('cH').textContent=pad(Math.floor(d%864e5/36e5));
        document.getElementById('cM').textContent=pad(Math.floor(d%36e5/6e4));
        document.getElementById('cS').textContent=pad(Math.floor(d%6e4/1e3));
    }
    const iv=setInterval(tick,1000);tick();
})();

// ===== NAV SCROLL =====
let lastNavState='top';
addEventListener('scroll',()=>{
    const n=document.getElementById('nav');
    const atTop=scrollY<=80;
    if(atTop!==lastNavState==='top'){
        lastNavState=atTop?'top':'scrolled';
        if(atTop){n.style.background='transparent';n.style.backdropFilter='none';n.style.borderBottom='1px solid transparent'}
        else{n.style.background='rgba(5,5,5,0.88)';n.style.backdropFilter='blur(16px)';n.style.borderBottom='1px solid rgba(234,234,234,0.04)'}
    }
},{passive:true});

// ===== STICKY MOBILE CTA =====
(function(){
    const cta=document.getElementById('stickyCta');
    if(!cta)return;
    const dropSection=document.getElementById('drop');
    let ctaVisible=false;
    addEventListener('scroll',()=>{
        if(!dropSection)return;
        const r=dropSection.getBoundingClientRect();
        const shouldShow=r.bottom<0||r.top>window.innerHeight;
        if(shouldShow!==ctaVisible){
            ctaVisible=shouldShow;
            cta.classList.toggle('visible',shouldShow);
        }
    },{passive:true});
})();

// ===== ENTRY SEQUENCE =====
let entryDone=false;
function runEntry(){
    if(entryDone)return;
    entryDone=true;
    document.body.style.overflow='hidden';

    const pl=document.getElementById('preloader');
    const plGG=document.getElementById('plGG');
    const plSym=document.getElementById('plSym');
    const vig=document.getElementById('vig');

    const tl=gsap.timeline();

    tl.to(plSym,{opacity:1,duration:.7,ease:'power2.out'},0.3);
    tl.to(plGG,{opacity:1,filter:'blur(0px)',duration:1,ease:'power3.out'},0.7);
    tl.to(plGG,{duration:0.6},1.7);
    tl.to(plSym,{opacity:0,duration:.4,ease:'power2.in'},2.2);
    tl.to(plGG,{opacity:0,filter:'blur(4px)',duration:.4,ease:'power2.in'},2.2);

    tl.set(pl,{display:'none'},2.5);

    tl.to(vig,{opacity:1,duration:1.5,ease:'power2.out'},2.6);
    tl.to('#dustCanvas',{opacity:1,duration:1.5,ease:'power2.out'},2.6);

    tl.to('#hSym',{opacity:1,duration:.8,ease:'power2.out'},3.0);
    tl.to('#hGG',{opacity:1,duration:1.2,ease:'power3.out'},3.2);
    tl.to('#hAcc',{width:'80px',duration:.8,ease:'power2.inOut'},3.6);
    tl.to('#hPhilo',{opacity:1,y:0,duration:.9,ease:'power2.out'},3.8);
    tl.to('#sInd',{opacity:1,duration:.6,ease:'power2.out'},4.3);
    tl.to('#nav',{opacity:1,duration:.8,ease:'power2.out'},3.5);

    tl.add(()=>{document.body.style.overflow='';},5);
}

if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(runEntry,100));
}else{
    setTimeout(runEntry,100);
}

setTimeout(runEntry,2500);

// ===== GSAP SCROLL ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({trigger:'#hero',start:'top top',end:'15% top',onLeave:()=>gsap.to('#sInd',{opacity:0,duration:.4}),onEnterBack:()=>gsap.to('#sInd',{opacity:1,duration:.4})});

function animS(sel,props){
    gsap.utils.toArray(sel).forEach((el,i)=>{
        gsap.fromTo(el,props||{opacity:0,y:40},{opacity:1,y:0,x:0,duration:.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 87%',toggleActions:'play none none none'},delay:i*.07});
    });
}
animS('.ma');animS('.da',{opacity:0,y:50});animS('.pa',{opacity:0,y:40});
animS('.ja',{opacity:0,x:40,y:0});animS('.la');animS('.ca',{opacity:0,y:30});

gsap.utils.toArray('.divl').forEach(l=>{gsap.to(l,{scaleX:1,duration:1.5,ease:'power2.inOut',scrollTrigger:{trigger:l,start:'top 92%',toggleActions:'play none none none'}})});

// ===== GLOBAL ESC FOR ALL MODALS =====
document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    if(document.getElementById('waitlistModal')?.style.display==='flex')closeWaitlist();
});

// ===== FOCUS TRAP UTILITY =====
function trapFocus(modal){
    const sel='button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const els=[...modal.querySelectorAll(sel)].filter(e=>!e.closest('[style*="display:none"]'));
    if(!els.length)return;
    const first=els[0],last=els[els.length-1];
    function ft(e){
        if(e.key!=='Tab')return;
        if(e.shiftKey){if(document.activeElement===first){e.preventDefault();last.focus()}}
        else{if(document.activeElement===last){e.preventDefault();first.focus()}}
    }
    modal._trapFn=ft;
    modal.addEventListener('keydown',ft);
    first.focus();
}
function releaseFocus(modal){
    if(modal._trapFn){modal.removeEventListener('keydown',modal._trapFn);modal._trapFn=null}
}

// ===== DROP DATE MODAL =====
let _ddPrev=null;
function openDropDate(){
    _ddPrev=document.activeElement;
    const m=document.getElementById('dropDateModal');
    m.style.display='flex';
    document.body.style.overflow='hidden';
    gsap.fromTo(m,{opacity:0},{opacity:1,duration:.7,ease:'power2.out',onComplete:()=>trapFocus(m)});
}
function closeDropDate(){
    const m=document.getElementById('dropDateModal');
    releaseFocus(m);
    gsap.to(m,{opacity:0,duration:.45,ease:'power2.in',onComplete:()=>{
        m.style.display='none';
        document.body.style.overflow='';
        if(_ddPrev)_ddPrev.focus();
    }});
}
document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&document.getElementById('dropDateModal')?.style.display==='flex')closeDropDate();
});

// ===== MANIFESTO MODAL =====
let _mfObs=null,_mfPrev=null;
function openManifesto(){
    _mfPrev=document.activeElement;
    const m=document.getElementById('manifestoModal');
    m.style.display='block';
    m.scrollTop=0;
    document.body.style.overflow='hidden';
    gsap.fromTo(m,{opacity:0},{opacity:1,duration:.9,ease:'power2.out',onComplete:()=>trapFocus(m)});
    if(!_mfObs){
        _mfObs=new IntersectionObserver(entries=>{
            entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')});
        },{root:m,rootMargin:'0px 0px -5% 0px',threshold:0.12});
        m.querySelectorAll('.mf').forEach(el=>_mfObs.observe(el));
    }
}
function closeManifesto(){
    const m=document.getElementById('manifestoModal');
    releaseFocus(m);
    gsap.to(m,{opacity:0,duration:.55,ease:'power2.in',onComplete:()=>{
        m.style.display='none';
        document.body.style.overflow='';
        m.querySelectorAll('.mf').forEach(el=>el.classList.remove('vis'));
        if(_mfObs){_mfObs.disconnect();_mfObs=null;}
        if(_mfPrev)_mfPrev.focus();
    }});
}
document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
        const m=document.getElementById('manifestoModal');
        if(m&&m.style.display==='block')closeManifesto();
    }
});

// ===== NIGHT JOURNEY =====
(function(){
const jData=[
  {time:'23:00'},{time:'00:30'},{time:'02:00'},
  {time:'03:45'},{time:'05:10'},{time:'06:00'}
];
const STEP=44;
const DOT=4;
const TRACK_H=(jData.length-1)*STEP;

const jNav=document.getElementById('jNav');
const jInner=document.getElementById('jInner');
if(!jNav||!jInner)return;

jInner.innerHTML=
  `<div style="position:absolute;left:${DOT/2}px;top:${STEP/2-DOT/2}px;width:1px;height:${TRACK_H}px;background:rgba(234,234,234,0.05)"></div>`+
  `<div id="jF" style="position:absolute;left:${DOT/2}px;top:${STEP/2-DOT/2}px;width:1px;height:0;background:rgba(154,127,74,0.55);transition:height .35s ease"></div>`+
  jData.map((c,i)=>`
    <div style="height:${STEP}px;display:flex;align-items:center;gap:10px">
      <div id="jd${i}" style="width:${DOT}px;height:${DOT}px;border-radius:50%;background:rgba(234,234,234,0.09);flex-shrink:0;position:relative;z-index:2;transition:background .45s,transform .38s"></div>
      <span id="jl${i}" style="font-family:'Oswald',sans-serif;font-size:8px;letter-spacing:0.45em;color:rgba(234,234,234,0.09);white-space:nowrap;transition:color .45s">${c.time}</span>
    </div>`).join('');

const journeyEl=document.getElementById('journey');
const drRevEl=document.getElementById('drReveal');
const panels=[...document.querySelectorAll('.city-panel')];
let navVis=false,lastIdx=-99;

function setActive(idx){
  if(idx===lastIdx)return;
  lastIdx=idx;
  jData.forEach((_,i)=>{
    const d=document.getElementById('jd'+i);
    const l=document.getElementById('jl'+i);
    if(!d)return;
    if(i===idx){d.style.background='#9a7f4a';d.style.transform='scale(1.85)';l.style.color='rgba(154,127,74,0.75)'}
    else if(i<idx){d.style.background='rgba(154,127,74,0.28)';d.style.transform='scale(1)';l.style.color='rgba(234,234,234,0.18)'}
    else{d.style.background='rgba(234,234,234,0.08)';d.style.transform='scale(1)';l.style.color='rgba(234,234,234,0.08)'}
  });
  const f=document.getElementById('jF');
  if(f)f.style.height=(idx>0?Math.min(idx,jData.length-1)*STEP:0)+'px';
}

function onScroll(){
  if(!journeyEl)return;
  const vH=window.innerHeight;
  const jR=journeyEl.getBoundingClientRect();
  const inJ=jR.top<vH*0.8&&jR.bottom>vH*0.3;
  if(inJ!==navVis){navVis=inJ;jNav.style.opacity=inJ?'1':'0'}
  let active=-1;
  panels.forEach((p,i)=>{const r=p.getBoundingClientRect();if(r.top<vH*0.55&&r.bottom>0)active=i});
  if(drRevEl){const r=drRevEl.getBoundingClientRect();if(r.top<vH*0.55)active=5}
  if(active>=0)setActive(active);
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();

document.querySelectorAll('.city-body').forEach(el=>{
  gsap.fromTo(el,{opacity:0,y:30},{opacity:1,y:0,duration:1.1,ease:'power2.out',
    scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
});

document.querySelectorAll('.ji').forEach((el,i)=>{
  gsap.fromTo(el,{opacity:0,y:22},{opacity:1,y:0,duration:.95,ease:'power2.out',delay:i*.1,
    scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
});

document.querySelectorAll('.city-photo').forEach(img=>{
  gsap.fromTo(img,{scale:1.1,y:-28},{scale:1.1,y:28,ease:'none',
    scrollTrigger:{trigger:img.closest('.city-wrap'),start:'top bottom',end:'bottom top',scrub:1.2}});
});

if(drRevEl){
  const tl=gsap.timeline({scrollTrigger:{trigger:drRevEl,start:'top 68%',toggleActions:'play none none none'}});
  tl.to('#drClock',{opacity:1,duration:1.5,ease:'power2.out'},0.2)
    .to('#drTitle',{opacity:1,duration:1.6,ease:'power3.out'},1.8)
    .to('#drWord', {opacity:1,duration:1.3,ease:'power2.out'},2.7)
    .to('#drLine', {opacity:1,duration:1.1,ease:'power2.out'},3.6)
    .to('#drCount',{opacity:1,duration:1,ease:'power2.out'},4.1)
    .to('#drBtn',  {opacity:1,duration:.9,ease:'power2.out'},4.7);
}
})();
