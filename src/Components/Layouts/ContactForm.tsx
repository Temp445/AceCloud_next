'use client'

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ContactForm.css";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendWhatsappMessage } from "../../services/whatsapp/whatsappService";


const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function BasicExample() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<string | undefined>();


 const form = useRef<HTMLFormElement | null>(null);


  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const gmailTypos = [
    'gamil.com', 'gnail.com', 'gmial.com', 'gmaill.com', 'gmail.con',
    'gmail.co', 'gmail.om', 'gmail.cim', 'gmail.cm', 'gmai.com',
    'gmail.comm', 'gmal.com', 'gmaul.com', 'gmail.xom', 'gmail.vom',
    'g.mail.com', 'gmaik.com', 'gmaio.com', 'gmali.com', 'gmali.con',
    'gmail.clm', 'gmail.coom', 'gmaiil.com', 'ggmail.com', 'gemail.com',
    'gmmail.com', 'gmiall.com', 'gmsil.com', 'gmale.com', 'gmall.com',
    'gmil.com', 'gmailc.om', 'gmailc.com', 'gmailm.com', 'gmali.cm',
    'gmalil.com', 'gmial.cm', 'gmaol.com', 'gmauk.com', 'gmaul.co',
    'gmail.ckm', 'gmail.kom', 'gmail.bom', 'gmail.dcom', 'gmaul.con', 'mail.com'
  ];

  const validateEmail = (email: string) => {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }
    const domain = email.split('@')[1]?.toLowerCase();
    if (gmailTypos.includes(domain)) {
      return 'Did you mean "gmail.com"?';
    }
    return '';
  };

  const handleEmailChange = (e: { target: { value: string; }; }) => {
    const input = e.target.value.trim();
    setEmail(input);

    const error = validateEmail(input);
    setEmailError(error);
  };

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  event.stopPropagation();

  const formCurrent = form.current;
  if (!formCurrent) {
    console.error("Form reference is null.");
    return;
  }

  const emailValidationMessage = validateEmail(email);
  if (emailValidationMessage) {
    setEmailError(emailValidationMessage);
    return;
  } else {
    setEmailError("");
  }

  if (!phone || !isValidPhoneNumber(phone)) {
    setValidated(true);
    return;
  }

  if (!formCurrent.checkValidity()) {
    setValidated(true);
    return;
  }

  const selectedCheckboxes = formCurrent.querySelectorAll(
    'input[name="Product"]:checked'
  );
  if (selectedCheckboxes.length === 0) {
    setCheckboxError(true);
    return;
  } else {
    setCheckboxError(false);
  }

  setLoading(true);

  const formData = {
    fullName: (formCurrent['fullName'] as HTMLInputElement)?.value || '',
    companyName: (formCurrent['companyName'] as HTMLInputElement)?.value || '',
    businessEmail: email,
    mobileNumber: phone,
    location: (formCurrent['location'] as HTMLInputElement)?.value || '',
    message: (formCurrent['message'] as HTMLTextAreaElement)?.value || '',
    Product: Array.from(selectedCheckboxes)
      .map(input => (input as HTMLInputElement).value)
      .join(', ')
  };

  emailjs.send(service_ID!, template_ID!, formData, publicKey)
    .then(
      (response) => {
        console.log("Email sent successfully!", response);
        alert("Your message has been sent successfully!");
        formCurrent.reset();
        setValidated(false);
        setEmail('');
        setPhone('');
      },
      (error) => {
        console.error("Email sending failed:", error);
        alert("There was an issue sending your message. Please try again later.");
      }
    )
    .finally(() => setLoading(false));



         const rawNumbers = process.env.NEXT_PUBLIC_ADMIN_PHONES;
        const phoneNumbers = rawNumbers?.split(',').map(num => num.trim()) ?? [];

      const phoneWithoutPlus = phone.replace(/^\+/, '');

         // Whatsapp message generation
        sendWhatsappMessage(
            "enquiry_ace_cloud",
            {
                fullName: formData.fullName,
                companyName: formData.companyName,
                businessEmail: formData.businessEmail,
                mobileNumber: phoneWithoutPlus,
                location: formData.location,
                message: formData.message,
            },
            phoneNumbers,
        ).then(() => {
            console.log("WhatsApp message sent successfully!");
        }).catch((error) => {
            console.error("Failed to send WhatsApp message:", error);
        });

        // Whatsapp greeting message
        if (!phoneWithoutPlus) {
            console.warn("Mobile number is required for WhatsApp greeting message.");
        }
        else {
            sendWhatsappMessage(
                "customer_greetings",
                {
                    fullName: formData.fullName,
                    product: formData.Product,
                    siteUrl: 'https://acesoft.in',
                    imageUrl: 'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
                },
                phoneWithoutPlus ? [phoneWithoutPlus] : []
            ).then(() => {
                console.log("WhatsApp greeting message sent successfully!");
            }).catch((error) => {
                console.error("Failed to send WhatsApp greeting message:", error);
            });
        };
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
      <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit} className="container flex-column border p-5 w-95 contact-form">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name :</Form.Label>
            <Form.Control type="text" placeholder="Name" name="fullName" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCompany">
            <Form.Label>Company Name : </Form.Label>
            <Form.Control type="text" placeholder="Company Name" name="companyName" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Business Email :</Form.Label>
            <Form.Control type="email" placeholder="Business Email" name="businessEmail"  onChange={handleEmailChange}  required />
            {emailError && (
              <p style={{ color: "red", marginTop: "5px" }}>{emailError}</p>
            )}
          </Form.Group>
        
