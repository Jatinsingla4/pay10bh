"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Style from "./contact.module.scss";
import { Icon } from "@iconify/react";
import { sanitizeHtml, isEmptyHtml } from "../lib/sanitizeHtml";

// Hardcoded Google Maps embed URL
const MAP_EMBED_URL = "https://www.google.com/maps?q=Bahrain%20Financial%20Harbour%2C%20Harbour%20Tower%20East%2C%20Manama%2C%20Bahrain&output=embed";

// Static office data
const STATIC_OFFICES = {
  "manama-bahrain": {
    name: "Manama, Bahrain",
    address: "Harbour Tower East, Bahrain Financial Harbour, Manama, Kingdom of Bahrain",
    map: MAP_EMBED_URL,
  },
};

const CustomSelect = ({ options, value, onChange, placeholder, name, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className={Style.customSelectWrapper} ref={wrapperRef}>
      <div 
        className={`${Style.formInput} ${Style.customSelectTrigger} ${error ? Style.formInputError : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? Style.customSelectValue : Style.customSelectPlaceholder}>
          {value ? options.find(o => o.value === value)?.label || value : placeholder}
        </span>
        <Icon icon="mdi:chevron-down" className={`${Style.customSelectIcon} ${isOpen ? Style.customSelectIconOpen : ""}`} />
      </div>
      {isOpen && (
        <ul className={Style.customSelectMenu}>
          {options.map((option, idx) => (
            <li 
              key={idx} 
              className={`${Style.customSelectOption} ${value === option.value ? Style.customSelectOptionActive : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const VALID_FORM_TYPES = ["General Inquiry", "SME Sales", "Enterprise Sales", "Channel Partner"];

const ContactClient = ({ pageData = null }) => {
  const searchParams = useSearchParams();
  const [activeFormType, setActiveFormType] = useState(() => {
    const type = searchParams.get("type");
    return VALID_FORM_TYPES.includes(type) ? type : "General Inquiry";
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Form state holding all possible fields across 4 forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company_name: "",
    message: "",
    position: "",
    location: "",
    industry: "",
    company_size: "",
    country: "",
    emirate: "",
    company_website: "",
    partnership_model: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);
  const [formSubmitMessage, setFormSubmitMessage] = useState("");

  const handleTabChange = (type) => {
    setActiveFormType(type);
    setFormErrors({});
    setFormSubmitStatus(null);
    setFormSubmitMessage("");
    // We optionally keep formData intact or reset it. Keeping it prevents losing data on misclick.
  };

  // Form validation functions
  const validateName = (name) => {
    if (!name || name.trim() === "") return "Name is required";
    if (/\d/.test(name)) return "Name should not contain numbers";
    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const submitContactForm = async (mobileValue) => {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: mobileValue.trim(),
      company: activeFormType !== "Channel Partner" ? formData.company_name.trim() : "",
      message: formData.message?.trim() || "",
      type: activeFormType.toLowerCase(),
    };

    if (activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") {
      payload.position = formData.position.trim();
      payload.location = formData.location.trim();
      payload.industry = formData.industry.trim();
    }

    if (activeFormType === "Enterprise Sales") {
      payload.company_size = formData.company_size;
    }

    if (activeFormType === "Channel Partner") {
      payload.country = formData.country.trim();
      payload.emirate = formData.emirate.trim();
      payload.company_website = formData.company_website.trim();
      payload.partnership_model = formData.partnership_model;
    }

    const response = await fetch("/api/proxy/contact/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await response.json()
      : { status: false, message: await response.text() };

    return { response, result };
  };

  const validateForm = () => {
    const errors = {};

    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    if (!formData.mobile || formData.mobile.trim() === "") {
      errors.mobile = "Mobile number is required";
    }

    if (activeFormType !== "Channel Partner") {
      if (!formData.company_name || formData.company_name.trim() === "") {
        errors.company_name = "Company name is required";
      }
    }

    if (activeFormType === "General Inquiry") {
      if (!formData.message || formData.message.trim() === "") {
        errors.message = "Message is required";
      }
    }

    if (activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") {
      if (!formData.position.trim()) errors.position = "Position is required";
      if (!formData.location.trim()) errors.location = "Location is required";
      if (!formData.industry.trim()) errors.industry = "Industry is required";
    }

    if (activeFormType === "Enterprise Sales") {
      if (!formData.company_size) errors.company_size = "Please select company size";
    }

    if (activeFormType === "Channel Partner") {
      if (!formData.country.trim()) errors.country = "Country is required";
      if (!formData.emirate.trim()) errors.emirate = "Emirate/Locality is required";
      if (!formData.company_website.trim()) errors.company_website = "Website is required";
      if (!formData.partnership_model) errors.partnership_model = "Please select a partnership model";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "mobile") {
      value = value.replace(/[^\d+]/g, "");
      if (value.indexOf("+") > 0) value = value.replace(/\+/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
    if (formSubmitStatus) {
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
    }
  };

  const handleMobileKeyDown = (e) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (e.key === "+" && e.target.selectionStart === 0 && !formData.mobile.startsWith("+")) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Just return, validateForm() already sets individual field errors.
      // We clear any existing global submit messages so they don't linger.
      setFormSubmitStatus(null);
      setFormSubmitMessage("");
      return;
    }

    setFormSubmitting(true);
    setFormSubmitStatus(null);
    setFormSubmitMessage("");

    try {
      let { response, result } = await submitContactForm(formData.mobile);

      if (!result?.success && /^800\d{5}$/.test(formData.mobile.trim()) && (result?.errors?.phone || "").toLowerCase().includes("invalid")) {
        ({ response, result } = await submitContactForm(`971${formData.mobile.trim()}`));
      }

      if (response.ok) {
        setFormSubmitStatus("success");
        setFormSubmitMessage(result?.message || "Thank you! We'll be in touch soon.");
        setFormData({
          name: "", email: "", mobile: "", company_name: "", message: "",
          position: "", location: "", industry: "", company_size: "",
          country: "", emirate: "", company_website: "", partnership_model: "",
        });
        setFormErrors({});
      } else {
        setFormSubmitStatus("error");
        setFormSubmitMessage(result?.message || "Failed to submit form. Please try again.");
        if (result?.errors && typeof result.errors === "object") {
          const mapped = Array.isArray(result.errors)
            ? result.errors.reduce((acc, e) => { if (e.field) acc[e.field] = e.message; return acc; }, {})
            : { ...result.errors };
          if (mapped.phone) { mapped.mobile = mapped.phone; delete mapped.phone; }
          setFormErrors((prev) => ({ ...prev, ...mapped }));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormSubmitStatus("error");
      setFormSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const getContactEmail = () => {
    switch (activeFormType) {
      case "SME Sales": return "sales@pay10.bh";
      case "Enterprise Sales": return "enterprisesales@pay10.bh";
      case "Channel Partner": return "channelpartners@pay10.bh";
      default: return "info@pay10.bh";
    }
  };

  const getButtonText = () => {
    switch (activeFormType) {
      case "SME Sales":
      case "Enterprise Sales": return "Send Business Inquiry";
      case "Channel Partner": return "Submit Request";
      default: return "Send Inquiry";
    }
  };

  return (
    <>
      <main>
        {/* Hero Banner */}
        <section
          className={Style.heroBanner}
          style={{
            '--bg-desktop': pageData?.banner_image ? `url(${pageData.banner_image})` : undefined,
            '--bg-mobile': pageData?.mobile_image ? `url(${pageData.mobile_image})` : undefined,
          }}
        >
          <div className={Style.heroOverlay}></div>
          <div className={Style.heroContent}>
            {pageData?.page_title && <h1 data-animation="opacity-up">{pageData.page_title}</h1>}
            {!isEmptyHtml(pageData?.page_description) && (
              <div
                data-animation="opacity-up"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_description) }}
              />
            )}
          </div>
        </section>

        {/* Info Cards Section */}
        <section className={Style.infoCardsSection}>
          <div className={Style.infoCardsGrid}>
            {pageData?.contact_cards?.length > 0 ? (
              pageData.contact_cards.map((card, idx) => {
                const getCardIcon = (title) => {
                  const t = (title || "").toLowerCase();
                  if (t.includes("customer")) return "mdi:headphones";
                  if (t.includes("merchant support")) return "mdi:storefront";
                  if (t.includes("sme")) return "mdi:briefcase";
                  if (t.includes("enterprise")) return "mdi:office-building";
                  if (t.includes("channel")) return "mdi:handshake";
                  if (t.includes("media") || t.includes("pr")) return "mdi:microphone";
                  if (t.includes("marketing") || t.includes("event")) return "mdi:bullhorn";
                  return "mdi:information-variant";
                };

                return (
                  <div
                    key={idx}
                    className={Style.infoCard}
                    data-animation="opacity-up"
                    data-anim-delay={idx * 50}
                  >
                    <div className={Style.infoCardIcon}>
                      {card.icon ? (
                        <img src={card.icon} alt={card.title} style={{ width: "24px", height: "24px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                      ) : (
                        <Icon icon={getCardIcon(card.title)} />
                      )}
                    </div>
                    {card.title && <h3>{card.title}</h3>}
                    {!isEmptyHtml(card.content) && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.content) }} />}
                  </div>
                );
              })
            ) : null}
          </div>
        </section>

        {/* Map Section */}
        <section className={Style.mapSection} data-animation="opacity">
          <iframe
            src={STATIC_OFFICES["manama-bahrain"].map}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pay10 Location Map"
          ></iframe>
        </section>

        {/* Contact Form Section */}
        <section className={Style.formSection}>
          <div className={Style.formInner}>
            {/* Left: Info */}
            <div className={Style.formLeft}>
              <span className={Style.formLeftLabel} data-animation="opacity-up">SEND A MESSAGE</span>
              <h2 className={Style.formLeftHeading} data-animation="opacity-up" data-anim-delay="100">
                {activeFormType === "General Inquiry" ? "Reach Out to Our Team" : `Reach Out to ${activeFormType}`}
              </h2>
              <p className={Style.formLeftDesc} data-animation="opacity-up" data-anim-delay="200">
                Whether you&apos;re a business looking to integrate payments or a customer needing support, we&apos;d love to hear from you.
              </p>
              <ul className={Style.formLeftInfo} data-animation="opacity-up" data-anim-delay="300">
                {pageData?.address && (
                  <li>
                    <Icon icon="weui:location-outlined" className={Style.formLeftInfoIcon} />
                    <span>{pageData.address}</span>
                  </li>
                )}
                {pageData?.email && (
                  <li>
                    <Icon icon="ic:outline-email" className={Style.formLeftInfoIcon} />
                    <span>{getContactEmail()}</span>
                  </li>
                )}
                {pageData?.phone && (
                  <li>
                    <Icon icon="prime:mobile" className={Style.formLeftInfoIcon} />
                    <span>
                      {["SME Sales", "Enterprise Sales", "Channel Partner"].includes(activeFormType)
                        ? "800729110"
                        : pageData.phone}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Right: Form */}
            <div className={Style.formRight} data-animation="opacity-up" data-anim-delay="150">
              
              <div className={Style.formCategoryTabs} data-animation="opacity-up">
                {/* ponytail: Channel Partner tab hidden for now, remove filter to bring it back */}
                {["General Inquiry", "SME Sales", "Enterprise Sales", "Channel Partner"].filter((type) => type !== "Channel Partner").map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${Style.categoryTab} ${activeFormType === type ? Style.categoryTabActive : ""}`}
                    onClick={() => handleTabChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <form className={Style.contactForm} onSubmit={handleSubmit}>

                {/* Row 1: Name & Email */}
                <div className={Style.formRow}>
                  <div className={Style.formGroup}>
                    <input
                      type="text"
                      name="name"
                      placeholder={activeFormType === "Channel Partner" ? "Name*" : "Full Name*"}
                      className={`${Style.formInput} ${formErrors.name ? Style.formInputError : ""}`}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <span className={Style.formError}>{formErrors.name}</span>}
                  </div>
                  <div className={Style.formGroup}>
                    <input
                      type="email"
                      name="email"
                      placeholder={activeFormType === "Channel Partner" ? "Work Email*" : "Email*"}
                      className={`${Style.formInput} ${formErrors.email ? Style.formInputError : ""}`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <span className={Style.formError}>{formErrors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Mobile & conditional Company/Country */}
                <div className={Style.formRow}>
                  <div className={Style.formGroup}>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="+97312345678"
                      className={`${Style.formInput} ${formErrors.mobile ? Style.formInputError : ""}`}
                      value={formData.mobile}
                      onChange={handleInputChange}
                      onKeyDown={handleMobileKeyDown}
                      maxLength={15}
                      inputMode="numeric"
                    />
                    {formErrors.mobile && <span className={Style.formError}>{formErrors.mobile}</span>}
                  </div>
                  
                  {activeFormType !== "Channel Partner" ? (
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name*"
                        className={`${Style.formInput} ${formErrors.company_name ? Style.formInputError : ""}`}
                        value={formData.company_name}
                        onChange={handleInputChange}
                      />
                      {formErrors.company_name && <span className={Style.formError}>{formErrors.company_name}</span>}
                    </div>
                  ) : (
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country*"
                        className={`${Style.formInput} ${formErrors.country ? Style.formInputError : ""}`}
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                      {formErrors.country && <span className={Style.formError}>{formErrors.country}</span>}
                    </div>
                  )}
                </div>

                {/* Dynamic fields based on form type */}

                {/* SME & Enterprise */}
                {(activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") && (
                  <div className={Style.formRow}>
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="position"
                        placeholder="Position (Title)*"
                        className={`${Style.formInput} ${formErrors.position ? Style.formInputError : ""}`}
                        value={formData.position}
                        onChange={handleInputChange}
                      />
                      {formErrors.position && <span className={Style.formError}>{formErrors.position}</span>}
                    </div>
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="location"
                        placeholder="Location*"
                        className={`${Style.formInput} ${formErrors.location ? Style.formInputError : ""}`}
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                      {formErrors.location && <span className={Style.formError}>{formErrors.location}</span>}
                    </div>
                  </div>
                )}

                {(activeFormType === "SME Sales" || activeFormType === "Enterprise Sales") && (
                  <div className={Style.formRow}>
                    <div className={Style.formGroup}>
                      <input
                        type="text"
                        name="industry"
                        placeholder="Industry*"
                        className={`${Style.formInput} ${formErrors.industry ? Style.formInputError : ""}`}
                        value={formData.industry}
                        onChange={handleInputChange}
                      />
                      {formErrors.industry && <span className={Style.formError}>{formErrors.industry}</span>}
                    </div>
                    {activeFormType === "Enterprise Sales" && (
                      <div className={Style.formGroup}>
                        <CustomSelect
                          name="company_size"
                          value={formData.company_size}
                          onChange={handleInputChange}
                          placeholder="Company Size*"
                          error={formErrors.company_size}
                          options={[
                            { value: "0-50 Employees", label: "0-50 Employees" },
                            { value: "100-500 Employees", label: "100-500 Employees" },
                            { value: "500-5000 Employees", label: "500-5000 Employees" },
                            { value: "5000 + Employees", label: "5000 + Employees" },
                          ]}
                        />
                        {formErrors.company_size && <span className={Style.formError}>{formErrors.company_size}</span>}
                      </div>
                    )}
                  </div>
                )}

                {/* Channel Partner */}
                {activeFormType === "Channel Partner" && (
                  <>
                    <div className={Style.formRow}>
                      <div className={Style.formGroup}>
                        <input
                          type="text"
                          name="emirate"
                          placeholder="Emirate / Locality*"
                          className={`${Style.formInput} ${formErrors.emirate ? Style.formInputError : ""}`}
                          value={formData.emirate}
                          onChange={handleInputChange}
                        />
                        {formErrors.emirate && <span className={Style.formError}>{formErrors.emirate}</span>}
                      </div>
                      <div className={Style.formGroup}>
                        <input
                          type="url"
                          name="company_website"
                          placeholder="Company Website*"
                          className={`${Style.formInput} ${formErrors.company_website ? Style.formInputError : ""}`}
                          value={formData.company_website}
                          onChange={handleInputChange}
                        />
                        {formErrors.company_website && <span className={Style.formError}>{formErrors.company_website}</span>}
                      </div>
                    </div>
                    <div className={Style.formRow}>
                      <div className={`${Style.formGroup} ${Style.formGroupFull}`}>
                        <CustomSelect
                          name="partnership_model"
                          value={formData.partnership_model}
                          onChange={handleInputChange}
                          placeholder="Which partnership model you are Interested in?*"
                          error={formErrors.partnership_model}
                          options={[
                            { value: "Referral", label: "Referral" },
                            { value: "Building tech integration and solutions", label: "Building tech integration and solutions" },
                          ]}
                        />
                        {formErrors.partnership_model && <span className={Style.formError}>{formErrors.partnership_model}</span>}
                      </div>
                    </div>
                  </>
                )}

                {/* Message (General Inquiry Only) */}
                {activeFormType === "General Inquiry" && (
                  <div className={Style.formRow}>
                    <div className={`${Style.formGroup} ${Style.formGroupFull}`}>
                      <textarea
                        name="message"
                        placeholder="Inquiry Message*"
                        rows="6"
                        className={`${Style.formTextarea} ${formErrors.message ? Style.formTextareaError : ""}`}
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                      {formErrors.message && <span className={Style.formError}>{formErrors.message}</span>}
                    </div>
                  </div>
                )}

                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <button
                    type="submit"
                    className={Style.formSubmitBtn}
                    disabled={formSubmitting}
                  >
                    {formSubmitting ? "Sending..." : getButtonText()}
                  </button>
                </div>

                {formSubmitStatus === "success" && (
                  <div className={`${Style.formMessage} ${Style.formMessageSuccess}`}>
                    {formSubmitMessage}
                  </div>
                )}

                {formSubmitStatus === "error" && (
                  <div className={`${Style.formMessage} ${Style.formMessageError}`}>
                    {formSubmitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactClient;
