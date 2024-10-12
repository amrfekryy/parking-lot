"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface Vehicle {
  parkingLot: number;
  plateNumber: string;
  timer: string;
}

const vehicles: Vehicle[] = [
  {
    parkingLot: 1,
    plateNumber: "INV001",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV002",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV003",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV004",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV005",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV006",
    timer: "1:30",
  },
  {
    parkingLot: 1,
    plateNumber: "INV007",
    timer: "1:30",
  },
];

export default function Page() {
  const [plateNumber, setPlateNumber] = React.useState<string>("");
  const [parkingLot, setParkingLot] = React.useState<string>("");

  return (
    <div className="p-20 flex flex-col gap-10">
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parking Lot</TableHead>
            <TableHead>Plate No.</TableHead>
            <TableHead>Timer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.parkingLot}>
              <TableCell>{vehicle.parkingLot}</TableCell>
              <TableCell>{vehicle.plateNumber}</TableCell>
              <TableCell>{vehicle.timer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
