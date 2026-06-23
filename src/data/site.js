import {
  Building2, Plane, Bus, Clock, MapPin, Users, Zap, ShieldCheck,
  Route, Activity, Leaf, BarChart3, Smartphone, MessageSquare, Bell, LineChart,
  RefreshCw,
} from "lucide-react";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/corporate", label: "Corporate" },
  { to: "/book", label: "Book a Trip" },
  { to: "/careers", label: "Careers" },
  { to: "/partner", label: "Become a Partner" },
];



export const SERVICES = [
  { icon: Building2, title: "Corporate Employee Transport", desc: "Dedicated shift coverage for entire teams — precise scheduling, zero missed pick-ups." },
  { icon: Plane, title: "Airport Transfer", desc: "Precision-timed transfers for COK & domestic travel, with live-tracked EVs and zero-delay confirmation." },
  { icon: Bus, title: "Tech Park Shuttle", desc: "High-frequency circuits into Infopark & SmartCity — optimised by AI for peak-hour throughput." },
  { icon: Clock, title: "Shift Based Cab Services", desc: "Round-the-clock dispatch with verified night-shift drivers — 24/7 solar-powered operations." },
  { icon: MapPin, title: "Outstation Trips", desc: "Long-range EV journeys across Kerala on second-life battery packs engineered for distance." },
  { icon: Users, title: "Daily Employee Pickup", desc: "Door-to-campus routing with predictive ETAs — every seat, every shift, accounted for." },
];

export const CORPORATE_FEATURES = [
  { icon: Zap, title: "Dedicated Fleet" },
  { icon: ShieldCheck, title: "Attendance Integration" },
  { icon: MapPin, title: "Live Tracking" },
  { icon: Route, title: "Route Optimization" },
  { icon: Clock, title: "Shift Management" },
  { icon: BarChart3, title: "Analytics Dashboard" },
];

// FLEET data has been relocated to src/components/Fleet.jsx
// (image paths require ES module imports which only work in component files,
//  not in plain data modules)

export const TECH_FEATURES = [
  { icon: Route, title: "AI Route Planning" },
  { icon: MapPin, title: "Live Vehicle Tracking" },
  { icon: ShieldCheck, title: "Attendance Sync" },
  { icon: MessageSquare, title: "WhatsApp Notifications" },
  { icon: LineChart, title: "Reports" },
  { icon: BarChart3, title: "Analytics" },
];

export const APP_FEATURES = [
  { icon: Smartphone, title: "Book Ride" },
  { icon: MapPin, title: "Track Driver" },
  { icon: Clock, title: "Shift Schedule" },
  { icon: Users, title: "Profile" },
];

export const WHY = [
  {
    icon: Leaf,
    title: "100% Electric",
    desc: "Zero tailpipe emissions across every ride — sustained by a solar-offset charging grid, not the fossil grid.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Drivers",
    desc: "Verified, background-checked and continuously trained. Every driver operates under 24/7 dispatch oversight.",
  },
  {
    icon: Route,
    title: "Smart Routes",
    desc: "Predictive AI eliminates dead mileage — routing the fastest, most energy-efficient path across Kochi's tech corridor.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    desc: "Sub-second vehicle telemetry visible to your ops team and every employee, from departure to arrival.",
  },
  {
    icon: BarChart3,
    title: "Cost Efficient",
    desc: "Lower per-km cost than conventional fleets — solar charging and second-life batteries structurally reduce your mobility spend.",
  },
  {
    icon: RefreshCw,
    title: "Circular Lifecycle",
    desc: "We intercept capable EVs at their 5–6 year mark, remanufacture battery packs in-house and return them to peak efficiency — eliminating the industrial carbon cost of new vehicle manufacturing.",
  },
];

export const TIMELINE = [
  {
    year: "2023",
    title: "HeadGreen Founded",
    desc: "Launched with a foundational thesis: Kochi's tech commute doesn't need new cars — it needs smarter, cleaner ones.",
  },
  {
    year: "2024",
    title: "Solar Grid & Refurbishment Lab",
    desc: "Commissioned dedicated solar-powered charging infrastructure and an in-house battery remanufacturing facility — the engine of our circular model.",
  },
  {
    year: "2025",
    title: "100+ Second-Life EVs Deployed",
    desc: "Scaled a fully solar-charged fleet of remanufactured EVs across Kochi's Infopark & SmartCity tech corridor.",
  },
  {
    year: "2026",
    title: "AI Dispatch Platform Live",
    desc: "Enterprise dashboard, predictive routing and real-time attendance sync launched — closing the loop from vehicle to workforce.",
  },
];

export const STATS = [
  { value: 20, suffix: "+", label: "EV Fleet" },
  { value: 10, suffix: "+", label: "Corporate Clients" },
  { value: 1.5, suffix: "M+", label: "Green KMs Driven" },
  { value: 98, suffix: "%", label: "On-time Rate" },
];

export const CONTACT = {
  phone: "+91 85898 44333",
  email: "team@headgreen.in",
  location: "Kochi, Kerala, India",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6!2d76.35!3d10.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSW5mb3BhcmsgS29jaGk!5e0!3m2!1sen!2sin!4v1700000000000",
};
