import React from 'react';

// Import assets
import logo from '@/assets/logo/logo.png';

// Import utils
import { StringUtils } from '@/utils/textCasing'

interface HeaderProps { }

const style = {
    header: 'sticky top-0 z-100 flex justify-between items-center bg-(--color-nav) h-[10rem] m-0 px-12 lg:px-(--general-padding-site) backdrop-blur-xs',
    logo: 'block w-[40vw]',
    nav: 'flex gap-12 px-4',
    link: 'after:transition-all after:duration-125 after:content-[""] after:block after:w-0 after:h-0.5 after:bg-(--color-primary-400) hover:after:w-full',
}

const navItems = [
    'Home',
]

const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <header className={`${style.header} h-[6rem] lg:h-[10rem]`}>
            <a href="/" className={`${style.logo} lg:w-[14vw]`}>
                <img src={logo} alt="Logo Aux portes de soi" />
            </a>

            {/* Desktop nav */}
            <nav className={`${style.nav} hidden lg:flex`}>
                {
                    navItems.map((navItem) => {
                        return <a href={StringUtils.toSentenceCase(navItem).toLowerCase()} className={`${style.link}`}>{navItem}</a>
                    })
                }
            </nav>

            {/* Mobile: accessible details/summary hamburger */}
            <details className="lg:hidden relative">
                <summary className="list-none cursor-pointer p-2">
                    <div className="w-8 h-6 flex flex-col justify-between">
                        <span className="block h-[2px] bg-(--color-primary-400)"></span>
                        <span className="block h-[2px] bg-(--color-primary-400)"></span>
                        <span className="block h-[2px] bg-(--color-primary-400)"></span>
                    </div>
                </summary>

                <div className="absolute right-0 mt-2 w-48 bg-(--color-primary-500) rounded shadow-md z-50">
                    <nav className="flex flex-col p-4 gap-3">
                        {
                            navItems.map((navItem) => {
                                return <a href={StringUtils.toSentenceCase(navItem).toLowerCase()} className={`${style.link} block`}>{navItem}</a>
                            })
                        }
                    </nav>
                </div>
            </details>
        </header>
    );
};

export default Header;