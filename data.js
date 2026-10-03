/* ==========================================================
   Prompt Machine — prompt data
   Templates × occasions = 1,000+ unique prompts.
   Placeholders: {occ} {style} {pal} {ratio} {tone}
   [BRAND] [PAGE] [PHONE] are replaced with your saved brand info.
   ========================================================== */

const OCCASIONS = [
  { id: "eid-fitr", n: "Eid", bn: "ঈদুল ফিতর",        en: "Eid ul-Fitr celebration, crescent moon, festive lanterns" },
  { id: "eid-adha", n: "Eid ul-Adha", bn: "ঈদুল আযহা",        en: "Eid ul-Adha festive season, elegant crescent and warm lights" },
  { id: "ramadan", n: "Ramadan", bn: "রমজান",            en: "Ramadan, calm spiritual mood, lanterns and soft night glow" },
  { id: "boishakh", n: "Boishakh", bn: "পহেলা বৈশাখ",       en: "Pohela Boishakh (Bengali New Year), red and white, alpona art, dhol, mela vibe" },
  { id: "falgun", n: "Falgun", bn: "ফাল্গুন / বসন্ত",    en: "Pohela Falgun spring festival, marigold flowers, yellow and orange tones" },
  { id: "puja", n: "Puja", bn: "দুর্গা পূজা",         en: "Durga Puja festive season, red and white, diya lamps, festive glow" },
  { id: "wedding", n: "Wedding Season", bn: "বিয়ের সিজন",        en: "wedding season, bridal elegance, gold details, mehendi vibe" },
  { id: "winter", n: "Winter", bn: "শীতের কালেকশন",     en: "winter collection, cozy warm tones, soft knit textures" },
  { id: "summer", n: "Summer", bn: "সামার কালেকশন",     en: "summer collection, breezy cotton, fresh light colors, sunlight" },
  { id: "valentine", n: "Valentine\'s", bn: "ভ্যালেন্টাইন",       en: "Valentine's Day, romantic, roses and soft hearts" },
  { id: "mother", n: "Mother\'s Day", bn: "মা দিবস",           en: "Mother's Day, warm emotional gift theme" },
  { id: "new", n: "New Arrival", bn: "নিউ অ্যারাইভাল",     en: "New Arrival launch, fresh and exciting reveal" },
  { id: "flash", n: "Flash Sale", bn: "ফ্ল্যাশ সেল",        en: "Flash Sale, urgent limited-time energy, countdown feel" },
  { id: "weekend", n: "Weekend", bn: "উইকেন্ড অফার",      en: "Weekend Offer, relaxed but exciting deal" },
  { id: "1111", n: "11.11", bn: "১১.১১ মেগা সেল",     en: "11.11 Mega Sale, big bold numbers, shopping festival" },
  { id: "delivery", n: "Free Delivery", bn: "ফ্রি ডেলিভারি",      en: "Free Delivery Week, delivery box and trust feel" }
];

const STYLES = [
  "luxury minimal style with generous white space and refined serif typography",
  "soft pastel dreamy style with gentle gradients and airy light",
  "bold modern style with high contrast, big typography and strong shapes",
  "traditional Bengali style with alpona patterns and nakshi kantha stitch motifs as borders",
  "royal style with deep maroon, gold foil accents and ornate frames",
  "editorial fashion-magazine style with a clean grid and elegant headline",
  "floral botanical style with fresh flowers and leaves framing the product",
  "clean e-commerce studio style with a seamless backdrop and soft shadows",
  "festive glow style with fairy lights, bokeh and warm sparkle",
  "boho earthy style with natural textures, jute, clay pots and dried flowers"
];

const PALETTES = [
  "blush pink, ivory and rose gold",
  "deep maroon, gold and cream",
  "emerald green, gold and off-white",
  "lavender, lilac and silver",
  "mustard yellow, marigold orange and white",
  "navy blue, champagne and white",
  "red, white and a touch of gold",
  "mint green, peach and white",
  "black, gold and nude beige",
  "teal, coral and sand"
];

const TONES = [
  "warm and friendly", "luxury and elegant", "fun and playful",
  "emotional and heartfelt", "urgent and exciting", "short and catchy"
];

