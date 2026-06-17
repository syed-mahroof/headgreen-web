import { Reveal, fadeUp } from "../components/motion.jsx";

export default function PrivacyPolicy() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Reveal variant={fadeUp}>
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6">
            <p><strong>Effective Date:</strong> {new Date().getFullYear()}-01-01</p>
            
            <p>
              At HeadGreen Mobility ("HeadGreen", "we", "us", or "our"), we are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or use our zero-emission EV transportation services.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and home location when you register or book a ride.</li>
              <li><strong>Location Data:</strong> Real-time geographic location to facilitate pick-ups, drop-offs, and route optimization.</li>
              <li><strong>Driver Partner Data:</strong> Vehicle registration, driving experience, and background check information for onboarding purposes.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our corporate EV fleet services.</li>
              <li>Process transactions and send related information, including confirmations and ride updates.</li>
              <li>Improve route optimization, tracking, and overall safety.</li>
              <li>Communicate with you for customer support, updates, and promotional purposes.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">3. Data Sharing and Security</h2>
            <p>
              We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We implement enterprise-grade security measures to maintain the safety of your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">4. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at: <br/>
              <strong>Email:</strong> team@headgreen.in<br/>
              <strong>Address:</strong> Kochi, Kerala, India
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
