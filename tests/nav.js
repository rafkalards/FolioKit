const __P=require('path'),__fs=require('fs');const PAGE='file://'+__P.resolve(__dirname,'..','index.html');const OUT=__P.join(__dirname,'out');__fs.mkdirSync(OUT,{recursive:true});process.chdir(OUT);
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(PAGE);await p.waitForTimeout(1200);
for(let k=0;k<60;k++){if(!await p.evaluate(()=>!!document.getElementById('splash')))break;await p.waitForTimeout(150)}
const idle=async()=>{await p.waitForTimeout(250);for(let k=0;k<40;k++){if(!await p.evaluate(()=>typeof txBusy!='undefined'&&txBusy))break;await p.waitForTimeout(100)}await p.waitForTimeout(400)};
const where=()=>p.evaluate(()=>cur.r+(cur.r=='materi'?cur.i:'')+(document.getElementById('sh').classList.contains('on')?'+sheet':''));
await p.evaluate(()=>{localStorage.clear();S.started=1;S.name='Rafli';S.iv=1;S.tour={home:1,materi:1};S.pre={done:1,sc:50};S.md={0:1};save()});
const log=[];const step=async(lbl,fn,exp)=>{await fn();await idle();const w=await where();log.push(`${w==exp?'OK  ':'GAGAL'} ${lbl} -> ${w}${w==exp?'':' (harusnya '+exp+')'}`)};
await step('ke beranda',()=>p.evaluate(()=>go('home')),'home');
await step('buka materi 2',()=>p.evaluate(()=>go('materi',1)),'materi1');
await step('kembali (gesture)',()=>p.goBack(),'home');
await step('buka menu',()=>p.click('.top .ib[aria-label="Buka menu"]'),'home+sheet');
await step('kembali tutup menu',()=>p.goBack(),'home');
await step('ke aktivitas lewat go',()=>p.evaluate(()=>{S.md={0:1,1:1,2:1,3:1,4:1,5:1,6:1,7:1};go('akt')}),'akt');
await step('buka contoh, tutup pakai X',async()=>{await p.evaluate(()=>sheet('book'));await idle();await p.click('#sh .shx, #sh [aria-label="Tutup"]').catch(()=>p.evaluate(()=>closeSh()))},'akt');
await step('kembali lagi',()=>p.goBack(),'home');
await step('maju lagi (forward)',()=>p.goForward(),'akt');
await step('buka sheet lalu pindah layar dari dalam sheet',async()=>{await p.evaluate(()=>sheet('menu'));await idle();await p.evaluate(()=>go('rapor'))},'rapor');
await step('kembali dari rapor',()=>p.goBack(),'akt');
// pencarian
await p.evaluate(()=>sheet('menu'));await idle();await p.fill('#msq','huruf');await p.waitForTimeout(300);
const res=await p.evaluate(()=>[...document.querySelectorAll('#msres .msx b')].map(b=>b.textContent));log.push('cari "huruf": '+res.slice(0,4).join(' | '));await p.screenshot({path:'nav_search.png'});
await p.fill('#msq','link hanya lihat');await p.waitForTimeout(300);log.push('cari "link hanya lihat": '+(await p.evaluate(()=>[...document.querySelectorAll('#msres .msx b')].map(b=>b.textContent))).slice(0,3).join(' | '));
await p.fill('#msq','tipografi');await p.waitForTimeout(300);await p.click('#msres .mi >> nth=0');await idle();
log.push('klik hasil "tipografi" -> '+await where()+' slide '+await p.evaluate(()=>SL.k+1));
await p.fill('#msq','qwertyzzz').catch(()=>{});
// crumb
await p.click('#crumb');await idle();log.push('klik "Materi x dari 8" -> '+await p.evaluate(()=>document.getElementById('sht').textContent));
await p.evaluate(()=>closeSh());await idle();
await p.evaluate(()=>{S.sr={2:3};S.md={0:1,1:1};go('home')});await idle();log.push('beranda: '+await p.evaluate(()=>document.querySelector('.nextc').innerText.replace(/\n/g,' / ')));await p.screenshot({path:'nav_home.png'});
console.log(log.join('\n'));console.log('errors:',errs);await b.close()})();
