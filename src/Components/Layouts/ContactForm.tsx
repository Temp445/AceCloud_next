'use client'

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ContactForm.css";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendWhatsappMessage } from "../../services/whatsapp/whatsappService";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').map((p) => p.trim()) || [];

function ContactForm() {

  const [loading, setLoading] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | null>(null);


  const form = useRef<HTMLFormElement | null>(null);

  const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch('/api/proxy-validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) return 'Email validation failed. Try again.';

      const result = await response.json();
      return result.isValid ? '' : 'Please enter a valid email address.';
    } catch (err) {
      console.error('Email validation error:', err);
      return 'Email validation service unavailable.';
    }
  };

  const handleEmailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value.trim();
    setEmail(emailInput);
    const error = await validateEmail(emailInput);
    setEmailError(error);
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError('');
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    } else {
      setPhoneError('');
    }

    const checkedProducts = Array.from(formCurrent.querySelectorAll<HTMLInputElement>('input[name="product"]:checked'));
    if (checkedProducts.length === 0) {
      setCheckboxError(true);
      return;
    } else {
      setCheckboxError(false);
    }

    const formData = {
      name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      company: formCurrent['company']?.value || '',
      email,
      number: phone,
      location: formCurrent['location']?.value || '',
      queries: formCurrent['queries']?.value || '',
      product: checkedProducts.map((p) => p.value).join(', '),
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      alert('Your message has been sent successfully!');
      formCurrent.reset();
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('There was an issue sending your message. Please try again later.');
    } finally {
      setLoading(false);
    }

    const phoneWithoutPlus = phone.replace(/^\+/, '');
 
    try {
      await sendWhatsappMessage(
        'enquiry_ace_cloud',
        {
          fullName: formData.name,
          companyName: formData.company,
          businessEmail: formData.email,
          mobileNumber: phoneWithoutPlus,
          location: formData.location,
          message: formData.queries,
        },
        adminPhones,
      );

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.name,
          product: formData.product,
          siteUrl: 'https://acesoft.in',
          imageUrl:
            'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        [phoneWithoutPlus],
      );
    } catch (error) {
      console.error('WhatsApp sending error:', error);
    }
  };

  return (
    <>
      <div className="heading" id="talk-to-us">
        <div className="our-clients-container">
          <div className="our-clients-box">
            <h2 className="our-clients-title">
              <span>Talk </span> to Us
            </h2>
            <div className="corner-decoration left-bottom"></div>
            <div className="corner-decoration right-top"></div>
          </div>
        </div>
      </div>

      <div className="form-container">
        <Form ref={form}  onSubmit={handleSubmit} className="container flex-column border p-5 w-95 contact-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name :</Form.Label>
            <Form.Control type="text" placeholder="Name" name="Name" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCompany">
            <Form.Label>Company Name : </Form.Label>
            <Form.Control type="text" placeholder="Company Name" name="company" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Business Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Business Email"
              name="businessEmail"
              onChange={handleEmailChange}
              value={email}
              required
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Mobile Number :</Form.Label>
            <PhoneInput
              international
              defaultCountry="IN"
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              name="number"
              className="arrows"
              required
            />
            {phone && !isValidPhoneNumber(phone) && (
              <p style={{ color: "red", marginTop: "5px",fontSize: "12px" }}>
                Please enter a valid phone number.
              </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Your Location :</Form.Label>
            <Form.Control type="text" placeholder="Your Location" name="location" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Interested :</Form.Label>
            <div className="checkbox-group ">
              {[
                "Aceprofit Compact ERP",
                "APQP",
                "CRM",
                "Daily Work Tracker",
                "Document Management",
                "Engineering Balloon Annotator",
                "Part Codification",
                "PPAP Management",
                "Project Management",
                "React Component Playground",
                "Sales",
                "VB6 to React Component",
              ].map(product => (
                <label key={product}>
                  <input type="checkbox" name="product" value={product} className="large-checkbox" /> <span>{product}</span>
                </label>
              ))}
            </div>
            {checkboxError && (
              <p style={{ color: "red" }}>Please select at least one product.</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" name="queries" placeholder="" style={{ height: "120px" }} required />
          </Form.Group>

          <Button className="submit" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ContactForm;
function setPhoneError(arg0: string) {
  throw new Error("Function not implemented.");
}

