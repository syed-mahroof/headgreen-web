import { Reveal, fadeUp } from "../components/motion.jsx";
import SEO from "../components/SEO.jsx";

export default function TermsOfService() {

  return (
    <>
      <SEO 
        title="Terms of Service | HeadGreen Corporate Mobility" 
        description="Read the HeadGreen Terms of Service. Understand the user responsibilities, driver obligations, and policies for our B2B zero-emission corporate fleets." 
        path="/terms"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <Reveal variant={fadeUp}>
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6">
            <p><strong>Effective Date:</strong> {new Date().getFullYear()}-01-01</p>
            
            <p>
              Welcome to HeadGreen Mobility! These Terms of Service ("Terms") govern your access to and use of the HeadGreen website, mobile applications, and zero-emission corporate transport services (collectively, the "Services").
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Services.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">2. Description of Services</h2>
            <p>
              HeadGreen Mobility provides corporate employee transportation, tech park shuttles, airport transfers, and driver partner networking utilizing a 100% electric vehicle fleet. We use predictive AI and live tracking to ensure safety and efficiency.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information when registering an account or applying as a driver partner.</li>
              <li>You agree to use the Services only for lawful purposes and in accordance with these Terms.</li>
              <li>Riders are expected to respect drivers and vehicles, adhering to scheduled pick-up times to maintain network efficiency.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">4. Driver Partner Obligations</h2>
            <p>
              Driver partners operate as independent contractors and must comply with local transport regulations, maintain their vehicles in good condition, and adhere to HeadGreen's safety and service standards.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              HeadGreen shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of, or inability to access or use, the Services. We do not guarantee uninterrupted availability of the platform.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">6. Contact Information</h2>
            <p>
              For any inquiries regarding these Terms, please contact us at <strong>team@headgreen.in</strong>.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
    </>
  );
}
