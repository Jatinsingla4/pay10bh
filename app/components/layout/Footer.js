'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../../contexts/ResponsiveContext'
import '@/styles/components/_footer.scss'

const footerData = {
  logo: {
    src: '/images/common/logo.png',
    alt: 'Pay10',
    href: '/',
  },
  navigation: {
    company: {
      label: 'Company',
      items: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Vision & Mission', href: '/vision-mission' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    products: {
      label: 'Products',
      items: [
        {
          label: 'Customer Solution',
          subItems: [
            { label: 'Pay10 UAE', href: '/pay10-uae-app' },
            { label: 'Bill Payment', href: '/bill-payment' },
            { label: 'Send Abroad', href: '/send-abroad' },
            { label: 'Pay10 Card', href: '/pay10-card' },
            { label: 'Open Finance Al Tareq', href: '/open-finance-altareq' },
          ],
        },
        {
          label: 'Business Solutions',
          subItems: [
            { label: 'Pay10 Biz UAE', href: '/pay10-biz-uae-app' },
            { label: 'Merchant Portal', href: '/merchant-portal' },
            { label: 'Payment Gateways', href: '/payment-gateway' },
            { label: 'POS Devices', href: '/pos-devices' },
            { label: 'WPS & Payroll', href: '/wps-payroll' },
            { label: 'Channel Partners', href: '/channel-partners' },
          ],
        },
      ],
    },
    legal: {
      label: 'Legal',
      items: [
        { label: 'Terms of Services', href: '/terms-of-service' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Key Facts Statement', href: '/key-fact-statement' },
        { label: 'Schedule of Charges', href: '/coming-soon' },
        { 
          label: 'FAQ', 
          href: '/faqs',
          subItems: [
            { label: 'General', href: '/faqs?category=General' },
            { label: 'Pay10 App', href: '/faqs?category=Pay10+App' },
            { label: 'Pay10 Biz App', href: '/faqs?category=Pay10+Biz+App' },
          ]
        },
        { label: 'Al Tareq FAQ', href: '/faq-altareq' },
      ],
    },
    resources: {
      label: 'Resources',
      items: [
        {
          label: 'Brand Guidelines',
          href: 'https://pay10.bh/wp-content/uploads/2026/05/Pay10-Ext-Brandguidelines-21-May-2026.pdf',
          external: true,
        },
        {
          label: 'App & Web Button Guidelines',
          href: 'https://pay10.bh/wp-content/uploads/2026/06/Product-Approved_2June2026_Pay10-UAE_Button-Designs-April-20-RGB_Including-QR_07.pdf',
          external: true,
        },
        {
          label: 'DQR Device User Manual',
          href: '/docs/dqr-device-user-manual.pdf',
          external: true,
        },
      ],
    },
    contact: {
      label: 'Contact',
      href: '/contact-us',
      items: [],
    },
  },
  socialMedia: {
    linkedin: 'https://www.linkedin.com/company/pay-10-bahrain',
    instagram: 'https://www.instagram.com/pay10bh/',
    facebook: 'https://www.facebook.com/profile.php?id=61589661046056',
    youtube: 'https://www.youtube.com/@Pay10UAE',
  },
}

const Footer = () => {
  const [openSections, setOpenSections] = useState({})
  const { isMobile, isTablet } = useResponsive()

  const toggleSection = useCallback((sectionKey) => {
    if (isMobile || isTablet) {
      setOpenSections((prev) => ({
        ...prev,
        [sectionKey]: !prev[sectionKey],
      }))
    }
  }, [isMobile, isTablet])

  const renderNavLinks = () => {
    const { navigation } = footerData

    return (
      <>
        {/* Company Column */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('company')}
                aria-expanded={openSections.company}
              >
                <span>{navigation.company.label}</span>
                <Icon
                  icon={openSections.company ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.company && (
                <div className="footer__nav-subitems">
                  {navigation.company.items.map((item) => (
                    <Link key={item.label} href={item.href} className="footer__nav-sublink">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.company.label}</div>
              <div className="footer__nav-subitems">
                {navigation.company.items.map((item) => (
                  <Link key={item.label} href={item.href} className="footer__nav-sublink">
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Products Column */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('products')}
                aria-expanded={openSections.products}
              >
                <span>{navigation.products.label}</span>
                <Icon
                  icon={openSections.products ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.products && (
                <div className="footer__nav-subitems">
                  {navigation.products.items.map((item) => (
                    <div key={item.label} className="footer__nav-subitem">
                      <span className="footer__nav-sublink">{item.label}</span>
                      {item.subItems && (
                        <div className="footer__nav-subsubitems">
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.label} href={subItem.href} className="footer__nav-subsublink">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.products.label}</div>
              <div className="footer__nav-subitems">
                {navigation.products.items.map((item) => (
                  <div key={item.label} className="footer__nav-subitem">
                    <span className="footer__nav-sublink">{item.label}</span>
                    {item.subItems && (
                      <div className="footer__nav-subsubitems" style={{ marginTop: '0.25rem' }}>
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.label} href={subItem.href} className="footer__nav-subsublink">
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Legal Column */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('legal')}
                aria-expanded={openSections.legal}
              >
                <span>{navigation.legal.label}</span>
                <Icon
                  icon={openSections.legal ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.legal && (
                <div className="footer__nav-subitems">
                  {navigation.legal.items.map((item) => (
                    <div key={item.label} className="footer__nav-subitem" style={{ marginBottom: item.subItems ? '0.5rem' : '0' }}>
                      <Link href={item.href} className="footer__nav-sublink">
                        {item.label}
                      </Link>
                      {item.subItems && (
                        <div className="footer__nav-subsubitems" style={{ marginTop: '0.25rem' }}>
                          {item.subItems.map((subItem) => (
                            <Link key={subItem.label} href={subItem.href} className="footer__nav-subsublink">
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.legal.label}</div>
              <div className="footer__nav-subitems">
                {navigation.legal.items.map((item) => (
                  <div key={item.label} className="footer__nav-subitem" style={{ marginBottom: item.subItems ? '0.5rem' : '0' }}>
                    <Link href={item.href} className="footer__nav-sublink">
                      {item.label}
                    </Link>
                    {item.subItems && (
                      <div className="footer__nav-subsubitems" style={{ marginTop: '0.25rem' }}>
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.label} href={subItem.href} className="footer__nav-subsublink">
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Resources Column */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <>
              <button
                className="footer__nav-link footer__nav-link--accordion"
                onClick={() => toggleSection('resources')}
                aria-expanded={openSections.resources}
              >
                <span>{navigation.resources.label}</span>
                <Icon
                  icon={openSections.resources ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                  className="footer__nav-chevron"
                />
              </button>
              {openSections.resources && (
                <div className="footer__nav-subitems">
                  {navigation.resources.items.map((item) => (
                    item.external ? (
                      <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="footer__nav-sublink">
                        {item.label}
                      </a>
                    ) : (
                      <Link key={item.label} href={item.href} className="footer__nav-sublink">
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="footer__nav-heading">{navigation.resources.label}</div>
              <div className="footer__nav-subitems">
                {navigation.resources.items.map((item) => (
                  item.external ? (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="footer__nav-sublink">
                      {item.label}
                    </a>
                  ) : (
                    <Link key={item.label} href={item.href} className="footer__nav-sublink">
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </>
          )}
        </div>

        {/* Contact Column */}
        <div className="footer__nav-item">
          {isMobile || isTablet ? (
            <Link href={navigation.contact.href} className="footer__nav-link footer__nav-link--accordion">
              <span>{navigation.contact.label}</span>
            </Link>
          ) : (
            <Link href={navigation.contact.href} className="footer__nav-heading">
              {navigation.contact.label}
            </Link>
          )}
        </div>

      </>
    )
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo */}
        <div className="footer__logo">
          <Link href={footerData.logo.href}>
            <Image className="footer__logo-img" width={98} height={61} src={footerData.logo.src} alt={footerData.logo.alt} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="footer__nav footer__nav--desktop" aria-label="Footer navigation">
          {renderNavLinks()}
        </nav>

        {/* Mobile Navigation */}
        <nav className="footer__nav footer__nav--mobile" aria-label="Footer navigation">
          {renderNavLinks()}
        </nav>

        {/* Social Media - Desktop */}
        <div className="footer__actions footer__actions--desktop">
          <div className="footer__social">
            <a href={footerData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
              <Icon icon="mdi:linkedin" className="footer__social-icon" />
            </a>
            <a href={footerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <Icon icon="mdi:instagram" className="footer__social-icon" />
            </a>
            <a href={footerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
              <Icon icon="mdi:facebook" className="footer__social-icon" />
            </a>
            <a href={footerData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="YouTube">
              <Icon icon="mdi:youtube" className="footer__social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <div className="footer__address footer__address--en" style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left', color: '#ffffff', fontSize: '0.85rem' }}>
            <span>Copyright © 2026</span>
            <span>PAYTEN B.S.C. (Closed) is licensed by the Central Bank of Bahrain, Office No. 2202, Building No. 1398, Road No. 4626,</span>
            <span>Block No. 346, Manama, Kingdom of Bahrain</span>
          </div>
        </div>
      </div>

      {/* Social Media - Mobile */}
      <div className="footer__actions footer__actions--mobile">
        <div className="footer__social">
          <a href={footerData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
            <Icon icon="mdi:linkedin" className="footer__social-icon" />
          </a>
          <a href={footerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
            <Icon icon="mdi:instagram" className="footer__social-icon" />
          </a>
          <a href={footerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
            <Icon icon="mdi:facebook" className="footer__social-icon" />
          </a>
          <a href={footerData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="YouTube">
            <Icon icon="mdi:youtube" className="footer__social-icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
