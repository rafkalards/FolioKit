const __P=require('path'),__fs=require('fs');const PAGE='file://'+__P.resolve(__dirname,'..','index.html');const OUT=__P.join(__dirname,'out');__fs.mkdirSync(OUT,{recursive:true});process.chdir(OUT);
// Alur pengguna baru, klik sungguhan, transisi asli, tanpa mode pratinjau
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();process.on('unhandledRejection',e=>{console.log('CRASH di',step,':',e.message.split('\n')[0]);console.log('gagal:',fail);console.log('error:',errs);process.exit(1)});const vn=process.argv[2]||'hp';
const o=vn=='hp'?{viewport:{width:390,height:844},isMobile:true,hasTouch:true}:{viewport:{width:1366,height:768}};
const ctx=await b.newContext(o);const p=await ctx.newPage();const errs=[];let step='load';p.on('pageerror',e=>errs.push(`[${step}] ${e.message}`));
let n=0;const shot=async t=>{await p.screenshot({path:`fl/${vn}_${String(n++).padStart(3,'0')}_${t}.png`})};
const idle=async()=>{for(let k=0;k<40;k++){const busy=await p.evaluate(()=>typeof txBusy!='undefined'&&txBusy);if(!busy)break;await p.waitForTimeout(100)}await p.waitForTimeout(450)};
const tap=async(sel,txt)=>{const loc=txt?p.locator(sel,{hasText:txt}).first():p.locator(sel).first();await loc.waitFor({state:'visible',timeout:6000});await loc.scrollIntoViewIfNeeded();if(vn=='hp')await loc.tap();else await loc.click();await idle()};
const fail=[];const expect=async(cond,msg,arg)=>{const ok=await p.evaluate(cond,arg);if(!ok){fail.push(step+': '+msg);await shot('GAGAL_'+step)}};
await p.goto(PAGE);
step='splash';await p.waitForTimeout(1500);await shot('splash');
for(let k=0;k<80;k++){if(!await p.evaluate(()=>!!document.getElementById('splash')))break;await p.waitForTimeout(150)}
await idle();step='welcome';await shot('welcome');
await tap('#view button','Mulai');step='nama';await shot('nama');
await p.fill('#sh input','Rafli');await tap('#sh button[type=submit], #sh .btn','Lanjut').catch(async()=>{await p.keyboard.press('Enter');await idle()});
for(let k=0;k<40;k++){if(await p.evaluate(()=>!/Menyiapkan/.test(document.body.innerText)&&cur.r!='welcome'))break;await p.waitForTimeout(150)}await idle();await p.waitForTimeout(600);step='setelahNama';await shot('setelah_nama');
// tur panduan beranda
step='turBeranda';await p.waitForTimeout(1800);if(await p.locator('#tour').count()){let k=0;while(await p.locator('#tour').count()&&k<10){await shot('tur_home_'+k);await tap('#tour .tnx');k++;await p.waitForTimeout(300)}}else fail.push('tur beranda tidak muncul');
// intro: mungkin sheet video terbuka atau tombol di beranda
if(await p.evaluate(()=>document.getElementById('sh').classList.contains('on'))){await shot('intro_sheet');await p.evaluate(()=>closeSh());await idle()}
if(await p.locator('#view button.link',{hasText:'Lewati intro'}).count())await tap('#view button.link','Lewati intro');
else if(await p.evaluate(()=>cur.r!='materi'))await tap('#view button','Mulai belajar');
step='tesAwal';await expect(()=>cur.r=='pre','harusnya masuk Tes awal');await shot('pre_intro');await tap('#view .pf .btn','Mulai tes awal');
for(let j=0;j<8;j++){await tap(`#view .op >> nth=${j%4}`);if(j==0)await shot('pre_q');await tap('#view .pf .btn',/Soal berikutnya|Selesai/)}
for(let k=0;k<30;k++){if(await p.evaluate(()=>S.pre.done))break;await p.waitForTimeout(150)}await idle();await shot('pre_hasil');await expect(()=>S.pre.done&&S.pre.sc!=null,'nilai tes awal tidak tersimpan');
await tap('#view .pf .btn','Mulai Materi 1');
await expect(()=>cur.r=='materi'&&cur.i==0,'harusnya masuk Materi 1');
step='turMateri';await p.waitForTimeout(1800);if(await p.locator('#tour').count()){let k=0;while(await p.locator('#tour').count()&&k<10){await shot('tur_materi_'+k);await tap('#tour .tnx');k++;await p.waitForTimeout(300)}}else fail.push('tur materi tidak muncul');
// kunci materi 2 sebelum materi 1 selesai
step='kunci';await p.evaluate(()=>go('materi',1));await idle();await expect(()=>cur.i==0,'materi 2 seharusnya terkunci');
// materi 1..8 lewat slide
for(let i=0;i<8;i++){step='materi'+(i+1);await expect(i=>cur.r=='materi'&&cur.i==i,'bukan di materi yang benar',i);
 const ns=await p.evaluate(()=>document.getElementById('slt').children.length);
 for(let k=0;k<ns;k++){await p.waitForTimeout(250);
  const vis=await p.evaluate(()=>{const s=document.querySelector('.sld.on'),pb=document.getElementById('pb');const r=s.getBoundingClientRect(),q=pb.getBoundingClientRect();return Math.abs(r.height-q.height)<3&&s.innerText.trim().length>20});
  if(!vis)fail.push(`${step} slide ${k+1}: kosong/terpotong`);
  if(i<2||k==0||k==ns-2||k==ns-1)await shot(`m${i+1}_s${k+1}`);
  const hasCq=await p.evaluate(()=>!!document.querySelector('.sld.on .cqw'));
  if(hasCq){const ci=await p.evaluate(()=>CQ[cur.i][2]);const wrong=ci==0?1:0;await tap(`.sld.on .cqw .op >> nth=${wrong}`);await expect(()=>/Belum/.test(document.querySelector('.sld.on .cqf').textContent),'umpan balik salah tidak muncul');await tap(`.sld.on .cqw .op >> nth=${ci}`);await expect(()=>/Benar/.test(document.querySelector('.sld.on .cqf').textContent),'umpan balik benar tidak muncul');await shot(`m${i+1}_cek`)}
  if(k<ns-1){await tap('#sln');}
 }
 await expect(()=>/Sudah paham/.test(document.getElementById('sln').textContent),'tombol Sudah paham tidak ada di slide terakhir');
 await tap('#sln');await p.waitForTimeout(1200);await idle();
}
step='setelahMateri';await shot('setelah_materi');await expect(()=>cur.r=='konsep','setelah materi 8 harusnya ke peta konsep');await tap('#view .kn >> nth=3');await shot('konsep_klik');await expect(()=>mN()==8,'8 materi belum tercatat selesai');
if(await p.evaluate(()=>cur.r!='akt'))await p.evaluate(()=>go('akt'));await idle();await shot('akt');
// aktivitas
const actv=async k=>{await p.evaluate(k=>go(k),k);await idle();step=k;await shot(k+'_awal')};
await actv('a1');await tap('#view .op >> nth=1');await shot('a1_salah');await tap('#view .op >> nth=0');await expect(()=>S.a.a1,'a1 belum selesai');await shot('a1_benar');
await actv('a2');for(const x of [0,1,2,3,4]){const t=await p.evaluate(x=>A2O[x],x);await tap('#view .kc',t)}await expect(()=>S.a.a2,'a2 belum selesai');await shot('a2_benar');
await actv('a3');await tap('#view .kc, #view .cards button','Piagam');await tap('#view .kc, #view .cards button','Surat keterangan');await shot('a3_pilih');
 const cek=p.locator('#view button',{hasText:/Cek|Periksa/});if(await cek.count())await tap('#view button',/Cek|Periksa/);await expect(()=>S.a.a3,'a3 belum selesai');await shot('a3_benar');
