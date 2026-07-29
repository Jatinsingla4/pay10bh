'use client'

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../../contexts/ResponsiveContext'
import { usePathname } from 'next/navigation'
import '@/styles/components/_header.scss'
import ContactCtaBtn from '../ui/ContactCtaBtn'

// Navigation data structure - can be easily replaced with API data
const navigationData = {
  logo: {
    text: 'Pay10',
    href: '/',
  },
  productsMega: {
    groups: [
      {
        id: 'consumer',
        label: 'Consumer Solutions',
        icon: '/images/header/prepaid.svg',
        items: [
          {
            label: 'Pay10 UAE',
            href: '/pay10-uae-app',
            icon: '/images/header/pay-10-app.svg',
          },
          {
            label: 'Bill Payment',
            href: '/bill-payment',
            icon: '/images/header/payments.svg',
          },
          {
            label: 'Send Abroad',
            href: '/send-abroad',
            icon: '/images/header/collect-world.svg',
          },
          {
            label: 'Pay10 Card',
            href: '/pay10-card',
            icon: '/images/header/prepaid.svg',
          },
          {
            label: 'Open Finance Al Tareq',
            href: '/open-finance-altareq',
            icon: '/images/header/sf.svg',
          },
        ],
      },
      {
        id: 'business',
        label: 'Business Solutions',
        icon: '/images/header/pay-10-biz.svg',
        items: [
          {
            label: 'Pay10 Biz UAE',
            href: '/pay10-biz-uae-app',
            icon: '/images/header/pay-10-biz.svg',
          },
          {
            label: 'Merchant Portal',
            href: '/merchant-portal',
            icon: '/images/header/integration-method.svg',
          },
          {
            label: 'Payment Gateways',
            href: '/payment-gateway',
            icon: '/images/header/payment-gateway.svg',
          },
          {
            label: 'POS Devices',
            href: '/pos-devices',
            icon: '/images/header/payments.svg',
          },
          {
            label: 'WPS & Payroll',
            href: '/wps-payroll',
            icon: '/images/header/sf.svg',
          },
          {
            label: 'Channel Partners',
            href: '/channel-partners',
            icon: '/images/header/collect-world.svg',
          },
        ],
      },
      // {
      //   id: 'pay10-world',
      //   label: 'Pay10 World',
      //   icon: '/images/header/pay10-world.svg',
      //   items: [
      //     // {
      //     //   label: 'Collect from India',
      //     //   href: '/accept-international-payments-from-india',
      //     //   icon: '/images/header/collect-india.svg',
      //     // },
      //     {
      //       label: 'Pay Globally',
      //       href: '/international-payments',
      //       icon: '/images/header/collect-world.svg',
      //     },
      //   ],
      // },
    ],
  },
  links: [
    {
      label: 'Company',
      href: '/company',
      hasDropdown: true,
      items: [
        {
          label: 'About Us',
          href: '/about-us',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 17.5C15 15.7319 14.2976 14.0362 13.0474 12.786C11.7971 11.5357 10.1014 10.8333 8.33332 10.8333M8.33332 10.8333C6.56521 10.8333 4.86952 11.5357 3.61928 12.786C2.36904 14.0362 1.66666 15.7319 1.66666 17.5M8.33332 10.8333C10.6345 10.8333 12.5 8.96785 12.5 6.66667C12.5 4.36548 10.6345 2.5 8.33332 2.5C6.03214 2.5 4.16666 4.36548 4.16666 6.66667C4.16666 8.96785 6.03214 10.8333 8.33332 10.8333ZM18.3333 16.6667C18.3333 13.8583 16.6667 11.25 15 10C15.5478 9.58897 15.9859 9.04924 16.2755 8.42856C16.565 7.80788 16.6971 7.12539 16.66 6.4415C16.6229 5.75761 16.4178 5.0934 16.0629 4.50767C15.7079 3.92193 15.2141 3.43272 14.625 3.08333" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          label: 'Vision & Mission',
          href: '/vision-mission',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.16666 11.6667H10.8333C11.2754 11.6667 11.6993 11.4911 12.0118 11.1785C12.3244 10.866 12.5 10.442 12.5 10C12.5 9.55797 12.3244 9.13405 12.0118 8.82149C11.6993 8.50893 11.2754 8.33333 10.8333 8.33333H8.33332C7.83332 8.33333 7.41666 8.5 7.16666 8.83333L2.49999 13.3333M5.83332 16.6667L7.16666 15.5C7.41666 15.1667 7.83332 15 8.33332 15H11.6667C12.5833 15 13.4167 14.6667 14 14L17.8333 10.3333C18.1549 10.0294 18.3426 9.61025 18.3551 9.16798C18.3676 8.7257 18.2039 8.29658 17.9 7.975C17.5961 7.65343 17.1769 7.46574 16.7346 7.45324C16.2924 7.44074 15.8632 7.60444 15.5417 7.90833L12.0417 11.1583M1.66666 12.5L6.66666 17.5M16.25 7.08333C16.8333 6.5 17.5 5.75 17.5 4.83333C17.5582 4.32411 17.4428 3.81013 17.1724 3.3747C16.9021 2.93927 16.4926 2.6079 16.0103 2.43429C15.5281 2.26068 15.0013 2.255 14.5154 2.41818C14.0296 2.58136 13.613 2.90383 13.3333 3.33333C13.0358 2.93715 12.6192 2.64677 12.1445 2.50482C11.6699 2.36287 11.1622 2.37682 10.6961 2.54464C10.2299 2.71245 9.82984 3.02528 9.55458 3.4372C9.27931 3.84913 9.14335 4.33845 9.16666 4.83333C9.16666 5.83333 9.83332 6.5 10.4167 7.16667L13.3333 10L16.25 7.08333Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          label: 'Careers',
          href: '/careers',
          icon: `<img src="/images/header/careers-icon.png" alt="" width="24" height="24" />`,
        },
        // { label: 'Corporate information', href: '/corporate-information' },
      ],
    },
    {
      label: 'Products',
      href: '/products',
      hasDropdown: true,
      type: 'productsMega',
    },
    {
      label: 'Media',
      href: '/media',
      hasDropdown: true,
      items: [
        {
          label: 'Blogs',
          href: '/blog',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          label: 'Newsroom',
          href: '/news-room',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 20v-8h-6M7 8h1M7 12h6M7 16h6" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        },
        {
          label: 'Events & Conferences',
          href: '/events',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="black" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="black" stroke-width="1.5" stroke-linecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="black" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        },
      ],
    },
  ],
  appStoreLinks: {
    appStore: '#', // Replace with actual App Store link
    googlePlay: '#', // Replace with actual Google Play link
  },
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})
  const [hoveredItem, setHoveredItem] = useState(null)
  const [hoveredProductGroup, setHoveredProductGroup] = useState(null)
  const [hasMounted, setHasMounted] = useState(false)
  const { isMobile, isTablet } = useResponsive()
  const pathname = usePathname()
  const headerRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef('up')

  // Initial subtle fade/slide in on mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Hide on scroll down, show on scroll up (after 100px)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current
      const headerEl = headerRef.current
      if (!headerEl) {
        lastScrollY.current = currentY
        return
      }

      // Close any open desktop dropdown once the user starts scrolling
      if (Math.abs(delta) > 4) {
        setOpenDropdowns({})
        setHoveredItem(null)
        setHoveredProductGroup(null)
      }

      if (currentY > 100 && delta > 0) {
        // scrolling down past threshold
        scrollDirection.current = 'down'
        headerEl.classList.add('header--hide')
        headerEl.classList.remove('header--show')
      } else if (delta < 0) {
        // scrolling up
        scrollDirection.current = 'up'
        headerEl.classList.add('header--show')
        headerEl.classList.remove('header--hide')
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !headerRef.current?.contains(event.target)
      ) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.body.classList.add('scrollBlock')
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.body.classList.remove('scrollBlock')
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.classList.remove('scrollBlock')
    }
  }, [mobileMenuOpen])

  // Close dropdowns when clicking outside (desktop)
  useEffect(() => {
    if (isMobile || isTablet) return

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdowns({})
        setHoveredItem(null)
        setHoveredProductGroup(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, isTablet])

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
    setOpenDropdowns({})
    setHoveredProductGroup(null)
  }, [])

  // Toggle dropdown (mobile)
  const toggleDropdown = useCallback((linkLabel) => {
    setOpenDropdowns((prev) => {
      const isCurrentlyOpen = prev[linkLabel]
      return isCurrentlyOpen ? {} : { [linkLabel]: true }
    })
    setHoveredProductGroup(null)
  }, [])

  // Handle desktop dropdown hover
  const handleMouseEnter = useCallback((linkLabel) => {
    // no-op on desktop — dropdowns open via click only
  }, [])

  const handleMouseLeave = useCallback(() => {
    // no-op on desktop — dropdowns close via click-outside only
  }, [])

  // Handle navigation click (close mobile menu)
  const handleNavClick = useCallback(() => {
    setOpenDropdowns({})
    setHoveredItem(null)
    setHoveredProductGroup(null)
    if (isMobile || isTablet) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, isTablet])

  // Check if path is active
  const isActivePath = useCallback(
    (href) => {
      if (href === '/') {
        return pathname === '/'
      }
      return pathname?.startsWith(href)
    },
    [pathname]
  )

  // Render logo
  const renderLogo = useMemo(() => {
    return (
      <Link href={navigationData.logo.href} className="header__logo" onClick={handleNavClick}>
        <span className="header__logo-text">
          <Image width={98} height={61} src="/images/common/logo.png" alt="" />
        </span>
      </Link>
    )
  }, [handleNavClick])

  // Render navigation links
  const renderNavLinks = useCallback(
    (isMobile = false) => {
      return navigationData.links.map((link) => {
        const isOpen = openDropdowns[link.label]
        const isActive = isActivePath(link.href)
        const isProductsMega = link.type === 'productsMega'
        const dropdownActiveClass = isActive && !isProductsMega ? 'is-active' : ''
        const productsGroups = navigationData.productsMega?.groups ?? []

        return (
          <div
            key={link.label}
            className={`header__nav-item ${isOpen ? 'is-open' : ''} ${isActive ? 'is-active' : ''} ${link.label === 'Products' ? 'header__nav-item--products' : ''}`}
            onMouseEnter={() => handleMouseEnter(link.label)}
            onMouseLeave={handleMouseLeave}
            data-nav-item={link.label.toLowerCase()}
          >
            {link.hasDropdown ? (
              <>
                <button
                  className={`header__nav-link header__nav-link--dropdown ${isOpen ? 'is-open' : ''} ${dropdownActiveClass}`}
                  onClick={() => toggleDropdown(link.label)}
                  onFocus={() => handleMouseEnter(link.label)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <span>{link.label}</span>
                  <Icon
                    icon="mdi:chevron-down"
                    className="header__nav-chevron"
                  />
                </button>
                {isOpen && (
                  <>
                    {isProductsMega ? (
                      <div className={`header__dropdown header__dropdown--products-mega ${isMobile ? 'header__dropdown--mobile' : ''}`}>
                        {/* Desktop flat two-column layout */}
                        {!isMobile && !isTablet ? (
                          <div className="header__dropdown--products-flat" role="menu" aria-label="Products menu">
                            {productsGroups.map((group) => {
                              const [flagshipItem, ...restItems] = group.items ?? []
                              const isExpanded = hoveredProductGroup === group.id
                              return (
                                <div
                                  key={group.id}
                                  className={`header__products-column ${isExpanded ? 'is-expanded' : ''}`}
                                  onMouseEnter={() => setHoveredProductGroup(group.id)}
                                  onMouseLeave={() => setHoveredProductGroup(null)}
                                >
                                  <div className="header__products-group-label">{group.label}</div>
                                  {flagshipItem && (
                                    <Link
                                      href={flagshipItem.href}
                                      className={`header__products-mega-item ${isActivePath(flagshipItem.href) ? 'is-active' : ''}`}
                                      onClick={handleNavClick}
                                    >
                                      <span className="header__products-mega-item-icon" aria-hidden="true">
                                        <Image src={flagshipItem.icon} alt="" width={22} height={22} />
                                      </span>
                                      <span className="header__products-mega-item-label">{flagshipItem.label}</span>
                                    </Link>
                                  )}
                                  {restItems.length > 0 && (
                                    <ul className="header__products-pointer-list">
                                      {restItems.map((item) => {
                                        const itemIsActive = isActivePath(item.href)
                                        return (
                                          <li key={item.label}>
                                            <Link
                                              href={item.href}
                                              className={`header__products-pointer-item ${itemIsActive ? 'is-active' : ''}`}
                                              onClick={handleNavClick}
                                            >
                                              {item.label}
                                            </Link>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          /* Mobile sectioned list */
                          <div className="header__products-mobile" aria-label="Products menu">
                            {productsGroups.map((group) => (
                              <div key={group.id} className="header__products-mobile-group">
                                <div className="header__products-mobile-group-title">{group.label}</div>
                                <div className="header__products-mobile-items">
                                  {(group.items ?? []).map((item) => {
                                    const itemIsActive = isActivePath(item.href)
                                    if (item.target === true) {
                                      return (
                                        <a
                                          key={item.label}
                                          href={item.href}
                                          className={`header__products-mobile-item ${itemIsActive ? 'is-active' : ''}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={handleNavClick}
                                        >
                                          <span className="header__products-mobile-item-icon" aria-hidden="true">
                                            <Image src={item.icon} alt="" width={28} height={28} />
                                          </span>
                                          <span className="header__products-mobile-item-label">{item.label}</span>
                                        </a>
                                      )
                                    }

                                    return (
                                      <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`header__products-mobile-item ${itemIsActive ? 'is-active' : ''}`}
                                        onClick={handleNavClick}
                                      >
                                        <span className="header__products-mobile-item-icon" aria-hidden="true">
                                          <Image src={item.icon} alt="" width={28} height={28} />
                                        </span>
                                        <span className="header__products-mobile-item-label">{item.label}</span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`header__dropdown ${isMobile ? 'header__dropdown--mobile' : ''}`}>
                        <div className="header__dropdown-inner">
                        {link.items?.map((item) => {
                          const hasNestedItems = item.items && item.items.length > 0
                          const itemIsActive = isActivePath(item.href)

                          // Enable target _blank and rel for the Integration Methods link only
                          if (item.target === true) {
                            return (
                              <div key={item.label} className="header__dropdown-item">
                                <a
                                  href={item.href}
                                  className={`header__dropdown-link ${itemIsActive ? 'is-active' : ''}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={handleNavClick}
                                >
                                  {item.icon && <span className="header__dropdown-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />}
                                  <span>{item.label}</span>
                                </a>
                              </div>
                            )
                          }

                          return (
                            <div
                              key={item.label}
                              className="header__dropdown-item"
                              onMouseEnter={() => {
                                if (!isMobile && !isTablet && hasNestedItems) {
                                  setOpenDropdowns((prev) => ({ ...prev, [item.label]: true }))
                                }
                              }}
                              onMouseLeave={() => {
                                if (!isMobile && !isTablet && hasNestedItems) {
                                  setOpenDropdowns((prev) => {
                                    const newState = { ...prev }
                                    delete newState[item.label]
                                    return newState
                                  })
                                }
                              }}
                            >
                              {hasNestedItems ? (
                                <>
                                  <button
                                    className={`header__dropdown-link ${itemIsActive ? 'is-active' : ''} ${openDropdowns[item.label] ? 'is-open' : ''}`}
                                    onClick={() => (isMobile || isTablet ? toggleDropdown(item.label) : null)}
                                    aria-expanded={openDropdowns[item.label]}
                                  >
                                    <span>{item.label}</span>
                                    <Icon
                                      icon="mdi:chevron-right"
                                      className="header__dropdown-chevron"
                                    />
                                  </button>
                                  {openDropdowns[item.label] && item.items && (
                                    <div
                                      className={`header__dropdown-nested ${isMobile || isTablet ? 'header__dropdown-nested--mobile' : ''}`}
                                      onMouseEnter={() => {
                                        if (!isMobile && !isTablet && hasNestedItems) {
                                          setOpenDropdowns((prev) => ({ ...prev, [item.label]: true }))
                                        }
                                      }}
                                      onMouseLeave={() => {
                                        if (!isMobile && !isTablet && hasNestedItems) {
                                          setOpenDropdowns((prev) => {
                                            const newState = { ...prev }
                                            delete newState[item.label]
                                            return newState
                                          })
                                        }
                                      }}
                                    >
                                      {item.items.map((nestedItem) => (
                                        <Link
                                          key={nestedItem.label}
                                          href={nestedItem.href}
                                          className={`header__dropdown-link ${
                                            isActivePath(nestedItem.href) ? 'is-active' : ''
                                          }`}
                                          onClick={handleNavClick}
                                        >
                                          <span>{nestedItem.label}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={`header__dropdown-link ${itemIsActive ? 'is-active' : ''}`}
                                  onClick={handleNavClick}
                                >
                                  {item.icon && <span className="header__dropdown-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />}
                                  <span>{item.label}</span>
                                </Link>
                              )}
                            </div>
                          )
                        })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                className={`header__nav-link ${isActive ? 'is-active' : ''}`}
                onClick={handleNavClick}
              >
                <span>{link.label}</span>
              </Link>
            )}
          </div>
        )
      })
    },
    [
      openDropdowns,
      hoveredProductGroup,
      isActivePath,
      isTablet,
      handleMouseEnter,
      handleMouseLeave,
      toggleDropdown,
      handleNavClick,
    ]
  )

  // Render app store buttons
  const renderAppStoreButtons = useMemo(() => {
    return (
      <div className="header__app-store">
        <Link href="/contact-us" className="header__contact-cta" onClick={handleNavClick}>
          Contact Us
        </Link>
      </div>
    )
  }, [handleNavClick])

  return (
    <header
      ref={headerRef}
      className={`header ${hasMounted ? 'header--enter' : ''}`}
    >
      <div className="header__container">
        {/* Logo */}
        {renderLogo}

        {/* Desktop Navigation */}
        <nav className="header__nav header__nav--desktop" aria-label="Main navigation">
          {renderNavLinks(false)}
        </nav>

        {/* App Store Buttons - Desktop */}
        <div className="header__app-store--desktop">{renderAppStoreButtons}</div>

        {/* Mobile Menu Toggle */}
        <button
          className={`header__mobile-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <div className="hamburger__wrap" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="header__mobile-overlay"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        ref={mobileMenuRef}
        className={`header__mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="header__nav header__nav--mobile" aria-label="Main navigation">
          {renderNavLinks(true)}
        </nav>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
