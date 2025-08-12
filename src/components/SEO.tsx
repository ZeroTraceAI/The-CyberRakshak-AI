import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
};

export const SEO = ({ title, description, canonical = "/" }: SEOProps) => {
  const safeTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const safeDesc = description.length > 160 ? `${description.slice(0, 157)}...` : description;
  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDesc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:type" content="website" />

      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDesc} />
    </Helmet>
  );
};
