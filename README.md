# Overton Prestige

A fast, modern website for Overton Prestige, the prestige and performance car
dealership in Hilton, Derby. Built to replace the Car Dealer 5 template.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
It is a static site: no database, no monthly platform fee, and it can be hosted
free on Cloudflare Pages.

---

## Quick start

You need [Node.js](https://nodejs.org) (already installed: v24 LTS).

```sh
npm install      # first time only, installs dependencies
npm run dev      # start the local site at http://localhost:4321
npm run build    # build the final site into the dist/ folder
```

> **Windows note:** Node was just installed, so the first time you open a *new*
> terminal it should be on your PATH automatically. If `npm` is not recognised,
> close and reopen the terminal (or your editor) once.

---

## Managing the stock (the important bit)

Every car is a single file in **`src/content/cars/`**. The file name becomes the
web address, for example `audi-rs6-gt.json` is shown at `/stock/audi-rs6-gt`.

### Add a car

1. Copy any existing file in `src/content/cars/` and rename it. Use lower-case
   words with hyphens, e.g. `audi-rs4-avant.json`.
2. Open it and edit the values. Here is the full shape:

```json
{
  "make": "Audi",
  "model": "RS4",
  "variant": "Avant 2.9 TFSI V6 Quattro",
  "year": "2026 (26 plate)",
  "price": 64995,
  "priceQualifier": "none",
  "bodyType": "Estate",
  "fuel": "Petrol",
  "transmission": "Automatic",
  "mileage": 8500,
  "engineSize": "2,894 cc",
  "ulez": true,
  "status": "available",
  "badge": "Just arrived",
  "featured": false,
  "description": "A short, honest paragraph about the car.",
  "images": []
}
```

### Field guide

| Field            | What to put                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| `make`           | `Audi`, `Toyota`, `Volkswagen`, etc.                                        |
| `model`          | `RS6`, `Land Cruiser`, `Crafter`                                            |
| `variant`        | The trim / engine line, written normally (not SHOUTING CAPS)                |
| `year`           | Free text, e.g. `2026 (26 plate)`                                           |
| `price`          | A number only. No `£`, no commas. `64995` not `"£64,995"`                   |
| `priceQualifier` | `none`, `inc-vat`, or `plus-vat`                                             |
| `bodyType`       | One of: `Estate`, `Hatchback`, `Saloon`, `SUV`, `Van`                       |
| `fuel`           | One of: `Petrol`, `Diesel`, `Petrol Hybrid`, `Electric`                     |
| `transmission`   | `Automatic` or `Manual`                                                     |
| `mileage`        | A number only, e.g. `8500`                                                  |
| `engineSize`     | Free text like `2,894 cc`. Optional, can be removed if unknown              |
| `ulez`           | `true` or `false`                                                           |
| `status`         | `available` (in stock), `sourcing` (we can find it), `reserved`, or `sold`  |
| `badge`          | Optional short highlight shown on the card, e.g. `Just arrived`. Can remove |
| `featured`       | `true` shows it in the homepage "Featured" row. Keep this to about 3 cars   |
| `description`    | A short honest paragraph. Optional                                          |
| `images`         | List of photo paths, see below. Leave as `[]` for the designed placeholder  |

### Edit or remove a car

- **Edit:** open the file, change the values, save. The site updates instantly
  while `npm run dev` is running.
- **Remove (sold):** either delete the file, or set `"status": "sold"` to keep
  it on the site greyed out.

### Add photos to a car

1. Put the images in `public/cars/<car-file-name>/`, for example
   `public/cars/audi-rs6-gt/1.jpg`, `2.jpg`, `3.jpg`.
2. Reference them in the car's JSON file:

   ```json
   "images": ["/cars/audi-rs6-gt/1.jpg", "/cars/audi-rs6-gt/2.jpg"]
   ```

   The first image is used as the main photo. If `images` is empty, a clean
   designed placeholder is shown instead, so the site never looks broken.

> **Tip for the dealership:** the single biggest visual upgrade is consistent
> photography. Shoot every car in the same spot, same angles, same light. The
> site is built to make consistent photos look excellent.

---

## Editing site-wide details

**`src/data/site.ts`** is the single source of truth for:

- Phone number, email, WhatsApp, address
- Opening hours
- Review counts and links
- Social media links
- The navigation menu

Change it once here and it updates across every page (header, footer, contact
sections, etc.).

## Adding customer reviews

**`src/data/testimonials.ts`** controls the quotes on the `/reviews` page. It is
empty by default, so the page links out to Google and AutoTrader instead. To
feature a review, copy a *real* one following the example in that file. Never
invent reviews.

---

## Deploying the site (free hosting)

The site builds to plain static files, so it can be hosted free on
**Cloudflare Pages**:

1. Put this project in a GitHub repository.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com), connect the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. Every time you push to GitHub, the site rebuilds automatically.
5. Add the custom domain `overtonprestige.co.uk` in the Pages project settings.

