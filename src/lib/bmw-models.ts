/** BMW passenger models offered on the EU market from model year 2010 onward. */
export type FuelType = "Petrol" | "Diesel" | "Plugin Hybrid" | "Electric";
export const FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "Plugin Hybrid", "Electric"];

export type BmwModel = {
  id: string;
  series: string;
  name: string;
  body: string;
  yearsFrom: number;
  yearsTo: number | null;
  fuel: FuelType;
  image: string;
};

const AVAILABLE = new Set<string>(["e70", "e71", "e84", "e89", "f01", "f06", "f10", "f10m5", "f11", "f12", "f13", "f15", "f16", "f20", "f22", "f25", "f26", "f30", "f31", "f32", "f33", "f36", "f39", "f40", "f44", "f45", "f46", "f48", "f80", "f82", "f87", "f90", "f91", "f95", "f96", "f97", "f98", "g01", "g02", "g05", "g06", "g07", "g08", "g09", "g11", "g15", "g16", "g20", "g21", "g22", "g26", "g29", "g30", "g32", "g42", "g45", "g60", "g70", "g80", "g81", "g82", "g87", "g90", "i3", "i4", "i5", "i7", "ix", "ix1", "u06", "u10", "u11"]);
const PHOTO = (slug: string) => `/cars/photos/${slug}.png`;
const FALLBACK = PHOTO("g20");

