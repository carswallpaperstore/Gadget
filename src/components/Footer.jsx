import React from "react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 hindi-text">TechGuru India</h3>
            <p className="text-gray-300 text-sm hindi-text leading-relaxed">
              भारत की सबसे तेज़ और भरोसेमंद tech news website। 
              Latest gadgets, reviews और tech updates हिंदी में।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 hindi-text">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors hindi-text">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors hindi-text">
                  संपर्क करें
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors hindi-text">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors hindi-text">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 hindi-text">न्यूज़लेटर</h4>
            <p className="text-gray-300 text-sm hindi-text mb-3">
              Latest tech updates पाने के लिए subscribe करें
            </p>
            <button className="bg-white text-primary px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 hindi-text">Connect करें</h4>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm hindi-text">
              © {currentYear} TechGuru India. सभी अधिकार सुरक्षित।
            </p>
            <p className="text-gray-400 text-xs mt-2 md:mt-0 english-text">
              Made with ❤️ for Indian tech enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}