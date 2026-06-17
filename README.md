# HeadGreen — EV Corporate Cab Service (Kochi)

Modern, premium, futuristic frontend-only website built with React 19 + Vite + Tailwind CSS.

## Tech Stack
- React 19, Vite 6
- Tailwind CSS 3
- React Router DOM 6
- Framer Motion
- Lucide React Icons
- React Hook Form
- React CountUp
- Swiper.js
- React Intersection Observer

## Pages
- `/` — Home (Hero, Services, Smart Booking, Corporate, Green Impact, Fleet, Tech Platform, App Showcase, Why Us, Contact)
- `/about` — About Us (Story, Mission, Vision, Stats, Timeline)
- `/corporate` — Corporate Solutions + Enquiry form
- `/book` — Book a Trip form
- `/partner` — Become a Partner form
- All form submissions open WhatsApp with prefilled message

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Configure WhatsApp number
Edit `src/utils/whatsapp.js` and set:
```js
export const WHATSAPP_NUMBER = "918589844333"; // your number, no + sign
```

## Deploy to AWS Amplify

### Option A — Connect Git repository
1. Push this project to GitHub / GitLab / Bitbucket / CodeCommit.
2. AWS Console → **Amplify Hosting** → **New app** → **Host web app**.
3. Connect your repo & branch.
4. Amplify auto-detects `amplify.yml` (already included).
5. Build settings:
   - Base directory: project root
   - Build command: `npm run build`
   - Output (artifact) directory: `dist`
6. **Add a rewrite rule** for SPA routing:
   - App settings → Rewrites and redirects → Add rule
     - Source: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
     - Target: `/index.html`
     - Type: `200 (Rewrite)`
7. Save & deploy.

### Option B — Manual deploy
```bash
npm run build
# upload the contents of /dist to AWS Amplify (Drag & Drop deploy)
```

## Project Structure
```
src/
  assets/        # logo & images
  components/    # reusable UI sections
  data/          # site-wide content/data
  hooks/         # custom hooks
  layouts/       # MainLayout (Navbar + Footer)
  pages/         # routed pages
  utils/         # WhatsApp helper, etc.
```

© HeadGreen Mobility
