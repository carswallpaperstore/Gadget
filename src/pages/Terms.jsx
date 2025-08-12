import React from "react";
import SEOHead from '../components/SEOHead';

export default function Terms() {
  return (
    <>
      <SEOHead 
        title="Terms & Conditions - TechGuru India"
        description="TechGuru India के Terms & Conditions पढ़ें। Website के उपयोग के नियम और शर्तें जानें।"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 hindi-text">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground hindi-text">
            Last updated: January 2024
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-border prose prose-lg max-w-none">
          <h2 className="hindi-text">Welcome to TechGuru India</h2>
          <p className="hindi-text">
            TechGuru India website का उपयोग करके आप निम्नलिखित terms और conditions 
            को accept करते हैं। कृपया इन्हें carefully पढ़ें।
          </p>

          <h2 className="hindi-text">Website का उपयोग</h2>
          <p className="hindi-text">
            TechGuru India website केवल informational purposes के लिए है। आप इस website का 
            उपयोग lawful purposes के लिए ही कर सकते हैं।
          </p>

          <h2 className="hindi-text">Contact Information</h2>
          <p className="hindi-text">
            Terms के बारे में कोई questions हैं तो हमसे contact करें:
          </p>
          
          <ul className="hindi-text">
            <li>Email: legal@techguru-india.com</li>
            <li>Phone: +91 12345 67890</li>
          </ul>
        </div>
      </div>
    </>
  );
}