# Setup Guide - CyberBliss Studios

## Company Details

Edit `data/company.json` to update brand name, email, business hours, mission, vision, and values.

## Logo

1. Place your logo file at `public/images/logo.svg`
2. Uncomment the logo blocks in `components/navbar.tsx` and `components/footer.tsx`
3. Comment out or remove the text-based brand name in those same files

Recommended logo dimensions:
- Header: 40px height (desktop), 32px (mobile)
- Footer: 32px height

## Phone Number

When available, uncomment the phone sections in:
- `components/footer.tsx`
- `components/sections/contact-inquiry-section.tsx`
- `app/contact/page.tsx`

## Office Address

When available, uncomment the address sections in:
- `components/footer.tsx`
- `app/contact/page.tsx`
- `app/about/page.tsx`

Update `data/offices.json` with office location data.

## Social Media Links

When Instagram or Facebook links are available, uncomment the social media blocks in `components/footer.tsx` and add your URLs.

Only Instagram and Facebook are supported per project requirements.

## Services

Edit `lib/services.ts` to add, remove, or update service pages. Each service requires a unique slug matching its URL path.

## Testimonials, FAQ, Careers, Portfolio

Edit the respective JSON files in the `data/` folder:
- `data/testimonials.json`
- `data/faq.json`
- `data/careers.json`
- `data/portfolio.json`

## Images

Place project and service images in `public/images/` and reference them in components or data files as needed.
