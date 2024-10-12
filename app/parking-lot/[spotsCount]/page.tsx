"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Vehicle, VehiclesTable } from "./vehicles-table";

export default function Page({
  params: { spotsCount },
}: {
  params: { spotsCount: string };
}) {
  // form
  const [plateNumber, setPlateNumber] = React.useState<string>("");
  const [parkingSpot, setParkingSpot] = React.useState<string>("");

  // spots state management
  const [parkingSpots, setParkingSpots] = React.useState<Vehicle[]>(
    Array(Number(spotsCount))
      .fill(null)
      .map((_, index) => ({
        parkingSpot: index + 1,
        plateNumber: "",
        parkedAt: "",
      }))
  );

  const parkVehicle = () => {
    // validation
    let spotIndex;
    // user selected specific parking spot
    if (parkingSpot) {
      // check seleted parking spot already occupied
      const vehicle = parkingSpots.find(
        (v) => v.parkingSpot === Number(parkingSpot)
      );
      if (!!vehicle?.plateNumber) {
        alert("Parking spot already occupied!");
        return;
      }
      spotIndex = Number(parkingSpot) - 1;
    }
    // auto select parking spot
    else {
      // check parking spots are filled
      const emptySpotIndex = parkingSpots.findIndex((v) => !v.plateNumber);
      if (emptySpotIndex === -1) {
        alert("There are no free parking spots available!");
        return;
      }
      spotIndex = emptySpotIndex;
    }
    // check plate number already added
    const plateNumberExists = parkingSpots.find(
      (v) => v.plateNumber === plateNumber
    );
    if (plateNumberExists) {
      alert("A vehicle with this plate number already exists!");
      return;
    }

    // park vehicle
    setParkingSpots((prev) => {
      const updated = [...prev];
      updated[spotIndex] = {
        plateNumber,
        parkingSpot: spotIndex + 1,
        parkedAt: new Date().toISOString(),
      };
      return updated;
    });
    setPlateNumber("");
    setParkingSpot("");
  };

  const removeVehicle = (vehicle: Vehicle) => {
    const spotIndex = Number(vehicle.parkingSpot) - 1;
    setParkingSpots((prev) => {
      const updated = [...prev];
      updated[spotIndex] = {
        parkingSpot: vehicle.parkingSpot,
        plateNumber: "",
        parkedAt: "",
      };
      return updated;
    });
  };

  const resetTimer = (vehicle: Vehicle) => {
    const spotIndex = Number(vehicle.parkingSpot) - 1;
    setParkingSpots((prev) => {
      const updated = [...prev];
      updated[spotIndex] = {
        ...vehicle,
        parkedAt: new Date().toISOString(),
      };
      return updated;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      parkVehicle();
    }
  };

  return (
    <main className="min-h-screen w-screen bg-background container">
      <div className="px-5 md:px-20 pt-10 flex flex-col gap-10">
        <div className="flex gap-4">
          <Input
            required
            placeholder="Vehicle Plate Number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value.trim())}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="number"
            min={1}
            max={spotsCount}
            placeholder="Parking Spot (Optional)"
            value={parkingSpot}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (
                e.target.value === "" ||
                value > 0 ||
                value <= Number(spotsCount)
              ) {
                setParkingSpot(e.target.value);
              }
            }}
          />
          <Button disabled={!plateNumber} onClick={parkVehicle}>
            Park Vehcile
          </Button>
        </div>
        <VehiclesTable
          parkingSpots={parkingSpots}
          removeVehicle={removeVehicle}
          resetTimer={resetTimer}
        />
      </div>
    </main>
  );
}
