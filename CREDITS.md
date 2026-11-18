# Asset credits & licences

## Clinic's own photography (from the existing site export in `images/`)
Doctor portrait (`18-photo.png`, backdrop retouched from blue to warm neutral), doctor at desk (`22-interior.jpeg`),
doctor treating patients (`08`–`11`), young patient (`04`), reception (`12`), building (`13`), dental operatory (`14`),
skin & laser room (`15`), consultation room (`16`), exterior (`20`), team (`02`, `03`), community camp (`07`).
Optimised copies live in `public/images/`.

Not used: cartoon/3D tooth illustrations (`25`, `28`, `29`), low-resolution thumbnails (`24`, `26`, `30`, `31`),
before/after composites (`31`, `35`, `36`), the promotional poster (`21`), and the eka.care badge (`39`).

## Hero video — Pexels (Pexels License: free for commercial use, no attribution required)
- https://www.pexels.com/video/woman-talking-to-the-dentist-4489266/
- https://www.pexels.com/video/cosmetologist-talking-to-her-patient-4824010/

Cut, crossfaded, colour-graded and re-encoded into `public/videos/hero-clinic.mp4` (desktop, 1920×1080, ~17 s)
and `hero-clinic-mobile.mp4` (portrait crop, 720×1280), with WebP posters.

## Treatment photography — Pexels (Pexels License)
| File | Source |
|---|---|
| px-chemical-peel.webp | https://www.pexels.com/photo/4586722/ |
| px-microneedling.webp | https://www.pexels.com/photo/30809948/ |
| px-hydrafacial.webp | https://www.pexels.com/photo/5069426/ |
| px-laser-hair.webp | https://www.pexels.com/photo/3985354/ |
| px-hair-scalp.webp | https://www.pexels.com/photo/12474260/ |
| px-skin-consult.webp | https://www.pexels.com/photo/4586740/ |
| px-microdermabrasion.webp | https://www.pexels.com/photo/4586746/ |
| px-laser-toning.webp | https://www.pexels.com/photo/4586726/ |
| px-shade-guide.webp | https://www.pexels.com/photo/6627278/ |
| px-braces-model.webp | https://www.pexels.com/photo/6529216/ |
| px-smile-check.webp | https://www.pexels.com/photo/7800663/ |

Stock images are labelled "Representative photo" on the site; clinic photos are labelled "Photographed at the clinic".

## Treatment before/after images — original illustrations
`public/images/before-after/<treatment>-before.webp` / `-after.webp` (16 treatments, 1200×900) are original drawings
made for this site, generated from `data/before-after-art.ts`. They illustrate the condition and the intended outcome;
they are not patient photographs and are captioned as such on the site. To replace one with a real, consented clinic
photo, set `beforeAfter` on that treatment in `data/site.ts`.

## Treatment before/after — real patient photos (openly licensed, cropped to 4:3)
Shown as "real patient photos for illustration — not a Devkripa patient", with credit on the page.
| File (`public/images/before-after/photos/`) | Author | Licence | Source |
|---|---|---|---|
| orthodontics-before/after.webp | Jeffrey Dorfman | CC BY-SA 3.0 | https://commons.wikimedia.org/wiki/File:Before_and_After_Photos_following_Orthodontic_Treatment_-_Teeth_Braces.jpg |
| veneers-bridges-before/after.webp | Yvul | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Faccette_estetiche_confronto_prima_e_dopo.jpg |
| cleaning-whitening-before/after.webp | Bugmore | Public domain | https://commons.wikimedia.org/wiki/File:Periogen_Tartar_Dissolution_Study,_day_0.jpg and _day_90.jpg |
| acne-before/after.webp | kylieaquino01 | Public Domain Mark 1.0 | https://www.flickr.com/photos/149720488@N03/34183392056 |

The cropped CC BY-SA images are shared under the same licence.

## Studio credit
`public/brand/clio-logo*.png` — Clio logo supplied by the client, background removed.
