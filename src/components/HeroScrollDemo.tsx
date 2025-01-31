"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  const image = "/images/dashboard.png";
  return (
    <div>
      <ContainerScroll>
        <Image
          src={image}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto object-cover h-full border rounded-lg"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
