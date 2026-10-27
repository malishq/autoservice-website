"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  travel?: number;
  position?: string;
};

export function DriftImage({ src, alt, width, height, className = "", travel = 7, position = "50% 50%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "img",
          { yPercent: -travel },
          { yPercent: travel, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`mask-circle overflow-clip bg-surface ${className}`}>
      <Image
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        loading="lazy"
        className="h-full w-full scale-[1.16] object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
