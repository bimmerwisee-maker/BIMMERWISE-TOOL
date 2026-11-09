/** BMW passenger models offered on the EU market from model year 2010 onward. */

export type BmwModel = {
  id: string;
  series: string;
  name: string;
  body: string;
  yearsFrom: number;
  yearsTo: number | null;
  image: string;
};

const AVAILABLE = new Set<string>(["e70", "e71", "e84", "e89", "f01", "f06", "f10", "f10m5", "f11", "f12", "f13", "f15", "f16", "f20", "f22", "f25", "f26", "f30", "f31", "f32", "f33", "f36", "f39", "f40", "f44", "f45", "f46", "f48", "f80", "f82", "f87", "f90", "f91", "f95", "f96", "f97", "f98", "g01", "g02", "g05", "g06", "g07", "g08", "g09", "g11", "g15", "g16", "g20", "g21", "g22", "g26", "g29", "g30", "g32", "g42", "g45", "g60", "g70", "g80", "g81", "g82", "g87", "g90", "i3", "i4", "i5", "i7", "ix", "ix1", "u06", "u10", "u11"]);
const PHOTO = (slug: string) => `/cars/photos/${slug}.png`;
const FALLBACK = PHOTO("g20");

/** Unique cut-out photo (transparent background) for a chassis / model id. */
export function chassisPhotoForModelId(id: string): string {
  const key = id.toLowerCase();
  const rules: Array<[RegExp, string]> = [
    [/^i01/, "i3"],
    [/^i20/, "ix"],
    [/^g60-i5/, "i5"],
    [/^g70-i7/, "i7"],
    [/^u11-ix1/, "ix1"],
    [/^g08/, "g08"],
    [/^f10-m5/, "f10m5"],
    [/^f87/, "f87"],
    [/^g87/, "g87"],
    [/^f80/, "f80"],
    [/^g80/, "g80"],
    [/^g81/, "g81"],
    [/^f82/, "f82"],
    [/^g82/, "g82"],
    [/^f90/, "f90"],
    [/^g90/, "g90"],
    [/^f91/, "f91"],
    [/^f95/, "f95"],
    [/^f96/, "f96"],
    [/^f97/, "f97"],
    [/^f98/, "f98"],
    [/^g09/, "g09"],
    [/^u06/, "u06"],
    [/^u10/, "u10"],
    [/^u11/, "u11"],
  ];
  for (const [re, slug] of rules) {
    if (re.test(key) && AVAILABLE.has(slug)) return PHOTO(slug);
  }
  const chassis = key.split("-")[0];
  if (AVAILABLE.has(chassis)) return PHOTO(chassis);
  if (key.includes("ix1")) return PHOTO("ix1");
  if (key.includes("ix3") || key.includes("g08")) return PHOTO("g08");
  if (key.includes("ix")) return PHOTO("ix");
  if (key.includes("i3")) return PHOTO("i3");
  if (key.includes("i4")) return PHOTO("i4");
  if (key.includes("i5")) return PHOTO("i5");
  if (key.includes("i7")) return PHOTO("i7");
  return FALLBACK;
}

const img = (id: string) => chassisPhotoForModelId(id);

