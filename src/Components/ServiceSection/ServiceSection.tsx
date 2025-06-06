'use client';

import React, { useState } from "react";
import "./ServiceSection.css";
import ServiceSection from "../Layouts/Cards";


interface Category {
  name: string;
  component: React.ReactNode; 
  items?: string[]; 
}

const ServiceHeader: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Project & Workflow Management");
  const [activeItem, setActiveItem] = useState<string>("");


  const categories: Category[] = [
    {
      name: "Project & Workflow Management",
      component: <ServiceSection categoryName="Project & Workflow Management" />,
    },
    {
      name: "Sales & CRM",
      component: <ServiceSection categoryName="Sales & CRM" />,
    },
    {
      name: "Engineering Tools",
      component: <ServiceSection categoryName="Engineering Tools" />,
    },
    {
      name: "Software Development",
      component: <ServiceSection categoryName="Software Development" />,
    },
    {
      name: "Document Management",
      component: <ServiceSection categoryName="Document Management" />,
    },
    {
      name: "ERP",
      component: <ServiceSection categoryName="ERP" />,
    },
  ];

  const handleCategoryClick = (categoryName: string): void => {
    setActiveCategory(categoryName);
    setActiveItem("");
  };

  const handleItemClick = (item: string): void => {
    setActiveItem(item);
  };

  const activeCategoryData = categories.find(
    (category) => category.name === activeCategory
  );

  const activeItems = activeCategoryData?.items || [];

  return (
    <>
      <div className="heading" id="services">
        <div className="our-clients-container">
          <div className="our-clients-box">
            <h2 className="our-clients-title">
              <span>Our</span> Products
            </h2>
            <div className="corner-decoration left-bottom"></div>
            <div className="corner-decoration right-top"></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="navbar">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`category-btn ${activeCategory === category.name ? "active" : ""}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div className="service-container mt-5">
        <div className="category-content">
          {activeCategoryData?.component ? (
            activeCategoryData.component
          ) : (
            <div className="category-list">
              {activeItems.map((item, index) => (
                <div
                  key={index}
                  className={`list ${activeItem === item ? "active" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceHeader;
