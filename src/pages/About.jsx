import React from "react";
import { Users, Target, Award, Heart } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function About() {
  const teamMembers = [
    {
      name: "Ganesh Chavan",
      role: "Tech Reviewer",
      image: "https://example.com/ganesh.jpg", 
      description: "1+ साल का tech journalism experience"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "सटीक Information",
      description: "हम सिर्फ verified और tested जानकारी देते हैं। कोई fake news या clickbait नहीं।"
    },
    {
      icon: Heart,
      title: "User-First Approach",
      description: "हमारे readers की जरूरतें सबसे पहले। हम उनकी buying decisions में help करते हैं।"
    },
    {
      icon: Award,
      title: "Quality Content",
      description: "हर article detailed research के साथ लिखा जाता है। Quality हमारी priority है।"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "हम एक community बनाते हैं जहाँ tech enthusiasts knowledge share करते हैं।"
    }
  ];

  return (
    <>
      <SEOHead 
        title="About Us - TechGuru India के बारे में जानें"
        description="TechGuru India के बारे में जानें। हमारी team, mission और vision के बारे में पढ़ें। भारत की #1 tech website की story और values।"
        canonical="about"
        type="website"
        keywords={["TechGuru India about", "tech website team", "hindi tech blog", "technology news india"]}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 hindi-text">
            हम हैं <span className="text-primary">TechGuru India</span>
          </h1>
          <p className="text-xl text-muted-foreground hindi-text max-w-3xl mx-auto leading-relaxed">
            भारत की सबसे तेज़ और भरोसेमंद tech news website। हमारा mission है आपको 
            latest technology trends और gadget reviews की सटीक जानकारी देना।
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-4 hindi-text text-primary">हमारा Mission</h2>
            <p className="text-muted-foreground hindi-text leading-relaxed">
              भारतीय consumers को latest technology के बारे में सही और 
              comprehensive जानकारी देना। हम चाहते हैं कि हर Indian अपनी 
              tech needs के according best decisions ले सके।
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-4 hindi-text text-primary">हमारा Vision</h2>
            <p className="text-muted-foreground hindi-text leading-relaxed">
              India में tech journalism के standards को बढ़ाना और एक 
              trusted platform बनना जहाँ लोग confident होकर technology 
              related decisions ले सकें।
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 hindi-text">हमारे Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-3 hindi-text">{value.title}</h3>
                  <p className="text-sm text-muted-foreground hindi-text leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 hindi-text">हमारी Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border text-center">
                {/* <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                /> */}
                <h3 className="text-xl font-semibold mb-2 hindi-text">{member.name}</h3>
                <p className="text-primary font-medium mb-3 english-text text-sm">{member.role}</p>
                <p className="text-muted-foreground text-sm hindi-text">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-border">
          <h2 className="text-3xl font-bold mb-8 hindi-text text-center">हमारी Story</h2>
          
          <div className="prose prose-lg max-w-none hindi-text">
            <p className="mb-6 text-muted-foreground leading-relaxed">
              TechGuru India की शुरुआत 2025 में हुई जब हमने देखा कि भारत में 
              quality tech content की कमी है। ज्यादातर websites पर या तो English में 
              content था या फिर वह ज्यादा technical था जो common users समझ नहीं पाते थे।
            </p>
            
            <p className="mb-6 text-muted-foreground leading-relaxed">
              हमने decide किया कि हम एक ऐसा platform बनाएंगे जो:
            </p>
            
            <ul className="mb-6 text-muted-foreground space-y-2">
              <li>• Hindi और English दोनों languages में content provide करे</li>
              <li>• Technical jargon को simple भाषा में explain करे</li>
              <li>• Indian market के according reviews और recommendations दे</li>
              <li>• Price-conscious Indian consumers की help करे</li>
            </ul>
            
            <p className="text-muted-foreground leading-relaxed">
              आज हमारे पास Bohot monthly readers हैं और हम India की top tech 
              websites में से एक हैं। हमारी success की सबसे बड़ी वजह है हमारे 
              readers का trust और उनकी feedback।
            </p>
          </div>
        </div>
      </div>
    </>
  );
}