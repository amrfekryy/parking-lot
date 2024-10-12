"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Vehicle, VehiclesTable } from "./vehicles-table";

export default function Page() {
  // form
  const [plateNumber, setPlateNumber] = React.useState<string>("");
  const [parkingSlot, setParkingSlot] = React.useState<string>("");

  // slots state management
  const [parkingSlots, setParkingSlots] = React.useState<Vehicle[]>(
    Array(20)
      .fill(null)
      .map((_, index) => ({
        parkingSlot: index + 1,
        plateNumber: "",
        timer: "",
      }))
  );

  const parkVehicle = () => {
    // validation
    let slotIndex;
    // user selected specific parking slot
    if (parkingSlot) {
      // check seleted parking slot already occupied
      const vehicle = parkingSlots.find(
        (v) => v.parkingSlot === Number(parkingSlot)
      );
      if (!!vehicle?.plateNumber) {
        alert("Parking slot already occupied!");
        return;
      }
      slotIndex = Number(parkingSlot) - 1;
    }
    // auto select parking slot
    else {
      // check parking slots are filled
      const emptySlotIndex = parkingSlots.findIndex((v) => !v.plateNumber);
      if (emptySlotIndex === -1) {
        alert("There are no free parking slots available!");
        return;
      }
      slotIndex = emptySlotIndex;
    }
    // check plate number already added
    const plateNumberExists = parkingSlots.find(
      (v) => v.plateNumber === plateNumber
    );
    if (plateNumberExists) {
      alert("A vehicle with this plate number already exists!");
      return;
    }

    // park vehicle
    setParkingSlots((prev) => {
      const updated = [...prev];
      updated[slotIndex] = {
        plateNumber,
        parkingSlot: slotIndex + 1,
        timer: new Date().toISOString(),
      };
      return updated;
    });
    setPlateNumber("");
    setParkingSlot("");
  };

  const removeVehicle = (vehicle: Vehicle) => {
    const slotIndex = Number(vehicle.parkingSlot) - 1;
    setParkingSlots((prev) => {
      const updated = [...prev];
      updated[slotIndex] = {
        parkingSlot: vehicle.parkingSlot,
        plateNumber: "",
        timer: "",
      };
      return updated;
    });
  };

  return (
    <div className="px-5 md:px-20 pt-10 flex flex-col gap-10">
      <div className="flex gap-4">
        <Input
          required
          placeholder="Vehicle Plate Number *"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
        <Input
          type="number"
          min={1}
          max={20}
          placeholder="Parking Slot Number (Optional)"
          value={parkingSlot}
          onChange={(e) => setParkingSlot(e.target.value)}
        />
        <Button disabled={!plateNumber} onClick={parkVehicle}>
          Park Vehcile
        </Button>
      </div>
      <VehiclesTable
        parkingSlots={parkingSlots}
        removeVehicle={removeVehicle}
      />
    </div>
  );
}
