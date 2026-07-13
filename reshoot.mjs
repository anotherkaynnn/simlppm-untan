import puppeteer from "puppeteer-core";
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE="http://localhost:3000";
const DOSEN={id:"U01",nidn:"0011223344",name:"Dr. Budi Santoso, S.T., M.T.",email:"budi.santoso@ft.untan.ac.id",facultyId:"FT",facultyName:"Fakultas Teknik",studyProgram:"Teknik Informatika",role:"DOSEN"};
const jobs=[["/profil","screenshots/15_profil.png"],["/pengaturan","screenshots/16_pengaturan.png"]];
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",defaultViewport:{width:1440,height:900,deviceScaleFactor:1.5},args:["--no-sandbox","--hide-scrollbars"]});
for(const [route,file] of jobs){
  const p=await b.newPage();
  await p.emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}]);
  await p.goto(BASE+"/login",{waitUntil:"domcontentloaded"});
  await p.evaluate((u)=>localStorage.setItem("simlppm-auth-storage",JSON.stringify({state:{user:u,isAuthenticated:true,_hasHydrated:true},version:0})),DOSEN);
  await p.goto(BASE+route,{waitUntil:"networkidle2"});
  await new Promise(r=>setTimeout(r,2500));
  const h=await p.evaluate(()=>document.body.scrollHeight);
  try{ await p.screenshot({path:file,fullPage:true}); console.log("OK "+route+" (h="+h+")"); }
  catch(e){ await p.screenshot({path:file,fullPage:false}); console.log("VIEWPORT-ONLY "+route+" (h="+h+") :: "+e.message); }
  await p.close();
}
await b.close();
