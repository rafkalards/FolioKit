const __P=require('path'),__fs=require('fs');const PAGE='file://'+__P.resolve(__dirname,'..','index.html');const OUT=__P.join(__dirname,'out');__fs.mkdirSync(OUT,{recursive:true});process.chdir(OUT);
// foto acuan deterministik: animasi & transisi dimatikan, jam dikunci, kanvas acak disembunyikan
const {chromium}=require('playwright');const fs=require('fs');
const file=PAGE,out=process.argv[2]||'shots';fs.mkdirSync(out,{recursive:true});
const VPS={lap:{width:1366,height:768},hp:{width:390,height:844},tab:{width:820,height:1180},hpS:{width:360,height:640},lapS:{width:1280,height:650}};
const FREEZE=`*,*:before,*:after{animation:none!important;transition:none!important;caret-color:transparent!important}#wcv,.hbs,.sky .sk{visibility:hidden!important}#bdp,#toast,.toast,#gpop,#tour{display:none!important}`;
(async()=>{const b=await chromium.launch();let n=0;
const ONLY=(process.argv[3]||'').split(',').filter(Boolean);for(const [vn,vp] of Object.entries(VPS)){if(ONLY.length&&!ONLY.includes(vn))continue;const ctx=await b.newContext({viewport:vp,isMobile:!vn.startsWith('lap'),hasTouch:!vn.startsWith('lap'),reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{const R=Date,T=new R('2026-11-24T10:00:00+07:00').getTime();window.Date=class extends R{constructor(...a){if(a.length)super(...a);else super(T)}static now(){return T}};Math.random=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(file);await p.waitForTimeout(900);await p.addStyleTag({content:FREEZE});
 await p.evaluate(()=>{window.txGo=f=>f();localStorage.clear();S.started=1;S.name='Rafli';S.iv=1;S.prev=1;ROLE.edit=1;S.tour={home:1,materi:1};S.ev={best:88,tries:1};S.pre={done:1,sc:25};S.md={0:1,1:1};S.a={a1:1};save();document.getElementById('splash')?.remove()});
 const snap=async(tag)=>{await p.waitForTimeout(260);await p.evaluate(()=>{try{document.activeElement&&document.activeElement.blur()}catch(e){}});await p.evaluate(()=>{document.querySelectorAll('.typing,[data-type]').forEach(e=>e.classList.add('done'))});await p.screenshot({path:`${out}/${vn}_${tag}.png`});n++};
 const R=[['welcome'],['home'],['konsep'],['akt'],['a1'],['a2'],['a3'],['a4'],['a5'],['a6'],['a7'],['praktik'],['evaluasi'],['refleksi'],['rapor']];
 for(const r of R){await p.evaluate(r=>{R.pre=null;go(r[0],r[1])},r);await snap(r.join(''))}
 await p.evaluate(()=>{S.pre={done:0,sc:null,skip:0};R.pre=null;go('pre')});await snap('pre_intro');await p.evaluate(()=>{R.pre.st=1;go('pre')});await snap('pre_q');await p.evaluate(()=>{S.pre={done:1,sc:25}});
 for(const i of [0,4]){await p.evaluate(i=>{S.mode='story';go('materi',i)},i);const ns=await p.evaluate(()=>document.getElementById('slt').children.length);for(let k=0;k<ns;k++){await p.evaluate(k=>slShow(k,0),k);await snap(`m${i}_s${k}`)}
  await p.evaluate(()=>setMode('list'));await snap(`m${i}_list`);await p.evaluate(()=>{document.querySelectorAll('#pb .ah')[1].click()});await snap(`m${i}_list_open`);await p.evaluate(()=>setMode('story'))}
 await p.evaluate(()=>{R.pm='sim';go('praktik')});await snap('sim');await p.evaluate(()=>{R.pm=null});
 await p.evaluate(()=>{R.ev={i:8,a:QZ.map(q=>q[2])};go('evaluasi')});await snap('ev_res');await p.evaluate(()=>{R.ev={i:2,a:[1,0]};go('evaluasi')});await snap('ev_q');
 for(const k of ['menu','mlist','goal','how','about','badges','acc','nama','prev','survey','ai','tpl','reset']){await p.evaluate(k=>sheet(k),k);await snap('sh_'+k);await p.evaluate(()=>closeSh())}
 await p.evaluate(()=>sheet('book'));for(const [k,v] of [[0,'g'],[0,'b'],[4,'g'],[6,'b']]){await p.evaluate(([k,v])=>{BK=k;BKV=v;BKS=0;bkUpd()},[k,v]);await snap(`book${k}${v}`)}await p.evaluate(()=>closeSh());
 await p.evaluate(()=>{sheet('menu')});await p.fill('#msq','huruf');await snap('search');await p.evaluate(()=>closeSh());
 if(errs.length)console.log(vn,'errors',errs);await ctx.close()}
console.log('foto:',n);await b.close()})();