export const BMW_MODELS: BmwModel[] = [
  { id: "f20-116i", series: "1 Series", name: "116i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("f20-116i") },
  { id: "f20-118i", series: "1 Series", name: "118i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("f20-118i") },
  { id: "f20-120i", series: "1 Series", name: "120i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("f20-120i") },
  { id: "f20-125i", series: "1 Series", name: "125i", body: "Hatch", yearsFrom: 2012, yearsTo: 2019, image: img("f20-125i") },
  { id: "f20-m135i", series: "1 Series", name: "M135i", body: "Hatch", yearsFrom: 2012, yearsTo: 2019, image: img("f20-m135i") },
  { id: "f20-116d", series: "1 Series", name: "116d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("f20-116d") },
  { id: "f20-118d", series: "1 Series", name: "118d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("f20-118d") },
  { id: "f20-120d", series: "1 Series", name: "120d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("f20-120d") },
  { id: "f40-118i", series: "1 Series", name: "118i (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, image: img("f40-118i") },
  { id: "f40-120i", series: "1 Series", name: "120i (F40)", body: "Hatch", yearsFrom: 2020, yearsTo: null, image: img("f40-120i") },
  { id: "f40-m135i", series: "1 Series", name: "M135i xDrive", body: "Hatch", yearsFrom: 2019, yearsTo: null, image: img("f40-m135i") },
  { id: "f40-118d", series: "1 Series", name: "118d (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, image: img("f40-118d") },

  { id: "f22-218i", series: "2 Series", name: "218i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, image: img("f22-218i") },
  { id: "f22-220i", series: "2 Series", name: "220i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, image: img("f22-220i") },
  { id: "f22-230i", series: "2 Series", name: "230i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2021, image: img("f22-230i") },
  { id: "f22-220d", series: "2 Series", name: "220d Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, image: img("f22-220d") },
  { id: "f22-m235i", series: "2 Series", name: "M235i", body: "Coupé", yearsFrom: 2014, yearsTo: 2016, image: img("f22-m235i") },
  { id: "f87-m2", series: "2 Series", name: "M2", body: "Coupé", yearsFrom: 2016, yearsTo: 2021, image: img("f87-m2") },
  { id: "g42-220i", series: "2 Series", name: "220i Coupé (G42)", body: "Coupé", yearsFrom: 2021, yearsTo: null, image: img("g42-220i") },
  { id: "g87-m2", series: "2 Series", name: "M2 (G87)", body: "Coupé", yearsFrom: 2023, yearsTo: null, image: img("g87-m2") },
  { id: "f45-218i", series: "2 Series", name: "218i Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, image: img("f45-218i") },
  { id: "f45-220d", series: "2 Series", name: "220d Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, image: img("f45-220d") },
  { id: "u06-220i", series: "2 Series", name: "220i Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, image: img("u06-220i") },
  { id: "f46-216d", series: "2 Series", name: "216d Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, image: img("f46-216d") },
  { id: "f44-218i", series: "2 Series", name: "218i Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, image: img("f44-218i") },
  { id: "f44-m235i", series: "2 Series", name: "M235i Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, image: img("f44-m235i") },

  { id: "f30-316i", series: "3 Series", name: "316i", body: "Saloon", yearsFrom: 2012, yearsTo: 2015, image: img("f30-316i") },
  { id: "f30-318i", series: "3 Series", name: "318i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, image: img("f30-318i") },
  { id: "f30-320i", series: "3 Series", name: "320i", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("f30-320i") },
  { id: "f30-330i", series: "3 Series", name: "330i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, image: img("f30-330i") },
  { id: "f30-340i", series: "3 Series", name: "340i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, image: img("f30-340i") },
  { id: "f30-316d", series: "3 Series", name: "316d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("f30-316d") },
  { id: "f30-318d", series: "3 Series", name: "318d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("f30-318d") },
  { id: "f30-320d", series: "3 Series", name: "320d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("f30-320d") },
  { id: "f30-330d", series: "3 Series", name: "330d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("f30-330d") },
  { id: "f30-335d", series: "3 Series", name: "335d", body: "Saloon", yearsFrom: 2013, yearsTo: 2019, image: img("f30-335d") },
  { id: "f31-320d", series: "3 Series", name: "320d Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, image: img("f31-320d") },
  { id: "f80-m3", series: "3 Series", name: "M3 (F80)", body: "Saloon", yearsFrom: 2014, yearsTo: 2018, image: img("f80-m3") },
  { id: "g20-318i", series: "3 Series", name: "318i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-318i") },
  { id: "g20-320i", series: "3 Series", name: "320i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-320i") },
  { id: "g20-330i", series: "3 Series", name: "330i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-330i") },
  { id: "g20-330e", series: "3 Series", name: "330e", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-330e") },
  { id: "g20-m340i", series: "3 Series", name: "M340i xDrive", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-m340i") },
  { id: "g20-320d", series: "3 Series", name: "320d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-320d") },
  { id: "g20-330d", series: "3 Series", name: "330d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("g20-330d") },
  { id: "g21-320d", series: "3 Series", name: "320d Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, image: img("g21-320d") },
  { id: "g80-m3", series: "3 Series", name: "M3 (G80)", body: "Saloon", yearsFrom: 2021, yearsTo: null, image: img("g80-m3") },
  { id: "g81-m3", series: "3 Series", name: "M3 Touring", body: "Touring", yearsFrom: 2022, yearsTo: null, image: img("g81-m3") },

  { id: "f32-420i", series: "4 Series", name: "420i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, image: img("f32-420i") },
  { id: "f32-430i", series: "4 Series", name: "430i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2020, image: img("f32-430i") },
  { id: "f32-440i", series: "4 Series", name: "440i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2020, image: img("f32-440i") },
  { id: "f32-420d", series: "4 Series", name: "420d Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, image: img("f32-420d") },
  { id: "f33-420i", series: "4 Series", name: "420i Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, image: img("f33-420i") },
  { id: "f36-420d", series: "4 Series", name: "420d Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, image: img("f36-420d") },
  { id: "f82-m4", series: "4 Series", name: "M4 (F82)", body: "Coupé", yearsFrom: 2014, yearsTo: 2020, image: img("f82-m4") },
  { id: "g22-420i", series: "4 Series", name: "420i Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("g22-420i") },
  { id: "g22-430i", series: "4 Series", name: "430i Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("g22-430i") },
  { id: "g22-m440i", series: "4 Series", name: "M440i xDrive", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("g22-m440i") },
  { id: "g22-420d", series: "4 Series", name: "420d Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("g22-420d") },
  { id: "g26-420i", series: "4 Series", name: "420i Gran Coupé", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, image: img("g26-420i") },
  { id: "g82-m4", series: "4 Series", name: "M4 (G82)", body: "Coupé", yearsFrom: 2021, yearsTo: null, image: img("g82-m4") },

  { id: "f10-520i", series: "5 Series", name: "520i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-520i") },
  { id: "f10-528i", series: "5 Series", name: "528i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-528i") },
  { id: "f10-530i", series: "5 Series", name: "530i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-530i") },
  { id: "f10-535i", series: "5 Series", name: "535i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-535i") },
  { id: "f10-550i", series: "5 Series", name: "550i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-550i") },
  { id: "f10-520d", series: "5 Series", name: "520d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-520d") },
  { id: "f10-525d", series: "5 Series", name: "525d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-525d") },
  { id: "f10-530d", series: "5 Series", name: "530d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-530d") },
  { id: "f10-535d", series: "5 Series", name: "535d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("f10-535d") },
  { id: "f11-520d", series: "5 Series", name: "520d Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, image: img("f11-520d") },
  { id: "f10-m5", series: "5 Series", name: "M5 (F10)", body: "Saloon", yearsFrom: 2011, yearsTo: 2016, image: img("f10-m5") },
  { id: "g30-520i", series: "5 Series", name: "520i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("g30-520i") },
  { id: "g30-530i", series: "5 Series", name: "530i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("g30-530i") },
  { id: "g30-540i", series: "5 Series", name: "540i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("g30-540i") },
  { id: "g30-530e", series: "5 Series", name: "530e", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("g30-530e") },
  { id: "g30-520d", series: "5 Series", name: "520d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("g30-520d") },
  { id: "g30-530d", series: "5 Series", name: "530d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("g30-530d") },
  { id: "g30-m550d", series: "5 Series", name: "M550d xDrive", body: "Saloon", yearsFrom: 2017, yearsTo: 2020, image: img("g30-m550d") },
  { id: "f90-m5", series: "5 Series", name: "M5 (F90)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("f90-m5") },
  { id: "g60-520i", series: "5 Series", name: "520i (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("g60-520i") },
  { id: "g60-530e", series: "5 Series", name: "530e (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("g60-530e") },
  { id: "g60-i5", series: "5 Series", name: "i5 eDrive40", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("g60-i5") },
  { id: "g60-m5", series: "5 Series", name: "M5 (G90)", body: "Saloon", yearsFrom: 2024, yearsTo: null, image: img("g60-m5") },

  { id: "f06-640d", series: "6 Series", name: "640d Gran Coupé", body: "Gran Coupé", yearsFrom: 2012, yearsTo: 2018, image: img("f06-640d") },
  { id: "f12-640i", series: "6 Series", name: "640i Convertible", body: "Convertible", yearsFrom: 2011, yearsTo: 2018, image: img("f12-640i") },
  { id: "f13-650i", series: "6 Series", name: "650i Coupé", body: "Coupé", yearsFrom: 2011, yearsTo: 2018, image: img("f13-650i") },
  { id: "f06-m6", series: "6 Series", name: "M6 Gran Coupé", body: "Gran Coupé", yearsFrom: 2013, yearsTo: 2018, image: img("f06-m6") },
  { id: "g32-630d", series: "6 Series", name: "630d GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, image: img("g32-630d") },
  { id: "g32-640i", series: "6 Series", name: "640i GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, image: img("g32-640i") },

  { id: "f01-730d", series: "7 Series", name: "730d", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, image: img("f01-730d") },
  { id: "f01-740i", series: "7 Series", name: "740i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, image: img("f01-740i") },
  { id: "f01-750i", series: "7 Series", name: "750i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, image: img("f01-750i") },
  { id: "g11-730d", series: "7 Series", name: "730d (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, image: img("g11-730d") },
  { id: "g11-740i", series: "7 Series", name: "740i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, image: img("g11-740i") },
  { id: "g11-740e", series: "7 Series", name: "740e / 745e", body: "Saloon", yearsFrom: 2016, yearsTo: 2022, image: img("g11-740e") },
  { id: "g11-750i", series: "7 Series", name: "750i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, image: img("g11-750i") },
  { id: "g11-m760li", series: "7 Series", name: "M760Li xDrive", body: "Saloon", yearsFrom: 2016, yearsTo: 2022, image: img("g11-m760li") },
  { id: "g70-740i", series: "7 Series", name: "740i (G70)", body: "Saloon", yearsFrom: 2022, yearsTo: null, image: img("g70-740i") },
  { id: "g70-750e", series: "7 Series", name: "750e xDrive", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("g70-750e") },
  { id: "g70-i7", series: "7 Series", name: "i7 xDrive60", body: "Saloon", yearsFrom: 2022, yearsTo: null, image: img("g70-i7") },

  { id: "g15-840i", series: "8 Series", name: "840i Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, image: img("g15-840i") },
  { id: "g15-840d", series: "8 Series", name: "840d xDrive Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, image: img("g15-840d") },
  { id: "g15-m850i", series: "8 Series", name: "M850i xDrive", body: "Coupé", yearsFrom: 2018, yearsTo: null, image: img("g15-m850i") },
  { id: "f91-m8", series: "8 Series", name: "M8 Competition", body: "Coupé", yearsFrom: 2019, yearsTo: null, image: img("f91-m8") },
  { id: "g16-840i", series: "8 Series", name: "840i Gran Coupé", body: "Gran Coupé", yearsFrom: 2019, yearsTo: null, image: img("g16-840i") },

  { id: "e84-x1-18d", series: "X1", name: "X1 sDrive18d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, image: img("e84-x1-18d") },
  { id: "e84-x1-20d", series: "X1", name: "X1 xDrive20d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, image: img("e84-x1-20d") },
  { id: "f48-x1-18i", series: "X1", name: "X1 sDrive18i", body: "SUV", yearsFrom: 2015, yearsTo: 2022, image: img("f48-x1-18i") },
  { id: "f48-x1-20d", series: "X1", name: "X1 xDrive20d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, image: img("f48-x1-20d") },
  { id: "f48-x1-25d", series: "X1", name: "X1 xDrive25d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, image: img("f48-x1-25d") },
  { id: "u11-x1-20i", series: "X1", name: "X1 xDrive20i", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("u11-x1-20i") },
  { id: "u11-x1-23i", series: "X1", name: "X1 M35i", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("u11-x1-23i") },
  { id: "u11-ix1", series: "X1", name: "iX1 xDrive30", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("u11-ix1") },

  { id: "f39-x2-18i", series: "X2", name: "X2 sDrive18i", body: "SUV", yearsFrom: 2018, yearsTo: 2023, image: img("f39-x2-18i") },
  { id: "f39-x2-20d", series: "X2", name: "X2 xDrive20d", body: "SUV", yearsFrom: 2018, yearsTo: 2023, image: img("f39-x2-20d") },
  { id: "f39-x2-m35i", series: "X2", name: "X2 M35i", body: "SUV", yearsFrom: 2019, yearsTo: 2023, image: img("f39-x2-m35i") },
  { id: "u10-x2", series: "X2", name: "X2 (U10)", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("u10-x2") },

  { id: "f25-x3-20d", series: "X3", name: "X3 xDrive20d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, image: img("f25-x3-20d") },
  { id: "f25-x3-30d", series: "X3", name: "X3 xDrive30d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, image: img("f25-x3-30d") },
  { id: "f25-x3-35i", series: "X3", name: "X3 xDrive35i", body: "SUV", yearsFrom: 2011, yearsTo: 2017, image: img("f25-x3-35i") },
  { id: "g01-x3-20i", series: "X3", name: "X3 xDrive20i", body: "SUV", yearsFrom: 2017, yearsTo: 2024, image: img("g01-x3-20i") },
  { id: "g01-x3-30e", series: "X3", name: "X3 xDrive30e", body: "SUV", yearsFrom: 2019, yearsTo: 2024, image: img("g01-x3-30e") },
  { id: "g01-x3-20d", series: "X3", name: "X3 xDrive20d (G01)", body: "SUV", yearsFrom: 2017, yearsTo: 2024, image: img("g01-x3-20d") },
  { id: "g01-x3-30d", series: "X3", name: "X3 xDrive30d (G01)", body: "SUV", yearsFrom: 2017, yearsTo: 2024, image: img("g01-x3-30d") },
  { id: "f97-x3m", series: "X3", name: "X3 M", body: "SUV", yearsFrom: 2019, yearsTo: 2024, image: img("f97-x3m") },
  { id: "g08-ix3", series: "X3", name: "iX3", body: "SUV", yearsFrom: 2020, yearsTo: null, image: img("g08-ix3") },
  { id: "g45-x3", series: "X3", name: "X3 (G45)", body: "SUV", yearsFrom: 2024, yearsTo: null, image: img("g45-x3") },

  { id: "f26-x4-20d", series: "X4", name: "X4 xDrive20d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, image: img("f26-x4-20d") },
  { id: "f26-x4-30d", series: "X4", name: "X4 xDrive30d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, image: img("f26-x4-30d") },
  { id: "g02-x4-20d", series: "X4", name: "X4 xDrive20d (G02)", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, image: img("g02-x4-20d") },
  { id: "g02-x4-30i", series: "X4", name: "X4 xDrive30i", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, image: img("g02-x4-30i") },
  { id: "f98-x4m", series: "X4", name: "X4 M", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("f98-x4m") },

  { id: "e70-x5-30d", series: "X5", name: "X5 xDrive30d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("e70-x5-30d") },
  { id: "e70-x5-40d", series: "X5", name: "X5 xDrive40d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("e70-x5-40d") },
  { id: "e70-x5-50i", series: "X5", name: "X5 xDrive50i", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("e70-x5-50i") },
  { id: "e70-x5m", series: "X5", name: "X5 M (E70)", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("e70-x5m") },
  { id: "f15-x5-25d", series: "X5", name: "X5 sDrive25d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, image: img("f15-x5-25d") },
  { id: "f15-x5-30d", series: "X5", name: "X5 xDrive30d (F15)", body: "SUV", yearsFrom: 2013, yearsTo: 2018, image: img("f15-x5-30d") },
  { id: "f15-x5-40e", series: "X5", name: "X5 xDrive40e", body: "SUV", yearsFrom: 2015, yearsTo: 2018, image: img("f15-x5-40e") },
  { id: "f85-x5m", series: "X5", name: "X5 M (F85)", body: "SUV", yearsFrom: 2015, yearsTo: 2018, image: img("f85-x5m") },
  { id: "g05-x5-30d", series: "X5", name: "X5 xDrive30d (G05)", body: "SUV", yearsFrom: 2018, yearsTo: null, image: img("g05-x5-30d") },
  { id: "g05-x5-40i", series: "X5", name: "X5 xDrive40i", body: "SUV", yearsFrom: 2018, yearsTo: null, image: img("g05-x5-40i") },
  { id: "g05-x5-45e", series: "X5", name: "X5 xDrive45e", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("g05-x5-45e") },
  { id: "g05-x5-50e", series: "X5", name: "X5 xDrive50e", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("g05-x5-50e") },
  { id: "f95-x5m", series: "X5", name: "X5 M (F95)", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("f95-x5m") },

  { id: "e71-x6-30d", series: "X6", name: "X6 xDrive30d", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, image: img("e71-x6-30d") },
  { id: "e71-x6-40d", series: "X6", name: "X6 xDrive40d", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, image: img("e71-x6-40d") },
  { id: "e71-x6m", series: "X6", name: "X6 M (E71)", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, image: img("e71-x6m") },
  { id: "f16-x6-30d", series: "X6", name: "X6 xDrive30d (F16)", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, image: img("f16-x6-30d") },
  { id: "f86-x6m", series: "X6", name: "X6 M (F86)", body: "SUV Coupé", yearsFrom: 2015, yearsTo: 2019, image: img("f86-x6m") },
  { id: "g06-x6-30d", series: "X6", name: "X6 xDrive30d (G06)", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("g06-x6-30d") },
  { id: "g06-x6-40i", series: "X6", name: "X6 xDrive40i", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("g06-x6-40i") },
  { id: "f96-x6m", series: "X6", name: "X6 M (F96)", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("f96-x6m") },

  { id: "g07-x7-30d", series: "X7", name: "X7 xDrive30d", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("g07-x7-30d") },
  { id: "g07-x7-40i", series: "X7", name: "X7 xDrive40i", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("g07-x7-40i") },
  { id: "g07-x7-m60i", series: "X7", name: "X7 M60i", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("g07-x7-m60i") },
  { id: "g09-xm", series: "XM", name: "XM", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("g09-xm") },

  { id: "e89-z4-23i", series: "Z4", name: "Z4 sDrive23i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, image: img("e89-z4-23i") },
  { id: "e89-z4-30i", series: "Z4", name: "Z4 sDrive30i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, image: img("e89-z4-30i") },
  { id: "e89-z4-35i", series: "Z4", name: "Z4 sDrive35i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, image: img("e89-z4-35i") },
  { id: "g29-z4-20i", series: "Z4", name: "Z4 sDrive20i", body: "Roadster", yearsFrom: 2018, yearsTo: null, image: img("g29-z4-20i") },
  { id: "g29-z4-30i", series: "Z4", name: "Z4 sDrive30i (G29)", body: "Roadster", yearsFrom: 2018, yearsTo: null, image: img("g29-z4-30i") },
  { id: "g29-z4-m40i", series: "Z4", name: "Z4 M40i", body: "Roadster", yearsFrom: 2018, yearsTo: null, image: img("g29-z4-m40i") },

  { id: "i01-i3", series: "i", name: "i3", body: "Hatch", yearsFrom: 2013, yearsTo: 2022, image: img("i01-i3") },
  { id: "i01-i3s", series: "i", name: "i3s", body: "Hatch", yearsFrom: 2017, yearsTo: 2022, image: img("i01-i3s") },
  { id: "i01-i3rex", series: "i", name: "i3 Range Extender", body: "Hatch", yearsFrom: 2013, yearsTo: 2018, image: img("i01-i3rex") },
  { id: "g26-i4-40", series: "i", name: "i4 eDrive40", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, image: img("g26-i4-40") },
  { id: "g26-i4-m50", series: "i", name: "i4 M50", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, image: img("g26-i4-m50") },
  { id: "i20-ix-40", series: "i", name: "iX xDrive40", body: "SUV", yearsFrom: 2021, yearsTo: null, image: img("i20-ix-40") },
  { id: "i20-ix-50", series: "i", name: "iX xDrive50", body: "SUV", yearsFrom: 2021, yearsTo: null, image: img("i20-ix-50") },
  { id: "i20-ix-m60", series: "i", name: "iX M60", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("i20-ix-m60") },
];

export function findBmwModel(id: string | null | undefined): BmwModel | null {
  if (!id) return null;
  return BMW_MODELS.find((m) => m.id === id) ?? null;
}

export function resolveModelImage(modelId: string | null | undefined, modelName?: string): string {
  const found = findBmwModel(modelId);
  if (found) return found.image;
  if (modelId) return chassisPhotoForModelId(modelId);
  const hay = `${modelName ?? ""}`.toLowerCase();
  if (hay.includes("x7")) return PHOTO("g07");
  if (hay.includes("x6")) return PHOTO("g06");
  if (hay.includes("x5")) return PHOTO("g05");
  if (hay.includes("x4")) return PHOTO("g02");
  if (hay.includes("x3")) return PHOTO("g01");
  if (hay.includes("x2")) return PHOTO("f39");
  if (hay.includes("x1")) return PHOTO("u11");
  if (hay.includes("z4")) return PHOTO("g29");
  if (hay.includes("i3")) return PHOTO("i3");
  if (hay.includes("i4")) return PHOTO("i4");
  if (hay.includes("i5")) return PHOTO("i5");
  if (hay.includes("i7") || hay.includes("ix")) return PHOTO("ix");
  if (hay.includes("m3")) return PHOTO("g80");
  if (hay.includes("m4")) return PHOTO("g82");
  if (hay.includes("m5")) return PHOTO("g90");
  if (hay.includes("m2")) return PHOTO("g87");
  if (hay.includes("8")) return PHOTO("g15");
  if (hay.includes("7")) return PHOTO("g70");
  if (hay.includes("5")) return PHOTO("g60");
  if (hay.includes("4")) return PHOTO("g22");
  if (hay.includes("3")) return PHOTO("g20");
  if (hay.includes("2")) return PHOTO("g42");
  if (hay.includes("1")) return PHOTO("f40");
  return FALLBACK;
}

export function modelDisplayName(model: BmwModel): string {
  return `${model.series} ${model.name}`;
}

export function yearsForModel(model: BmwModel): number[] {
  const end = model.yearsTo ?? new Date().getFullYear();
  const years: number[] = [];
  for (let y = end; y >= model.yearsFrom; y -= 1) years.push(y);
  return years;
}

export const BMW_SERIES = Array.from(new Set(BMW_MODELS.map((m) => m.series)));
