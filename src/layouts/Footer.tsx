import React from 'react';

// Import types
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

// Import libs
import initFontAwesome from '@/lib/fontawesome';

interface FooterProps { }

const Footer: React.FC<FooterProps> = ({ }) => {

    initFontAwesome();

    // Fontawsome icons (workaround for TS error)
    const ico_phone: IconProp = "fa-solid fa-phone" as IconProp;
    const ico_mail: IconProp = "fa-solid fa-envelope" as IconProp;

    return (
        <footer>
        </footer>
    );
};

export default Footer;