const __P=require('path'),__fs=require('fs');const PAGE='file://'+__P.resolve(__dirname,'..','index.html');const OUT=__P.join(__dirname,'out');__fs.mkdirSync(OUT,{recursive:true});process.chdir(OUT);
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844},acceptDownloads:true});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(PAGE);await p.waitForTimeout(3500);
await p.evaluate(()=>{window.txGo=f=>f();document.getElementById('splash')?.remove();S.started=1;S.name='Rafli';S.md={0:1,1:1,2:1};S.ev={best:80,tries:2};S.tour={home:1,materi:1};save();go('home')});
await p.evaluate(()=>sheet('acc'));await p.waitForTimeout(500);await p.screenshot({path:'out_acc.png'});
const [dl]=await Promise.all([p.waitForEvent('download'),p.click('text=Simpan cadangan')]);const fp='bak_test.json';await dl.saveAs(fp);console.log('nama file:',dl.suggestedFilename());
await p.evaluate(()=>{localStorage.clear();S=def();save();closeSh();go('home')});console.log('setelah reset materi:',await p.evaluate(()=>mN()));
await p.evaluate(()=>sheet('acc'));await p.waitForTimeout(300);await p.setInputFiles('#bakF',fp);await p.waitForTimeout(800);
console.log('setelah pulih:',await p.evaluate(()=>({m:mN(),n:S.name,ev:S.ev.best,r:cur.r})));
fs.writeFileSync('bad.json','{"x":1}');await p.evaluate(()=>sheet('acc'));await p.waitForTimeout(300);await p.setInputFiles('#bakF','bad.json');await p.waitForTimeout(500);console.log('file salah:',await p.textContent('#bakH'));
// print
await p.evaluate(()=>{closeSh();S.md={0:1,1:1,2:1,3:1,4:1,5:1,6:1,7:1};S.rf={t0:'a',t1:'Rapikan halaman proyek',r:{0:4,1:5,2:4},done:1};S.pre={done:1,sc:40};save();go('rapor')});await p.waitForTimeout(800);await p.emulateMedia({media:'print'});await p.screenshot({path:'out_print.png',fullPage:true});await p.emulateMedia({media:'screen'});
await p.pdf?.call?.(p,{path:'rapor.pdf'}).catch(()=>{});
// vChk simulasi video hilang
await p.evaluate(()=>{const d=document.createElement('div');d.innerHTML=ytB('xxxxxxxxxxx','Judul Tes');document.getElementById('view').appendChild(d);const im=d.querySelector('img');Object.defineProperty(im,'naturalWidth',{value:120});vChk(im);window._vt=d.innerText});console.log('video hilang:',await p.evaluate(()=>window._vt.replace(/\s+/g,' ')));
console.log('error:',errs);await b.close()})();
