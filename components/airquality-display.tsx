"use client";

import { useGetAirQuality } from "@/lib/query";
import React from "react";

export default function AirQuality() {
  const { data } = useGetAirQuality();

  return <div></div>;
}
