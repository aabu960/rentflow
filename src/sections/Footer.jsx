import { copyrightSign } from "../assets/icons";
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
  return (
    <footer className="max-container py-16">
      {/* Top Section */}
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        {/* Logo and Description */}
        <div className="flex flex-col items-start">
        <span className="text-2xl font-bold text-primary">
              AAACO <span className="text-secondary">NASSARA</span>
            </span>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            Connecting Ghanaian farmers to global markets with premium-quality
            maize, shea butter, cashew nuts, and more. Join us in fostering
            sustainable agriculture.
          </p>
          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon) => (
              <div
                className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
                key={icon.alt}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-montserrat text-2xl leading-normal font-medium mb-6 text-white">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li
                    className="mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray"
                    key={link.name}
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center text-white-400 mt-24 max-sm:flex-col max-sm:gap-4">
        {/* Copyright */}
        <div className="flex items-center gap-2 font-montserrat">
          <img
            src={copyrightSign}
            alt="Copyright sign"
            width={20}
            height={20}
            className="rounded-full m-0"
          />
          <p>Copyright © {new Date().getFullYear()} AAACO Nasara. All rights reserved.</p>
        </div>
        {/* Terms & Conditions */}
        <a
          href="/terms"
          className="font-montserrat hover:text-slate-gray transition"
        >
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
