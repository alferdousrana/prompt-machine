/* ==========================================================
   Prompt Machine — app logic (no database; saves in browser)
   ========================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hash = s => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
  const LIB = buildLibrary().sort((a, b) => hash(a.id) - hash(b.id)); // mixed, stable order
  const CAT = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
  const OCC = Object.fromEntries(OCCASIONS.map(o => [o.id, o]));

  /* ---------- storage helpers (safe if storage is blocked) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("pm:" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("pm:" + k, JSON.stringify(v)); } catch {} }
  };
  let favs = new Set(store.get("favs", []));
  let mine = store.get("mine", []);
  let brand = store.get("brand", { brand: "", page: "", phone: "" });

  /* ---------- utils ---------- */
  const BN = "০১২৩৪৫৬৭৮৯";
  const bn = n => String(n).replace(/\d/g, d => BN[d]);
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fill = t => t
    .replaceAll("[BRAND]", brand.brand || "[BRAND]")
    .replaceAll("[PAGE]", brand.page || brand.brand || "[PAGE]")
    .replaceAll("[PHONE]", brand.phone || "[PHONE]");
  function rng(seed) { // mulberry32
    return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  const pick = (arr, r) => arr[Math.floor(r() * arr.length)];

  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 2200);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); ta.remove();
    }
  }
  async function copyAndGo(text) {
    await copy(text);
    toast("কপি হয়েছে! ChatGPT-তে পেস্ট করো");
    setTimeout(() => window.open("https://chatgpt.com/", "_blank", "noopener"), 350);
  }

  /* ---------- prompt card ---------- */
  function card(p, opts = {}) {
    const c = CAT[p.cat];
    const el = document.createElement("div");
    el.className = "pcard";
    el.innerHTML = `
      ${opts.noTitle ? "" : `<div class="ptitle">${esc(p.title)}</div>`}
      <div class="tags">
        ${c ? `<span class="tag">${c.name}</span>` : `<span class="tag">আমার বানানো</span>`}
        ${p.occ ? `<span class="tag">${p.occ}</span>` : ""}
        ${p.needsPhoto ? `<span class="tag photo">📷 ছবি লাগবে</span>` : ""}
        ${p.kind === "text" ? `<span class="tag text">✍ লেখার প্রম্পট</span>` : ""}
      </div>
      <p class="ptext" title="পুরোটা দেখতে চাপ দাও">${esc(fill(p.text))}</p>
      <div class="pactions">
        <button class="go">কপি করে ChatGPT খোলো</button>
        <button class="cp">কপি</button>
        ${opts.del ? `<button class="del">মুছে ফেলো</button>`
                   : `<button class="fav ${favs.has(p.id) ? "on" : ""}" aria-pressed="${favs.has(p.id)}">${favs.has(p.id) ? "♥ সেভড" : "♡ সেভ"}</button>`}
      </div>`;
    $(".ptext", el).onclick = e => e.currentTarget.classList.toggle("open");
    $(".go", el).onclick = () => copyAndGo(fill(p.text));
    $(".cp", el).onclick = async () => { await copy(fill(p.text)); toast("কপি হয়েছে"); };
    const f = $(".fav", el);
    if (f) f.onclick = () => {
      favs.has(p.id) ? favs.delete(p.id) : favs.add(p.id);
      store.set("favs", [...favs]);
      const on = favs.has(p.id);
      f.classList.toggle("on", on); f.setAttribute("aria-pressed", on);
      f.textContent = on ? "♥ সেভড" : "♡ সেভ";
      toast(on ? "পছন্দের তালিকায় রাখা হলো" : "সরিয়ে দেওয়া হলো");
    };
    const d = $(".del", el);
    if (d) d.onclick = () => { mine = mine.filter(m => m.id !== p.id); store.set("mine", mine); renderSaved(); toast("মুছে ফেলা হলো"); };
    return el;
  }

  /* ---------- HOME: daily exclusive plan ---------- */
  const today = new Date();
  const dayKey = Number(`${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`);
  let shuffle = 0;

  function upcomingEvent() {
    const now = new Date(today.toDateString());
    const list = EVENTS.map(e => ({ ...e, d: Math.round((new Date(e.date) - now) / 864e5) }))
      .filter(e => e.d >= -1).sort((a, b) => a.d - b.d);
    return list[0];
  }

  function renderHome() {
    $("#todayDate").textContent = today.toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const ev = upcomingEvent();
    const strip = $("#eventStrip");
    if (ev) {
      strip.innerHTML = ev.d <= 0
        ? `<span>🎉</span><span>আজ <b>${OCC[ev.occ].bn}</b>! উৎসবের পোস্ট দিতে ভুলো না।</span>`
        : `<span>📅</span><span>সামনে <b>${OCC[ev.occ].bn}</b>, আর ${bn(ev.d)} দিন বাকি। এখন থেকেই প্রস্তুতির পোস্ট শুরু করো।</span>`;
    } else strip.hidden = true;

    const plan = WEEK_PLAN[today.getDay()];
    const r = rng(dayKey * 31 + shuffle * 977);
    // Focus on upcoming festival if it's within 25 days, otherwise mix
    const focusOcc = ev && ev.d <= 25 && r() < 0.7 ? ev.occ : pick(OCCASIONS, r).id;
    const pickFrom = (cat, needText) => {
      let pool = LIB.filter(p => p.cat === cat && p.occId === focusOcc);
      if (needText) pool = pool.filter(p => p.kind === "text");
      return pick(pool.length ? pool : LIB.filter(p => p.cat === cat), r);
    };
    const imgP = pickFrom(plan.cats[0]);
    const capP = pickFrom("caption", true);
    const extraCat = pick(["thumbnail", "instagram", "festival", "strategy"], r);
    const extraP = pickFrom(extraCat);
    const times = ["দুপুর ১২টা – ২টা", "রাত ৮টা – ১০টা", "সন্ধ্যা ৭টা – ৯টা", "রাত ৯টা – ১১টা"];
    const steps = [
      ["ছবি বানাও", imgP],
      ["ক্যাপশন লেখাও", capP],
      [extraCat === "strategy" ? "সামনের প্ল্যান করো" : "স্টোরি / রিলসের জন্য", extraP]
    ];

    const box = $("#todayPlan");
    box.innerHTML = `
      <div class="plan-head">
        <h2>${plan.day}: ${plan.theme}</h2>
        <span class="time">পোস্টের সেরা সময়: ${pick(times, r)}</span>
      </div>`;
    steps.forEach(([label, p], i) => {
      const s = document.createElement("div");
      s.className = "plan-step";
      s.innerHTML = `<div class="step-label"><span class="step-num">${bn(i + 1)}</span>${label}: ${esc(p.title)}</div>`;
      s.appendChild(card(p, { noTitle: true }));
      box.appendChild(s);
    });
  }
  $("#shuffleBtn").onclick = () => { shuffle++; renderHome(); toast("নতুন আইডিয়া রেডি"); };

  function renderCats() {
    const g = $("#catGrid"); g.innerHTML = "";
    CATEGORIES.forEach(c => {
      const b = document.createElement("button");
      b.className = "cat-card";
      b.innerHTML = `<strong>${c.name}</strong><span>${c.desc}</span>`;
      b.onclick = () => { libState.cat = c.id; location.hash = "#library"; renderLibrary(true); };
      g.appendChild(b);
    });
  }

  /* ---------- LIBRARY ---------- */
  const libState = { cat: "all", q: "", occ: "all", photo: false, shown: 30 };
  function renderChips() {
    const wrap = $("#catChips"); wrap.innerHTML = "";
    [{ id: "all", name: "সব" }, ...CATEGORIES].forEach(c => {
      const b = document.createElement("button");
      b.className = "chip" + (libState.cat === c.id ? " active" : "");
      b.textContent = c.name; b.setAttribute("role", "tab");
      b.onclick = () => { libState.cat = c.id; renderLibrary(true); };
      wrap.appendChild(b);
    });
    const sel = $("#occFilter");
    if (!sel.options.length) {
      sel.innerHTML = `<option value="all">সব উপলক্ষ</option>` + OCCASIONS.map(o => `<option value="${o.id}">${o.bn}</option>`).join("");
    }
  }
  function filtered() {
    const q = libState.q.trim().toLowerCase();
    return LIB.filter(p =>
      (libState.cat === "all" || p.cat === libState.cat) &&
      (libState.occ === "all" || p.occId === libState.occ) &&
      (!libState.photo || p.needsPhoto) &&
      (!q || (p.title + " " + p.occ + " " + CAT[p.cat].name + " " + p.text).toLowerCase().includes(q)));
  }
  function renderLibrary(reset) {
    if (reset) libState.shown = 30;
    renderChips();
    const res = filtered();
    $("#libCount").textContent = `(${bn(res.length)}টি)`;
    const list = $("#promptList"); list.innerHTML = "";
    if (!res.length) list.innerHTML = `<div class="empty">কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজো বা “নিজের প্রম্পট” থেকে বানিয়ে নাও।</div>`;
    res.slice(0, libState.shown).forEach(p => list.appendChild(card(p)));
    $("#moreBtn").hidden = res.length <= libState.shown;
  }
  let qt;
  $("#searchInput").oninput = e => { clearTimeout(qt); qt = setTimeout(() => { libState.q = e.target.value; renderLibrary(true); }, 180); };
  $("#occFilter").onchange = e => { libState.occ = e.target.value; renderLibrary(true); };
  $("#photoFilter").onchange = e => { libState.photo = e.target.checked; renderLibrary(true); };
  $("#moreBtn").onclick = () => { libState.shown += 30; renderLibrary(); };

  /* ---------- BUILDER ---------- */
  const TYPES = [
    { id: "banner",   bn: "৩-পিস / ড্রেসের ব্যানার",  kind: "image", what: "premium fashion banner", comp: "Show a graceful South Asian female model wearing the outfit, full or three-quarter body, with clear space for the text." },
    { id: "text",     bn: "শুধু টেক্সট ব্যানার",       kind: "image", what: "typography-focused banner", comp: "Let the text be the hero: strong hierarchy, decorative elements only to support the words." },
    { id: "fb",       bn: "ফেসবুক পোস্ট",              kind: "image", what: "scroll-stopping Facebook post design", comp: "Make it readable on a phone screen in one glance, product clearly visible, one clear message." },
    { id: "insta",    bn: "ইনস্টাগ্রাম ট্রেন্ডি পোস্ট",   kind: "image", what: "trendy, aesthetic Instagram post", comp: "Follow current Instagram aesthetics: natural light, editorial composition, minimal clean text." },
    { id: "product",  bn: "প্রোডাক্ট ব্যানার",           kind: "image", what: "professional product advertising banner", comp: "Product as the hero in the center with premium lighting and soft shadow, supporting props around it." },
    { id: "thumb",    bn: "থাম্বনেইল (ইউটিউব/রিলস)",    kind: "image", what: "high click-through video thumbnail", comp: "Big bold readable text (max 4 words), expressive face or product close-up, strong contrast, uncluttered background." },
    { id: "cover",    bn: "ফেসবুক কভার ফটো",          kind: "image", what: "Facebook page cover photo", comp: "Wide layout, keep key content in the center-right, leave bottom-left clear for the profile picture." },
    { id: "caption",  bn: "শুধু ক্যাপশন / লেখা",       kind: "text" },
    { id: "plan",     bn: "কনটেন্ট প্ল্যান / আইডিয়া",   kind: "text" }
  ];
  const STYLE_BN = ["লাক্সারি মিনিমাল", "সফট প্যাস্টেল", "বোল্ড মডার্ন", "দেশি আলপনা / নকশিকাঁথা", "রয়্যাল গোল্ড-মেরুন", "ফ্যাশন ম্যাগাজিন", "ফুল ও পাতা", "ক্লিন স্টুডিও", "উৎসবের আলো", "বোহো / মাটির রঙ"];
  const PAL_BN = ["ব্লাশ পিঙ্ক + রোজ গোল্ড", "মেরুন + গোল্ড", "এমারেল্ড গ্রিন + গোল্ড", "ল্যাভেন্ডার + সিলভার", "হলুদ + গাঁদা কমলা", "নেভি + শ্যাম্পেন", "লাল + সাদা", "মিন্ট + পিচ", "কালো + গোল্ড", "টিল + কোরাল"];
  const TONE_BN = ["আন্তরিক ও বন্ধুসুলভ", "লাক্সারি ও এলিগ্যান্ট", "মজার", "আবেগী", "জরুরি / অফার", "ছোট ও ক্যাচি"];
  const RATIOS = [["4:5 (1080x1350) — ফেসবুক/ইনস্টা পোস্ট", "4:5 (1080x1350)"], ["1:1 (1080x1080) — স্কয়ার", "1:1 (1080x1080)"], ["9:16 (1080x1920) — স্টোরি/রিলস", "9:16 (1080x1920)"], ["16:9 (1280x720) — ইউটিউব থাম্বনেইল", "16:9 (1280x720)"], ["820x312 — ফেসবুক কভার", "820x312 (about 2.63:1)"]];

  const opt = (arr) => arr.map(([l, v]) => `<option value="${esc(String(v))}">${l}</option>`).join("");
  $("#bType").innerHTML = opt(TYPES.map(t => [t.bn, t.id]));
  $("#bOcc").innerHTML = `<option value="">কোনো উপলক্ষ নেই</option>` + opt(OCCASIONS.map(o => [o.bn, o.id]));
  $("#bStyle").innerHTML = opt(STYLE_BN.map((l, i) => [l, i]));
  $("#bPal").innerHTML = opt(PAL_BN.map((l, i) => [l, i])) + `<option value="auto">ChatGPT ঠিক করুক</option>`;
  $("#bRatio").innerHTML = opt(RATIOS);
  $("#bTone").innerHTML = opt(TONE_BN.map((l, i) => [l, i]));
  $("#bType").onchange = () => {
    const t = $("#bType").value;
    if (t === "thumb") $("#bRatio").value = RATIOS[3][1];
    if (t === "cover") $("#bRatio").value = RATIOS[4][1];
    const isText = TYPES.find(x => x.id === t).kind === "text";
    ["bStyle", "bPal", "bRatio", "bHeadline"].forEach(id => $("#" + id).closest(".field").style.opacity = isText ? .45 : 1);
  };

  function buildPrompts() {
    const v = id => $("#" + id).value.trim();
    const type = TYPES.find(t => t.id === v("bType"));
    const occ = v("bOcc") ? OCC[v("bOcc")] : null;
    const subject = v("bSubject") || "a women's 3-piece outfit (kameez, salwar and dupatta)";
    const photo = $("#bPhoto").checked;
    const style = STYLES[+v("bStyle")];
    const pal = v("bPal") === "auto" ? "choose the most attractive palette that suits the theme" : PALETTES[+v("bPal")];
    const tone = TONES[+v("bTone")];
    const lang = v("bLang");
    const idea = v("bIdea"), head = v("bHeadline"), offer = v("bOffer");
    const B = "[BRAND]";
    const L = [];

    let imagePrompt = "";
    if (type.kind === "image") {
      L.push(`Create a ${type.what} for my clothing brand "${B}".`);
      L.push(`\nSubject: ${subject}.`);
      if (photo) L.push(`Use the attached photo as the exact product reference. Keep the color, print, embroidery, fabric and cut 100% the same — do not redesign or change the product.`);
      if (occ) L.push(`Theme / occasion: ${occ.en}.`);
      L.push(`Visual style: ${style}.`);
      L.push(`Color palette: ${pal}.`);
      L.push(`Composition: ${type.comp}`);
      const txt = [];
      if (head) txt.push(`Headline: "${head}"`);
      if (offer) txt.push(`Offer / price: "${offer}"`);
      txt.push(`Brand name: "${B}"`);
      L.push(`\nText on the image (spell every word exactly as written, nothing extra):\n- ${txt.join("\n- ")}`);
      if (idea) L.push(`\nMy own idea (it may be written in Bangla — understand it and include it faithfully):\n${idea}`);
      L.push(`\nQuality: photorealistic, high resolution, sharp fabric details, natural skin tones, professional commercial look, no watermark, no distorted hands.`);
      L.push(`Aspect ratio: ${v("bRatio")}.`);
      L.push(`\nIf anything is unclear, make the best creative choice instead of asking.`);
      imagePrompt = L.join("\n");
    }

    const capPrompt = type.id === "plan"
      ? `Act as an expert social media manager for my Bangladeshi women's clothing page "${B}".\nProduct focus: ${subject}.${occ ? `\nUpcoming occasion: ${occ.en}.` : ""}${offer ? `\nOffer: ${offer}.` : ""}${idea ? `\nMy idea (may be in Bangla): ${idea}` : ""}\n\nGive me a 7-day posting plan as a table: day, post type, idea, a ready-to-copy ChatGPT image prompt, a ${lang} caption, and the best posting time in Bangladesh. Tone: ${tone}. Then give 10 extra hook lines I can use.`
      : `You are an expert Bangladeshi fashion copywriter. Write 3 caption options in ${lang} for my page "${B}".\nProduct: ${subject}.${occ ? `\nOccasion: ${occ.en}.` : ""}${offer ? `\nOffer / price: ${offer}.` : ""}${idea ? `\nExtra context (may be in Bangla): ${idea}` : ""}${photo ? `\nLook at the attached photo and describe the real color and design in the caption.` : ""}\n\nTone: ${tone}.\nEach caption: a scroll-stopping first line, 2–4 short lines about fabric, comfort and look, a clear call to action (inbox / order${brand.phone ? " / " + brand.phone : ""}), natural emojis, and 6–10 relevant hashtags. Keep it human, not robotic.`;

    const expert = `You are a world-class prompt engineer and fashion art director.\nHere is my rough idea for ${type.kind === "image" ? `a ${type.what}` : "social media content"} for my clothing page "${B}":\n"${[subject, idea, head, offer, occ && occ.en].filter(Boolean).join(" | ")}"\n\nStep 1: Ask me up to 5 short questions (one message) to understand exactly what I want.\nStep 2: After I answer, write the single best, detailed prompt for it.\nStep 3: ${type.kind === "image" ? "Then generate the image with that prompt." : "Then write the final content using that prompt."}`;

    return { imagePrompt, capPrompt, expert, type, title: `${type.bn}${occ ? " — " + occ.bn : ""}`, occ };
  }

  function outBlock(title, help, text, saveObj) {
    const d = document.createElement("div");
    d.className = "out-block";
    d.innerHTML = `<h3>${title}</h3><p class="help">${help}</p><pre>${esc(fill(text))}</pre>
      <div class="pactions"><button class="go">কপি করে ChatGPT খোলো</button><button class="cp">কপি</button><button class="sv">সেভ করো</button></div>`;
    $(".go", d).onclick = () => copyAndGo(fill(text));
    $(".cp", d).onclick = async () => { await copy(fill(text)); toast("কপি হয়েছে"); };
    $(".sv", d).onclick = () => {
      mine.unshift({ id: "mine-" + Date.now(), cat: "", kind: saveObj.kind, title: saveObj.title, occ: saveObj.occ, needsPhoto: saveObj.needsPhoto, text });
      store.set("mine", mine); toast("“সেভ করা” তে রাখা হলো");
    };
    return d;
  }

  function showBuilt() {
    const r = buildPrompts();
    const out = $("#builderOut"); out.innerHTML = ""; out.hidden = false;
    const photo = $("#bPhoto").checked;
    const occBn = r.occ ? r.occ.bn : "";
    if (r.imagePrompt) out.appendChild(outBlock("ছবির প্রম্পট", photo ? "আগে ChatGPT-তে তোমার ছবি আপলোড করো, তারপর এটা পেস্ট করো।" : "সরাসরি ChatGPT-তে পেস্ট করো।", r.imagePrompt, { kind: "image", title: r.title, occ: occBn, needsPhoto: photo }));
    out.appendChild(outBlock(r.type.id === "plan" ? "কনটেন্ট প্ল্যানের প্রম্পট" : "ক্যাপশনের প্রম্পট", "ছবি বানানোর পর একই চ্যাটে এটা দিলে ছবির সাথে মিলিয়ে ক্যাপশন লিখবে।", r.capPrompt, { kind: "text", title: r.title + " (লেখা)", occ: occBn, needsPhoto: false }));
    out.appendChild(outBlock("এক্সপার্ট মোড", "আইডিয়া পরিষ্কার না হলে এটা দাও — ChatGPT আগে তোমাকে কিছু প্রশ্ন করবে, তারপর সেরা প্রম্পট বানাবে।", r.expert, { kind: "text", title: r.title + " (এক্সপার্ট)", occ: occBn, needsPhoto: false }));
    out.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  $("#buildBtn").onclick = showBuilt;
  $("#randomBuildBtn").onclick = () => {
    const r = Math.random;
    ["bType", "bOcc", "bStyle", "bPal", "bTone"].forEach(id => { const s = $("#" + id); s.selectedIndex = Math.floor(r() * s.options.length); });
    $("#bType").onchange();
    showBuilt();
  };

  /* ---------- SAVED ---------- */
  let savedTab = "fav";
  $$("#savedTabs .chip").forEach(b => b.onclick = () => {
    savedTab = b.dataset.tab;
    $$("#savedTabs .chip").forEach(x => x.classList.toggle("active", x === b));
    renderSaved();
  });
  function renderSaved() {
    const list = $("#savedList"); list.innerHTML = "";
    const items = savedTab === "fav" ? LIB.filter(p => favs.has(p.id)) : mine;
    if (!items.length) {
      list.innerHTML = savedTab === "fav"
        ? `<div class="empty">এখনো কিছু সেভ করোনি। লাইব্রেরিতে পছন্দের প্রম্পটে “♡ সেভ” চাপ দাও।</div>`
        : `<div class="empty">“নিজের প্রম্পট” থেকে প্রম্পট বানিয়ে “সেভ করো” চাপলে এখানে থাকবে।</div>`;
      return;
    }
    items.forEach(p => list.appendChild(card(p, { del: savedTab === "mine" })));
  }

  /* ---------- Router ---------- */
  function route() {
    const v = (location.hash || "#home").slice(1);
    const view = ["home", "library", "builder", "saved"].includes(v) ? v : "home";
    $$(".view").forEach(s => s.hidden = s.id !== "view-" + view);
    $$(".nav a").forEach(a => a.classList.toggle("active", a.dataset.view === view));
    if (view === "library") renderLibrary(false);
    if (view === "saved") renderSaved();
    window.scrollTo(0, 0);
  }
  addEventListener("hashchange", route);

  /* ---------- Theme ---------- */
  const applyTheme = t => { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; };
  applyTheme(store.get("theme", null));
  $("#themeBtn").onclick = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    applyTheme(next); store.set("theme", next);
  };

  /* ---------- Settings ---------- */
  const dlg = $("#settingsDlg");
  $("#settingsBtn").onclick = () => {
    $("#sBrand").value = brand.brand; $("#sPage").value = brand.page; $("#sPhone").value = brand.phone;
    dlg.showModal();
  };
  dlg.addEventListener("close", () => {
    if (dlg.returnValue !== "save") return;
    brand = { brand: $("#sBrand").value.trim(), page: $("#sPage").value.trim(), phone: $("#sPhone").value.trim() };
    store.set("brand", brand);
    toast("ব্র্যান্ড সেভ হয়েছে, সব প্রম্পটে বসে গেছে");
    renderHome(); if (!$("#view-library").hidden) renderLibrary(false); if (!$("#view-saved").hidden) renderSaved();
  });

  /* ---------- PWA install ---------- */
  let deferred;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; $("#installBtn").hidden = false; });
  if (isIOS && !standalone) $("#installBtn").hidden = false;
  $("#installBtn").onclick = async () => {
    if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; $("#installBtn").hidden = true; }
    else if (isIOS) $("#iosDlg").showModal();
  };
  addEventListener("appinstalled", () => { $("#installBtn").hidden = true; toast("অ্যাপ ইনস্টল হয়েছে!"); });
  if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));

  /* ---------- Start ---------- */
  if (!brand.brand) setTimeout(() => toast("⚙ চাপ দিয়ে তোমার ব্র্যান্ডের নাম সেট করো"), 1200);
  renderHome(); renderCats(); route();
})();
