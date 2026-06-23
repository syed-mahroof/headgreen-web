import { Helmet } from "react-helmet-async";

export default function SEO({ 
  title, 
  description, 
  keywords = "EV cab service Kochi, corporate fleet Kerala, electric taxi Ernakulam, employee transport Infopark, HeadGreen mobility",
  image = "https://headgreen.in/assets/logo.png", 
  path = "", 
  type = "website",
  schemaType = null
}) {
  const baseTitle = "HeadGreen! | 100% Electric Corporate Cabs & Fleet in Kochi";
  const fullTitle = title ? `${title} | HeadGreen!` : baseTitle;
  const defaultDesc = "Kochi's premier zero-emission corporate mobility platform. We provide dedicated EV fleets, employee transits, and airport shuttles for enterprises in Infopark & SmartCity.";
  const finalDesc = description || defaultDesc;
  const canonicalUrl = `https://headgreen.in${path}`;

  const getStructuredData = () => {
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HeadGreen!",
        "url": "https://headgreen.in",
        "logo": "https://headgreen.in/assets/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-85898-44333",
          "contactType": "customer service",
          "email": "team@headgreen.in"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "HeadGreen!",
        "image": "https://headgreen.in/assets/logo.png",
        "url": "https://headgreen.in",
        "telephone": "+91-85898-44333",
        "description": "Corporate Electric Vehicle mobility vendor specializing in sustainable employee transport and carbon-neutral fleet operations.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        },
        "areaServed": ["Kochi", "Kakkanad", "Ernakulam", "Kerala"],
        "makesOffer": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate EV Fleet & Employee Transits"
          }
        }
      }
    ];

    if (schemaType === "JobPosting" || schemaType === "Action") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": "Driver Partner",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "HeadGreen Mobility",
          "sameAs": "https://www.headgreen.in"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kochi",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          }
        },
        "employmentType": "CONTRACTOR",
        "description": "Join Kochi's premier 100% zero-emission corporate fleet. Enjoy guaranteed enterprise payouts, flexible shifts, and drive the best EVs in the market."
      });
    }

    return (
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    );
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HeadGreen!" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data / Schema.org */}
      {getStructuredData()}
    </Helmet>
  );
}
