# প্রম্পট মেশিন (Fashion Prompt Machine)

৩-পিস ও উইমেন ক্লোদিং পেজের জন্য ১১৫২টি ChatGPT প্রম্পট, দৈনিক পোস্ট প্ল্যান আর কাস্টম প্রম্পট বিল্ডার।
কোনো ডাটাবেস লাগে না — সেভ করা প্রম্পট ও ব্র্যান্ডের তথ্য ব্রাউজারেই থাকে। মোবাইল ও পিসিতে অ্যাপ হিসেবে ইনস্টল করা যায় (PWA)।

## GitHub Pages-এ চালু করার ধাপ
1. GitHub-এ নতুন repository বানাও (যেমন `prompt-machine`), Public রাখো।
2. এই ফোল্ডারের সব ফাইল (icons ফোল্ডারসহ) আপলোড করো: Add file → Upload files।
3. Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder: `/ (root)` → Save।
4. ১–২ মিনিট পর লিংক পাবে: `https://তোমার-ইউজারনেম.github.io/prompt-machine/`

## ইনস্টল
- Android (Chrome): উপরের "অ্যাপ ইনস্টল" বাটন, অথবা মেনু ⋮ → Install app।
- iPhone (Safari): Share → Add to Home Screen।
- PC (Chrome/Edge): অ্যাড্রেস বারের ডান পাশে ইনস্টল আইকন।

## নিজের প্রম্পট যোগ করা
`data.js` খুলে যেকোনো ক্যাটাগরির `templates` লিস্টে নতুন `{ name: "...", t: "..." }` যোগ করো।
প্রতিটা টেমপ্লেট ১৬টা উপলক্ষ দিয়ে গুণ হয়ে ১৬টা প্রম্পট বানায়।
ব্যবহারযোগ্য placeholder: `{occ}` `{occn}` `{style}` `{pal}` `{tone}` `{ratio}` `[BRAND]` `[PAGE]` `[PHONE]`।
উৎসবের তারিখ বদলাতে `EVENTS` লিস্ট এডিট করো (ঈদ/রমজানের তারিখ চাঁদ দেখার উপর নির্ভর করে, তাই আনুমানিক)।

ফাইল আপডেট করলে `sw.js`-এর `VERSION` (যেমন `pm-v2`) বদলে দিও, তাহলে ইনস্টল করা অ্যাপেও নতুন ভার্সন আসবে।
