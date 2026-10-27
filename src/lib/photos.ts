export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export const PHOTOS = {
  engine: {
    src: "/images/engine-bay.jpg",
    alt: "Моторный отсек: дизельный двигатель с оранжевой ручкой масляного щупа и топливными трубками",
    width: 1200,
    height: 1600,
    position: "50% 62%",
  },
  gauge: {
    src: "/images/oil-temperature-gauge.jpg",
    alt: "Стрелка указателя температуры масла на подсвеченной приборной панели",
    width: 1600,
    height: 1067,
    position: "60% 50%",
  },
  lift: {
    src: "/images/lift.jpg",
    alt: "Механик подводит гидравлическую стойку под заднюю балку поднятой машины",
    width: 1068,
    height: 1600,
    position: "50% 42%",
  },
  dipstick: {
    src: "/images/dipstick.jpg",
    alt: "Масляный щуп крупным планом на фоне двигателя",
    width: 1600,
    height: 1068,
    position: "55% 50%",
  },
} satisfies Record<string, Photo>;

export const CREDITS = [
  {
    title: "Oil on a car engine closeup",
    author: "Shixart1985",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
    page: "https://commons.wikimedia.org/wiki/File:Oil_on_a_car_engine_closeup.jpg",
  },
  {
    title: "Close-up of engine oil temperature gauge on car dashboard",
    author: "Ivan Radic",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
    page: "https://commons.wikimedia.org/wiki/File:Close-up_of_engine_oil_temperature_gauge_on_car_dashboard_(49006320293).jpg",
  },
  {
    title: "Car mechanic worker repairing suspension of lifted automobile at auto repair garage shop",
    author: "Shixart1985",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
    page: "https://commons.wikimedia.org/w/index.php?curid=194512646",
  },
  {
    title: "Checking the oil level in a car engine",
    author: "Shixart1985",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
    page: "https://commons.wikimedia.org/wiki/File:Checking_the_oil_level_in_a_car_engine.jpg",
  },
];
