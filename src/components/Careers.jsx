import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { BatteryCharging, Building2, Smartphone, Headset, ChevronRight } from "lucide-react";
import { Reveal, fadeUp } from "./motion.jsx";
import { 
  submitToWeb3Forms, 
  buildWhatsAppMessage, 
  openWhatsApp,
  MethodToggle,
  ChannelHint,
  SuccessCard,
  ErrorBanner,
  SubmitButton
} from "../utils/formSubmit.jsx";
import SEO from "./SEO.jsx";
import { Turnstile } from "@marsidev/react-turnstile";

export default function Careers() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const [method, setMethod] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);

  const formRef = useRef(null);
  const benefitsRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data) => {
    setErrorMsg("");
    
    if (!turnstileToken) {
      setErrorMsg("Please complete the security verification.");
      return;
    }
    
    // Format fields for both outputs
    const fields = {
      "Full Name": data.fullName,
      "Phone Number": data.phone,
      "Vehicle Type": data.vehicleType,
      "Registration Number": data.registration,
      "Driving Experience": `${data.experience} Years`,
      "Home Location": data.location,
      "Additional Info": data.additionalInfo || "None"
    };

    if (method === "whatsapp") {
      const message = buildWhatsAppMessage("New Driver Application", fields);
      openWhatsApp(message);
      setIsSuccess(true);
      reset();
      return;
    }

    // Email logic via Web3Forms
    setIsSubmitting(true);
    try {
      await submitToWeb3Forms(
        "New Driver Application - HeadGreen!",
        data.fullName,
        fields
      );
      setIsSuccess(true);
      reset();
    } catch (err) {
      setErrorMsg(err.message || "Submission failed. Please try WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: BatteryCharging,
      title: "Zero Fuel Costs",
      description: "Maximize your take-home pay with our solar-charged fleet. Forget about petrol prices."
    },
    {
      icon: Building2,
      title: "Enterprise Clients",
      description: "Exclusive corporate routes to Infopark and SmartCity. Professional riders and guaranteed payouts."
    },
    {
      icon: Smartphone,
      title: "Tech-Driven Dispatch",
      description: "No haggling. AI-assigned routes delivered directly to your app for maximum efficiency."
    },
    {
      icon: Headset,
      title: "24/7 Partner Support",
      description: "Dedicated on-ground team to keep you moving safely and efficiently at all times."
    }
  ];

  const steps = [
    { title: "Apply Online", desc: "Fill out the quick form below." },
    { title: "Document Verification", desc: "We review your license and background." },
    { title: "EV Familiarization", desc: "Quick training on our premium fleet." },
    { title: "Hit the Road", desc: "Start driving and earning immediately." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
      <SEO 
        title="Join the Fleet - Driver Partner Careers" 
        description="Drive the best EVs in the market. Join Kochi's zero-emission corporate fleet with guaranteed enterprise payouts and flexible shifts." 
        schemaType="JobPosting" 
      />
      {/* 1. DYNAMIC HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-[60%] bg-emerald-500/10 dark:bg-[#00BA7C]/15 blur-[100px] rounded-full pointer-events-none" />
        
        <Reveal variant={fadeUp} className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-8 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Now Onboarding Drivers
          </div>
          
          <h1 className="font-syne text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Drive the Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">HeadGreen!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Join Kochi's premier 100% zero-emission corporate fleet. Say goodbye to fuel costs and unpredictable rides. Enjoy guaranteed enterprise payouts, flexible shifts, and drive the best EVs in the market.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto btn-primary btn-shine overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,186,124,0.4)] dark:shadow-[0_4px_20px_-4px_rgba(0,232,122,0.4)]"
            >
              Apply Now <ChevronRight size={18} />
            </button>
            <button 
              onClick={scrollToBenefits}
              className="w-full sm:w-auto btn-ghost"
            >
              Learn More
            </button>
          </div>
        </Reveal>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <section ref={benefitsRef} className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal variant={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Drive With Us?</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need to maximize your earnings, with zero hassle.</p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:shadow-[0_8px_30px_-6px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_8px_30px_-6px_rgba(16,185,129,0.1)]"
              >
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <b.icon className="text-emerald-600 dark:text-emerald-400" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 px-6 bg-slate-100/50 dark:bg-[#03050c] relative z-10 border-y border-slate-200/50 dark:border-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <Reveal variant={fadeUp} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-600 dark:text-slate-400">Get on the road in four simple steps.</p>
          </Reveal>

          <div className="relative">
            {/* Horizontal Line for desktop */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="h-20 w-20 rounded-full bg-white dark:bg-[#090d1a] border-4 border-slate-50 dark:border-[#050816] shadow-xl flex items-center justify-center mb-6 relative z-10">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE APPLICATION FORM SECTION */}
      <section ref={formRef} className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#090d1a] border border-slate-200 dark:border-white/[0.06] backdrop-blur-xl shadow-2xl transition-colors duration-500 focus-within:border-[#00BA7C]/40 dark:focus-within:border-[#00BA7C]/40"
          >
            {/* Glowing Emerald Accent at the top of the form */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-[#00BA7C]/10 blur-[80px] rounded-[100%] pointer-events-none" />
            
            <div className="relative p-8 md:p-14">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3">Partner Application</h2>
                <p className="text-slate-600 dark:text-slate-400">Fill out the details below to start your journey.</p>
              </div>

              {isSuccess ? (
                <SuccessCard 
                  title="Application Received! 🚘"
                  body={
                    method === "email"
                      ? "Thank you! A detailed summary has been emailed to our ops team at team@headgreen.in. We typically respond within 4 business hours."
                      : "Thank you for applying via WhatsApp! We will process your application and get back to you shortly."
                  }
                  onReset={() => setIsSuccess(false)}
                />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Full Name <span className="text-emerald-500">*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50"
                        {...register("fullName", { required: true })}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Phone Number <span className="text-emerald-500">*</span>
                      </label>
                      <input 
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50"
                        {...register("phone", { required: true })}
                      />
                    </div>

                    {/* Vehicle Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Vehicle Type
                      </label>
                      <select 
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50 appearance-none"
                        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                        {...register("vehicleType")}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-white dark:bg-[#090d1a] text-slate-400 dark:text-zinc-500">Select Vehicle Type</option>
                        <option value="EV Sedan" className="bg-white dark:bg-[#090d1a]">EV Sedan</option>
                        <option value="EV SUV" className="bg-white dark:bg-[#090d1a]">EV SUV</option>
                        <option value="EV Hatchback" className="bg-white dark:bg-[#090d1a]">EV Hatchback</option>
                        <option value="EV Shuttle" className="bg-white dark:bg-[#090d1a]">EV Shuttle</option>
                        <option value="I don't have an EV yet" className="bg-white dark:bg-[#090d1a]">I don't have an EV yet</option>
                      </select>
                    </div>

                    {/* Registration Number */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Registration Number
                      </label>
                      <input 
                        type="text"
                        placeholder="KL-07-EV-1234"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50"
                        {...register("registration")}
                      />
                    </div>

                    {/* Driving Experience */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Driving Experience (Years) <span className="text-emerald-500">*</span>
                      </label>
                      <input 
                        type="number"
                        min="0"
                        placeholder="e.g. 5"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50"
                        {...register("experience", { required: true })}
                      />
                    </div>

                    {/* Home Location */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Your Home Location <span className="text-emerald-500">*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Kakkanad, Ernakulam"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50"
                        {...register("location", { required: true })}
                      />
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                        Anything else to share?
                      </label>
                      <textarea 
                        rows="3"
                        placeholder="Preferred zones, shift availability, etc."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all focus:border-[#00BA7C] dark:focus:border-[#00BA7C] focus:bg-white dark:focus:bg-white/[0.04] focus:ring-1 focus:ring-[#00BA7C]/50 resize-none"
                        {...register("additionalInfo")}
                      ></textarea>
                    </div>

                  </div>

                  <hr className="border-slate-200 dark:border-white/[0.06] my-8" />

                  {/* Submission Logic Container */}
                  <div className="space-y-6">
                    <ErrorBanner message={errorMsg} />

                    <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                      <div className="space-y-3">
                        <label className="text-xs font-semibold tracking-wide text-slate-600 dark:text-zinc-400 uppercase">
                          Submission Channel
                        </label>
                        <MethodToggle value={method} onChange={setMethod} />
                        <ChannelHint method={method} />
                      </div>
                      
                      {/* Turnstile CAPTCHA */}
                      <div className="flex justify-center my-4">
                        <Turnstile
                          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                          onSuccess={(token) => setTurnstileToken(token)}
                          options={{ theme: "auto" }}
                        />
                      </div>

                      <div className="w-full md:w-64">
                        <SubmitButton 
                          method={method} 
                          isSubmitting={isSubmitting}
                          labelEmail="Submit Application"
                          labelWhatsApp="Apply via WhatsApp"
                        />
                      </div>
                    </div>
                  </div>

                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
