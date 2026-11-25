const __P=require('path'),__fs=require('fs');const PAGE='file://'+__P.resolve(__dirname,'..','index.html');const OUT=__P.join(__dirname,'out');__fs.mkdirSync(OUT,{recursive:true});process.chdir(OUT);
const {chromium}=require('playwright');
const VPS={lap:{viewport:{width:1366,height:768}},hp:{viewport:{width:390,height:844},isMobile:true,hasTouch:true},tab:{viewport:{width:820,height:1180},isMobile:true,hasTouch:true},hpS:{viewport:{width:360,height:640},isMobile:true,hasTouch:true},lapS:{viewport:{width:1280,height:650}},rail:{viewport:{width:1024,height:768}},tabL:{viewport:{width:1180,height:820},isMobile:true,hasTouch:true}};
const CHECK=()=>{const iss=[];const de=document.documentElement;
 if(de.scrollHeight>innerHeight+2)iss.push('scrollY '+(de.scrollHeight-innerHeight));
 if(de.scrollWidth>innerWidth+2)iss.push('scrollX '+(de.scrollWidth-innerWidth));
 const sh=document.getElementById('sh');const shOn=sh&&sh.classList.contains('on');const roots=shOn?[sh]:[document.getElementById('view')];
 for(const R of roots){
  // wadah yang menggulung tapi terlalu pendek (penyebab bug slide kosong)
  R.querySelectorAll('*').forEach(e=>{if(!e.offsetParent&&getComputedStyle(e).position!='fixed')return;const cs=getComputedStyle(e);if(!/(auto|scroll|hidden)/.test(cs.overflowY))return;const r=e.getBoundingClientRect();if(r.width<40)return;
    if(e.scrollHeight>e.clientHeight+150&&e.clientHeight<70&&e.clientHeight>0&&!e.closest('.flip,.vis,.hbs,.sky,.mini,.tr,.dotsl,.bkv,.acc:not(.open)'))iss.push('shortScroll:'+(e.id||e.className).toString().slice(0,30)+' '+e.clientHeight+'/'+e.scrollHeight)});
  // teks yang terlihat tapi terpotong habis oleh wadahnya / ketutup elemen lain
  R.querySelectorAll('h1,h2,h3,h4,h5,p,li,button,label,small,b').forEach(e=>{if(!e.offsetParent)return;const t=(e.textContent||'').trim();if(!t)return;const cs=getComputedStyle(e);if(cs.visibility=='hidden'||+cs.opacity===0)return;
    if(e.closest('[aria-hidden="true"],.sld:not(.on),.ab,.fbk,.ff,.hnote,.bpg,.pg,.bk2v,.mph,.flip,.cmp'))return;
    const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return;
    let a=e.parentElement,vis={l:r.left,t:r.top,r:r.right,b:r.bottom};
    while(a&&a!==document.body){const c=getComputedStyle(a);if(c.overflow!='visible'||c.overflowY!='visible'){const ar=a.getBoundingClientRect();vis={l:Math.max(vis.l,ar.left),t:Math.max(vis.t,ar.top),r:Math.min(vis.r,ar.right),b:Math.min(vis.b,ar.bottom)}}a=a.parentElement}
    vis={l:Math.max(vis.l,0),t:Math.max(vis.t,0),r:Math.min(vis.r,innerWidth),b:Math.min(vis.b,innerHeight)};
    if(vis.r-vis.l<1||vis.b-vis.t<1)return; // di luar area gulir: wajar
    // tertutup elemen lain?
    const cx=(vis.l+vis.r)/2,cy=(vis.t+vis.b)/2;const hit=document.elementFromPoint(cx,cy);
    if(hit&&hit!==e&&!e.contains(hit)&&!hit.contains(e)){const hc=hit.closest('#tst,.toast,#gpop,.tx,#tx,.ov,#cf,.nbadge,.bdp,#bdp');if(!hc&&!hit.closest('.hsp,.term'))iss.push('covered:'+t.slice(0,24)+' by '+(hit.id||hit.className||hit.tagName).toString().slice(0,24))}
    // teks keluar dari lebar wadah
    if(e.scrollWidth>e.clientWidth+3&&cs.overflow=='visible'&&cs.display!='inline'&&cs.whiteSpace=='nowrap')iss.push('nowrapOverflow:'+t.slice(0,20));
  });
  // area konten utama nyaris kosong
  const pb=R.querySelector('#pb');if(pb){const r=pb.getBoundingClientRect();let txt=0;pb.querySelectorAll('*').forEach(x=>{if(!x.offsetParent)return;if(x.closest('.sld:not(.on)'))return;const rr=x.getBoundingClientRect();if(rr.bottom>r.top&&rr.top<r.bottom&&rr.height>0&&(x.textContent||'').trim()&&[...x.childNodes].some(c=>c.nodeType==3&&c.textContent.trim()))txt++});if(txt<3)iss.push('pbNearlyEmpty('+txt+')')}
 }
 return [...new Set(iss)]};
