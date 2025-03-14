import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaReact, FaGithub, FaGithubAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons

const Layout = ({ children }) => {

    // Define Footer Data within the Layout component:
    const quickLinksData = [
      { name: 'Home', href: '/' },
      { name: 'Shop', href: '/shop' },
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact', href: '/contact' }
    ];

    const legalLinksData = [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' }
    ];

    const technologiesData = [
      { name: 'React', icon: <FaReact className="text-blue-500" aria-hidden="true" /> },
      { name: 'Redux', icon: <FaGithub className="text-gray-400" aria-hidden="true" /> },
      { name: 'TypeScript', icon: <FaGithubAlt className="text-blue-500" aria-hidden="true" /> },
    ];

    const socialLinksData = [
      { name: 'GitHub', href: 'https://github.com/', icon: <FaGithub className="text-gray-400" /> },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: <FaLinkedin className="text-blue-500" /> },
      { name: 'Twitter', href: 'https://twitter.com/', icon: <FaTwitter className="text-blue-400" /> },
    ];

    const copyrightText = `© ${new Date().getFullYear()} E-Shop. All Rights Reserved.`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar 
        quickLinks={quickLinksData} // Pass quickLinksData here
        socialLinks={socialLinksData} // Pass socialLinksData to Navbar
      />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Footer at the bottom */}
      <Footer
        quickLinks={quickLinksData} // Pass quickLinksData to Footer
        copyrightText={copyrightText}
        technologies={technologiesData}
        legalLinks={legalLinksData} // Pass legalLinksData to Footer
        socialLinks={socialLinksData} // Pass socialLinksData to Footer
      />
    </div>
  );
};

export default Layout;
