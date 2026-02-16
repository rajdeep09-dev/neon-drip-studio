const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "DRIP Coffee Studio",
    description: "specialty coffee for people who'd rather be anywhere but a starbucks. single origin beans, small batch roasted.",
    url: "https://dripcoffee.studio",
    telephone: "(555) DRIP-NOW",
    email: "hey@dripcoffee.studio",
    address: {
      "@type": "PostalAddress",
      streetAddress: "420 Brew Street",
      addressLocality: "Cooltown",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.0522",
      longitude: "-118.2437",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    servesCuisine: "Coffee, Pastries, Brunch",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "847",
    },
    sameAs: [
      "https://instagram.com/dripcoffeestudio",
      "https://tiktok.com/@dripcoffee",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
