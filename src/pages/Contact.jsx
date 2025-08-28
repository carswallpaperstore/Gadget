import React from "react";
/**
 * CONTACT FORM COMPONENT
 * =====================
 * Contact form with validation and email functionality
 * Currently shows success message - can be enhanced with email service
 */

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import SEOHead from '../components/SEOHead';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // CONTACT FORM HANDLER - Shows success message (can be enhanced with backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'सभी fields भरना जरूरी है।',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual email service)
    setTimeout(() => {
      toast({
        title: 'Message भेज दिया गया!',
        description: 'हम जल्दी ही आपको reply करेंगे।'
      });

      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEOHead 
        title="Contact Us | TechGuru India - हमसे संपर्क करें"
        description="TechGuru India से संपर्क करें। Tech news, reviews या suggestions के लिए हमसे बात करें। Email: techguruindia321@gmail.com, Phone: +91 8055220689"
        canonical="contact"
        type="website"
        keywords={["TechGuru India contact", "tech support india", "gadget review contact", "hindi tech help"]}
        faqs={[
          {
            question: "Review के लिए gadget कैसे भेजें?",
            answer: "Review के लिए product भेजने से पहले हमसे email या phone पर संपर्क करें।"
          },
          {
            question: "Advertisement के लिए कैसे contact करें?",
            answer: "Advertisement और partnership के लिए techguruindia321@gmail.com पर email करें।"
          }
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 hindi-text">
            हमसे <span className="text-primary">संपर्क करें</span>
          </h1>
          <p className="text-lg text-muted-foreground hindi-text max-w-2xl mx-auto">
            कोई सवाल, सुझाव या feedback है? हमें बताएं। हम आपकी बात सुनना चाहते हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-6 hindi-text">Message भेजें</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 hindi-text">
                  आपका नाम *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="पूरा नाम लिखें"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 hindi-text">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 hindi-text">
                  आपका Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="यहाँ अपना message लिखें..."
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span className="hindi-text">
                  {isSubmitting ? 'भेज रहे हैं...' : 'Message भेजें'}
                </span>
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <h2 className="text-2xl font-semibold mb-6 hindi-text">संपर्क जानकारी</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 hindi-text">Email करें</h3>
                    <p className="text-muted-foreground english-text">techguruindia321@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 hindi-text">Phone करें</h3>
                    <p className="text-muted-foreground english-text">+91 8055220689</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 hindi-text">Address</h3>
                    <p className="text-muted-foreground hindi-text">
                      TechGuru India Office<br />
                      Mumbai, Maharashtra<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-4 hindi-text">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 hindi-text">Review के लिए gadget कैसे भेजें?</h4>
                  <p className="text-sm text-muted-foreground hindi-text">
                    Review के लिए product भेजने से पहले हमसे email या phone पर संपर्क करें।
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 hindi-text">Advertisement के लिए कैसे contact करें?</h4>
                  <p className="text-sm text-muted-foreground hindi-text">
                    Advertisement और partnership के लिए techguruindia321@gmail.com पर email करें।
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 hindi-text">Guest post कैसे submit करें?</h4>
                  <p className="text-sm text-muted-foreground hindi-text">
                    Guest post के लिए पहले topic और outline भेजें। हम review करके बताएंगे।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}