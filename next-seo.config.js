// next-seo.config.js
export const NEXT_SEO_DEFAULT = {
    title: 'Title A',
    description: 'Description A',
    openGraph: {
      type: 'website',
      locale: 'en_IE',
      url: 'https://tuitionappbd.com',
      title: 'Open Graph Title A',
      description: 'Open Graph Description A',
      images: [
        {
          url: 'https://tuitionappbd.com/seo.jpg',
          width: 800,
          height: 600,
          alt: 'Og Image Alt A',
          type: 'image/jpeg',
          secureUrl: 'https://tuitionappbd.com/seo.jpg',
        },
      ],
      siteName: 'SiteName A',
    },
    twitter: {
      handle: '@handlea',
      site: '@sitea',
      cardType: 'summary_large_image',
    },
  };