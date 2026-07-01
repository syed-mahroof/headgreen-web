# Project Context: HeadGreen! (headgreen.in)

## 1. Business Overview
- **Identity**: Kochi's premier 100% electric corporate mobility platform.
- **Target Audience**: B2B Enterprise clients, HR Admins, and Operations Managers in IT hubs like Infopark (Kakkanad) and SmartCity.
- **USP**: Zero-emission travel, uncompromised premium comfort, helping corporations hit ESG/carbon-reduction goals.
- **Key Metrics**: 20+ EV Fleet, 10+ Corporate Clients.

## 2. Tech Stack & Architecture
- **Frontend**: React (Single Page Application), Vite, Tailwind CSS.
- **Styling**: Custom design system supporting both Light and Dark modes.
- **SEO Architecture**:
  - **Head Management**: Managed via `react-helmet-async`. Configuration is initialized globally with `<HelmetProvider>` in [main.jsx](file:///d:/headgreen/frontend/src/main.jsx). A reusable `<SEO />` component is defined in [SEO.jsx](file:///d:/headgreen/frontend/src/components/SEO.jsx) which handles canonical links, standard meta tags, Open Graph (Facebook), and Twitter cards.
  - **Structured Data (JSON-LD)**: Incorporated dynamically in [SEO.jsx](file:///d:/headgreen/frontend/src/components/SEO.jsx) using a `<script type="application/ld+json">` tag. It generates `Organization` and `LocalBusiness` schemas by default, and conditionally appends a `JobPosting` schema for careers/driver partner contexts.
  - **Sitemap & Crawlability**:
    - **Dynamic Generation**: Configured in [vite.config.js](file:///d:/headgreen/frontend/vite.config.js) using `vite-plugin-sitemap` to dynamically generate a sitemap during builds.
    - **Robots Config**: Managed in [robots.txt](file:///d:/headgreen/frontend/public/robots.txt) allowing all user-agents, disallowing admin directories, and pointing to the XML sitemap.
    - **Fallback Sitemap**: A static [sitemap.xml](file:///d:/headgreen/frontend/public/sitemap.xml) is hosted in the `public/` folder mapping the entire site structure.
  - **Semantic HTML & Layout**: Fully structured. Pages are wrapped by a semantic `<main>` tag inside [MainLayout.jsx](file:///d:/headgreen/frontend/src/layouts/MainLayout.jsx), and components leverage semantic `<section>` tags.
  - **Image Alt Tags**: Fleet elements inside [Fleet.jsx](file:///d:/headgreen/frontend/src/components/Fleet.jsx) utilize highly descriptive alt tags like `alt={`${card.name} — ${card.model}`}` to ensure image SEO optimization.

## 3. Core Features & Components
- **Carbon Impact Calculator**: Interactive tool for enterprises to measure CO2 and fuel savings, implemented in [GreenImpact.jsx](file:///d:/headgreen/frontend/src/components/GreenImpact.jsx).
- **Live Trip Feed**: Real-time dashboard visualizer showing active fleet routing, implemented in [SmartBooking.jsx](file:///d:/headgreen/frontend/src/components/SmartBooking.jsx).
- **Marquee Brands**: Infinite scrolling showcase of elite corporate partners including Cognizant, EY, Orion Innovation, Servesys, Zellis, Titan, Adhil, and Dodge Construction Network, implemented in [TrustBar.jsx](file:///d:/headgreen/frontend/src/components/TrustBar.jsx).
- **Vehicle Lineup**: Premium electric fleet models including Tata Nexon EV, Tata Tigor EV, Kia Carens Clavis, Citroën ëC3, and BYD e6, dynamically rendered in [Fleet.jsx](file:///d:/headgreen/frontend/src/components/Fleet.jsx).

## 4. Coding Conventions & SEO Rules
- **SEO Integration**: All new pages must wrap content in the standard `<SEO />` component with hyper-local, B2B-focused metadata.
- **Mobile Responsiveness**: Ensure strict mobile responsiveness, handling 360px viewports without horizontal overflow.
- **High-Fidelity Animations**: Maintain high-density, hardware-accelerated animations (such as in the carousels and Marquee) to ensure a premium look and feel.
