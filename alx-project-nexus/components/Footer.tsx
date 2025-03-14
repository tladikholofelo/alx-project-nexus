import React from "react";
import { FaReact, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = ({
  quickLinks = [],
  copyrightText = "",
  socialLinks = [],
  legalLinks = [],
  technologies = [],
}) => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-600 text-white py-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-200 tracking-tight">
              Quick Links
            </h3>
            <nav aria-label="Quick Links">
              {quickLinks.length > 0 ? (
                quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-white py-1"
                  >
                    {link.name}
                  </a>
                ))
              ) : (
                <p>No quick links available.</p>
              )}
            </nav>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-200 tracking-tight">
              Connect
            </h3>
            <div className="flex space-x-6">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-white"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))
              ) : (
                <p>No social links available.</p>
              )}
            </div>
          </div>

          {/* Legal Information Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-200 tracking-tight">
              Legal
            </h3>
            <p className="text-gray-400">
              {copyrightText || "© 2025 Your Company. All rights reserved."}
            </p>
            <div>
              {legalLinks.length > 0 ? (
                legalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-white"
                  >
                    {link.name}
                  </a>
                ))
              ) : (
                <p>No legal links available.</p>
              )}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-200 tracking-tight">
              Powered by
            </h3>
            <p className="text-sm text-gray-400">
              Built with{" "}
              {technologies.length > 0
                ? technologies.map((tech) => tech.name).join(", ")
                : "No technologies listed."}
              .
            </p>
            <div className="flex flex-wrap space-x-4">
              {technologies.length > 0 ? (
                technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="flex items-center text-gray-400"
                    aria-label={`${tech.name} Technology`}
                  >
                    {tech.icon}
                    <span className="ml-1">{tech.name}</span>
                  </span>
                ))
              ) : (
                <p>No technologies listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">{copyrightText || "© 2025 Your Company. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
