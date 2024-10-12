"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  const [spotsCount, setspotsCount] = React.useState("");
  return (
    <div className="min-h-screen w-screen relative">
      <Image
        src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/parking-loot.jpeg"
        alt=""
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-[42%] flex gap-3">
        <Input
          type="number"
          min={0}
          max={1000}
          placeholder="How many spots do you have in your parking lot?"
          className="bg-white w-96 "
          onChange={(e) => setspotsCount(e.target.value)}
          value={spotsCount}
        />
        <Link href={`/parking-lot/${spotsCount}`}>
          <Button>Go</Button>
        </Link>
      </div>
    </div>
  );
}
