'use client';

import * as React from 'react';
import { useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../../navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../popover';
import { cn } from '../../../../lib/utils';
import { Link } from "react-router-dom";
import { SearchWithData } from '../../combobox';
import { useProductSearch } from '@/hooks/useProductSearch';

/**
 * Logo component for Navbar
 * @param {Object} props
 */
const Logo = (props) => {
  return (
    <svg
      width='1em'
      height='1em'
      viewBox='0 0 324 323'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor'
      />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor'
      />
    </svg>
  );
};

/**
 * Hamburger Icon for Mobile
 */
const HamburgerIcon = ({ className, ...props }) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

/**
 * Default navigation structure
 */
const defaultNavigationLinks = [
  { href: '/product', label: 'Products' },
  { href: '/category', label: 'Categories' },
  { href: '/brands', label: 'Deals' },
  { href: '/wishlist', label: 'WishList' }
];

/**
 * Navbar04 – fully responsive navigation with mobile/desktop menus.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.logo]
 * @param {string} [props.logoHref]
 * @param {Array<{href:string,label:string}>} [props.navigationLinks]
 * @param {string} [props.signInText]
 * @param {string} [props.signInHref]
 * @param {string} [props.token]
 * @param {string} [props.cartText]
 * @param {string} [props.cartHref]
 * @param {number} [props.cartCount]
 * @param {number} [props.wishlistCount]
 * @param {string} [props.searchPlaceholder]
 * @param {function} [props.onSignInClick]
 * @param {function} [props.onCartClick]
 * @param {function} [props.onSearchSubmit]
 */
export const Navbar04 = React.forwardRef(({
  className,
  logo,
  navigationLinks,
  signInText,
  token,
  cartText,
  cartCount,
  wishlistCount,
  
  onSignInClick,
  onCartClick,

  ...props
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
 
let{isSearching,setIsSearching}=useProductSearch()
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        setIsMobile(containerRef.current.offsetWidth < 768);
      }
    };

    checkWidth();
    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const combinedRef = React.useCallback((node) => {
    containerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }, [ref]);

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   const form = new FormData(e.currentTarget);
  //   const query = form.get('search');
  //   if (onSearchSubmit) onSearchSubmit(query);
  // };

  return (
    <header
      ref={combinedRef}
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline',
        className
      )}
      {...props}
    >

      <div className="container mx-auto flex h-12 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-1 items-center gap-2">

          {/* Mobile Menu */}
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <HamburgerIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="w-64 p-1">
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex-col items-start gap-0">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer">
                          {link.label}
                          {link.label === "WishList" && (
                            <span className="text-gray-800 text-xs">{wishlistCount}</span>
                          )}
                        </button>
                      </NavigationMenuItem>
                    ))}

                    <NavigationMenuItem className="w-full" role="presentation">
                      <div className="bg-border -mx-1 my-1 h-px" />
                    </NavigationMenuItem>

                    <NavigationMenuItem className="w-full">
                      {token ? (
                        <button
                          onClick={() => onSignInClick && onSignInClick()}
                          className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                          {signInText}
                        </button>
                      ) : (
                        <Button size="sm" className="mt-0.5 w-full text-sm">
                          <Link to="login">SignIn!</Link>
                        </Button>
                      )}
                    </NavigationMenuItem>

                    <NavigationMenuItem className="w-full">
                      <Button
                        size="sm"
                        className="mt-0.5 w-full text-sm"
                        onClick={() => onCartClick && onCartClick()}
                      >
                        <span className="flex items-baseline gap-2">
                          {cartText}
                          <span className="text-primary-foreground/60 text-xs">{cartCount}</span>
                        </span>
                      </Button>
                    </NavigationMenuItem>

                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}

          {/* Logo + Desktop Nav */}
          <div className="flex flex-1 items-center gap-6 max-md:justify-between">

            {/* Logo */}
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <div className="text-2xl">{logo}</div>
              <span className="hidden font-bold text-xl sm:inline-block">{isSearching?'happy':'not happpy'}</span>
            </button>

            {/* Desktop Navigation */}
           {!isSearching&&(<>
             {!isMobile  &&(
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className="relative text-muted-foreground hover:text-primary py-1.5 font-medium transition-colors cursor-pointer rounded-md px-4 text-sm"
                      >
                        <span>{link.label}</span>

                        {link.label === "WishList" && (
                          <span
                            className="text-gray-800 text-xs absolute top-0 right-0 bg-amber-200 w-5 h-5 rounded-full flex justify-center items-center"
                          >
                            {wishlistCount}
                          </span>
                        )}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}</>
           )}

            {/* Search Form */}
            {/* <SearchFormCompound
              searchPlaceholder={searchPlaceholder}
              searchId={searchId}
              handleSearchSubmit={handleSearchSubmit}
            /> */}
            <SearchWithData setIsSearching={setIsSearching}/>
          </div>
        </div>

        {/* Right Section Desktop */}
        {!isMobile && (
          <div className="flex items-center gap-3">

            {token ? (
              <button
                onClick={() => onSignInClick && onSignInClick()}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {signInText}
              </button>
            ) : (
              <button className="text-sm">
                <Link to="login">SignIn</Link>
              </button>
            )}

            <Button
              size="sm"
              className="text-sm font-medium px-4 h-9 rounded-md"
              onClick={() => onCartClick && onCartClick()}
            >
              <span className="flex items-baseline gap-2">
                {cartText}
                <span className="text-primary-foreground/60 text-xs">{cartCount}</span>
              </span>
            </Button>
          </div>
        )}

      </div>
    </header>
  );
});

Navbar04.displayName = 'Navbar04';

/* -----------------------------------------
   PROP TYPES (STRICT)
------------------------------------------ */
Navbar04.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.node,
  logoHref: PropTypes.string,

  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),

  signInText: PropTypes.string,
  signInHref: PropTypes.string,
  token: PropTypes.string,

  cartText: PropTypes.string,
  cartHref: PropTypes.string,
  cartCount: PropTypes.number,

  wishlistCount: PropTypes.number,

  searchPlaceholder: PropTypes.string,

  onSignInClick: PropTypes.func,
  onCartClick: PropTypes.func,
  onSearchSubmit: PropTypes.func,

  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

/* -----------------------------------------
   DEFAULT PROPS (SAFE FALLBACKS)
------------------------------------------ */
Navbar04.defaultProps = {
  className: '',
  logo: <Logo />,
  logoHref: '#',
  navigationLinks: defaultNavigationLinks,
  signInText: 'Sign In',
  signInHref: '#signin',
  token: '',
  cartText: 'Cart',
  cartHref: '#cart',
  cartCount: 0,
  wishlistCount: 0,
  searchPlaceholder: 'Search...',
  onSignInClick: null,
  onCartClick: null,
  onSearchSubmit: null
};

export { Logo, HamburgerIcon };
