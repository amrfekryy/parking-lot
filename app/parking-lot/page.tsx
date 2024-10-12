"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { VehiclesTable } from "./vehicles-table";

export default function Page() {
  const [plateNumber, setPlateNumber] = React.useState<string>("");
  const [parkingLot, setParkingLot] = React.useState<string>("");

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
          placeholder="Parking Lot Number"
          value={parkingLot}
          onChange={(e) => setParkingLot(e.target.value)}
        />
        <Button disabled={!plateNumber}>Park Vehcile</Button>
      </div>
      <VehiclesTable />
    </div>
  );
}
