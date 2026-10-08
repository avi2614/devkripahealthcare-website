/**
 * Blog posts. General patient-education articles on the treatments the clinic offers.
 *
 * `body` is lightweight markup rendered by components/blog/post-body.tsx:
 *   "## Heading"   → section heading (also used for the table of contents)
 *   "- item"       → bullet (consecutive bullets form one list)
 *   blank line     → paragraph break
 *   [text](/href)  → inline link
 */

export type BlogCategory = "Dental care" | "Skin care" | "Hair care";

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  category: BlogCategory;
  date: string;
  updated?: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  /** Treatment id (data/site.ts) the post links through to. */
  treatmentId: string;
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "root-canal-treatment-step-by-step",
    title: "Root canal treatment: what actually happens, step by step",
    description:
      "Is a root canal painful? How many sittings does it take? A plain-language guide to root canal treatment (RCT) and why a crown usually follows.",
    category: "Dental care",
    date: "2026-10-06",
    image: "/images/doctor-treating-2.webp",
    imageAlt: "Dr. Jahanvi Tyagi examining a patient's teeth",
    keywords: ["root canal treatment Jaipur", "RCT Jhotwara", "is root canal painful", "tooth capping after RCT"],
    treatmentId: "root-canal",
    body: `Few dental treatments have a scarier reputation than the root canal. In reality, a root canal is what relieves the pain of an infected tooth — and it lets you keep a tooth that would otherwise have to come out. Here is what the treatment involves, so you know what to expect before you sit in the chair.

## Why a tooth needs a root canal

Inside every tooth is a soft core called the pulp, which holds nerves and blood vessels. When deep decay, a crack or repeated dental work lets bacteria reach the pulp, it becomes inflamed or infected. Common signs include:

- Lingering pain when you drink something hot or cold
- A throbbing ache, especially at night or when biting
- Swelling of the gum near the tooth, or a small pimple-like bump on the gum
- A tooth that has turned darker than its neighbours

Sometimes an infected tooth causes no pain at all and is only found on an X-ray. That is one reason routine check-ups matter.

## What happens during the treatment

Root canal treatment (RCT) is done under local anaesthesia, so the tooth is numb throughout. The steps are broadly:

- **Access** — a small opening is made in the top of the tooth to reach the pulp.
- **Cleaning** — the infected pulp is removed and the narrow canals inside the roots are cleaned and shaped with fine instruments.
- **Disinfection** — the canals are rinsed to clear remaining bacteria. If the infection is significant, medication may be placed inside and the tooth sealed temporarily.
- **Filling** — once the canals are clean, they are filled and sealed so bacteria cannot return.

Depending on the tooth and the extent of infection, RCT may be completed in one sitting or spread over two or three.

## Does a root canal hurt?

Most patients say the treatment feels similar to having a filling. The pain people associate with root canals usually comes from the infection itself, before treatment. Some tenderness for a few days afterwards is normal and is generally managed with the medicines your dentist advises.

## Why a crown (cap) usually follows

A tooth that has had a root canal — especially a back tooth that takes heavy chewing forces — is more brittle than before. A crown, also called a cap, covers and protects it from cracking. Skipping the crown is one of the most common reasons a root-canal-treated tooth fails later.

## Looking after the tooth afterwards

- Avoid chewing hard food on the tooth until the permanent filling or crown is in place.
- Brush and floss as usual — the tooth can still get decay at the edges.
- Keep your follow-up appointments so healing can be checked.

## When to see a dentist

If you have tooth pain that lingers, swelling, or a tooth that hurts to bite on, don't wait for it to settle — infections tend to get worse, not better. At Devkripa Healthcare in Jhotwara, Dr. Jahanvi Tyagi will examine the tooth, take an X-ray if needed and explain whether a root canal is the right option. You can [read more about root canal treatment](/dental-care/root-canal) or [book a consultation](/book).`,
  },
  {
    slug: "dental-implants-vs-bridges",
    title: "Dental implant or bridge? How to choose when you lose a tooth",
    description:
      "Implants and bridges both replace missing teeth, but they work very differently. Compare how each works, who suits which, and how long they last.",
    category: "Dental care",
    date: "2026-10-02",
    image: "/images/dental-operatory.webp",
    imageAlt: "The dental operatory at Devkripa Healthcare with a green dental chair",
    keywords: ["dental implants Jaipur", "implant vs bridge", "missing tooth replacement", "dental bridge Jhotwara"],
    treatmentId: "implants",
    body: `Losing a tooth affects more than your smile. The gap can make chewing harder, neighbouring teeth can slowly tilt into the space, and the bone under a missing tooth gradually shrinks. The two most common fixed options to replace a tooth are a dental implant and a bridge. Both can look natural — the difference lies in how they are supported.

## How a dental implant works

An implant is a small titanium post placed in the jawbone where the root of the missing tooth used to be. Over a few months the bone bonds to it. A crown is then fixed on top. Because it stands on its own, an implant doesn't depend on the teeth next to it.

- Neighbouring teeth are left untouched
- It helps preserve the jawbone, because the bone continues to be stimulated
- With good care it can last for many years
- It requires a minor surgical procedure and a healing period before the final crown

## How a bridge works

A bridge replaces a missing tooth by anchoring to the teeth on either side. Those teeth are trimmed and capped with crowns, and a false tooth is attached between them.

- Treatment is usually quicker, with no surgery
- It can be a good option when the neighbouring teeth already need crowns
- Healthy neighbouring teeth have to be trimmed to support it
- Cleaning under a bridge needs extra care (floss threaders or interdental brushes)

## Which one suits you?

There is no single right answer. The choice depends on things your dentist will assess:

- **Bone and gum health** — an implant needs enough healthy bone. Gum disease should be treated first.
- **Condition of the neighbouring teeth** — if they are healthy, an implant spares them; if they are heavily filled, crowning them for a bridge may make sense.
- **General health** — uncontrolled diabetes and smoking can slow healing and affect implant success.
- **Time** — a bridge is usually completed sooner than an implant.

## Replacing several teeth

Implants aren't only for single teeth. Two or more implants can support a bridge, and implants can also support a full-arch restoration for people missing all the teeth in a jaw.

## Don't leave the gap too long

Whichever option you choose, it's usually easier to replace a tooth sooner rather than later, before neighbouring teeth drift or the bone shrinks. Dr. Jahanvi Tyagi places [dental implants](/dental-care/implants) and also offers [crowns and bridges](/dental-care/veneers-bridges) at the clinic in Jhotwara, Jaipur. A consultation is the best place to weigh up the options for your mouth — [book one here](/book).`,
  },
  {
    slug: "braces-vs-clear-aligners",
    title: "Braces vs clear aligners: which is right for straightening your teeth?",
    description:
      "Metal braces or invisible aligners? An honest comparison of how they work, comfort, appearance, discipline needed and which cases each suits best.",
    category: "Dental care",
    date: "2026-09-29",
    image: "/images/px-braces-model.webp",
    imageAlt: "A dentist holding a dental model fitted with braces",
    keywords: ["braces Jaipur", "clear aligners Jaipur", "teeth straightening", "malocclusion treatment"],
    treatmentId: "orthodontics",
    body: `Crooked, crowded or gapped teeth — and bite problems known as malocclusion — are very common. Straightening them isn't only about looks: well-aligned teeth are easier to clean and can wear more evenly. Today there are two main ways to move teeth: traditional braces and clear aligners.

## How braces work

Braces use small brackets bonded to each tooth, connected by a wire. The wire is adjusted at regular visits to apply gentle, steady pressure that moves teeth into position over time. Brackets can be metal or tooth-coloured ceramic.

- They work for a very wide range of problems, including complex bite issues
- They are fixed, so they work around the clock without you having to remember anything
- Eating needs some care — hard and sticky foods can break brackets
- Brushing takes more time, because food collects around brackets and wires

## How clear aligners work

Clear aligners are a series of thin, transparent trays custom-made for your teeth. Each set moves the teeth a little; you switch to the next set every one to two weeks.

- They are nearly invisible when worn
- You remove them to eat and to brush, so there are no food restrictions
- They must be worn for around 20–22 hours a day to work — discipline matters
- They suit many mild to moderate cases; some complex movements are better handled with braces

## Comfort

Both cause some pressure or soreness for a day or two after an adjustment or a new set of aligners. Braces can rub on the cheeks at first; orthodontic wax helps until you get used to them.

## How long does treatment take?

It depends entirely on how much the teeth need to move. Many treatments take between several months and two years. Whichever method you use, you'll need a retainer afterwards to stop teeth drifting back.

## Is there an age limit?

No. Children are often assessed around the age of 7 to catch bite problems early, but adults can straighten their teeth too, as long as the gums and bone are healthy.

## Choosing between them

The right option depends on your bite, the movements needed and how you live. A consultation and examination will show which works for your teeth. At Devkripa Healthcare in Jhotwara, Jaipur, both [braces and clear aligners](/dental-care/orthodontics) are available. [Book a consultation](/book) to talk it through.`,
  },
  {
    slug: "tooth-sensitivity-causes-and-relief",
    title: "Why are my teeth sensitive? Causes, home care and when to see a dentist",
    description:
      "A sharp twinge with cold water or sweets? Learn the common causes of tooth sensitivity, what helps at home, and the signs that need a dentist.",
    category: "Dental care",
    date: "2026-09-25",
    image: "/images/doctor-treating-1.webp",
    imageAlt: "Dr. Jahanvi Tyagi working on a patient under the dental light",
    keywords: ["tooth sensitivity", "sensitive teeth treatment", "dentist Jhotwara", "teeth cleaning Jaipur"],
    treatmentId: "cleaning-whitening",
    body: `That quick, sharp jolt when you sip cold water or bite into ice cream is one of the most common dental complaints. Sensitivity happens when the layer under the enamel — called dentine — becomes exposed. Dentine contains tiny channels that lead to the nerve, so hot, cold, sweet or sour things can trigger pain.

## Common causes

- **Brushing too hard** or using a hard-bristled brush, which wears enamel and pushes gums back
- **Receding gums**, which expose the root surface of the tooth
- **Acidic food and drink** — soft drinks, citrus, pickles — which soften enamel
- **Grinding or clenching** your teeth, often at night
- **Tooth decay or a cracked tooth**
- **Gum disease** and tartar build-up
- Temporary sensitivity after **whitening, cleaning or a new filling**

## What helps at home

- Switch to a soft-bristled brush and use gentle, short strokes
- Use a desensitising toothpaste twice a day; it often takes a few weeks to help
- After acidic food or drink, rinse with water and wait before brushing
- Don't skip flossing — healthy gums protect the roots

## When it's more than sensitivity

See a dentist if:

- The pain lasts more than a few seconds after the trigger is gone
- One particular tooth hurts, rather than a general sensitivity
- It hurts to bite down
- There's swelling, or the sensitivity has been getting worse

Lingering or one-tooth pain can be a sign of decay, a crack or a nerve problem that may need a filling or a [root canal](/dental-care/root-canal).

## How a dentist can help

Treatment depends on the cause. It may include professional [scaling and polishing](/dental-care/cleaning-whitening) to remove tartar, applying a protective varnish to exposed areas, filling a cavity, covering exposed roots, or a night guard if you grind.

If sensitivity is bothering you, Dr. Jahanvi Tyagi can find the cause and suggest the right fix. The clinic in Jhotwara, Jaipur is open every day — [book a visit](/book).`,
  },
  {
    slug: "childs-first-dental-visit",
    title: "Your child's first dental visit: when to go and how to prepare",
    description:
      "When should a child first see a dentist? What happens at the visit, how to prepare your child, and simple habits that prevent cavities in milk teeth.",
    category: "Dental care",
    date: "2026-09-21",
    image: "/images/doctor-child-patient.webp",
    imageAlt: "Dr. Jahanvi Tyagi with a young patient smiling in the dental chair",
    keywords: ["child dentist Jaipur", "kids dental care", "milk teeth cavities", "first dental visit"],
    treatmentId: "cleaning-whitening",
    body: `Milk teeth fall out eventually, so it's tempting to think they don't matter much. But they hold space for the permanent teeth, help children chew and speak properly, and decay in milk teeth can cause real pain and infection. A good first experience at the dentist also sets the tone for a lifetime.

## When to go

A good rule is to book the first visit around the time the first tooth appears, and no later than the first birthday. After that, a check-up every six months is usually enough — or sooner if you notice something.

## What happens at the first visit

The first visit is short and gentle. The dentist will usually:

- Look at the teeth, gums and bite
- Check for early signs of decay
- Show you how to clean your child's teeth
- Talk about diet, bottle and feeding habits, and thumb-sucking

For very young children, the examination may be done with the child sitting on a parent's lap.

## How to prepare your child

- Keep it positive. Use simple words like "the dentist will count your teeth"
- Avoid words like "hurt", "injection" or "drill", and don't use the dentist as a threat
- Choose a time of day when your child is usually rested and fed
- Read a picture book or play "dentist" with a toy at home

## Habits that prevent cavities

- Start cleaning as soon as the first tooth appears, with a soft brush and a smear of fluoride toothpaste
- From age 3, use a pea-sized amount, and supervise brushing until about 7 or 8
- Don't put a child to sleep with a bottle of milk or juice
- Limit sticky sweets and sugary drinks, especially between meals
- Start flossing once two teeth touch

## Signs to watch for

White or brown spots on the teeth, a child who avoids chewing on one side, swelling, or complaints of tooth pain all deserve a dental visit.

Dr. Jahanvi Tyagi sees children at the clinic in Jhotwara, Jaipur, and takes time to make young patients comfortable. [Book an appointment](/book) for your child's check-up.`,
  },
  {
    slug: "melasma-pigmentation-treatment",
    title: "Melasma and pigmentation: causes, triggers and treatment options",
    description:
      "Why dark patches appear on the face, what makes melasma worse, and how sunscreen, creams, peels and laser toning are used to treat pigmentation.",
    category: "Skin care",
    date: "2026-10-04",
    image: "/images/px-laser-toning.webp",
    imageAlt: "A practitioner performing a laser skin treatment on a patient wearing protective glasses",
    keywords: ["melasma treatment Jaipur", "pigmentation treatment Jhotwara", "laser toning", "dark patches on face"],
    treatmentId: "pigmentation",
    body: `Brown or grey-brown patches on the cheeks, forehead, upper lip or nose are one of the most common skin concerns in India. Often this is melasma; sometimes it's another kind of pigmentation, like sun spots or the dark marks left behind after acne. Getting the diagnosis right matters, because the treatment differs.

## What causes melasma?

Melasma happens when the skin's pigment cells become overactive. It isn't fully understood, but common triggers include:

- **Sun exposure** — the single biggest trigger, including visible light and heat
- **Hormones** — pregnancy, oral contraceptives and hormonal therapy
- **Genetics** — it often runs in families
- **Some cosmetics and irritating products** that inflame the skin

Melasma is more common in women and in medium to darker skin tones.

## Other types of pigmentation

- **Post-inflammatory hyperpigmentation** — dark marks left after acne, burns or irritation
- **Sun spots and freckles** — small, well-defined spots from cumulative sun exposure
- **Uneven skin tone and tanning**

## Treatment options

Pigmentation is usually treated with a combination of approaches, tailored to the type and depth of pigment:

- **Daily sun protection** — a broad-spectrum sunscreen, reapplied, is the foundation of every treatment plan. Without it, other treatments rarely last.
- **Prescription creams** — to slow pigment production and lighten patches.
- **Chemical peels** — controlled exfoliation that helps fade surface pigment. [Read about chemical peels](/skin-care/chemical-peels).
- **Laser toning** — low-energy laser that breaks up pigment gradually over several sessions.
- **Skin-rejuvenation treatments** to improve overall tone and texture.

## What to expect

Melasma can be controlled and lightened significantly, but it's a long-term condition and can return with sun exposure or hormonal changes. Expect gradual improvement over weeks to months, and maintenance afterwards.

## What to avoid

Steroid-containing "fairness" creams bought over the counter can seem to work at first but can damage skin and worsen pigmentation over time. Avoid harsh scrubs and home remedies that irritate the skin.

Melasma, pigmentation and uneven skin tone are among the concerns Dr. Jahanvi Tyagi treats most at the clinic in Jhotwara, Jaipur. See [melasma and pigmentation treatment](/skin-care/pigmentation) or [book a skin consultation](/book).`,
  },
  {
    slug: "acne-scars-treatment-options",
    title: "Acne scars: types and the treatments that can improve them",
    description:
      "Ice pick, boxcar or rolling scars — and dark marks that aren't scars at all. How acne scars are treated with peels, microneedling and more.",
    category: "Skin care",
    date: "2026-09-27",
    image: "/images/px-microneedling.webp",
    imageAlt: "A microneedling treatment on a patient's cheek",
    keywords: ["acne scar treatment Jaipur", "acne treatment Jhotwara", "microneedling for scars", "pimple marks"],
    treatmentId: "acne",
    body: `Once acne settles, many people are left with marks that last much longer than the breakouts did. The good news is that most acne marks can be improved. The first step is knowing what kind of mark you have.

## Marks versus scars

- **Dark spots (post-inflammatory hyperpigmentation)** — flat brown or dark marks. These are not true scars; they fade over months, and treatment can speed this up.
- **Red marks** — flat pink or red areas where inflammation has been. These also fade with time.
- **True scars** — changes in skin texture, either depressed (sunken) or raised.

## Types of depressed scars

- **Ice pick scars** — narrow, deep pits
- **Boxcar scars** — wider depressions with sharp edges
- **Rolling scars** — broad, shallow depressions that give the skin a wavy look

Most people have a mix, which is why combined treatment often works best.

## Treat active acne first

There's little point treating scars while new breakouts keep forming. Active acne is usually controlled first with topical or oral medication, sometimes combined with peels. Avoid picking or squeezing pimples — this is one of the main causes of scarring.

## Treatments for scars and marks

- **Chemical peels** — help with dark marks and shallow scarring. [More on peels](/skin-care/chemical-peels).
- **Microneedling** — fine needles create controlled micro-injuries that stimulate collagen and gradually lift depressed scars. [More on microneedling](/skin-care/microneedling).
- **PRP combined with microneedling** — your own platelet-rich plasma may be used to support healing.
- **Microdermabrasion** — gentle resurfacing for shallow marks and dull texture.

Several sessions, spaced a few weeks apart, are usually needed. Improvement is gradual, as new collagen builds over months.

## Realistic expectations

Treatment can make scars considerably less noticeable, but rarely removes them entirely. A consultation helps set a realistic goal for your skin.

## Daily care that helps

- Use sunscreen every day — sun darkens marks and slows fading
- Use gentle, non-comedogenic products
- Don't pick at scabs or pimples

Dr. Jahanvi Tyagi treats acne and acne scars at the clinic in Jhotwara, Jaipur. Learn more about [acne and acne scar treatment](/skin-care/acne) or [book a consultation](/book).`,
  },
  {
    slug: "hydrafacial-vs-chemical-peel",
    title: "HydraFacial, carbon facial or chemical peel: which one does your skin need?",
    description:
      "A clear comparison of HydraFacial, carbon facial, PRP facial and chemical peels — what each does, who it suits, and what to expect afterwards.",
    category: "Skin care",
    date: "2026-09-23",
    image: "/images/px-hydrafacial.webp",
    imageAlt: "A patient receiving a facial treatment with a handheld device",
    keywords: ["HydraFacial Jaipur", "carbon facial Jaipur", "chemical peel Jhotwara", "PRP facial", "medi facial"],
    treatmentId: "medi-facials",
    body: `Clinic facials — often called medi-facials — go further than a salon facial because they use medical-grade devices and products chosen for a specific skin concern. Here's how the most popular options compare.

## HydraFacial

HydraFacial uses a handheld device that cleanses, exfoliates, extracts and hydrates the skin in one session, using suction and a sequence of serums.

- **Good for:** dull or dehydrated skin, clogged pores, blackheads, and a quick glow before an event
- **Downtime:** usually none
- **Feels like:** a cool, gentle suction

## Carbon facial

A thin layer of carbon is applied to the skin and then passed over with a laser. The carbon absorbs the laser energy, helping to clean out pores and exfoliate.

- **Good for:** oily skin, enlarged pores, and mild dullness
- **Downtime:** minimal; skin may look slightly pink for a short while

## PRP facial

Platelet-rich plasma is prepared from a small sample of your own blood and applied to the skin, often with microneedling, to support skin repair.

- **Good for:** texture, fine lines and overall skin quality
- **Downtime:** some redness for a day or two

## Chemical peel

A peel solution is applied for a set time to remove the outer layer of dead skin cells. Peels range from very light to deeper ones.

- **Good for:** pigmentation, acne marks, active acne (certain peels), and fine lines
- **Downtime:** depends on strength — from none to a few days of flaking

## How to choose

- Want an instant refresh with no downtime? **HydraFacial**.
- Oily skin and open pores? **Carbon facial**.
- Concerned about texture and early ageing? **PRP facial**.
- Pigmentation or acne marks? A **chemical peel** is often the better tool.

Most concerns respond best to a series of sessions rather than a one-off, and many plans combine treatments.

## Before and after any facial treatment

- Tell your doctor about any medicines, skin creams (especially retinoids) and recent treatments
- Avoid waxing, scrubbing or strong actives for a few days before and after
- Wear sunscreen — freshly treated skin is more sun-sensitive

Dr. Jahanvi Tyagi offers [HydraFacial, carbon facial and PRP facial](/skin-care/medi-facials) as well as [chemical peels](/skin-care/chemical-peels) at the clinic in Jhotwara, Jaipur. Not sure which one suits you? [Book a skin consultation](/book).`,
  },
  {
    slug: "laser-hair-removal-guide",
    title: "Laser hair removal: how it works, sessions needed and aftercare",
    description:
      "Everything to know before laser hair removal — how it works on Indian skin, how many sessions, does it hurt, how to prepare and aftercare tips.",
    category: "Skin care",
    date: "2026-09-18",
    image: "/images/px-laser-hair.webp",
    imageAlt: "A laser hair removal session on a patient wearing safety glasses",
    keywords: ["laser hair removal Jaipur", "laser hair removal Jhotwara", "permanent hair reduction", "laser for Indian skin"],
    treatmentId: "laser-hair-removal",
    body: `Shaving, waxing and threading all work — for a while. Laser hair removal offers long-term reduction of unwanted hair, which is why it has become one of the most requested skin treatments. Here's what it involves.

## How laser hair removal works

The laser emits light that is absorbed by the pigment in the hair. The light turns to heat, which damages the hair follicle and slows future growth, while the surrounding skin is protected. Settings are chosen according to your skin type and hair colour, which is especially important for Indian skin tones.

## Why you need several sessions

Hair grows in cycles, and the laser works best on hairs in the active growth phase. At any time only some hairs are in that phase, so treatment is done as a series of sessions spaced several weeks apart. The number needed varies by body area, hair thickness and hormones. Occasional maintenance sessions may be needed later.

## Does it hurt?

Most people describe it as a snapping or warm pricking sensation. Cooling built into the device, or applied to the skin, makes it more comfortable. Sensitive areas may feel stronger.

## Who is it suitable for?

It works best on dark hair. Very light, grey or white hair contains little pigment and responds poorly. Your doctor will check your skin and hair, ask about hormonal conditions (such as PCOS, which can cause excess hair growth), medicines and any history of skin sensitivity before starting.

## How to prepare

- Shave the area a day before your session — don't wax, thread or pluck for several weeks beforehand, because the laser needs the root in place
- Avoid sun exposure and tanning before treatment
- Come with clean skin, without creams, deodorant or make-up on the area

## Aftercare

- Mild redness and swelling around follicles is normal and settles within hours to a day
- Use sunscreen on treated areas and avoid direct sun
- Avoid hot baths, saunas and heavy workouts for a day
- Don't wax or pluck between sessions — shaving is fine
- Treated hairs may appear to "grow" and then shed over the next couple of weeks

Laser hair removal is done in the dedicated skin and laser room at Devkripa Healthcare in Jhotwara, Jaipur. Learn more about [laser hair removal](/skin-care/laser-hair-removal) or [book a consultation](/book) to see if it suits you.`,
  },
  {
    slug: "hair-fall-prp-therapy",
    title: "Hair fall: when to worry, and how PRP therapy can help",
    description:
      "Some daily hair fall is normal. Learn the common causes of excess hair fall, when to see a doctor, and how hair PRP and hair transplants work.",
    category: "Hair care",
    date: "2026-09-15",
    image: "/images/px-hair-scalp.webp",
    imageAlt: "A man touching his hairline",
    keywords: ["hair fall treatment Jaipur", "hair PRP Jaipur", "hair transplant Jaipur", "PRP therapy Jhotwara"],
    treatmentId: "hair",
    body: `Finding hair on your pillow or in the shower drain can be worrying. But losing some hair every day is completely normal — the scalp sheds and regrows hair in cycles. The question is whether you're losing more than usual, and why.

## Common causes of hair fall

- **Stress, illness or surgery** — a sudden increase in shedding a few months after a fever, illness or major stress (telogen effluvium)
- **Nutrition** — low iron, vitamin D, B12 or protein, and crash dieting
- **Thyroid problems** and other hormonal changes, including after pregnancy and with PCOS
- **Pattern hair loss** — gradual thinning, often genetic, at the crown or hairline
- **Scalp conditions** such as dandruff or fungal infection
- **Hairstyling** — tight hairstyles, heat and harsh chemical treatments

## When to see a doctor

- Hair fall that continues for more than a few months
- Visible thinning, a widening parting or a receding hairline
- Patchy bald spots
- An itchy, scaly or painful scalp

An examination, and sometimes blood tests, help identify the cause — which guides treatment.

## How PRP therapy works

PRP stands for platelet-rich plasma. A small amount of your own blood is drawn and spun in a centrifuge to concentrate the platelets, which carry growth factors. The PRP is then injected into the thinning areas of the scalp to support weak hair follicles.

- It is usually done as a series of sessions a few weeks apart, followed by maintenance
- Because it uses your own blood, the risk of allergy is low
- It tends to work best for early to moderate thinning, often combined with other treatments

## When a hair transplant is considered

When hair loss is advanced and follicles in an area are no longer active, a hair transplant can move healthy follicles from the back of the scalp to thinning areas. A consultation will tell you whether you are a suitable candidate.

## Everyday care for healthier hair

- Eat a balanced diet with enough protein
- Be gentle — avoid very tight hairstyles and excessive heat
- Treat dandruff and scalp problems early
- Don't start supplements or hair-loss medicines without advice

Dr. Jahanvi Tyagi offers hair-fall treatment, [hair PRP and hair transplants](/skin-care/hair) at the clinic in Jhotwara, Jaipur. [Book a hair consultation](/book) to find out what's behind your hair fall.`,
  },
];

export const blogCategories: BlogCategory[] = ["Dental care", "Skin care", "Hair care"];

export const sortedPosts = () => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

/** Rough reading time at ~200 words a minute. */
export const readingMinutes = (post: BlogPost) => Math.max(2, Math.round(post.body.split(/\s+/).length / 200));

export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