/* ---------- Category definitions ---------- */
const CATEGORIES = [
  {
    id: "threepiece", name: "৩-পিস / উইমেন ক্লোদিং", short: "৩-পিস ছবি থেকে",
    kind: "image", desc: "তোমার ড্রেসের ছবি ChatGPT-তে আপলোড করো, এই প্রম্পট দিয়ে ব্যানার বানাও",
    templates: [
      { name: "মডেল সহ ব্যানার", t: "Use the attached photo of my women's 3-piece (kameez, salwar and dupatta) as the exact product reference. Keep the fabric, color, print, embroidery and cut exactly the same, do not redesign it. Show a graceful South Asian female model wearing this outfit. Design: {style}. Theme: {occ}. Color palette: {pal}. Add the brand name \"[BRAND]\" at the top and a short headline in clean English typography. Leave space at the bottom for price text. Photorealistic, sharp fabric detail, aspect ratio {ratio}." },
      { name: "ফ্ল্যাট-লে ব্যানার", t: "Take the clothing in the attached image and create a premium flat-lay banner. Lay the kameez, salwar and dupatta neatly folded and arranged from above on a styled surface, keeping the exact design and colors from my photo. Style: {style}. Theme: {occ}. Palette: {pal}. Add small props that match the theme. Include \"[BRAND]\" logo text in a corner and the words \"New Collection\". Aspect ratio {ratio}, high resolution." },
      { name: "হ্যাঙ্গার ডিসপ্লে", t: "Using the dress in my uploaded photo as the exact reference, show it hanging on an elegant wooden hanger against a beautiful backdrop. {style}. Theme: {occ}. Colors: {pal}. Soft natural light, visible fabric texture and embroidery details. Add headline text \"Exclusive 3-Piece\" and brand name \"[BRAND]\". Aspect ratio {ratio}." },
      { name: "ক্লোজ-আপ ডিটেইল", t: "From the attached product photo, create a banner that highlights the fabric quality: one large hero shot of the full 3-piece plus two circular close-up insets showing embroidery and fabric texture. Keep the design identical to my photo. {style}, palette {pal}, theme {occ}. Add small labels like \"Premium Fabric\" and \"Fine Embroidery\", brand \"[BRAND]\". Aspect ratio {ratio}." },
      { name: "কালার ভ্যারিয়েশন কোলাজ", t: "Use my uploaded 3-piece photo as the base design. Create a collage banner showing this same outfit in 3 color options side by side, keeping the exact pattern and cut, only changing the main color to tones from this palette: {pal}. {style}. Theme: {occ}. Title \"Available in 3 Colors\" and brand \"[BRAND]\". Aspect ratio {ratio}." },
      { name: "অফার ব্যানার", t: "Place the exact outfit from my attached photo on the right side of a sale banner. Left side: big offer text \"UP TO 30% OFF\" with a smaller line \"Limited Stock\". {style}. Theme: {occ}. Palette: {pal}. Brand name \"[BRAND]\" and a small badge \"Cash on Delivery\". Keep the clothing realistic and unchanged. Aspect ratio {ratio}." },
      { name: "লাইফস্টাইল সিন", t: "Show a stylish young woman wearing the exact 3-piece from my uploaded image in a real lifestyle setting that fits {occ}. {style}. Palette: {pal}. Candid natural pose, soft cinematic lighting, shallow depth of field. Small elegant text \"[BRAND]\" in the corner. Keep the dress design 100% the same as the photo. Aspect ratio {ratio}." },
      { name: "ক্যাটালগ পেজ", t: "Turn my attached dress photo into a fashion catalog page: model wearing the outfit front view, a smaller back view, and the dupatta shown separately. {style}. Theme: {occ}. Colors: {pal}. Add a neat spec box with placeholders: Fabric, Size, Price. Brand \"[BRAND]\" at the top. Keep the outfit design exactly as in my photo. Aspect ratio {ratio}." }
    ],
    ratios: ["4:5 (1080x1350)", "1:1 (1080x1080)", "9:16 (1080x1920)"]
  },
  {
    id: "text", name: "টেক্সট ব্যানার", short: "শুধু লেখা দিয়ে",
    kind: "image", desc: "ছবি ছাড়াই সুন্দর টাইপোগ্রাফি ব্যানার",
    templates: [
      { name: "বড় অফার টেক্সট", t: "Design a typography-only banner. Main text: \"MEGA SALE\" huge and bold, second line \"Flat 25% Off on All 3-Piece\", small line \"Order now: [PHONE]\". {style}. Theme: {occ}. Palette: {pal}. Perfect text spelling, balanced layout, decorative elements that match the theme. Aspect ratio {ratio}." },
      { name: "কোট / বাণী পোস্ট", t: "Create an elegant quote banner with the text: \"Elegance is the only beauty that never fades.\" Add a small signature \"[BRAND]\" at the bottom. {style}. Theme: {occ}. Palette: {pal}. Beautiful typography hierarchy, subtle decorative frame. Aspect ratio {ratio}." },
      { name: "শুভেচ্ছা ব্যানার", t: "Design a festive greeting banner. Main greeting text for {occ} in large elegant lettering, a line below \"Warm wishes from [BRAND]\". {style}. Palette: {pal}. Ornamental details, centered composition, spelling must be exact. Aspect ratio {ratio}." },
      { name: "নোটিস / ঘোষণা", t: "Create a clean announcement banner with the heading \"Important Notice\" and body text \"Orders placed after 10 PM will be shipped next day. Thank you for staying with [BRAND].\" {style}. Theme: {occ}. Palette: {pal}. Very readable, organized, professional. Aspect ratio {ratio}." },
      { name: "কুপন কোড", t: "Design a coupon-style banner shaped like a ticket with a dashed tear line. Text: \"USE CODE: STYLE20\", \"Get 20% Off\", \"Valid this week only\", brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Crisp, exact lettering. Aspect ratio {ratio}." },
      { name: "কাউন্টডাউন", t: "Create a countdown banner with a large number \"3\" and text \"Days Left\", subtitle \"Sale ends soon — shop at [BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Strong focal point on the number, clean supporting text. Aspect ratio {ratio}." },
      { name: "ধন্যবাদ পোস্ট", t: "Design a thank-you typography banner: \"Thank You for 10K Love!\" with a smaller line \"From all of us at [BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Celebratory decorations, perfect spelling. Aspect ratio {ratio}." },
      { name: "স্টক আপডেট", t: "Create a bold text banner: \"BACK IN STOCK\" as the headline, below it \"Your favorite 3-piece is here again\" and \"Inbox to order — [PAGE]\". {style}. Theme: {occ}. Palette: {pal}. Eye-catching but clean. Aspect ratio {ratio}." }
    ],
    ratios: ["1:1 (1080x1080)", "4:5 (1080x1350)", "16:9 (1920x1080)"]
  },
  {
    id: "facebook", name: "ফেসবুক পোস্ট", short: "পেজের পোস্ট ডিজাইন",
    kind: "image", desc: "ফেসবুক পেজের জন্য রেডি পোস্ট ডিজাইন",
    templates: [
      { name: "প্রোডাক্ট লঞ্চ পোস্ট", t: "Design a Facebook post announcing a new women's 3-piece collection. Show 3 elegant outfits on models in a row. Headline \"New Collection Out Now\", subline \"[BRAND] — Inbox to order\". {style}. Theme: {occ}. Palette: {pal}. Scroll-stopping, clear hierarchy. Aspect ratio {ratio}." },
      { name: "কাস্টমার রিভিউ পোস্ট", t: "Create a Facebook customer review post: a chat-screenshot-style card with a 5-star rating and a short happy review placeholder text \"Fabric quality is amazing, exactly like the photo!\", beside a photo of a women's 3-piece. Brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Trustworthy look. Aspect ratio {ratio}." },
      { name: "প্রাইস লিস্ট পোস্ট", t: "Design a Facebook post with 4 women's 3-piece outfits in a 2x2 grid, each with a small price tag placeholder \"৳ ----\" and code \"A1, A2, A3, A4\". Header \"Today's Collection\" and footer \"Inbox for order — [PAGE]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "কম্বো অফার", t: "Create a Facebook combo-offer post: two women's outfits shown together with a plus sign between them and a big badge \"Combo Price\". Text \"Buy 2, Save More\" and brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "সাইজ গাইড পোস্ট", t: "Design an informative Facebook post: a women's kameez size guide chart with sizes S, M, L, XL, XXL and columns Chest, Length, Sleeve (use placeholder numbers). Small illustration of a kameez with measurement arrows. Brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "লাইভ সেল ঘোষণা", t: "Create a Facebook post announcing a live sale: \"LIVE TONIGHT 9 PM\" with a red live badge, a woman holding a 3-piece toward the camera, text \"Special prices only on live\" and \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Energetic. Aspect ratio {ratio}." },
      { name: "ডেলিভারি ট্রাস্ট পোস্ট", t: "Design a Facebook trust-building post: neatly packed parcels with brand tag \"[BRAND]\", icons for \"Cash on Delivery\", \"All Over Bangladesh\", \"Easy Exchange\". {style}. Theme: {occ}. Palette: {pal}. Clean and professional. Aspect ratio {ratio}." },
      { name: "এংগেজমেন্ট পোস্ট", t: "Create an engaging Facebook 'Which one is your favorite?' post: two women's 3-piece outfits labeled A and B, big question text \"A or B? Comment below!\", brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Fun and interactive. Aspect ratio {ratio}." }
    ],
    ratios: ["1:1 (1080x1080)", "4:5 (1080x1350)", "Cover 16:9 (1640x924)"]
  },
  {
    id: "instagram", name: "ইনস্টাগ্রাম ট্রেন্ডিং", short: "ট্রেন্ডি ডিজাইন",
    kind: "image", desc: "এখনকার ট্রেন্ড অনুযায়ী ইনস্টা পোস্ট",
    templates: [
      { name: "এস্থেটিক মুডবোর্ড", t: "Create an aesthetic Instagram moodboard collage for a women's fashion brand: fabric swatches, a model in a 3-piece, flowers, jewelry and handwritten notes, arranged like a scrapbook. {style}. Theme: {occ}. Palette: {pal}. Small text \"[BRAND] moodboard\". Aspect ratio {ratio}." },
      { name: "ক্যারোসেল কভার", t: "Design the first slide of an Instagram carousel: headline \"5 Ways to Style Your 3-Piece\", a model in an elegant outfit, small arrow hint \"Swipe\". Brand handle \"@[PAGE]\". {style}. Theme: {occ}. Palette: {pal}. Trendy, editorial. Aspect ratio {ratio}." },
      { name: "রিলস কভার", t: "Create an Instagram Reels cover: a model mid-twirl in a flowing 3-piece with motion in the dupatta, bold text \"GRWM: {occn}\" placed in the safe center area. {style}. Palette: {pal}. Brand \"[BRAND]\". Aspect ratio 9:16." },
      { name: "মিরর সেলফি স্টাইল", t: "Generate a trendy mirror-selfie style photo of a young South Asian woman wearing a stylish 3-piece, phone covering part of her face, aesthetic room background. {style}. Theme: {occ}. Palette: {pal}. Natural, authentic Instagram look, no text. Aspect ratio {ratio}." },
      { name: "গ্রিড পাজল পোস্ট", t: "Design one large image meant to be split into a 3-tile Instagram grid row: a panoramic fashion scene with three models in different 3-piece outfits, each centered in one third. Brand \"[BRAND]\" in the middle tile. {style}. Theme: {occ}. Palette: {pal}. Aspect ratio 3:1 (3240x1080)." },
      { name: "ফ্ল্যাট-লে উইথ অ্যাক্সেসরিজ", t: "Create an Instagram-worthy flat lay: a folded women's 3-piece with matching earrings, bangles, sandals and a small handbag arranged artistically from top view. {style}. Theme: {occ}. Palette: {pal}. Soft daylight. Tiny text \"Complete the look — [BRAND]\". Aspect ratio {ratio}." },
      { name: "বিফোর / আফটার স্টাইলিং", t: "Design an Instagram before/after split post: left side plain everyday outfit, right side the same woman glowing in an elegant 3-piece. Labels \"Before\" and \"After\", brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "পোলারয়েড কোলাজ", t: "Create a vintage polaroid collage Instagram post: 4 polaroid photos of women in different 3-piece outfits pinned on a soft background with tape, handwritten captions under each. {style}. Theme: {occ}. Palette: {pal}. Brand \"[BRAND]\". Aspect ratio {ratio}." }
    ],
    ratios: ["4:5 (1080x1350)", "1:1 (1080x1080)", "9:16 (1080x1920)"]
  },
  {
    id: "product", name: "প্রোডাক্ট ব্যানার", short: "যেকোনো প্রোডাক্ট",
    kind: "image", desc: "প্রোডাক্টের ছবি দিয়ে বা ছাড়া প্রফেশনাল ব্যানার",
    templates: [
      { name: "হিরো প্রোডাক্ট শট", t: "Use the attached product photo as the exact product. Place it as the hero on a premium podium with dramatic soft lighting. {style}. Theme: {occ}. Palette: {pal}. Headline \"Best Seller\" and brand \"[BRAND]\". Keep the product shape, color and label unchanged. Aspect ratio {ratio}." },
      { name: "ফিচার কলআউট", t: "Using my uploaded product image, create a banner with the product in the center and 4 feature callouts with thin lines pointing to it (placeholders: Feature 1–4). {style}. Theme: {occ}. Palette: {pal}. Brand \"[BRAND]\". Product must look identical to the photo. Aspect ratio {ratio}." },
      { name: "প্রাইস ড্রপ", t: "Design a price-drop banner with my attached product on one side and a crossed-out old price \"৳ 2500\" with a new price \"৳ 1990\" big on the other side. {style}. Theme: {occ}. Palette: {pal}. Brand \"[BRAND]\". Aspect ratio {ratio}." },
      { name: "গিফট বক্স প্রেজেন্টেশন", t: "Show my uploaded product beautifully presented in an open gift box with ribbon and tissue paper. {style}. Theme: {occ}. Palette: {pal}. Text \"Perfect Gift\" and \"[BRAND]\". Keep the product exactly as in the photo. Aspect ratio {ratio}." },
      { name: "ওয়েবসাইট হেডার", t: "Create a wide website header banner with my attached product on the right, headline space on the left: \"Shop the {occn} Collection\" and a button shape \"Shop Now\". {style}. Palette: {pal}. Brand \"[BRAND]\". Aspect ratio 21:9 (1920x820)." },
      { name: "বান্ডেল ডিসপ্লে", t: "Arrange multiple items like my uploaded product into a neat bundle display on a shelf. Badge \"Bundle Deal\". {style}. Theme: {occ}. Palette: {pal}. Brand \"[BRAND]\". Realistic commercial photography. Aspect ratio {ratio}." },
      { name: "ইন-ইউজ লাইফস্টাইল", t: "Show a person happily using my uploaded product in a real-life scene that suits {occ}. {style}. Palette: {pal}. Natural light, authentic emotion. Small brand text \"[BRAND]\". The product must remain exactly like the photo. Aspect ratio {ratio}." },
      { name: "ফেসবুক অ্যাড ক্রিয়েটিভ", t: "Design a high-converting Facebook ad creative with my attached product: bold hook text at top \"Stop scrolling!\", product in center, 3 short benefit icons below, CTA strip \"Order Now — Cash on Delivery\". {style}. Theme: {occ}. Palette: {pal}. Brand \"[BRAND]\". Aspect ratio {ratio}." }
    ],
    ratios: ["1:1 (1080x1080)", "4:5 (1080x1350)", "16:9 (1920x1080)"]
  },
  {
    id: "thumbnail", name: "থাম্বনেইল", short: "ইউটিউব / রিলস / লাইভ",
    kind: "image", desc: "ক্লিক বাড়ানোর মতো থাম্বনেইল",
    templates: [
      { name: "ট্রাই-অন হল", t: "Create a YouTube thumbnail: an excited young woman on the right holding up a 3-piece, big bold text on the left \"TRY-ON HAUL\" with a smaller tag \"{occn}\". {style}. Palette: {pal}. Strong contrast, expressive face, readable on small screens. Aspect ratio 16:9 (1280x720)." },
      { name: "আনবক্সিং", t: "Design a thumbnail for an unboxing video: hands opening a parcel with a beautiful dress peeking out, shocked-happy expression, text \"UNBOXING!\" and small brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "স্টাইলিং টিপস", t: "Create a thumbnail with text \"1 Dress 3 Looks\" and three small images of the same woman styling one 3-piece in 3 ways. {style}. Theme: {occ}. Palette: {pal}. Bold, clickable, minimal clutter. Aspect ratio {ratio}." },
      { name: "লাইভ সেল থাম্বনেইল", t: "Design a live-video thumbnail: a red \"LIVE\" badge, a smiling seller holding up clothes, text \"Live Sale Tonight\" and \"Special Discount\". Brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "প্রাইস কম্পেয়ার", t: "Create a curiosity thumbnail: two outfits side by side with labels \"৳ 1500\" vs \"৳ 5000\" and the question \"Can You Tell?\". {style}. Theme: {occ}. Palette: {pal}. High contrast, readable. Aspect ratio {ratio}." },
      { name: "বিহাইন্ড দ্য সিনস", t: "Design a thumbnail for a behind-the-scenes video: a small boutique workspace with fabrics, sewing table and packaging, text \"How We Pack Your Order\". Brand \"[BRAND]\". {style}. Theme: {occ}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "টপ ৫ লিস্ট", t: "Create a thumbnail with a big number \"5\" and text \"Must-Have Outfits for {occn}\", with a model wearing a trendy 3-piece. {style}. Palette: {pal}. Eye-catching, clean background. Aspect ratio {ratio}." },
      { name: "রিলস হুক কভার", t: "Design a vertical Reels/TikTok cover: model in a stunning 3-piece, bold hook text in the center-safe area \"Wait for the last one...\". {style}. Theme: {occ}. Palette: {pal}. Brand \"[BRAND]\". Aspect ratio 9:16." }
    ],
    ratios: ["16:9 (1280x720)", "9:16 (1080x1920)", "1:1 (1080x1080)"]
  },
  {
    id: "festival", name: "উৎসব ব্যানার", short: "ঈদ, বৈশাখ, পূজা...",
    kind: "image", desc: "উৎসবের শুভেচ্ছা ও অফার ব্যানার",
    templates: [
      { name: "উৎসবের শুভেচ্ছা + মডেল", t: "Create a festive greeting banner for {occ}: a graceful woman in a traditional 3-piece, festive decorations around her, greeting text placed elegantly and \"From [BRAND]\". {style}. Palette: {pal}. Warm, joyful, high-quality. Aspect ratio {ratio}." },
      { name: "উৎসব অফার", t: "Design a festival sale banner for {occ}: big text \"Festive Offer\", \"Up to 40% Off\", decorative cultural motifs, a model in festive wear. Brand \"[BRAND]\", small \"Limited Time\". {style}. Palette: {pal}. Aspect ratio {ratio}." },
      { name: "ফেসবুক কভার ফটো", t: "Create a Facebook page cover photo for {occ}: wide composition, models on the right, open space on the left for brand name \"[BRAND]\" and tagline \"Celebrate in Style\". Keep important content away from the bottom-left (profile photo area). {style}. Palette: {pal}. Aspect ratio 820x312 (about 2.63:1)." },
      { name: "প্রোফাইল ফ্রেম", t: "Design a circular profile picture frame for {occ}: a decorative ring border with festive motifs and a small ribbon text \"[BRAND]\", center transparent-looking plain area. {style}. Palette: {pal}. Aspect ratio 1:1." },
      { name: "ডেলিভারি ডেডলাইন", t: "Create a banner: \"Order before the deadline to receive before {occn}\", with a calendar icon, delivery van illustration and \"[BRAND]\". {style}. Palette: {pal}. Clear and urgent. Aspect ratio {ratio}." },
      { name: "স্টোরি শুভেচ্ছা", t: "Design an Instagram/Facebook story for {occ}: vertical layout, festive illustration, short greeting at the top, a space at the bottom for a link sticker, brand \"[BRAND]\". {style}. Palette: {pal}. Aspect ratio 9:16." },
      { name: "কালেকশন লুকবুক", t: "Create a festive lookbook cover for {occ}: three models in coordinated 3-piece outfits, title \"The Festive Edit\" and \"[BRAND]\". {style}. Palette: {pal}. Editorial photography. Aspect ratio {ratio}." },
      { name: "ইলাস্ট্রেশন পোস্ট", t: "Create a hand-drawn illustration style festive post for {occ}: a stylized woman in a flowing 3-piece surrounded by cultural motifs, soft paper texture, greeting text and \"[BRAND]\". {style}. Palette: {pal}. Aspect ratio {ratio}." }
    ],
    ratios: ["1:1 (1080x1080)", "4:5 (1080x1350)", "16:9 (1920x1080)"]
  },
  {
    id: "caption", name: "ক্যাপশন রাইটিং", short: "পোস্টের লেখা",
    kind: "text", desc: "ChatGPT দিয়ে সুন্দর ক্যাপশন ও লেখা বানানোর প্রম্পট",
    templates: [
      { name: "প্রোডাক্ট ক্যাপশন", t: "You are an expert Bangladeshi fashion copywriter. Write 3 Facebook captions in Bangla for a women's 3-piece from my page \"[BRAND]\". Occasion: {occ}. Tone: {tone}. Each caption: a strong hook in the first line, 2–3 lines about fabric and comfort, price placeholder (৳ ----), call to action \"ইনবক্স করুন\" and 5 relevant hashtags. Use emojis naturally, not too many." },
      { name: "ছবি দেখে ক্যাপশন", t: "Look at the attached outfit photo carefully. Describe its color, design and fabric feel, then write 2 Bangla captions and 1 English caption for my brand \"[BRAND]\" for {occ}. Tone: {tone}. Keep each under 80 words, end with a call to action and 6 hashtags." },
      { name: "ইনস্টা ক্যাপশন", t: "Write 5 short Instagram captions (English with a little Bangla mix) for a women's fashion post about {occ}. Tone: {tone}. Each under 20 words, aesthetic and trendy, plus a block of 15 mixed hashtags (popular + niche + Bangladeshi fashion)." },
      { name: "অফার পোস্টের লেখা", t: "Write a high-converting Bangla offer post for \"[BRAND]\" for {occ}. Tone: {tone}. Structure: attention hook, offer details (placeholders for discount and deadline), why buy now, delivery info (Cash on Delivery, all over Bangladesh), order instructions with phone [PHONE], and hashtags." },
      { name: "স্টোরিটেলিং পোস্ট", t: "Write an emotional storytelling Facebook post in Bangla for {occ} that connects a woman's memories with the joy of wearing a new dress, and gently introduces \"[BRAND]\" at the end. Tone: {tone}. 120–150 words, no hard selling, end with a soft question to boost comments." },
      { name: "কমেন্ট রিপ্লাই টেমপ্লেট", t: "Create 10 polite, friendly Bangla reply templates for comments on my clothing page \"[BRAND]\" during {occ}: price asking, size asking, delivery charge, availability, compliments, complaints, and 'inbox please'. Tone: {tone}. Each reply 1–2 lines." },
      { name: "রিলস স্ক্রিপ্ট + ক্যাপশন", t: "Write a 20-second Reels script for a women's 3-piece video for {occ}: scene-by-scene shots, on-screen text for each shot, a trending-style hook in the first 2 seconds, then a Bangla caption with hashtags. Brand \"[BRAND]\". Tone: {tone}." },
      { name: "প্রোডাক্ট ডেসক্রিপশন", t: "Write a detailed product description in Bangla and English for a women's 3-piece for {occ}, for my page \"[BRAND]\". Tone: {tone}. Include: title, 4 bullet features (fabric, work, dupatta, fit), size info placeholder, wash care, and a closing line that builds trust." }
    ],
    ratios: [""]
  },
  {
    id: "strategy", name: "কনটেন্ট আইডিয়া", short: "প্ল্যান ও আইডিয়া",
    kind: "text", desc: "কী পোস্ট করবে, কখন করবে — ChatGPT দিয়ে প্ল্যান",
    templates: [
      { name: "৭ দিনের কনটেন্ট প্ল্যান", t: "Act as a social media manager for a Bangladeshi women's clothing page \"[BRAND]\". Make a 7-day content plan for {occ}. For each day give: post type, idea, image prompt for ChatGPT, Bangla caption, best posting time in Bangladesh, and one engagement trick. Tone: {tone}. Present as a table." },
      { name: "৩০ দিনের ক্যালেন্ডার", t: "Create a 30-day Facebook + Instagram content calendar for my 3-piece clothing business \"[BRAND]\" leading up to {occ}. Mix: product posts, reviews, behind the scenes, tips, offers, reels. Show date, format, short idea and goal. Tone: {tone}." },
      { name: "ভাইরাল হুক আইডিয়া", t: "Give me 20 scroll-stopping hook lines in Bangla for women's fashion reels and posts about {occ}. Mix curiosity, emotion, humor and urgency. Tone: {tone}. Mark the top 5 you think will perform best and explain why in one line each." },
      { name: "লাইভ সেল স্ক্রিপ্ট", t: "Write a complete Facebook live sale script in Bangla for \"[BRAND]\" for {occ}: opening greeting, how to keep viewers, showing each dress (placeholder list), handling comments, offer reveal, closing. Tone: {tone}. Add timing for a 30-minute live." },
      { name: "অ্যাড কপি", t: "Write 5 Facebook ad copies in Bangla for a women's 3-piece campaign for {occ} by \"[BRAND]\". Use different angles: price, quality, emotion, social proof, urgency. Each with headline, primary text (under 90 words) and CTA. Tone: {tone}." },
      { name: "প্রতিযোগী বিশ্লেষণ", t: "I sell women's 3-piece online in Bangladesh under \"[BRAND]\". For {occ}, list 10 content ideas that most pages are NOT doing but that would make my page stand out. For each: idea, why it works, and a ready-to-use ChatGPT image prompt. Tone: {tone}." },
      { name: "এংগেজমেন্ট পোস্ট আইডিয়া", t: "Give me 15 engagement post ideas (polls, this-or-that, quizzes, fill-in-the-blank, giveaways) for my women's clothing page \"[BRAND]\" around {occ}. Write the exact Bangla text for each post. Tone: {tone}." },
      { name: "ব্র্যান্ড স্টোরি", t: "Help me write my brand story for \"[BRAND]\", a Bangladeshi women's clothing page. Ask me 5 short questions first about how I started, my values and customers. After I answer, write a 150-word Bangla 'About Us' post and a pinned post for {occ}. Tone: {tone}." }
    ],
    ratios: [""]
  }
];

