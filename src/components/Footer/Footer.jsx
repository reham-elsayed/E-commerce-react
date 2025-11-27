import React from 'react';
import {
  Facebook, Twitter, Instagram, Linkedin, Mail, Smartphone, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button'; // Shadcn Button
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Shadcn Accordion
import Input from '../ui/input';

// --- Data Structure for Navigation Links (Same as before) ---
const FOOTER_LINKS = [
  {
    title: 'Help & Support',
    links: ['Shipping & Delivery', 'Returns Policy', 'Help Center', 'About Us'],
  },
  {
    title: 'Quick Links',
    links: ['Sell with Us', 'Mobile App', 'Affiliate Program', 'Gift Cards', 'Careers'],
  },
  {
    title: 'Legal',
    links: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Sitemap'],
  },
];

// --- Sub-Components for Cleanliness and Reusability ---

const SocialIcon = ({ Icon, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
    <Icon className="w-5 h-5" />
  </a>
);

const LinkList = ({ links }) => (
  <ul className="space-y-2">
    {links.map((link, linkIndex) => (
      <li key={linkIndex}>
        <a
          href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-sm text-gray-400 hover:text-yellow-500 transition-colors"
        >
          {link}
        </a>
      </li>
    ))}
  </ul>
);

// --- Main Footer Component ---

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-foreground text-gray-300">
      {/* --- Top Section: Newsletter & Contact --- */}
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12 border-b border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Newsletter / Stay Connected (Using Shadcn Input & Button) */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Stay Connected</h3>
            <p className="text-card-foreground mb-4">
              Sign up for our newsletter to receive the latest updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:flex-grow p-3 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus-visible:ring-yellow-500"
              />
              <Button
                variant="default" // You might use a custom variant for the yellow color
                className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Contact Information & Social Media */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Customer Support</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <Smartphone className="w-5 h-5 mr-2 text-yellow-500" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </p>
              <p className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2 text-yellow-500" />
                <a href="mailto:support@ecommerce.com" className="hover:text-white transition-colors">support@ecommerce.com</a>
              </p>
            </div>
            
            <h4 className="text-lg font-semibold text-white mt-5 mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              {/* <SocialIcon Icon={facebook} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
              <SocialIcon Icon={Linkedin} href="#" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* --- Middle Section: Navigation Links (Desktop vs. Mobile) --- */}
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
        
        {/* DESKTOP VIEW: Standard Grid (md screen and up) */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-8">
          {FOOTER_LINKS.map((section, index) => (
            <div key={index} className="col-span-1">
              <h4 className="text-base font-semibold text-white mb-3">{section.title}</h4>
              <LinkList links={section.links} />
            </div>
          ))}
          
          {/* Dedicated column for Payment Methods & Apps */}
          <div className="col-span-2">
            <h4 className="text-base font-semibold text-white mb-3">Accepted Payments</h4>
            <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-900 font-semibold">VISA</span>
                <span className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-900 font-semibold">Mastercard</span>
            </div>
        
          </div>
        </div>
        
        {/* MOBILE VIEW: Accessible Accordion (below md screen) */}
        <div className="md:hidden">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-700 border-b border-gray-700">
                {FOOTER_LINKS.map((section, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border-t-0">
                        <AccordionTrigger className="text-white hover:no-underline py-4 text-base font-semibold">
                            {section.title}
                            {/* Radix/shadcn handles the rotation of the icon */}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <LinkList links={section.links} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </div>

      {/* --- Bottom Section: Copyright & Disclaimer --- */}
      <div className="bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="order-2 md:order-1 mt-3 md:mt-0">
            &copy; {currentYear}HYPE STATION. All rights reserved.
          </p>
          <div className="order-1 md:order-2 flex space-x-4">
            <a href="#" className="hover:text-yellow-500 transition-colors">Safety Center</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Affiliate Program</a>
          </div>
        </div>
      </div>
    </footer>
  );
}