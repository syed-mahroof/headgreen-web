import { Helmet } from "react-helmet-async";

export default function SEO({ 
  title, 
  description, 
  keywords = "EV fleet, corporate mobility, employee transport, Kochi, electric vehicles",
  image = "https://www.headgreen.in/og-image.jpg", 
  url = "https://www.headgreen.in", 
  type = "website",
  schemaType = null
}) {
  const baseTitle = "HeadGreen!";
  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  const getStructuredData = () => {
    if (!schemaType) return null;

    let schemaData = {};

    if (schemaType === "Organization") {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HeadGreen Mobility",
        "url": "https://www.headgreen.in",
        "logo": "https://www.headgreen.in/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-85898-44333",
          "contactType": "customer service",
          "email": "team@headgreen.in"
        }
      };
    } else if (schemaType === "LocalBusiness" || schemaType === "Service") {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "HeadGreen Mobility",
        "image": "https://www.headgreen.in/og-image.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        },
        "description": description,
        "telephone": "+91-85898-44333"
      };
    } else if (schemaType === "JobPosting" || schemaType === "Action") {
      schemaData = {
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
      };
    }

    return (
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    );
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HeadGreen Mobility" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data / Schema.org */}
      {getStructuredData()}
    </Helmet>
  );
}