/* ---------- Build the full library ---------- */
function buildLibrary() {
  const list = [];
  CATEGORIES.forEach((cat, ci) => {
    cat.templates.forEach((tpl, ti) => {
      OCCASIONS.forEach((occ, oi) => {
        const style = STYLES[(ti * 3 + oi + ci) % STYLES.length];
        const pal = PALETTES[(ti * 7 + oi * 3 + ci) % PALETTES.length];
        const tone = TONES[(ti + oi * 2 + ci) % TONES.length];
        const ratio = cat.ratios[(ti + oi) % cat.ratios.length];
        const text = tpl.t
          .replaceAll("{occn}", occ.n)
          .replaceAll("{occ}", occ.en)
          .replace(/(^|[.!?]\s+)\{style\}/g, (m, pre) => pre + style.charAt(0).toUpperCase() + style.slice(1))
          .replaceAll("{style}", style)
          .replaceAll("{pal}", pal)
          .replaceAll("{tone}", tone)
          .replaceAll("{ratio}", ratio);
        list.push({
          id: `${cat.id}-${ti}-${occ.id}`,
          cat: cat.id,
          kind: cat.kind,
          title: tpl.name,
          occ: occ.bn,
          occId: occ.id,
          needsPhoto: /attached|uploaded|my photo/i.test(tpl.t),
          text
        });
      });
    });
  });
  return list;
}

