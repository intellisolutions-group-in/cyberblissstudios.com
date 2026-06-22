# Deployment Guide - CyberBliss Studios

## Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

## Install Dependencies

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

## Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build Static Export

```bash
pnpm build
```

This generates a static site in the `/out` folder, ready for deployment to any static hosting provider.

## Deploy the `/out` Folder

Upload the contents of the `/out` folder to your hosting provider:

- **Apache/cPanel**: Upload to `public_html` or your domain root
- **Nginx**: Point the server root to the `/out` directory
- **Netlify/Vercel**: Connect the repository and set build command to `pnpm build` with output directory `out`
- **AWS S3 + CloudFront**: Upload `/out` contents to your S3 bucket and configure CloudFront

## Domain Configuration

Point your domain `cyberblissstudios.com` to your hosting provider and ensure HTTPS is enabled.

## Post-Deployment Checklist

- Verify all pages load correctly
- Test contact and career forms
- Confirm sitemap.xml and robots.txt are accessible
- Update DNS records if migrating from another host