await actv('a4');await tap('#view .vm >> nth=0');await tap('#view .vm >> nth=1');await expect(()=>S.a.a4,'a4 belum selesai');await shot('a4_benar');
await actv('a5');for(let j=0;j<5;j++){const [l,r]=await p.evaluate(j=>M5[j],j);await tap('#view .mt > div:first-child button',l);await tap('#view .mt > div:last-child button',r)}await expect(()=>S.a.a5,'a5 belum selesai');await shot('a5_benar');
await actv('a6');for(let j=0;j<5;j++){const v=await p.evaluate(j=>T6[j][1],j);await tap('#view button',v?'Benar':'Salah');await shot('a6_'+j);const nx=p.locator('#view .pb button',{hasText:/Lanjut|Berikutnya|Pernyataan|skor/i});if(await nx.count())await tap('#view .pb button',/Lanjut|Berikutnya|Pernyataan|skor/i)}await expect(()=>S.a.a6,'a6 belum selesai');await shot('a6_selesai');
await actv('a7');for(let j=0;j<6;j++){const t=await p.evaluate(j=>S7[j],j);await tap('#view .kc',t)}await expect(()=>S.a.a7,'a7 belum selesai');await shot('a7_benar');
step='praktik';await p.evaluate(()=>go('praktik'));await idle();await shot('praktik');
for(let j=0;j<4;j++){await tap(`#view .steps button >> nth=${j}`);const cb=p.locator('#view label, #view .chk, #view button',{hasText:/Tandai/}).first();await cb.click();await idle();await shot('praktik_'+j)}
await expect(()=>prN()==4,'praktik belum 4 langkah');
step='simulasi';await tap('#view button','Coba simulasi');await shot('simulasi');await tap('#view button','Langkah di Canva');
step='evaluasi';await p.evaluate(()=>go('evaluasi'));await idle();await shot('evaluasi');
for(let j=0;j<8;j++){const a=await p.evaluate(j=>QZ[j][2],j);await tap(`#view .op >> nth=${a}`);if(j<2)await shot('ev_'+j);await tap('#view .pf button, #view button',/berikutnya|Lihat hasil|Selesai/i)}
for(let k=0;k<40;k++){if(await p.evaluate(()=>S.ev.tries>0))break;await p.waitForTimeout(150)}await idle();await p.waitForTimeout(1500);await shot('evaluasi_hasil');await expect(()=>S.ev.best==100,'nilai evaluasi bukan 100 padahal semua benar');await expect(()=>!!document.querySelector('.cmpx'),'perbandingan tes awal tidak muncul');
step='refleksi';await p.evaluate(()=>go('refleksi'));await idle();
const tas=p.locator('#view textarea');for(let j=0;j<await tas.count();j++)await tas.nth(j).fill('Saya jadi paham cara menyusun portofolio yang rapi.');
await p.evaluate(()=>{document.querySelectorAll('#view .rg, #view [data-r]').length});
const rate=await p.evaluate(()=>{const gs=[...document.querySelectorAll('#view .rate, #view .rt, #view .scale')];return gs.length});
await shot('refleksi_isi');
// klik nilai 4 di setiap baris skala
await p.evaluate(()=>{const rows=[...document.querySelectorAll('#view .pb button')].filter(b=>/^[1-4]$/.test(b.textContent.trim()));const byParent=new Map();rows.forEach(b=>{const k=b.parentNode;if(!byParent.has(k))byParent.set(k,[]);byParent.get(k).push(b)});byParent.forEach(bs=>bs[bs.length-1].click())});await idle();
await shot('refleksi_nilai');await expect(()=>!document.getElementById('rfb').disabled,'tombol kirim refleksi masih terkunci');
await tap('#rfb');await p.waitForTimeout(2500);await idle();step='rapor';await shot('rapor');await expect(()=>cur.r=='rapor'&&S.rf.done,'tidak sampai ke rapor');
step='sertifikat';await tap('#view .rpb','Sertifikat');await p.waitForTimeout(1500);await shot('sertifikat');await expect(()=>{const i=document.getElementById('crti');return i&&i.naturalWidth==1600},'gambar sertifikat tidak terbentuk');await p.evaluate(()=>closeSh());await idle();
await p.evaluate(()=>go('home'));await idle();await shot('beranda_akhir');
await p.evaluate(()=>sheet('badges'));await idle();await shot('lencana_akhir');
console.log(vn,'langkah gagal:',fail.length?fail:'tidak ada');console.log('error:',errs.length?errs:'tidak ada');console.log('screenshot:',n);await b.close()})();