/* ---------- Upcoming events (lunar dates are approximate) ---------- */
const EVENTS = [
  { occ: "puja",     date: "2026-10-17" },
  { occ: "1111",     date: "2026-11-11" },
  { occ: "wedding",  date: "2026-12-01" },
  { occ: "winter",   date: "2026-12-15" },
  { occ: "falgun",   date: "2027-02-13" },
  { occ: "valentine",date: "2027-02-14" },
  { occ: "ramadan",  date: "2027-02-08" },
  { occ: "eid-fitr", date: "2027-03-10" },
  { occ: "boishakh", date: "2027-04-14" },
  { occ: "mother",   date: "2027-05-09" },
  { occ: "eid-adha", date: "2027-05-17" },
  { occ: "summer",   date: "2027-06-01" },
  { occ: "puja",     date: "2027-10-06" },
  { occ: "1111",     date: "2027-11-11" }
];

/* Weekly posting rhythm: what kind of post works on each day */
const WEEK_PLAN = [
  { day: "রবিবার",   theme: "কাস্টমার রিভিউ ও বিশ্বাস",   cats: ["facebook", "caption"] },
  { day: "সোমবার",   theme: "স্টাইলিং টিপস",            cats: ["instagram", "caption"] },
  { day: "মঙ্গলবার", theme: "প্রোডাক্ট হাইলাইট",         cats: ["threepiece", "caption"] },
  { day: "বুধবার",   theme: "রিলস ও ভিডিও",             cats: ["thumbnail", "strategy"] },
  { day: "বৃহস্পতিবার", theme: "উইকেন্ড অফার",           cats: ["text", "caption"] },
  { day: "শুক্রবার", theme: "লাইফস্টাইল ও আবেগ",         cats: ["threepiece", "caption"] },
  { day: "শনিবার",   theme: "নিউ অ্যারাইভাল",           cats: ["product", "caption"] }
];
