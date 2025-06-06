
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image, { StaticImageData } from "next/image";

import service from "../../assets/service.png";
import icon1 from "../../assets/icons/pm.png";
import icon2 from "../../assets/icons/icon2.png";
import icon3 from "../../assets/icons/icon3.png";
import icon4 from "../../assets/icons/icon4.png";
import crmicon from "../../assets/icons/crm-icon.png";
import salesicon from "../../assets/icons/sales-icon.png";
import erpicon from "../../assets/icons/erp.png";
import dmicon from "../../assets/icons/dm.png";
import rcpicon from "../../assets/icons/rcp.png";
import vb6icon from "../../assets/icons/vb6.png";
import ebaicon from "../../assets/icons/eba.png";
import pcicon from "../../assets/icons/pc.png";

import "./Cards.css";

interface ServiceItem {
  icon: StaticImageData;
  title: string;
  text: string;
  link?: string;
}

interface Category {
  image?: StaticImageData;
  mainTitle: string;
  subTitle: string;
  items: ServiceItem[];
}

const services: Record<string, Category> = {
  "Project & Workflow Management": {
    image: service,
    mainTitle: "Project & Workflow",
    subTitle: " Management",
    items: [
      {
        icon: icon1,
        title: "Project Management",
        text: "General project management tools and methods.",
        link: "",
      },
      {
        icon: icon2,
        title: "PPAP Management",
        text: "Management system for production part approval processes.",
        link: "http://ppap.acesoftcloud.in",
      },
      {
        icon: icon3,
        title: "Daily Work Tracker",
        text: "Task tracking and time management tools.",
        link: "",
      },
      {
        icon: icon4,
        title: "APQP",
        text: "A framework used in project management for product development.",
        link: "",
      },
    ],
  },
  "Sales & CRM": {
    image: service,
    mainTitle: "Sales & CRM",
    subTitle: " Management",
    items: [
      {
        icon: crmicon,
        title: "CRM (Customer Relationship Management)",
        text: "Tools to manage customer interactions and data.",
        link: "",
      },
      {
        icon: salesicon,
        title: "Sales",
        text: "Refers to tools and systems supporting the sales process.",
        link: "",
      },
    ],
  },
  "Engineering Tools": {
    image: service,
    mainTitle: "Engineering Tools",
    subTitle: " Management",
    items: [
      {
        icon: ebaicon,
        title: "Engineering Balloon Annotator",
        text: "A tool for annotating engineering diagrams.",
        link: "http://balloon.acesoftcloud.in",
      },
      {
        icon: pcicon,
        title: "Part Codification",
        text: "A system for creating unique identifiers for parts.",
        link: "",
      },
    ],
  },
  "ERP": {
    image: service,
    mainTitle: "Enterprise ",
    subTitle: "Resource Planning",
    items: [
      {
        icon: erpicon,
        title: "Aceprofit Compact ERP",
        text: "An ERP solution for streamlining business processes.",
        link: "",
      },
    ],
  },
  "Software Development": {
    image: service,
    mainTitle: "Software",
    subTitle: " Developments",
    items: [
      {
        icon: vb6icon,
        title: "VB6 to React Component",
        text: "Migration of VB6 apps to React.",
        link: "",
      },
      {
        icon: rcpicon,
        title: "React Component Playground",
        text: "Interactive environment for React components.",
        link: "",
      },
    ],
  },
  "Document Management": {
    image: service,
    mainTitle: "Document",
    subTitle: " Management",
    items: [
      {
        icon: dmicon,
        title: "Document Management",
        text: "Tools for organizing, storing, and sharing documents.",
        link: "",
      },
    ],
  },
};

interface ServiceSectionProps {
  categoryName: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ categoryName }) => {
  const categoryData: Category | undefined = services[categoryName];

  if (!categoryData) {
    return (
      <div className="container">
        <h2>Category not found: {categoryName}</h2>
      </div>
    );
  }

  return (
     <div className="container">
  
      <div className="serviceleft">
        <div className="title">
          <h1 className="category-name">
            <span className="highlight">
              {categoryData.mainTitle || categoryName}
            </span>{categoryData.subTitle}
          </h1>
        </div>
        <div className="image">
          <Image src={service} alt="Service" width={200} height={200} />
        </div>
      </div>

      <div className="serviceright continer-fulid">
        <Row xs={1} sm={1} md={2} lg={2} className=" flex-wrap mb-1">
          {categoryData.items?.map((service, index) => (
            <Col key={index}>
              <Card className="mb-4 cards"
                style={{
                  width: "325px",
                  height: "294px",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  margin: "auto",
                  display: "flex",
                }}
              >
                <Card.Body className="card-body">
                  <Image className="service-icon"
                    width={30}
                    // variant="top"
                    src={service.icon}
                    alt="image"
                    style={{ width: "35px", marginLeft: "10px" }}
                  />
                  <Card.Title className="p-2 service-title">{service.title}</Card.Title>
                  <Card.Text className="p-2 service-text">{service.text}</Card.Text>
                  <Card.Link className="p-2 link" href={service.link} target="blank">
                    Explore the product
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ServiceSection;
