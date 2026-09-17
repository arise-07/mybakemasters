# Bake Masters — Website

**Client:** Bake Masters  
**Studio:** Primus Tech Labs  
**Version:** 1.0.0  
**Last Updated:** September 2026

---

## Project Structure

```
bake-masters/
├── index.html              # Home page
├── about.html              # About Us
├── products.html           # Menu / Products
├── custom-cakes.html       # Custom Cake orders + bulk inquiry
├── gallery.html            # Photo gallery
├── contact.html            # Contact + map
├── privacy-policy.html     # Privacy Policy
├── terms.html              # Terms & Conditions
├── refund-policy.html      # Cancellation & Refund
├── delivery-policy.html    # Order & Delivery
├── faq.html                # FAQ
├── 404.html                # Custom 404 error page
├── robots.txt              # Search engine crawl rules
├── sitemap.xml             # XML sitemap for SEO
├── site.webmanifest        # PWA manifest
├── style.css               # Main stylesheet
├── responsive.css          # Responsive / breakpoint styles
├── script.js               # Main JavaScript (vanilla)
├── assets/
│   ├── favicon.svg         # Master favicon (SVG)
│   ├── favicon.ico         # ICO (16/32/48) for legacy browsers
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   ├── icon-180.png        # Apple Touch Icon
│   ├── icon-192.png        # Android / PWA
│   ├── icon-512.png        # PWA splash / maskable
│   └── og-image.jpg        # 1200×630 — TODO: add before launch
└── images/
    ├── logo.png            # Navbar + footer logo
    ├── main.jpeg           # Hero section image
    ├── cake1.png           # Cakes category icon
    ├── pastry1.jpeg        # Pastries category icon   ← MISSING
    ├── cutomcake1.jpeg     # Custom cakes category    ← MISSING (also fix filename typo)
    └── cakes/
        ├── carrot_dates.png
        ├── white_plum.png
        ├── fudge_brownie.png
        ├── cookies.png
        ├── fresh_cream_cakes.png
        ├── bread.png
        ├── cake_1.png
        └── ...

```

---

## Client Details

| Field        | Value                         |
| ------------ | ----------------------------- |
| Business     | Bake Masters                  |
| Phone        | +91 81294 45984               |
| WhatsApp     | +91 75488 71030               |
| Email        | mybakemasters@gmail.com       |
| Address      | Urambu, Choozhal, TN – 629160 |
| Hours        | Mon–Sun, 5:00 AM – 10:00 PM   |
| Instagram    | @mybakemasters                |
| Domain (TBC) | www.mybakemasters.com         |

---

## Before Going Live — Checklist

- [ ] Add `images/pastry1.jpeg` (Pastries category icon)
- [ ] Add `images/cutomcake1.jpeg` (Custom Cakes category — also fix filename typo → `customcake1.jpeg` and update HTML)
- [ ] Create `assets/og-image.jpg` at 1200×630px for WhatsApp/Facebook link preview
- [ ] Update canonical URLs in all pages once domain is confirmed
- [ ] Replace `<!-- TODO: replace with the live domain -->` in schema JSON-LD across all pages
- [ ] Update Facebook `href="#"` links once the Facebook page is created (×3 per page)
- [ ] Confirm Google Maps embed shows correct location for Urambu, Choozhal (contact.html)
- [ ] Test WhatsApp order flow on real device end-to-end
- [ ] Submit `sitemap.xml` to Google Search Console after deployment
- [ ] Enable SSL (auto-provisioned by Vercel/Netlify on domain connect)
- [ ] Test on mobile (iPhone + Android) and tablet

---

## Deployment (Vercel)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial release — Bake Masters v1.0"
git remote add origin https://github.com/primustechlabs/bake-masters.git
git push -u origin main

# 2. Import repo in Vercel dashboard → Deploy
# 3. Add custom domain in Vercel → DNS auto-configured
# 4. SSL certificate auto-provisioned (Let's Encrypt, free)
```

---

## Fonts

| Role    | Family      | Weights  |
| ------- | ----------- | -------- |
| Display | Lobster Two | 400, 700 |
| Body    | Poppins     | 300–700  |

Loaded via Google Fonts CDN. No self-hosting required.

---

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox (no framework)
- **Vanilla JS** — no dependencies
- **WhatsApp API** — `wa.me` links for all order flows
- **Schema.org JSON-LD** — Local Business structured data for Google

---

*Built by Primus Tech Labs — primustechlabs.in*