<Form.Group className="mb-3" controlId="formBasicContact">
  <Form.Label>Mobile Number :</Form.Label>
  <PhoneInput
    international
    defaultCountry="IN"
    placeholder="Enter phone number"
    value={phone}
    onChange={setPhone}
    name="mobileNumber"
    className="arrows"
    required
  />
  {phone && !isValidPhoneNumber(phone) && (
    <p style={{ color: "red", marginTop: "5px" }}>
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
            <label><input type="checkbox" name="Product" value="Aceprofit Compact ERP" className="large-checkbox" /> <span>Aceprofit Compact ERP</span></label>
            <label><input type="checkbox" name="Product" value="APQP" className="large-checkbox" /> <span>APQP</span></label>
            <label><input type="checkbox" name="Product" value="CRM" className="large-checkbox" /> <span>CRM (Customer Relationship Management)</span></label>
            <label><input type="checkbox" name="Product" value="Daily Work Tracker" className="large-checkbox" /> <span>Daily Work Tracker</span></label>
            <label><input type="checkbox" name="Product" value="Document Management" className="large-checkbox" /> <span>Document Management</span></label>
            <label><input type="checkbox" name="Product" value="Engineering Balloon Annotator" className="large-checkbox" /> <span>Engineering Balloon Annotator</span></label>
            <label><input type="checkbox" name="Product" value="Part Codification" className="large-checkbox" /> <span>Part Codification</span></label>
            <label><input type="checkbox" name="Product" value="PPAP Management" className="large-checkbox" /> <span>PPAP Management</span></label>
            <label><input type="checkbox" name="Product" value="Project Management" className="large-checkbox" /> <span>Project Management</span></label>
            <label><input type="checkbox" name="Product" value="React Component Playground" className="large-checkbox" /> <span>React Component Playground</span></label>
            <label><input type="checkbox" name="Product" value="Sales" className="large-checkbox" /> <span>Sales</span></label>
            <label><input type="checkbox" name="Product" value="VB6 to React Component" className="large-checkbox" /> <span>VB6 to React Component</span></label>
          </div>
          {checkboxError && (
              <p style={{ color: "red" }}>Please select at least one product.</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" name="message" placeholder="" style={{ height: "120px" }} required />
                  </Form.Group>

          <Button className="submit" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default BasicExample;
