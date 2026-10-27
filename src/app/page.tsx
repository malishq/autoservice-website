import { Booking } from "@/components/Booking";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Posts } from "@/components/Posts";
import { Reveal } from "@/components/Reveal";
import { Services } from "@/components/Services";
import { Visit } from "@/components/Visit";
import { Warranty } from "@/components/Warranty";
import { PHOTOS } from "@/lib/photos";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <Services />
        <Calculator image={PHOTOS.engine} />
        <Posts />
        <Visit photo={PHOTOS.gauge} />
        <Warranty photo={PHOTOS.lift} />
        <Faq photo={PHOTOS.dipstick} />
        <Booking />
      </Reveal>
    </>
  );
}
