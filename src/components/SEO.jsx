import { Helmet } from "react-helmet-async";
import { keywordMap } from "../config/keywordMap.js";

export default function SEO({ 
  title, 
  description, 
  keywords,
  image = "https://headgreen.in/assets/logo.png", 
  path = "", 
  type = "website",
  schemaType = null,
  noindex = false,
  faqItems = []
}) {
  const baseTitle = "HeadGreen! | 100% Electric Corporate Cabs & Fleet in Kochi";
  const fullTitle = title ? `${title} | HeadGreen!` : baseTitle;
  const defaultDesc = "Kochi's premier zero-emission corporate mobility platform. We provide dedicated EV fleets, employee transits, and airport shuttles for enterprises in Infopark & SmartCity.";
  const finalDesc = description || defaultDesc;
  const canonicalUrl = `https://headgreen.in${path}`;
  
  // Use explicit keywords if provided, else lookup from map, else fallback
  const finalKeywords = keywords || keywordMap[path] || keywordMap["/"];

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
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Corporate EV Fleet Management",
        "provider": {
          "@type": "Organization",
          "name": "HeadGreen!"
        },
        "areaServed": ["Kochi", "Kakkanad", "Ernakulam", "SmartCity"],
        "serviceType": "Corporate Mobility"
      }
    ];

    if (path && path !== "/") {
      const pathParts = path.split('/').filter(Boolean);
      let currentPath = "";
      const breadcrumbItems = pathParts.map((part, index) => {
        currentPath += `/${part}`;
        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
          "item": `https://headgreen.in${currentPath}`
        };
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      });
    }

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

    if (schemaType === "FAQPage" && faqItems.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
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
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HeadGreen!" />
      <meta property="og:locale" content="en_IN" />

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
