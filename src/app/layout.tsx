import { Montserrat } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"],
})

export const metadata = {
  title: "ACE Software Solutions Pvt Ltd",
  description: "ACE Software Solutions Pvt Ltd provides innovative SaaS solutions that empower businesses to scale efficiently with cloud-based technology. Our secure, flexible, and customizable software helps companies streamline operations, enhance productivity, and drive growth. Whether you're a startup or an enterprise, ACESOFTCLOUD offers the tools and expertise to transform your business in the cloud.",
  keywords:"ACE, ACE Software Solutions, ACESOFTCLOUD, SaaS, cloud solutions, business software, ERP Software, Cloud ERP, Aceprofit Compact ERP, CRM Solutions, Sales & CRM, Sales Automation, Project Management, Document Management, Engineering Balloon Annotator, Engineering Annotation Tool, Part Codification, React Component Playground, React Playground, VB6 to React Component, Engineering Migration, APQP, PPAP, PPAP Management, Production Part Approval Process Management, Quality Management, Product Lifecycle Management, Cloud Business Solutions, SaaS ERP, Enterprise Software, Digital Transformation"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/logo.svg" />
      </head>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
