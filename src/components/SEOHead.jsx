import { useEffect } from 'react';

export default function SEOHead({
  title = "SL Office Solutions (PVT) LTD | Laptops, Printers, CCTV & Tech in Sri Lanka",
  description = "Sri Lanka's premier destination for high-performance laptops, CCTV security systems, wireless printers, and office automation tech.",
  keywords = "laptops sri lanka, office automation colombo, cctv security camera sri lanka, wireless laser printer, tech store sri lanka"
}) {
  useEffect(() => {
    // Dynamic Title
    document.title = title;

    // Dynamic Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Dynamic Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  return null;
}