export function chassisPhotoForModelId(id: string): string {
  const key = id.toLowerCase();
  const rules: Array<[RegExp, string]> = [
    [/^i01/, "i3"],
    [/^i20/, "ix"],
    [/^g60-i5/, "i5"],
    [/^g70-i7/, "i7"],
    [/^u11-ix1/, "ix1"],
    [/^u10-ix2/, "u10"],
    [/^g08/, "g08"],
    [/^f10-m5/, "f10m5"],
    [/^f87/, "f87"],
    [/^g87/, "g87"],
    [/^f80/, "f80"],
    [/^g80/, "g80"],
    [/^g81/, "g81"],
    [/^f82|^f83/, "f82"],
    [/^g82|^g83/, "g82"],
    [/^f90/, "f90"],
    [/^g90/, "g90"],
    [/^f91|^f92|^f93/, "f91"],
    [/^f95|^f85/, "f95"],
    [/^f96|^f86/, "f96"],
    [/^f97/, "f97"],
    [/^f98/, "f98"],
    [/^g09/, "g09"],
    [/^g23/, "g22"],
    [/^g31/, "g30"],
    [/^g14/, "g15"],
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
  { id: "f20-116i", series: "1 Series", name: "116i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Petrol", image: img("f20-116i") },
  { id: "f20-118i", series: "1 Series", name: "118i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Petrol", image: img("f20-118i") },
  { id: "f20-120i", series: "1 Series", name: "120i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Petrol", image: img("f20-120i") },
  { id: "f20-125i", series: "1 Series", name: "125i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Petrol", image: img("f20-125i") },
  { id: "f20-m135i", series: "1 Series", name: "M135i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Petrol", image: img("f20-m135i") },
  { id: "f20-m140i", series: "1 Series", name: "M140i", body: "Hatch", yearsFrom: 2016, yearsTo: 2019, fuel: "Petrol", image: img("f20-m140i") },
  { id: "f20-116d", series: "1 Series", name: "116d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Diesel", image: img("f20-116d") },
  { id: "f20-118d", series: "1 Series", name: "118d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Diesel", image: img("f20-118d") },
  { id: "f20-120d", series: "1 Series", name: "120d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Diesel", image: img("f20-120d") },
  { id: "f20-125d", series: "1 Series", name: "125d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, fuel: "Diesel", image: img("f20-125d") },
  { id: "f40-116i", series: "1 Series", name: "116i (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f40-116i") },
  { id: "f40-118i", series: "1 Series", name: "118i (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f40-118i") },
  { id: "f40-120i", series: "1 Series", name: "120i (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f40-120i") },
  { id: "f40-m135i", series: "1 Series", name: "M135i xDrive (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f40-m135i") },
  { id: "f40-116d", series: "1 Series", name: "116d (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("f40-116d") },
  { id: "f40-118d", series: "1 Series", name: "118d (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("f40-118d") },
  { id: "f40-120d", series: "1 Series", name: "120d (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("f40-120d") },
  { id: "f22-218i", series: "2 Series", name: "218i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f22-218i") },
  { id: "f22-220i", series: "2 Series", name: "220i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f22-220i") },
  { id: "f22-230i", series: "2 Series", name: "230i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f22-230i") },
  { id: "f22-m235i", series: "2 Series", name: "M235i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f22-m235i") },
  { id: "f22-m240i", series: "2 Series", name: "M240i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2021, fuel: "Petrol", image: img("f22-m240i") },
  { id: "f22-218d", series: "2 Series", name: "218d Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Diesel", image: img("f22-218d") },
  { id: "f22-220d", series: "2 Series", name: "220d Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Diesel", image: img("f22-220d") },
  { id: "f22-225d", series: "2 Series", name: "225d Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, fuel: "Diesel", image: img("f22-225d") },
  { id: "f87-m2", series: "2 Series", name: "M2", body: "Coupé", yearsFrom: 2016, yearsTo: 2021, fuel: "Petrol", image: img("f87-m2") },
  { id: "f87-m2comp", series: "2 Series", name: "M2 Competition", body: "Coupé", yearsFrom: 2018, yearsTo: 2021, fuel: "Petrol", image: img("f87-m2comp") },
  { id: "f87-m2cs", series: "2 Series", name: "M2 CS", body: "Coupé", yearsFrom: 2020, yearsTo: 2021, fuel: "Petrol", image: img("f87-m2cs") },
  { id: "g42-220i", series: "2 Series", name: "220i Coupé (G42)", body: "Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g42-220i") },
  { id: "g42-230i", series: "2 Series", name: "230i Coupé (G42)", body: "Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g42-230i") },
  { id: "g42-m240i", series: "2 Series", name: "M240i xDrive Coupé (G42)", body: "Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g42-m240i") },
  { id: "g42-220d", series: "2 Series", name: "220d Coupé (G42)", body: "Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Diesel", image: img("g42-220d") },
  { id: "g87-m2", series: "2 Series", name: "M2 (G87)", body: "Coupé", yearsFrom: 2023, yearsTo: null, fuel: "Petrol", image: img("g87-m2") },
  { id: "f45-216i", series: "2 Series", name: "216i Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f45-216i") },
  { id: "f45-218i", series: "2 Series", name: "218i Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f45-218i") },
  { id: "f45-220i", series: "2 Series", name: "220i Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f45-220i") },
  { id: "f45-225i", series: "2 Series", name: "225i xDrive Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Petrol", image: img("f45-225i") },
  { id: "f45-216d", series: "2 Series", name: "216d Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Diesel", image: img("f45-216d") },
  { id: "f45-218d", series: "2 Series", name: "218d Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Diesel", image: img("f45-218d") },
  { id: "f45-220d", series: "2 Series", name: "220d Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Diesel", image: img("f45-220d") },
  { id: "f45-225xe", series: "2 Series", name: "225xe Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, fuel: "Plugin Hybrid", image: img("f45-225xe") },
  { id: "u06-216i", series: "2 Series", name: "216i Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u06-216i") },
  { id: "u06-218i", series: "2 Series", name: "218i Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u06-218i") },
  { id: "u06-220i", series: "2 Series", name: "220i Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u06-220i") },
  { id: "u06-223i", series: "2 Series", name: "223i Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u06-223i") },
  { id: "u06-230e", series: "2 Series", name: "230e xDrive Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Plugin Hybrid", image: img("u06-230e") },
  { id: "u06-218d", series: "2 Series", name: "218d Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Diesel", image: img("u06-218d") },
  { id: "u06-220d", series: "2 Series", name: "220d Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, fuel: "Diesel", image: img("u06-220d") },
  { id: "f46-216i", series: "2 Series", name: "216i Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("f46-216i") },
  { id: "f46-218i", series: "2 Series", name: "218i Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("f46-218i") },
  { id: "f46-220i", series: "2 Series", name: "220i Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("f46-220i") },
  { id: "f46-216d", series: "2 Series", name: "216d Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f46-216d") },
  { id: "f46-218d", series: "2 Series", name: "218d Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f46-218d") },
  { id: "f46-220d", series: "2 Series", name: "220d Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f46-220d") },
  { id: "f44-218i", series: "2 Series", name: "218i Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, fuel: "Petrol", image: img("f44-218i") },
  { id: "f44-220i", series: "2 Series", name: "220i Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, fuel: "Petrol", image: img("f44-220i") },
  { id: "f44-m235i", series: "2 Series", name: "M235i xDrive Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, fuel: "Petrol", image: img("f44-m235i") },
  { id: "f44-220d", series: "2 Series", name: "220d Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, fuel: "Diesel", image: img("f44-220d") },
  { id: "f30-316i", series: "3 Series", name: "316i", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Petrol", image: img("f30-316i") },
  { id: "f30-318i", series: "3 Series", name: "318i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, fuel: "Petrol", image: img("f30-318i") },
  { id: "f30-320i", series: "3 Series", name: "320i", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Petrol", image: img("f30-320i") },
  { id: "f30-328i", series: "3 Series", name: "328i", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Petrol", image: img("f30-328i") },
  { id: "f30-330i", series: "3 Series", name: "330i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, fuel: "Petrol", image: img("f30-330i") },
  { id: "f30-335i", series: "3 Series", name: "335i", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Petrol", image: img("f30-335i") },
  { id: "f30-340i", series: "3 Series", name: "340i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, fuel: "Petrol", image: img("f30-340i") },
  { id: "f30-316d", series: "3 Series", name: "316d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f30-316d") },
  { id: "f30-318d", series: "3 Series", name: "318d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f30-318d") },
  { id: "f30-320d", series: "3 Series", name: "320d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f30-320d") },
  { id: "f30-325d", series: "3 Series", name: "325d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f30-325d") },
  { id: "f30-330d", series: "3 Series", name: "330d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f30-330d") },
  { id: "f30-335d", series: "3 Series", name: "335d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f30-335d") },
  { id: "f30-330e", series: "3 Series", name: "330e", body: "Saloon", yearsFrom: 2016, yearsTo: 2019, fuel: "Plugin Hybrid", image: img("f30-330e") },
  { id: "f31-316d", series: "3 Series", name: "316d Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f31-316d") },
  { id: "f31-318d", series: "3 Series", name: "318d Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f31-318d") },
  { id: "f31-320d", series: "3 Series", name: "320d Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f31-320d") },
  { id: "f31-330d", series: "3 Series", name: "330d Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, fuel: "Diesel", image: img("f31-330d") },
  { id: "f31-320i", series: "3 Series", name: "320i Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, fuel: "Petrol", image: img("f31-320i") },
  { id: "f31-330i", series: "3 Series", name: "330i Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, fuel: "Petrol", image: img("f31-330i") },
  { id: "f80-m3", series: "3 Series", name: "M3 (F80)", body: "Saloon", yearsFrom: 2014, yearsTo: 2018, fuel: "Petrol", image: img("f80-m3") },
  { id: "g20-318i", series: "3 Series", name: "318i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g20-318i") },
  { id: "g20-320i", series: "3 Series", name: "320i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g20-320i") },
  { id: "g20-330i", series: "3 Series", name: "330i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g20-330i") },
  { id: "g20-m340i", series: "3 Series", name: "M340i xDrive", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g20-m340i") },
  { id: "g20-318d", series: "3 Series", name: "318d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g20-318d") },
  { id: "g20-320d", series: "3 Series", name: "320d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g20-320d") },
  { id: "g20-330d", series: "3 Series", name: "330d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g20-330d") },
  { id: "g20-330e", series: "3 Series", name: "330e", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Plugin Hybrid", image: img("g20-330e") },
  { id: "g20-320e", series: "3 Series", name: "320e", body: "Saloon", yearsFrom: 2019, yearsTo: null, fuel: "Plugin Hybrid", image: img("g20-320e") },
  { id: "g21-318i", series: "3 Series", name: "318i Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g21-318i") },
  { id: "g21-320i", series: "3 Series", name: "320i Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g21-320i") },
  { id: "g21-330i", series: "3 Series", name: "330i Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g21-330i") },
  { id: "g21-318d", series: "3 Series", name: "318d Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g21-318d") },
  { id: "g21-320d", series: "3 Series", name: "320d Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g21-320d") },
  { id: "g21-330d", series: "3 Series", name: "330d Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g21-330d") },
  { id: "g21-330e", series: "3 Series", name: "330e Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, fuel: "Plugin Hybrid", image: img("g21-330e") },
  { id: "g80-m3", series: "3 Series", name: "M3 (G80)", body: "Saloon", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g80-m3") },
  { id: "g80-m3comp", series: "3 Series", name: "M3 Competition", body: "Saloon", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g80-m3comp") },
  { id: "g81-m3", series: "3 Series", name: "M3 Touring", body: "Touring", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("g81-m3") },
  { id: "f32-420i", series: "4 Series", name: "420i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Petrol", image: img("f32-420i") },
  { id: "f32-428i", series: "4 Series", name: "428i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Petrol", image: img("f32-428i") },
  { id: "f32-430i", series: "4 Series", name: "430i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Petrol", image: img("f32-430i") },
  { id: "f32-435i", series: "4 Series", name: "435i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Petrol", image: img("f32-435i") },
  { id: "f32-440i", series: "4 Series", name: "440i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Petrol", image: img("f32-440i") },
  { id: "f32-420d", series: "4 Series", name: "420d Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Diesel", image: img("f32-420d") },
  { id: "f32-430d", series: "4 Series", name: "430d Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Diesel", image: img("f32-430d") },
  { id: "f32-435d", series: "4 Series", name: "435d Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, fuel: "Diesel", image: img("f32-435d") },
  { id: "f33-420i", series: "4 Series", name: "420i Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f33-420i") },
  { id: "f33-430i", series: "4 Series", name: "430i Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f33-430i") },
  { id: "f33-435i", series: "4 Series", name: "435i Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f33-435i") },
  { id: "f33-440i", series: "4 Series", name: "440i Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f33-440i") },
  { id: "f33-420d", series: "4 Series", name: "420d Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Diesel", image: img("f33-420d") },
  { id: "f33-430d", series: "4 Series", name: "430d Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Diesel", image: img("f33-430d") },
  { id: "f36-420i", series: "4 Series", name: "420i Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f36-420i") },
  { id: "f36-430i", series: "4 Series", name: "430i Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f36-430i") },
  { id: "f36-440i", series: "4 Series", name: "440i Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f36-440i") },
  { id: "f36-420d", series: "4 Series", name: "420d Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, fuel: "Diesel", image: img("f36-420d") },
  { id: "f36-430d", series: "4 Series", name: "430d Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, fuel: "Diesel", image: img("f36-430d") },
  { id: "f82-m4", series: "4 Series", name: "M4 (F82)", body: "Coupé", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f82-m4") },
  { id: "f83-m4", series: "4 Series", name: "M4 Convertible (F83)", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, fuel: "Petrol", image: img("f83-m4") },
  { id: "g22-420i", series: "4 Series", name: "420i Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, fuel: "Petrol", image: img("g22-420i") },
  { id: "g22-430i", series: "4 Series", name: "430i Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, fuel: "Petrol", image: img("g22-430i") },
  { id: "g22-m440i", series: "4 Series", name: "M440i xDrive Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, fuel: "Petrol", image: img("g22-m440i") },
  { id: "g22-420d", series: "4 Series", name: "420d Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, fuel: "Diesel", image: img("g22-420d") },
  { id: "g22-430d", series: "4 Series", name: "430d Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, fuel: "Diesel", image: img("g22-430d") },
  { id: "g23-420i", series: "4 Series", name: "420i Convertible (G23)", body: "Convertible", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g23-420i") },
  { id: "g23-430i", series: "4 Series", name: "430i Convertible (G23)", body: "Convertible", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g23-430i") },
  { id: "g23-m440i", series: "4 Series", name: "M440i xDrive Convertible (G23)", body: "Convertible", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g23-m440i") },
  { id: "g23-420d", series: "4 Series", name: "420d Convertible (G23)", body: "Convertible", yearsFrom: 2021, yearsTo: null, fuel: "Diesel", image: img("g23-420d") },
  { id: "g26-420i", series: "4 Series", name: "420i Gran Coupé", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g26-420i") },
  { id: "g26-430i", series: "4 Series", name: "430i Gran Coupé", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g26-430i") },
  { id: "g26-m440i", series: "4 Series", name: "M440i xDrive Gran Coupé", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g26-m440i") },
  { id: "g26-420d", series: "4 Series", name: "420d Gran Coupé", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Diesel", image: img("g26-420d") },
  { id: "g82-m4", series: "4 Series", name: "M4 (G82)", body: "Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g82-m4") },
  { id: "g82-m4comp", series: "4 Series", name: "M4 Competition", body: "Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g82-m4comp") },
  { id: "g83-m4", series: "4 Series", name: "M4 Convertible (G83)", body: "Convertible", yearsFrom: 2021, yearsTo: null, fuel: "Petrol", image: img("g83-m4") },
  { id: "f10-520i", series: "5 Series", name: "520i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f10-520i") },
  { id: "f10-523i", series: "5 Series", name: "523i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f10-523i") },
  { id: "f10-528i", series: "5 Series", name: "528i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f10-528i") },
  { id: "f10-530i", series: "5 Series", name: "530i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f10-530i") },
  { id: "f10-535i", series: "5 Series", name: "535i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f10-535i") },
  { id: "f10-550i", series: "5 Series", name: "550i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f10-550i") },
  { id: "f10-520d", series: "5 Series", name: "520d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f10-520d") },
  { id: "f10-525d", series: "5 Series", name: "525d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f10-525d") },
  { id: "f10-530d", series: "5 Series", name: "530d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f10-530d") },
  { id: "f10-535d", series: "5 Series", name: "535d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f10-535d") },
  { id: "f10-m550d", series: "5 Series", name: "M550d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f10-m550d") },
  { id: "f11-520i", series: "5 Series", name: "520i Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f11-520i") },
  { id: "f11-530i", series: "5 Series", name: "530i Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, fuel: "Petrol", image: img("f11-530i") },
  { id: "f11-520d", series: "5 Series", name: "520d Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f11-520d") },
  { id: "f11-525d", series: "5 Series", name: "525d Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f11-525d") },
  { id: "f11-530d", series: "5 Series", name: "530d Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f11-530d") },
  { id: "f11-535d", series: "5 Series", name: "535d Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, fuel: "Diesel", image: img("f11-535d") },
  { id: "f10-m5", series: "5 Series", name: "M5 (F10)", body: "Saloon", yearsFrom: 2011, yearsTo: 2016, fuel: "Petrol", image: img("f10-m5") },
  { id: "g30-520i", series: "5 Series", name: "520i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g30-520i") },
  { id: "g30-530i", series: "5 Series", name: "530i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g30-530i") },
  { id: "g30-540i", series: "5 Series", name: "540i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g30-540i") },
  { id: "g30-m550i", series: "5 Series", name: "M550i xDrive (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g30-m550i") },
  { id: "g30-520d", series: "5 Series", name: "520d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g30-520d") },
  { id: "g30-525d", series: "5 Series", name: "525d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g30-525d") },
  { id: "g30-530d", series: "5 Series", name: "530d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g30-530d") },
  { id: "g30-540d", series: "5 Series", name: "540d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g30-540d") },
  { id: "g30-m550d", series: "5 Series", name: "M550d xDrive (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g30-m550d") },
  { id: "g30-530e", series: "5 Series", name: "530e", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Plugin Hybrid", image: img("g30-530e") },
  { id: "g30-545e", series: "5 Series", name: "545e", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Plugin Hybrid", image: img("g30-545e") },
  { id: "g31-520i", series: "5 Series", name: "520i Touring (G31)", body: "Touring", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g31-520i") },
  { id: "g31-530i", series: "5 Series", name: "530i Touring (G31)", body: "Touring", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g31-530i") },
  { id: "g31-520d", series: "5 Series", name: "520d Touring (G31)", body: "Touring", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g31-520d") },
  { id: "g31-530d", series: "5 Series", name: "530d Touring (G31)", body: "Touring", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g31-530d") },
  { id: "g31-530e", series: "5 Series", name: "530e Touring (G31)", body: "Touring", yearsFrom: 2017, yearsTo: 2023, fuel: "Plugin Hybrid", image: img("g31-530e") },
  { id: "f90-m5", series: "5 Series", name: "M5 (F90)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("f90-m5") },
  { id: "g60-520i", series: "5 Series", name: "520i (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Petrol", image: img("g60-520i") },
  { id: "g60-530i", series: "5 Series", name: "530i (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Petrol", image: img("g60-530i") },
  { id: "g60-540i", series: "5 Series", name: "540i (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Petrol", image: img("g60-540i") },
  { id: "g60-520d", series: "5 Series", name: "520d (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Diesel", image: img("g60-520d") },
  { id: "g60-530d", series: "5 Series", name: "530d (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Diesel", image: img("g60-530d") },
  { id: "g60-530e", series: "5 Series", name: "530e (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Plugin Hybrid", image: img("g60-530e") },
  { id: "g60-550e", series: "5 Series", name: "550e (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Plugin Hybrid", image: img("g60-550e") },
  { id: "g60-i5-40", series: "5 Series", name: "i5 eDrive40", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Electric", image: img("g60-i5-40") },
  { id: "g60-i5-m60", series: "5 Series", name: "i5 M60 xDrive", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Electric", image: img("g60-i5-m60") },
  { id: "g90-m5", series: "5 Series", name: "M5 (G90)", body: "Saloon", yearsFrom: 2024, yearsTo: null, fuel: "Plugin Hybrid", image: img("g90-m5") },
  { id: "f06-640i", series: "6 Series", name: "640i Gran Coupé", body: "Gran Coupé", yearsFrom: 2012, yearsTo: 2018, fuel: "Petrol", image: img("f06-640i") },
  { id: "f12-640i", series: "6 Series", name: "640i Convertible", body: "Convertible", yearsFrom: 2011, yearsTo: 2018, fuel: "Petrol", image: img("f12-640i") },
  { id: "f13-640i", series: "6 Series", name: "640i Coupé", body: "Coupé", yearsFrom: 2011, yearsTo: 2018, fuel: "Petrol", image: img("f13-640i") },
  { id: "f06-650i", series: "6 Series", name: "650i Gran Coupé", body: "Gran Coupé", yearsFrom: 2012, yearsTo: 2018, fuel: "Petrol", image: img("f06-650i") },
  { id: "f12-650i", series: "6 Series", name: "650i Convertible", body: "Convertible", yearsFrom: 2011, yearsTo: 2018, fuel: "Petrol", image: img("f12-650i") },
  { id: "f13-650i", series: "6 Series", name: "650i Coupé", body: "Coupé", yearsFrom: 2011, yearsTo: 2018, fuel: "Petrol", image: img("f13-650i") },
  { id: "f06-640d", series: "6 Series", name: "640d Gran Coupé", body: "Gran Coupé", yearsFrom: 2012, yearsTo: 2018, fuel: "Diesel", image: img("f06-640d") },
  { id: "f12-640d", series: "6 Series", name: "640d Convertible", body: "Convertible", yearsFrom: 2011, yearsTo: 2018, fuel: "Diesel", image: img("f12-640d") },
  { id: "f13-640d", series: "6 Series", name: "640d Coupé", body: "Coupé", yearsFrom: 2011, yearsTo: 2018, fuel: "Diesel", image: img("f13-640d") },
  { id: "f06-m6", series: "6 Series", name: "M6 Gran Coupé", body: "Gran Coupé", yearsFrom: 2013, yearsTo: 2018, fuel: "Petrol", image: img("f06-m6") },
  { id: "g32-630i", series: "6 Series", name: "630i GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g32-630i") },
  { id: "g32-640i", series: "6 Series", name: "640i GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, fuel: "Petrol", image: img("g32-640i") },
  { id: "g32-630d", series: "6 Series", name: "630d GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g32-630d") },
  { id: "g32-640d", series: "6 Series", name: "640d GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, fuel: "Diesel", image: img("g32-640d") },
  { id: "f01-730i", series: "7 Series", name: "730i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("f01-730i") },
  { id: "f01-740i", series: "7 Series", name: "740i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("f01-740i") },
  { id: "f01-750i", series: "7 Series", name: "750i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("f01-750i") },
  { id: "f01-760i", series: "7 Series", name: "760i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("f01-760i") },
  { id: "f01-730d", series: "7 Series", name: "730d", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("f01-730d") },
  { id: "f01-740d", series: "7 Series", name: "740d", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("f01-740d") },
  { id: "f01-750d", series: "7 Series", name: "750d", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("f01-750d") },
  { id: "f01-activehybrid", series: "7 Series", name: "ActiveHybrid 7", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("f01-activehybrid") },
  { id: "g11-730i", series: "7 Series", name: "730i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("g11-730i") },
  { id: "g11-740i", series: "7 Series", name: "740i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("g11-740i") },
  { id: "g11-750i", series: "7 Series", name: "750i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("g11-750i") },
  { id: "g11-m760li", series: "7 Series", name: "M760Li xDrive (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("g11-m760li") },
  { id: "g11-730d", series: "7 Series", name: "730d (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("g11-730d") },
  { id: "g11-740d", series: "7 Series", name: "740d (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("g11-740d") },
  { id: "g11-750d", series: "7 Series", name: "750d (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("g11-750d") },
  { id: "g11-740e", series: "7 Series", name: "740e (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Plugin Hybrid", image: img("g11-740e") },
  { id: "g11-745e", series: "7 Series", name: "745e (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, fuel: "Plugin Hybrid", image: img("g11-745e") },
  { id: "g70-740i", series: "7 Series", name: "740i (G70)", body: "Saloon", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("g70-740i") },
  { id: "g70-750e", series: "7 Series", name: "750e xDrive (G70)", body: "Saloon", yearsFrom: 2022, yearsTo: null, fuel: "Plugin Hybrid", image: img("g70-750e") },
  { id: "g70-760i", series: "7 Series", name: "760i xDrive (G70)", body: "Saloon", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("g70-760i") },
  { id: "g70-i7-50", series: "7 Series", name: "i7 eDrive50", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Electric", image: img("g70-i7-50") },
  { id: "g70-i7-60", series: "7 Series", name: "i7 xDrive60", body: "Saloon", yearsFrom: 2022, yearsTo: null, fuel: "Electric", image: img("g70-i7-60") },
  { id: "g70-i7-m70", series: "7 Series", name: "i7 M70 xDrive", body: "Saloon", yearsFrom: 2023, yearsTo: null, fuel: "Electric", image: img("g70-i7-m70") },
  { id: "g15-840i", series: "8 Series", name: "840i Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g15-840i") },
  { id: "g14-840i", series: "8 Series", name: "840i Convertible", body: "Convertible", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g14-840i") },
  { id: "g16-840i", series: "8 Series", name: "840i Gran Coupé", body: "Gran Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g16-840i") },
  { id: "g15-m850i", series: "8 Series", name: "M850i xDrive Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g15-m850i") },
  { id: "g14-m850i", series: "8 Series", name: "M850i xDrive Convertible", body: "Convertible", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g14-m850i") },
  { id: "g16-m850i", series: "8 Series", name: "M850i xDrive Gran Coupé", body: "Gran Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g16-m850i") },
  { id: "g15-840d", series: "8 Series", name: "840d xDrive Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g15-840d") },
  { id: "g14-840d", series: "8 Series", name: "840d xDrive Convertible", body: "Convertible", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g14-840d") },
  { id: "g16-840d", series: "8 Series", name: "840d xDrive Gran Coupé", body: "Gran Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g16-840d") },
  { id: "f92-m8", series: "8 Series", name: "M8 Competition Coupé", body: "Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f92-m8") },
  { id: "f91-m8", series: "8 Series", name: "M8 Competition Convertible", body: "Convertible", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f91-m8") },
  { id: "f93-m8", series: "8 Series", name: "M8 Competition Gran Coupé", body: "Gran Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f93-m8") },
  { id: "e84-sdrive18i", series: "X1", name: "sDrive18i", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("e84-sdrive18i") },
  { id: "e84-xdrive20i", series: "X1", name: "xDrive20i", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("e84-xdrive20i") },
  { id: "e84-xdrive28i", series: "X1", name: "xDrive28i", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Petrol", image: img("e84-xdrive28i") },
  { id: "e84-sdrive16d", series: "X1", name: "sDrive16d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("e84-sdrive16d") },
  { id: "e84-sdrive18d", series: "X1", name: "sDrive18d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("e84-sdrive18d") },
  { id: "e84-xdrive20d", series: "X1", name: "xDrive20d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("e84-xdrive20d") },
  { id: "e84-xdrive25d", series: "X1", name: "xDrive25d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, fuel: "Diesel", image: img("e84-xdrive25d") },
  { id: "f48-sdrive18i", series: "X1", name: "sDrive18i", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("f48-sdrive18i") },
  { id: "f48-xdrive20i", series: "X1", name: "xDrive20i", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("f48-xdrive20i") },
  { id: "f48-xdrive25i", series: "X1", name: "xDrive25i", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Petrol", image: img("f48-xdrive25i") },
  { id: "f48-sdrive16d", series: "X1", name: "sDrive16d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f48-sdrive16d") },
  { id: "f48-sdrive18d", series: "X1", name: "sDrive18d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f48-sdrive18d") },
  { id: "f48-xdrive20d", series: "X1", name: "xDrive20d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f48-xdrive20d") },
  { id: "f48-xdrive25d", series: "X1", name: "xDrive25d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Diesel", image: img("f48-xdrive25d") },
  { id: "f48-xdrive25e", series: "X1", name: "xDrive25e", body: "SUV", yearsFrom: 2015, yearsTo: 2022, fuel: "Plugin Hybrid", image: img("f48-xdrive25e") },
  { id: "u11-sdrive18i", series: "X1", name: "sDrive18i", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u11-sdrive18i") },
  { id: "u11-xdrive20i", series: "X1", name: "xDrive20i", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u11-xdrive20i") },
  { id: "u11-xdrive23i", series: "X1", name: "xDrive23i", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u11-xdrive23i") },
  { id: "u11-m35i", series: "X1", name: "M35i", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Petrol", image: img("u11-m35i") },
  { id: "u11-sdrive18d", series: "X1", name: "sDrive18d", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Diesel", image: img("u11-sdrive18d") },
  { id: "u11-xdrive20d", series: "X1", name: "xDrive20d", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Diesel", image: img("u11-xdrive20d") },
  { id: "u11-xdrive23d", series: "X1", name: "xDrive23d", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Diesel", image: img("u11-xdrive23d") },
  { id: "u11-xdrive25e", series: "X1", name: "xDrive25e", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Plugin Hybrid", image: img("u11-xdrive25e") },
  { id: "u11-xdrive30e", series: "X1", name: "xDrive30e", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Plugin Hybrid", image: img("u11-xdrive30e") },
  { id: "u11-ix1-30", series: "X1", name: "iX1 xDrive30", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Electric", image: img("u11-ix1-30") },
  { id: "f39-sdrive18i", series: "X2", name: "sDrive18i", body: "SUV", yearsFrom: 2018, yearsTo: 2023, fuel: "Petrol", image: img("f39-sdrive18i") },
  { id: "f39-xdrive20i", series: "X2", name: "xDrive20i", body: "SUV", yearsFrom: 2018, yearsTo: 2023, fuel: "Petrol", image: img("f39-xdrive20i") },
  { id: "f39-m35i", series: "X2", name: "M35i", body: "SUV", yearsFrom: 2018, yearsTo: 2023, fuel: "Petrol", image: img("f39-m35i") },
  { id: "f39-sdrive18d", series: "X2", name: "sDrive18d", body: "SUV", yearsFrom: 2018, yearsTo: 2023, fuel: "Diesel", image: img("f39-sdrive18d") },
  { id: "f39-xdrive20d", series: "X2", name: "xDrive20d", body: "SUV", yearsFrom: 2018, yearsTo: 2023, fuel: "Diesel", image: img("f39-xdrive20d") },
  { id: "u10-sdrive20i", series: "X2", name: "sDrive20i (U10)", body: "SUV", yearsFrom: 2023, yearsTo: null, fuel: "Petrol", image: img("u10-sdrive20i") },
  { id: "u10-m35i", series: "X2", name: "M35i (U10)", body: "SUV", yearsFrom: 2023, yearsTo: null, fuel: "Petrol", image: img("u10-m35i") },
  { id: "u10-sdrive20d", series: "X2", name: "sDrive20d (U10)", body: "SUV", yearsFrom: 2023, yearsTo: null, fuel: "Diesel", image: img("u10-sdrive20d") },
  { id: "u10-xdrive20d", series: "X2", name: "xDrive20d (U10)", body: "SUV", yearsFrom: 2023, yearsTo: null, fuel: "Diesel", image: img("u10-xdrive20d") },
  { id: "u10-ix2", series: "X2", name: "iX2 xDrive30", body: "SUV", yearsFrom: 2024, yearsTo: null, fuel: "Electric", image: img("u10-ix2") },
  { id: "f25-xdrive20i", series: "X3", name: "xDrive20i", body: "SUV", yearsFrom: 2011, yearsTo: 2017, fuel: "Petrol", image: img("f25-xdrive20i") },
  { id: "f25-xdrive28i", series: "X3", name: "xDrive28i", body: "SUV", yearsFrom: 2011, yearsTo: 2017, fuel: "Petrol", image: img("f25-xdrive28i") },
  { id: "f25-xdrive35i", series: "X3", name: "xDrive35i", body: "SUV", yearsFrom: 2011, yearsTo: 2017, fuel: "Petrol", image: img("f25-xdrive35i") },
  { id: "f25-xdrive20d", series: "X3", name: "xDrive20d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, fuel: "Diesel", image: img("f25-xdrive20d") },
  { id: "f25-xdrive30d", series: "X3", name: "xDrive30d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, fuel: "Diesel", image: img("f25-xdrive30d") },
  { id: "f25-xdrive35d", series: "X3", name: "xDrive35d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, fuel: "Diesel", image: img("f25-xdrive35d") },
  { id: "g01-sdrive18d", series: "X3", name: "sDrive18d", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Diesel", image: img("g01-sdrive18d") },
  { id: "g01-xdrive20i", series: "X3", name: "xDrive20i", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Petrol", image: img("g01-xdrive20i") },
  { id: "g01-xdrive30i", series: "X3", name: "xDrive30i", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Petrol", image: img("g01-xdrive30i") },
  { id: "g01-m40i", series: "X3", name: "M40i", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Petrol", image: img("g01-m40i") },
  { id: "g01-xdrive20d", series: "X3", name: "xDrive20d", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Diesel", image: img("g01-xdrive20d") },
  { id: "g01-xdrive30d", series: "X3", name: "xDrive30d", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Diesel", image: img("g01-xdrive30d") },
  { id: "g01-m40d", series: "X3", name: "M40d", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Diesel", image: img("g01-m40d") },
  { id: "g01-xdrive30e", series: "X3", name: "xDrive30e", body: "SUV", yearsFrom: 2017, yearsTo: 2024, fuel: "Plugin Hybrid", image: img("g01-xdrive30e") },
  { id: "f97-x3m", series: "X3", name: "M", body: "SUV", yearsFrom: 2019, yearsTo: 2024, fuel: "Petrol", image: img("f97-x3m") },
  { id: "f97-x3mcomp", series: "X3", name: "M Competition", body: "SUV", yearsFrom: 2019, yearsTo: 2024, fuel: "Petrol", image: img("f97-x3mcomp") },
  { id: "g08-ix3", series: "X3", name: "iX3", body: "SUV", yearsFrom: 2020, yearsTo: null, fuel: "Electric", image: img("g08-ix3") },
  { id: "g45-xdrive20", series: "X3", name: "xDrive20 (G45)", body: "SUV", yearsFrom: 2024, yearsTo: null, fuel: "Petrol", image: img("g45-xdrive20") },
  { id: "g45-xdrive30e", series: "X3", name: "xDrive30e (G45)", body: "SUV", yearsFrom: 2024, yearsTo: null, fuel: "Plugin Hybrid", image: img("g45-xdrive30e") },
  { id: "g45-m50", series: "X3", name: "M50 (G45)", body: "SUV", yearsFrom: 2024, yearsTo: null, fuel: "Petrol", image: img("g45-m50") },
  { id: "f26-xdrive20d", series: "X4", name: "xDrive20d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Diesel", image: img("f26-xdrive20d") },
  { id: "f26-xdrive30d", series: "X4", name: "xDrive30d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Diesel", image: img("f26-xdrive30d") },
  { id: "f26-xdrive35d", series: "X4", name: "xDrive35d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Diesel", image: img("f26-xdrive35d") },
  { id: "f26-xdrive20i", series: "X4", name: "xDrive20i", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Petrol", image: img("f26-xdrive20i") },
  { id: "f26-xdrive28i", series: "X4", name: "xDrive28i", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Petrol", image: img("f26-xdrive28i") },
  { id: "f26-xdrive35i", series: "X4", name: "xDrive35i", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Petrol", image: img("f26-xdrive35i") },
  { id: "f26-m40i", series: "X4", name: "M40i", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, fuel: "Petrol", image: img("f26-m40i") },
  { id: "g02-xdrive20i", series: "X4", name: "xDrive20i", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g02-xdrive20i") },
  { id: "g02-xdrive30i", series: "X4", name: "xDrive30i", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g02-xdrive30i") },
  { id: "g02-m40i", series: "X4", name: "M40i", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g02-m40i") },
  { id: "g02-xdrive20d", series: "X4", name: "xDrive20d", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g02-xdrive20d") },
  { id: "g02-xdrive30d", series: "X4", name: "xDrive30d", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g02-xdrive30d") },
  { id: "g02-m40d", series: "X4", name: "M40d", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g02-m40d") },
  { id: "f98-x4m", series: "X4", name: "M", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f98-x4m") },
  { id: "e70-xdrive35i", series: "X5", name: "xDrive35i", body: "SUV", yearsFrom: 2010, yearsTo: 2013, fuel: "Petrol", image: img("e70-xdrive35i") },
  { id: "e70-xdrive50i", series: "X5", name: "xDrive50i", body: "SUV", yearsFrom: 2010, yearsTo: 2013, fuel: "Petrol", image: img("e70-xdrive50i") },
  { id: "e70-xdrive30d", series: "X5", name: "xDrive30d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, fuel: "Diesel", image: img("e70-xdrive30d") },
  { id: "e70-xdrive40d", series: "X5", name: "xDrive40d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, fuel: "Diesel", image: img("e70-xdrive40d") },
  { id: "e70-m50d", series: "X5", name: "M50d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, fuel: "Diesel", image: img("e70-m50d") },
  { id: "e70-x5m", series: "X5", name: "M (E70)", body: "SUV", yearsFrom: 2010, yearsTo: 2013, fuel: "Petrol", image: img("e70-x5m") },
  { id: "f15-sdrive25d", series: "X5", name: "sDrive25d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Diesel", image: img("f15-sdrive25d") },
  { id: "f15-xdrive25d", series: "X5", name: "xDrive25d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Diesel", image: img("f15-xdrive25d") },
  { id: "f15-xdrive30d", series: "X5", name: "xDrive30d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Diesel", image: img("f15-xdrive30d") },
  { id: "f15-xdrive40d", series: "X5", name: "xDrive40d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Diesel", image: img("f15-xdrive40d") },
  { id: "f15-m50d", series: "X5", name: "M50d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Diesel", image: img("f15-m50d") },
  { id: "f15-xdrive35i", series: "X5", name: "xDrive35i", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Petrol", image: img("f15-xdrive35i") },
  { id: "f15-xdrive40e", series: "X5", name: "xDrive40e", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Plugin Hybrid", image: img("f15-xdrive40e") },
  { id: "f15-xdrive50i", series: "X5", name: "xDrive50i", body: "SUV", yearsFrom: 2013, yearsTo: 2018, fuel: "Petrol", image: img("f15-xdrive50i") },
  { id: "f85-x5m", series: "X5", name: "M (F85)", body: "SUV", yearsFrom: 2015, yearsTo: 2018, fuel: "Petrol", image: img("f85-x5m") },
  { id: "g05-xdrive30d", series: "X5", name: "xDrive30d", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g05-xdrive30d") },
  { id: "g05-xdrive40d", series: "X5", name: "xDrive40d", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g05-xdrive40d") },
  { id: "g05-m50d", series: "X5", name: "M50d", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Diesel", image: img("g05-m50d") },
  { id: "g05-xdrive40i", series: "X5", name: "xDrive40i", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g05-xdrive40i") },
  { id: "g05-xdrive45e", series: "X5", name: "xDrive45e", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Plugin Hybrid", image: img("g05-xdrive45e") },
  { id: "g05-xdrive50e", series: "X5", name: "xDrive50e", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Plugin Hybrid", image: img("g05-xdrive50e") },
  { id: "g05-m60i", series: "X5", name: "M60i", body: "SUV", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g05-m60i") },
  { id: "f95-x5m", series: "X5", name: "M (F95)", body: "SUV", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f95-x5m") },
  { id: "e71-xdrive35i", series: "X6", name: "xDrive35i", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, fuel: "Petrol", image: img("e71-xdrive35i") },
  { id: "e71-xdrive50i", series: "X6", name: "xDrive50i", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, fuel: "Petrol", image: img("e71-xdrive50i") },
  { id: "e71-xdrive30d", series: "X6", name: "xDrive30d", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, fuel: "Diesel", image: img("e71-xdrive30d") },
  { id: "e71-xdrive40d", series: "X6", name: "xDrive40d", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, fuel: "Diesel", image: img("e71-xdrive40d") },
  { id: "e71-x6m", series: "X6", name: "M (E71)", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, fuel: "Petrol", image: img("e71-x6m") },
  { id: "f16-xdrive30d", series: "X6", name: "xDrive30d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, fuel: "Diesel", image: img("f16-xdrive30d") },
  { id: "f16-xdrive40d", series: "X6", name: "xDrive40d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, fuel: "Diesel", image: img("f16-xdrive40d") },
  { id: "f16-m50d", series: "X6", name: "M50d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, fuel: "Diesel", image: img("f16-m50d") },
  { id: "f16-xdrive35i", series: "X6", name: "xDrive35i", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, fuel: "Petrol", image: img("f16-xdrive35i") },
  { id: "f16-xdrive50i", series: "X6", name: "xDrive50i", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, fuel: "Petrol", image: img("f16-xdrive50i") },
  { id: "f86-x6m", series: "X6", name: "M (F86)", body: "SUV Coupé", yearsFrom: 2015, yearsTo: 2019, fuel: "Petrol", image: img("f86-x6m") },
  { id: "g06-xdrive30d", series: "X6", name: "xDrive30d", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g06-xdrive30d") },
  { id: "g06-xdrive40d", series: "X6", name: "xDrive40d", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g06-xdrive40d") },
  { id: "g06-xdrive40i", series: "X6", name: "xDrive40i", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g06-xdrive40i") },
  { id: "g06-m60i", series: "X6", name: "M60i", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g06-m60i") },
  { id: "f96-x6m", series: "X6", name: "M (F96)", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("f96-x6m") },
  { id: "g07-xdrive30d", series: "X7", name: "xDrive30d", body: "SUV", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g07-xdrive30d") },
  { id: "g07-xdrive40d", series: "X7", name: "xDrive40d", body: "SUV", yearsFrom: 2019, yearsTo: null, fuel: "Diesel", image: img("g07-xdrive40d") },
  { id: "g07-xdrive40i", series: "X7", name: "xDrive40i", body: "SUV", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g07-xdrive40i") },
  { id: "g07-m60i", series: "X7", name: "M60i", body: "SUV", yearsFrom: 2019, yearsTo: null, fuel: "Petrol", image: img("g07-m60i") },
  { id: "g09-xm", series: "XM", name: "XM", body: "SUV", yearsFrom: 2023, yearsTo: null, fuel: "Plugin Hybrid", image: img("g09-xm") },
  { id: "g09-xm-label", series: "XM", name: "Label Red", body: "SUV", yearsFrom: 2023, yearsTo: null, fuel: "Plugin Hybrid", image: img("g09-xm-label") },
  { id: "e89-sdrive18i", series: "Z4", name: "sDrive18i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive18i") },
  { id: "e89-sdrive20i", series: "Z4", name: "sDrive20i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive20i") },
  { id: "e89-sdrive23i", series: "Z4", name: "sDrive23i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive23i") },
  { id: "e89-sdrive28i", series: "Z4", name: "sDrive28i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive28i") },
  { id: "e89-sdrive30i", series: "Z4", name: "sDrive30i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive30i") },
  { id: "e89-sdrive35i", series: "Z4", name: "sDrive35i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive35i") },
  { id: "e89-sdrive35is", series: "Z4", name: "sDrive35is", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, fuel: "Petrol", image: img("e89-sdrive35is") },
  { id: "g29-sdrive20i", series: "Z4", name: "sDrive20i", body: "Roadster", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g29-sdrive20i") },
  { id: "g29-sdrive30i", series: "Z4", name: "sDrive30i", body: "Roadster", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g29-sdrive30i") },
  { id: "g29-m40i", series: "Z4", name: "M40i", body: "Roadster", yearsFrom: 2018, yearsTo: null, fuel: "Petrol", image: img("g29-m40i") },
  { id: "i01-i3", series: "i", name: "i3", body: "Hatch", yearsFrom: 2013, yearsTo: 2022, fuel: "Electric", image: img("i01-i3") },
  { id: "i01-i3s", series: "i", name: "i3s", body: "Hatch", yearsFrom: 2017, yearsTo: 2022, fuel: "Electric", image: img("i01-i3s") },
  { id: "i01-i3rex", series: "i", name: "i3 Range Extender", body: "Hatch", yearsFrom: 2013, yearsTo: 2018, fuel: "Plugin Hybrid", image: img("i01-i3rex") },
  { id: "g26-i4-35", series: "i", name: "i4 eDrive35", body: "Gran Coupé", yearsFrom: 2022, yearsTo: null, fuel: "Electric", image: img("g26-i4-35") },
  { id: "g26-i4-40", series: "i", name: "i4 eDrive40", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Electric", image: img("g26-i4-40") },
  { id: "g26-i4-m50", series: "i", name: "i4 M50", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, fuel: "Electric", image: img("g26-i4-m50") },
  { id: "i20-ix-40", series: "i", name: "iX xDrive40", body: "SUV", yearsFrom: 2021, yearsTo: null, fuel: "Electric", image: img("i20-ix-40") },
  { id: "i20-ix-50", series: "i", name: "iX xDrive50", body: "SUV", yearsFrom: 2021, yearsTo: null, fuel: "Electric", image: img("i20-ix-50") },
  { id: "i20-ix-m60", series: "i", name: "iX M60", body: "SUV", yearsFrom: 2022, yearsTo: null, fuel: "Electric", image: img("i20-ix-m60") },
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
  const name = model.name.trim();
  if (name.toLowerCase().startsWith(model.series.toLowerCase())) return name;
  return `${model.series} ${name}`;
}

export function yearsForModel(model: BmwModel): number[] {
  const end = model.yearsTo ?? new Date().getFullYear();
  const years: number[] = [];
  for (let y = end; y >= model.yearsFrom; y -= 1) years.push(y);
  return years;
}

export function yearsForSeries(series: string): number[] {
  const models = BMW_MODELS.filter((m) => m.series === series);
  if (!models.length) return [];
  const from = Math.min(...models.map((m) => m.yearsFrom));
  const to = Math.max(...models.map((m) => m.yearsTo ?? new Date().getFullYear()));
  const years: number[] = [];
  for (let y = to; y >= from; y -= 1) years.push(y);
  return years;
}

export function seriesImage(series: string): string {
  const first = BMW_MODELS.find((m) => m.series === series);
  return first?.image ?? FALLBACK;
}

export const BMW_SERIES = Array.from(new Set(BMW_MODELS.map((m) => m.series)));
