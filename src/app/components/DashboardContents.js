"use client";
import Image from "next/image";
import React from "react";
import { dashboarddata } from "../utils/dashboarddata";

const DashboardContents = () => {
  const { services } = dashboarddata;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {" "}
      {services.map((service) => (
        <div key={service.id} className="flex flex-row sm:flex-col">
          <div className="cursor-pointer shadow-sm border border-gray-200 rounded-md m-3 flex flex-row p-4">
            <div>
              <Image
                src={service.image}
                alt={service.name}
                width={100}
                height={100}
              />
            </div>
            <div className="ml-3">
              <h1 className="font-semibold text-xl mb-2">{service.name}</h1>
              <p className="text-md text-gray-700">{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardContents;
