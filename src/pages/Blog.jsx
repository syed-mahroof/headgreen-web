import SEO from "../components/SEO.jsx";

export default function Blog() {
  return (
    <>
      <SEO 
        title="EV Corporate Fleet Blog | HeadGreen Insights" 
        description="Insights, guides, and updates on sustainable corporate mobility, EV fleet management, and ESG reporting for enterprises in Kochi." 
        path="/blog"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-white pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">HeadGreen Insights</h1>
        <p className="text-muted">Coming Soon. Expert guides on zero-emission corporate mobility.</p>
      </div>
    </>
  );
}
