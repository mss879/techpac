# Tech Pacific homepage

A responsive, editorial homepage based on the supplied visual reference and the company's source research. The reference informs composition only; all business content comes from Tech Pacific research.

## Stack

- Next.js **16.4.2**, App Router and TypeScript
- React **19.3.1**
- Tailwind CSS **4.3.3**, custom design tokens and responsive CSS
- Locally hosted Manrope variable font
- Static export, suitable for ordinary static hosting

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For the production version:

```sh
npm run build
npm start
```

`npm run typecheck` checks TypeScript. The build uses Next.js's supported Webpack mode because the current execution environment blocks the port binding required by Turbopack's production CSS compiler. The application remains a standard Next.js 16 project. The development script uses the Next.js default bundler.

## Deploy to Netlify

Connect the repository and deploy its `main` branch. The root `netlify.toml` configures the repository root as the base, `npm run build` as the build command, and `out` as the publish directory. Next.js generates `out/index.html` and the supporting assets because `next.config.ts` enables `output: "export"`.

The configuration selects Node.js 22 and skips Netlify's server-side Next.js adapter for this static export. No separate `next export` command or running Node server is needed. Netlify reads these settings on the next Git-triggered build; file-based settings override the corresponding dashboard values.

For a manual drag-and-drop deployment, run `npm ci` and `npm run build`, then upload the generated `out` folder. Uploading the source repository, `public`, or `.next` as a static site will not publish this homepage correctly. Unknown URLs use the exported `404.html`; homepage section links use anchors and do not require a catch-all rewrite.

## Experience

- Blue/green brand palette, oversized typography, custom hero art and an editorial product grid
- Six selectable solution panels and an enquiry selector that follows the chosen solution
- Named client stories, source links, story controls and testimonial navigation
- Keyboard-operable mobile navigation with Escape dismissal
- Original navigation labels: SAP, Products (all six options), About, Success Stories, Contact Us, Blog, Explore search, and Request a Demo; Blog opens the existing website, while built homepage sections stay local
- Accessible FAQ buttons, labelled forms, reduced-motion support, and responsive layouts
- Readable 16–18px body copy, 13px minimum supporting labels, larger product marks, and single-column product cards on phones
- Business contacts, maps, email and WhatsApp links
- Continuous full-colour customer-logo loop with keyboard-operable pause/play; animation pauses offscreen, in hidden tabs, and on hover
- Once-only section reveals with subtle stagger, a drawn journey line and a CSS scroll-linked hero effect where supported
- Native SVG orbit and hero-star motion, paused outside the viewport or in hidden tabs; reduced-motion preferences disable decorative animations

The contact form validates required fields and prepares a `mailto:` draft. It does **not** send email directly or store submissions. A production email/CRM service can be connected later. Product details, case studies and policies link to the existing site because this task covers the homepage only.

The preview is marked `noindex` and has preview-domain metadata. Update metadata and indexing when moving to the client's approved production domain. No existing Tech Pacific website was changed.

## Assets

- `public/brand/techpac-official.png`: exact company logo supplied by the user, used in the header and footer with its original proportions
- `src/app/icon.svg`: favicon wrapper embedding the same supplied logo without redrawing it
- `public/brand/originals/`: extracted source marks, logos and selected reference assets, using their highest advertised image widths
- `public/brand/asset-provenance.json`: source URLs and download records
- `public/brand/optimized/`: display-sized WebP versions of the original marks; DIMO's white mark receives a dark backing, preserving its colours
- `public/images/`: optimised WebP brand imagery
- `assets/generated/`: full-resolution generated originals and exact prompts

Official vendor marks are preserved. Light-colour source marks receive appropriate contrast treatment in CSS. Generated imagery is illustrative; it is not a photograph of Tech Pacific's own facilities.

Run `node scripts/optimize-assets.mjs` to regenerate the display assets. The 18 prepared logo files total 180,454 bytes versus 916,192 bytes for their source files, an 80% reduction. Hero and infrastructure imagery use responsive WebP sources; secondary imagery is lazy-loaded. Motion uses CSS transforms and a shared IntersectionObserver for section reveals, without a JavaScript animation loop or added animation dependency. These are asset and implementation measurements, not a Lighthouse score or a claim about whole-page transfer savings.

## Verification

The homepage was checked in a real browser at CSS widths 320, 390, 768, approximately 1024, 1440 and 1920 pixels, with no page-level horizontal overflow. All six solution panels, mobile navigation, Escape dismissal, FAQ expansion, client-story navigation, testimonial navigation and enquiry preselection were exercised. Required name, company and email fields were verified. No enquiry was sent.

`qa/responsive-checks.json` records these checks. A visual preview is saved in `qa/`. Source research remains in the parent workspace's `RESEARCH.md` and `research/` directory.

`qa/navigation-checks.json` records the restored navigation checks at 320, 768, 1100, 1200 and 1440 pixels, product selection on mobile, keyword/empty search, and Escape dismissal with focus restoration.

`qa/motion-checks.json` records the colour, continuous-loop, pause/resume, offscreen and responsive checks. `qa/asset-optimization.json` records generated image dimensions and byte sizes. Reduced-motion rules and hidden-tab handling were inspected in source; those environment modes were not toggled during browser QA.

`qa/readability-checks.json` records the larger typography and logo checks across phone, tablet and desktop widths. Adobe and TeamViewer display assets are cropped to their visible artwork before resizing; the original brand files are preserved.

The Acorn Travels story uses the official wordmark from https://www.acorntravels.lk/nav_logo_new.png instead of the older circular badge. Client-story logos preserve their shape, display at a larger size and include a visible company name. Source provenance is recorded in `public/brand/asset-provenance.json`.

## Page frame and scroll motion

The page uses a 2px blue outer frame at every viewport width. A shared responsive gutter grows from 16px on phones to 40px on desktops, with a 1760px content cap for very wide screens. Image source sizes follow those gutters.

Sections reveal once with a 14px rise and a 520ms fade; grouped cards stagger by at most 100ms. The infrastructure image settles gently as it enters view, and hero drift is restrained. Reduced-motion preferences keep content static. These effects use native CSS and IntersectionObserver without a per-frame JavaScript scroll handler.
