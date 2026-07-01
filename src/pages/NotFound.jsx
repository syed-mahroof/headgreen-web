import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found | HeadGreen Corporate Mobility" 
        description="The page you are looking for does not exist." 
        path="/404"
        noindex={true}
      />
      <section className="section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="text-7xl font-bold text-primary">404</div>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">That route doesn't exist on HeadGreen.</p>
      <Link to="/" className="btn-primary mt-6">Go Home</Link>
      </section>
    </>
  );
}