(async()=>{const b=await chromium.launch();const only=process.argv[2];const report={};
for(const [vn,o] of Object.entries(VPS)){if(only&&!only.split(',').includes(vn))continue;
 const ctx=await b.newContext(o);const p=await ctx.newPage();const errs=[];let step='awal';p.on('pageerror',e=>errs.push('PAGEERR ['+step+'] '+e.message+' @ '+(e.stack||'').split('\n').slice(1,3).join(' ')));p.on('console',m=>{if(m.type()=='error'&&!/ERR_TUNNEL|Failed to load resource/.test(m.text()))errs.push('CONSOLE '+m.text())});
 await p.goto(PAGE);await p.waitForTimeout(1200);
 await p.evaluate(()=>{window.txGo=f=>f();localStorage.clear();S.started=1;S.name='Rafli';S.iv=1;S.prev=1;ROLE.edit=1;S.tour={home:1,materi:1};S.ev={best:88,tries:1};S.pre={done:1,sc:25,skip:0};save();document.getElementById('splash')?.remove()});
 const out=[];let n=0;
 const snap=async(tag,wait=500)=>{step=tag;await p.waitForTimeout(wait);const iss=await p.evaluate(CHECK);if(iss.length)out.push(tag+': '+iss.join(' | '));await p.screenshot({path:`qa/${vn}_${String(n++).padStart(3,'0')}_${tag.replace(/[^a-z0-9]/gi,'_')}.png`})};
 const clickAll=async(tag,sel)=>{const cnt=await p.evaluate(sel=>{const bs=[...document.querySelectorAll(sel)].filter(b=>b.offsetParent&&!b.disabled&&!/go\(|sheet\('reset|resetAll|closeSh|prevOff|setMode|location|window.open/.test(b.getAttribute('onclick')||'')&&!b.closest('.pf,.top,.mapr,.mseg'));bs.forEach((b,i)=>b.dataset.qa=i);return bs.length},sel);
   step=tag+'_clicks';for(let i=0;i<Math.min(cnt,40);i++){await p.evaluate(i=>{const b=document.querySelector(`[data-qa="${i}"]`);if(b&&b.offsetParent)b.click()},i);await p.waitForTimeout(120)}
   await p.evaluate(()=>{try{closeSh()}catch(e){}});await p.waitForTimeout(250);return cnt};
 // layar utama
 for(const r of [['welcome'],['home']]){await p.evaluate(r=>go(r[0],r[1]),r);await snap(r[0],1500)}
 // materi: semua slide + klik semua tombol tiap slide
 for(let i=0;i<8;i++){await p.evaluate(i=>{S.mode='story';go('materi',i)},i);await p.waitForTimeout(500);const ns=await p.evaluate(()=>document.getElementById('slt').children.length);
  for(let k=0;k<ns;k++){await p.evaluate(k=>slShow(k,1),k);await snap(`m${i}_s${k}`,k==0?1200:650);await clickAll(`m${i}s${k}`,'.sld.on button');await p.waitForTimeout(200);const iss=await p.evaluate(CHECK);if(iss.length)out.push(`m${i}_s${k}_afterClicks: `+iss.join(' | '))}
  await p.evaluate(()=>setMode('list'));await snap(`m${i}_list`,800);await p.evaluate(()=>document.querySelectorAll('#pb .ah').forEach(h=>h.click()));await p.waitForTimeout(300);await clickAll(`m${i}list`,'#pb .acc.open button:not(.ah)');await snap(`m${i}_list_open`,500);await p.evaluate(()=>setMode('story'))}
 // aktivitas, praktik, evaluasi, refleksi, rapor
 for(const r of ['konsep','akt','a1','a2','a3','a4','a5','a6','a7','praktik','evaluasi','refleksi','rapor']){await p.evaluate(r=>go(r),r);await snap(r,700);await clickAll(r,'#view .pb button, #view .card button');await snap(r+'_clicked',500)}
 // simulasi praktik
 await p.evaluate(()=>{R.pm='sim';go('praktik')});await snap('praktik_sim',800);await clickAll('sim','#view button');await snap('praktik_sim_clicked',400);await p.evaluate(()=>{R.pm=null});
 // sheets
 await p.evaluate(()=>{S.pre={done:0,sc:null,skip:0};R.pre=null;go('pre')});await snap('pre_intro',700);await p.evaluate(()=>{R.pre.st=1;go('pre')});await snap('pre_q',600);await p.evaluate(()=>{for(let i=0;i<8;i++){preA(i%4);preN()}});await snap('pre_done',700);
 for(const k of ['ai','cert','tpl','menu','mlist','goal','how','about','intro','book','badges','acc','nama','owner','prev','survey']){const ok=await p.evaluate(k=>{try{sheet(k);return true}catch(e){return 'ERR '+e.message}},k);if(ok!==true){out.push('sheet '+k+': '+ok);continue}await snap('sheet_'+k,700);
  if(k=='book'){for(let j=0;j<8;j++){for(const v of ['g','b']){await p.evaluate(v=>bkVer(v),v);await p.evaluate(()=>document.querySelectorAll('.bk2c .hsp').forEach(h=>h.click()));await snap('book_p'+j+v,350)}await p.evaluate(()=>bkGo(1));await p.waitForTimeout(600)}await p.evaluate(()=>bkFull());await snap('book_full',500);await p.evaluate(()=>bkFsClose())}
  await p.evaluate(()=>closeSh());await p.waitForTimeout(300)}
 // kamus istilah
 await p.evaluate(()=>go('materi',0));await p.waitForTimeout(500);const tc=await p.evaluate(()=>{for(let k=0;k<6;k++){slShow(k,0);const t=document.querySelector('.sld.on .term');if(t){t.click();return t.textContent}}return null});await snap('glossary_'+(tc||'none'),400);
 report[vn]={issues:out,errs:[...new Set(errs)]};console.log('== '+vn+' ('+n+' layar)');console.log(out.length?out.join('\n'):'tidak ada masalah tata letak');console.log(errs.length?[...new Set(errs)].join('\n'):'tidak ada error');await ctx.close()}
await b.close()})();
