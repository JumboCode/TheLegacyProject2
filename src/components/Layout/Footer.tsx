import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const INSTAGRAM_URL =
  "https://instagram.com/thelegacyprojectus?igshid=MzRlODBiNWFlZA==";

const Footer = () => {
  return (
    <footer className="bg-dark-green px-[93px] py-[22px] text-white">
      <a
        href={INSTAGRAM_URL}
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center space-x-1.5"
      >
        <FontAwesomeIcon icon={faInstagram} className="h-[24px] w-[24px]" />
        <div className="text-l">tuftslegacyproject</div>
      </a>
    </footer>
  );
};

export default Footer;
