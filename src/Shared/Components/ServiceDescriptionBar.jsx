import React from "react";
import { useSelectedService } from "../Context/SelectedServiceContext";
import ServiceDescription from "./ServiceDescription";

const ServiceDescriptionBar = () => {
  const { selectedService } = useSelectedService(); // Consume selectedService from context
  console.log(selectedService); // Debugging: Check if selectedService is correct

  if (!selectedService) return null; // Don't render if no service is selected

  return (
    <div className="fixed top-16 w-full z-10 bg-white shadow-md">
      <ServiceDescription
        title={selectedService.categoryName}
        description={selectedService.description}
      />
    </div>
  );
};

export default ServiceDescriptionBar;