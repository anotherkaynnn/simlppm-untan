import puppeteer from "puppeteer-core";
import fs from "fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";
const OUT = "screenshots";
fs.mkdirSync(OUT, { recursive: true });

// Mock users mirror src/store/authStore.ts
const MOCK_USERS = {
  DOSEN: { id: "U01", nidn: "0011223344", name: "Dr. Budi Santoso, S.T., M.T.", email: "budi.santoso@ft.untan.ac.id", facultyId: "FT", facultyName: "Fakultas Teknik", studyProgram: "Teknik Informatika", role: "DOSEN" },
  REVIEWER: { id: "U02", nidn: "0022334455", name: "Prof. Dr. Andi Wijaya", email: "andi.wijaya@untan.ac.id", facultyId: "FMIPA", facultyName: "Fakultas MIPA", role: "REVIEWER" },
  OPERATOR_FK: { id: "U03", nidn: "OP-FT-01", name: "Siti Rahma, S.Kom", email: "op.ft@untan.ac.id", facultyId: "FT", facultyName: "Fakultas Teknik", role: "OPERATOR_FK" },
  ADMIN_FK: { id: "U04", nidn: "ADM-FT-01", name: "Ir. Hendra, M.T.", email: "admin.ft@untan.ac.id", facultyId: "FT", facultyName: "Fakultas Teknik", role: "ADMIN_FK" },
  KETUA_LPPM: { id: "U05", nidn: "1122334455", name: "Prof. Dr. Ir. Ketua LPPM", email: "ketua@lppm.untan.ac.id", facultyId: "LPPM", facultyName: "LPPM UNTAN", role: "KETUA_LPPM" },
  ADMIN_SISTEM: { id: "U06", nidn: "SYS-01", name: "System Administrator", email: "admin@simlppm.untan.ac.id", facultyId: "LPPM", facultyName: "LPPM UNTAN", role: "ADMIN_SISTEM" },
};

// route, role (null = public), filename
const PAGES = [
  ["/",                          null,          "01_landing"],
  ["/login",                     null,          "02_login"],
  // DOSEN
  ["/dashboard",                 "DOSEN",       "03_dosen_dashboard"],
  ["/pengajuan/baru",            "DOSEN",       "04_pengajuan_baru"],
  ["/pengajuan/draft",           "DOSEN",       "05_pengajuan_draft"],
  ["/pengajuan/riwayat",         "DOSEN",       "06_pengajuan_riwayat"],
  ["/monitoring",                "DOSEN",       "07_monitoring"],
  ["/monitoring/aktif",          "DOSEN",       "08_monitoring_aktif"],
  ["/monitoring/PRP-2026-001",   "DOSEN",       "09_monitoring_detail"],
  ["/pelaporan",                 "DOSEN",       "10_pelaporan"],
  ["/pelaporan/hki",             "DOSEN",       "11_pelaporan_hki"],
  ["/pelaporan/PRP-2026-001",    "DOSEN",       "12_pelaporan_detail"],
  ["/panduan",                   "DOSEN",       "13_panduan"],
  ["/panduan/template",          "DOSEN",       "14_panduan_template"],
  ["/profil",                    "DOSEN",       "15_profil"],
  ["/pengaturan",                "DOSEN",       "16_pengaturan"],
  // REVIEWER
  ["/review",                    "REVIEWER",    "17_review"],
  ["/review/PRP-2026-001",       "REVIEWER",    "18_review_detail"],
  // OPERATOR_FK
  ["/verifikasi",                "OPERATOR_FK", "19_verifikasi"],
  ["/manajemen/data",            "OPERATOR_FK", "20_manajemen_data"],
  // ADMIN_FK
  ["/statistik",                 "ADMIN_FK",    "21_statistik"],
  ["/manajemen/dosen",           "ADMIN_FK",    "22_manajemen_dosen"],
  ["/manajemen/reviewer",        "ADMIN_FK",    "23_manajemen_reviewer"],
  ["/manajemen/berkas",          "ADMIN_FK",    "24_manajemen_berkas"],
  ["/manajemen/ekspor",          "ADMIN_FK",    "25_manajemen_ekspor"],
  // ADMIN_SISTEM
  ["/konfigurasi/prodi",         "ADMIN_SISTEM","26_konfigurasi_prodi"],
  ["/konfigurasi/skim",          "ADMIN_SISTEM","27_konfigurasi_skim"],
  ["/konfigurasi/users",         "ADMIN_SISTEM","28_konfigurasi_users"],
  ["/audit-log",                 "ADMIN_SISTEM","29_audit_log"],
  ["/audit",                     "ADMIN_SISTEM","30_audit"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const results = [];
for (const [route, role, name] of PAGES) {
  const page = await browser.newPage();
  // reduced motion → Recharts renders final frame instantly (fixes empty pie/bar)
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  try {
    // establish origin, seed auth, then load target
    await page.goto(BASE + "/login", { waitUntil: "domcontentloaded", timeout: 60000 });
    if (role) {
      const payload = JSON.stringify({
        state: { user: MOCK_USERS[role], isAuthenticated: true, _hasHydrated: true },
        version: 0,
      });
      await page.evaluate((p) => localStorage.setItem("simlppm-auth-storage", p), payload);
    } else {
      await page.evaluate(() => localStorage.removeItem("simlppm-auth-storage"));
    }
    await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 60000 });
    await sleep(1200);
    // scroll through the page to force Recharts ResponsiveContainer to measure
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      const total = document.body.scrollHeight;
      for (let y = 0; y <= total; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("resize"));
    });
    await sleep(2000); // let charts finish animating after measurement

    const denied = await page.evaluate(() =>
      document.body.innerText.includes("Akses Ditolak")
    );
    const file = `${OUT}/${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    results.push({ route, role: role || "public", file, denied });
    console.log(`${denied ? "⚠ 403" : "✓"}  ${name.padEnd(26)} ${route}`);
  } catch (e) {
    results.push({ route, role, error: e.message });
    console.log(`✗ ERROR ${name} ${route} :: ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
fs.writeFileSync(`${OUT}/_manifest.json`, JSON.stringify(results, null, 2));
const denied = results.filter((r) => r.denied);
const errors = results.filter((r) => r.error);
console.log(`\nDONE: ${results.length} pages | ${denied.length} denied | ${errors.length} errors`);