Netlify and Vercel work exactly the same way if you prefer them.

## Form delivery (2-minute setup)

The enquiry forms (sourcing, sell your car, rentals, contact) are already wired
for [Formspree](https://formspree.io), so submissions land straight in the
inbox. You just need to connect an account:

1. Sign up free at [formspree.io](https://formspree.io) (50 submissions/month
   on the free plan).
2. Create a new form, set its email to `sales@overtonprestige.co.uk`.
3. Copy the form endpoint it gives you (looks like
   `https://formspree.io/f/abcdwxyz`).
4. Paste it into `src/data/site.ts` as the `formEndpoint` value.

That is it, every form on the site then delivers to the inbox with a tidy
inline thank-you message.

Until that endpoint is set, the forms safely fall back to opening the visitor's
email app pre-filled, so they still work with zero setup.

## Analytics (1-minute setup)

The site is wired for
[Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/): free,
privacy-friendly, and needs no cookie banner.

- **If you deploy on Cloudflare Pages** (recommended), just switch Web Analytics
  on in the Pages project dashboard. No code change needed, leave
  `analyticsToken` in `src/data/site.ts` empty.
- **Otherwise**, open the Cloudflare dashboard, add the site under Web
  Analytics, copy the beacon token, and paste it into `analyticsToken` in
  `src/data/site.ts`.

Either way your dad gets a simple dashboard of visitor numbers and the most
viewed pages. The privacy policy already mentions this analytics, so nothing
else needs changing.

---

## Before this goes live: checklist

These need a human decision, they are flagged so nothing slips:

- [ ] **Confirm who owns the `overtonprestige.co.uk` domain.** If Car Dealer 5
      registered it, get it transferred to the business before cancelling them.
      This is the single most important thing to check.
- [ ] **Check the Car Dealer 5 contract** for any minimum term or notice period.
- [ ] **Map old URLs to new ones** (301 redirects) so Google traffic is not lost.
      Cloudflare Pages handles redirects via a `_redirects` file.
- [ ] **Car statuses are best guesses** from the old site's badges. Confirm each
      car's `status` (`available` vs `sourcing`) with the dealership.
- [ ] **Finance page wording** (`src/pages/finance.astro`) is general and honest,
      but any FCA / credit-broker disclosure text should be reviewed by the
      business and added if required.
- [ ] **Review links** in `src/data/site.ts` point to placeholders. Swap in the
      real Google and AutoTrader review page URLs.
- [ ] **Social links** in `src/data/site.ts`: only Facebook is set. Add the real
      Instagram and YouTube URLs if wanted.
- [ ] **Connect Formspree** so the enquiry forms deliver to the inbox. Two-minute
      setup, see the "Form delivery" section above. Until then the forms fall
      back to opening the visitor's email app.
- [ ] **Turn on analytics** so your dad can see visitor numbers. One click in the
      Cloudflare Pages dashboard, see the "Analytics" section above.
- [ ] **Have the legal pages glanced over.** Privacy Policy and Terms of Use
      pages are now included (`src/pages/privacy.astro`, `src/pages/terms.astro`)
      from standard templates. They are honest and reasonable, but a quick review
      by the business is sensible before going fully live.
- [x] **Logo** is the real Overton Prestige logo, pulled from the current site
      (`public/logo-white.png` for the dark theme, `public/logo-black.png` spare).
- [x] **Photography** is pulled from the current site as a starting point (4
      photos per car). Replace with better shots any time using the instructions
      above, the dealership can upgrade these gradually.

---

## Project structure

```text
src/
├── content/cars/        One JSON file per vehicle  <- edit stock here
├── data/
│   ├── site.ts           Contact details, hours, nav  <- edit site info here
│   └── testimonials.ts   Customer review quotes
├── components/           Reusable building blocks (Header, CarCard, etc.)
├── layouts/Layout.astro  The shared page shell (head, header, footer)
├── pages/                One file per page; [slug].astro builds every car page
├── lib/format.ts         Small helpers (price formatting, sorting)
└── styles/global.css     Design system: colours, fonts, components
public/
├── cars/                 Vehicle photos go here
└── favicon.svg
```

## Tech notes

- **Astro 6** static output. No server, no database, no runtime cost.
- **Tailwind CSS v4**, theme tokens defined in `src/styles/global.css`.
- Fonts: Sora (headings) and Inter (body), loaded from Google Fonts.
- Dark, premium theme by design, matching a performance-car dealership.
- Accessible: semantic HTML, keyboard focus states, reduced-motion support.
- SEO: per-page titles and descriptions, Open Graph tags, and AutoDealer
  structured data are built in.
