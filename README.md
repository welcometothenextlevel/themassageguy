# My Massage Guy — mymassageguy.com.au

Marketing site for My Massage Guy (Troy Petersen) — remedial massage, relaxation massage
and sports taping in Albury, with mobile appointments across Albury, Wodonga, Wangaratta
and surrounding areas.

Static site — no build step, no dependencies. Open `index.html` or serve the folder.

```bash
python3 -m http.server 8000
```

## Structure

```
index.html            single-page site (hero, services, pricing, mobile area, about, FAQ, booking)
assets/css/style.css  all styles, mobile-first breakpoints at 1080 / 960 / 620px
assets/js/main.js     sticky header, mobile menu, scroll reveals, FAQ accordion, booking form
assets/img/           logo lockup, logo mark and favicon (keyed out of the supplied artwork)
```

## Business details baked into the site

| | |
|---|---|
| Phone | 0437 679 615 |
| Email | Troy@mymassageguy.com.au |
| Hours | Monday – Friday, 9am – 5pm |
| Remedial | $100 / 60 min · $65 / 30 min |
| Relaxation | $100 / 60 min |
| Sports taping | price on enquiry |
| Clinic | Albury, NSW (street address not published) |
| Mobile | Albury, Wodonga, Wangaratta and surrounds |

## Notes

- The booking form has no backend: it opens the visitor's mail client with the enquiry
  pre-filled and addressed to `Troy@mymassageguy.com.au`. Swapping in a form service
  (Formspree, Netlify Forms, etc.) is a one-line change in `assets/js/main.js`.
- Structured data (`schema.org/HealthAndBeautyBusiness`) is in the `<head>` for local SEO.
  Update the clinic street address there once it is public.
- Fonts are loaded from Google Fonts (Barlow Condensed + Inter).
