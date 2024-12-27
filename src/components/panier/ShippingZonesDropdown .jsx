import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ShippingZonesDropdown = ({ zones }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!zones || zones.length === 0) {
    return (
      //   <div className="text-sm text-gray-600">
      //     <strong>Zones d'expédition :</strong>
      //     <p>Aucune zone d'expédition disponible</p>
      //   </div>
      <></>
    );
  }

  return (
    <div className="text-sm text-gray-600">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 w-full text-left hover:bg-gray-50 p-2 rounded-md"
      >
        <strong>Zones d'expédition</strong>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-[#30A08B]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#30A08B]" />
        )}
      </button>

      {isOpen && (
        <ul className="list-disc list-inside mt-2 bg-gray-50 p-3 rounded-md">
          {zones.map((zone, zoneIndex) => (
            <li key={zoneIndex} className="mb-1">
              <span className="font-semibold">{zone.name}</span> - Frais de
              base: <span className="text-[#30A08B]">{zone.baseFee} F CFA</span>
              , Frais au poids:{" "}
              <span className="text-[#30A08B]">{zone.weightFee} F CFA</span>{" "}
              {zone?.transporteurName ? (
                <>
                  transport:{" "}
                  <span className="text-[#30A08B]">
                    {zone?.transporteurName}
                  </span>
                </>
              ) : (
                <>
                  transport <span className="text-[#30A08B]"> IhamBaobab</span>
                </>
              )}
              {/* {zone?.transporteurName} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShippingZonesDropdown;
