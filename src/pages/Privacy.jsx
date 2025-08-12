import React from "react";
import SEOHead from '../components/SEOHead';

export default function Privacy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - TechGuru India"
        description="TechGuru India की Privacy Policy पढ़ें। जानिए हम आपकी personal information को कैसे handle करते हैं।"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 hindi-text">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground hindi-text">
            Last updated: January 2024
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-border prose prose-lg max-w-none">
          <h2 className="hindi-text">Information हम collect करते हैं</h2>
          <p className="hindi-text">
            TechGuru India पर हम निम्नलिखित information collect करते हैं:
          </p>
          
          <ul className="hindi-text">
            <li>आपका नाम और email address (जब आप newsletter subscribe करते हैं)</li>
            <li>Browser information और IP address</li>
            <li>Website usage data और preferences</li>
            <li>Comments और feedback जो आप देते हैं</li>
          </ul>

          <h2 className="hindi-text">Information का उपयोग</h2>
          <p className="hindi-text">
            हम आपकी information का उपयोग इन purposes के लिए करते हैं:
          </p>
          
          <ul className="hindi-text">
            <li>Latest tech news और updates भेजने के लिए</li>
            <li>Website experience को improve करने के लिए</li>
            <li>आपके questions और comments का जवाब देने के लिए</li>
            <li>Website security maintain करने के लिए</li>
          </ul>

          <h2 className="hindi-text">Contact Us</h2>
          <p className="hindi-text">
            अगर आपके कोई questions हैं privacy policy के बारे में, तो हमसे संपर्क करें:
          </p>
          
          <ul className="hindi-text">
            <li>Email: privacy@techguru-india.com</li>
            <li>Phone: +91 12345 67890</li>
          </ul>
        </div>
      </div>
    </>
  );
}