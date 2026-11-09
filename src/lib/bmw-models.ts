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

const img = (slug: string) => `/cars/${slug}.svg`;

export const BMW_MODELS: BmwModel[] = [
  { id: "f20-116i", series: "1 Series", name: "116i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("1-series") },
  { id: "f20-118i", series: "1 Series", name: "118i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("1-series") },
  { id: "f20-120i", series: "1 Series", name: "120i", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("1-series") },
  { id: "f20-125i", series: "1 Series", name: "125i", body: "Hatch", yearsFrom: 2012, yearsTo: 2019, image: img("1-series") },
  { id: "f20-m135i", series: "1 Series", name: "M135i", body: "Hatch", yearsFrom: 2012, yearsTo: 2019, image: img("1-series") },
  { id: "f20-116d", series: "1 Series", name: "116d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("1-series") },
  { id: "f20-118d", series: "1 Series", name: "118d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("1-series") },
  { id: "f20-120d", series: "1 Series", name: "120d", body: "Hatch", yearsFrom: 2011, yearsTo: 2019, image: img("1-series") },
  { id: "f40-118i", series: "1 Series", name: "118i (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, image: img("1-series") },
  { id: "f40-120i", series: "1 Series", name: "120i (F40)", body: "Hatch", yearsFrom: 2020, yearsTo: null, image: img("1-series") },
  { id: "f40-m135i", series: "1 Series", name: "M135i xDrive", body: "Hatch", yearsFrom: 2019, yearsTo: null, image: img("1-series") },
  { id: "f40-118d", series: "1 Series", name: "118d (F40)", body: "Hatch", yearsFrom: 2019, yearsTo: null, image: img("1-series") },

  { id: "f22-218i", series: "2 Series", name: "218i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, image: img("2-series") },
  { id: "f22-220i", series: "2 Series", name: "220i Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, image: img("2-series") },
  { id: "f22-230i", series: "2 Series", name: "230i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2021, image: img("2-series") },
  { id: "f22-220d", series: "2 Series", name: "220d Coupé", body: "Coupé", yearsFrom: 2014, yearsTo: 2021, image: img("2-series") },
  { id: "f22-m235i", series: "2 Series", name: "M235i", body: "Coupé", yearsFrom: 2014, yearsTo: 2016, image: img("m2") },
  { id: "f87-m2", series: "2 Series", name: "M2", body: "Coupé", yearsFrom: 2016, yearsTo: 2021, image: img("m2") },
  { id: "g42-220i", series: "2 Series", name: "220i Coupé (G42)", body: "Coupé", yearsFrom: 2021, yearsTo: null, image: img("2-series") },
  { id: "g87-m2", series: "2 Series", name: "M2 (G87)", body: "Coupé", yearsFrom: 2023, yearsTo: null, image: img("m2") },
  { id: "f45-218i", series: "2 Series", name: "218i Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, image: img("2-active-tourer") },
  { id: "f45-220d", series: "2 Series", name: "220d Active Tourer", body: "MPV", yearsFrom: 2014, yearsTo: 2021, image: img("2-active-tourer") },
  { id: "u06-220i", series: "2 Series", name: "220i Active Tourer", body: "MPV", yearsFrom: 2022, yearsTo: null, image: img("2-active-tourer") },
  { id: "f46-216d", series: "2 Series", name: "216d Gran Tourer", body: "MPV", yearsFrom: 2015, yearsTo: 2022, image: img("2-active-tourer") },
  { id: "f44-218i", series: "2 Series", name: "218i Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, image: img("2-series") },
  { id: "f44-m235i", series: "2 Series", name: "M235i Gran Coupé", body: "Saloon", yearsFrom: 2020, yearsTo: null, image: img("m2") },

  { id: "f30-316i", series: "3 Series", name: "316i", body: "Saloon", yearsFrom: 2012, yearsTo: 2015, image: img("3-series") },
  { id: "f30-318i", series: "3 Series", name: "318i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, image: img("3-series") },
  { id: "f30-320i", series: "3 Series", name: "320i", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("3-series") },
  { id: "f30-330i", series: "3 Series", name: "330i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, image: img("3-series") },
  { id: "f30-340i", series: "3 Series", name: "340i", body: "Saloon", yearsFrom: 2015, yearsTo: 2019, image: img("3-series") },
  { id: "f30-316d", series: "3 Series", name: "316d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("3-series") },
  { id: "f30-318d", series: "3 Series", name: "318d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("3-series") },
  { id: "f30-320d", series: "3 Series", name: "320d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("3-series") },
  { id: "f30-330d", series: "3 Series", name: "330d", body: "Saloon", yearsFrom: 2012, yearsTo: 2019, image: img("3-series") },
  { id: "f30-335d", series: "3 Series", name: "335d", body: "Saloon", yearsFrom: 2013, yearsTo: 2019, image: img("3-series") },
  { id: "f31-320d", series: "3 Series", name: "320d Touring", body: "Touring", yearsFrom: 2012, yearsTo: 2019, image: img("3-series") },
  { id: "f80-m3", series: "3 Series", name: "M3 (F80)", body: "Saloon", yearsFrom: 2014, yearsTo: 2018, image: img("m3") },
  { id: "g20-318i", series: "3 Series", name: "318i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g20-320i", series: "3 Series", name: "320i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g20-330i", series: "3 Series", name: "330i (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g20-330e", series: "3 Series", name: "330e", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g20-m340i", series: "3 Series", name: "M340i xDrive", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("m3") },
  { id: "g20-320d", series: "3 Series", name: "320d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g20-330d", series: "3 Series", name: "330d (G20)", body: "Saloon", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g21-320d", series: "3 Series", name: "320d Touring (G21)", body: "Touring", yearsFrom: 2019, yearsTo: null, image: img("3-series") },
  { id: "g80-m3", series: "3 Series", name: "M3 (G80)", body: "Saloon", yearsFrom: 2021, yearsTo: null, image: img("m3") },
  { id: "g81-m3", series: "3 Series", name: "M3 Touring", body: "Touring", yearsFrom: 2022, yearsTo: null, image: img("m3") },

  { id: "f32-420i", series: "4 Series", name: "420i Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, image: img("4-series") },
  { id: "f32-430i", series: "4 Series", name: "430i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2020, image: img("4-series") },
  { id: "f32-440i", series: "4 Series", name: "440i Coupé", body: "Coupé", yearsFrom: 2016, yearsTo: 2020, image: img("4-series") },
  { id: "f32-420d", series: "4 Series", name: "420d Coupé", body: "Coupé", yearsFrom: 2013, yearsTo: 2020, image: img("4-series") },
  { id: "f33-420i", series: "4 Series", name: "420i Convertible", body: "Convertible", yearsFrom: 2014, yearsTo: 2020, image: img("4-series") },
  { id: "f36-420d", series: "4 Series", name: "420d Gran Coupé", body: "Gran Coupé", yearsFrom: 2014, yearsTo: 2020, image: img("4-series") },
  { id: "f82-m4", series: "4 Series", name: "M4 (F82)", body: "Coupé", yearsFrom: 2014, yearsTo: 2020, image: img("m4") },
  { id: "g22-420i", series: "4 Series", name: "420i Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("4-series") },
  { id: "g22-430i", series: "4 Series", name: "430i Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("4-series") },
  { id: "g22-m440i", series: "4 Series", name: "M440i xDrive", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("m4") },
  { id: "g22-420d", series: "4 Series", name: "420d Coupé (G22)", body: "Coupé", yearsFrom: 2020, yearsTo: null, image: img("4-series") },
  { id: "g26-420i", series: "4 Series", name: "420i Gran Coupé", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, image: img("4-series") },
  { id: "g82-m4", series: "4 Series", name: "M4 (G82)", body: "Coupé", yearsFrom: 2021, yearsTo: null, image: img("m4") },

  { id: "f10-520i", series: "5 Series", name: "520i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-528i", series: "5 Series", name: "528i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-530i", series: "5 Series", name: "530i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-535i", series: "5 Series", name: "535i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-550i", series: "5 Series", name: "550i", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-520d", series: "5 Series", name: "520d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-525d", series: "5 Series", name: "525d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-530d", series: "5 Series", name: "530d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-535d", series: "5 Series", name: "535d", body: "Saloon", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f11-520d", series: "5 Series", name: "520d Touring", body: "Touring", yearsFrom: 2010, yearsTo: 2017, image: img("5-series") },
  { id: "f10-m5", series: "5 Series", name: "M5 (F10)", body: "Saloon", yearsFrom: 2011, yearsTo: 2016, image: img("m5") },
  { id: "g30-520i", series: "5 Series", name: "520i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("5-series") },
  { id: "g30-530i", series: "5 Series", name: "530i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("5-series") },
  { id: "g30-540i", series: "5 Series", name: "540i (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("5-series") },
  { id: "g30-530e", series: "5 Series", name: "530e", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("5-series") },
  { id: "g30-520d", series: "5 Series", name: "520d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("5-series") },
  { id: "g30-530d", series: "5 Series", name: "530d (G30)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("5-series") },
  { id: "g30-m550d", series: "5 Series", name: "M550d xDrive", body: "Saloon", yearsFrom: 2017, yearsTo: 2020, image: img("m5") },
  { id: "f90-m5", series: "5 Series", name: "M5 (F90)", body: "Saloon", yearsFrom: 2017, yearsTo: 2023, image: img("m5") },
  { id: "g60-520i", series: "5 Series", name: "520i (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("5-series") },
  { id: "g60-530e", series: "5 Series", name: "530e (G60)", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("5-series") },
  { id: "g60-i5", series: "5 Series", name: "i5 eDrive40", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("i4") },
  { id: "g60-m5", series: "5 Series", name: "M5 (G90)", body: "Saloon", yearsFrom: 2024, yearsTo: null, image: img("m5") },

  { id: "f06-640d", series: "6 Series", name: "640d Gran Coupé", body: "Gran Coupé", yearsFrom: 2012, yearsTo: 2018, image: img("6-series") },
  { id: "f12-640i", series: "6 Series", name: "640i Convertible", body: "Convertible", yearsFrom: 2011, yearsTo: 2018, image: img("6-series") },
  { id: "f13-650i", series: "6 Series", name: "650i Coupé", body: "Coupé", yearsFrom: 2011, yearsTo: 2018, image: img("6-series") },
  { id: "f06-m6", series: "6 Series", name: "M6 Gran Coupé", body: "Gran Coupé", yearsFrom: 2013, yearsTo: 2018, image: img("m8") },
  { id: "g32-630d", series: "6 Series", name: "630d GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, image: img("6-series") },
  { id: "g32-640i", series: "6 Series", name: "640i GT", body: "Gran Turismo", yearsFrom: 2017, yearsTo: 2023, image: img("6-series") },

  { id: "f01-730d", series: "7 Series", name: "730d", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, image: img("7-series") },
  { id: "f01-740i", series: "7 Series", name: "740i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, image: img("7-series") },
  { id: "f01-750i", series: "7 Series", name: "750i", body: "Saloon", yearsFrom: 2010, yearsTo: 2015, image: img("7-series") },
  { id: "g11-730d", series: "7 Series", name: "730d (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, image: img("7-series") },
  { id: "g11-740i", series: "7 Series", name: "740i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, image: img("7-series") },
  { id: "g11-740e", series: "7 Series", name: "740e / 745e", body: "Saloon", yearsFrom: 2016, yearsTo: 2022, image: img("7-series") },
  { id: "g11-750i", series: "7 Series", name: "750i (G11)", body: "Saloon", yearsFrom: 2015, yearsTo: 2022, image: img("7-series") },
  { id: "g11-m760li", series: "7 Series", name: "M760Li xDrive", body: "Saloon", yearsFrom: 2016, yearsTo: 2022, image: img("7-series") },
  { id: "g70-740i", series: "7 Series", name: "740i (G70)", body: "Saloon", yearsFrom: 2022, yearsTo: null, image: img("7-series") },
  { id: "g70-750e", series: "7 Series", name: "750e xDrive", body: "Saloon", yearsFrom: 2023, yearsTo: null, image: img("7-series") },
  { id: "g70-i7", series: "7 Series", name: "i7 xDrive60", body: "Saloon", yearsFrom: 2022, yearsTo: null, image: img("ix") },

  { id: "g15-840i", series: "8 Series", name: "840i Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, image: img("8-series") },
  { id: "g15-840d", series: "8 Series", name: "840d xDrive Coupé", body: "Coupé", yearsFrom: 2018, yearsTo: null, image: img("8-series") },
  { id: "g15-m850i", series: "8 Series", name: "M850i xDrive", body: "Coupé", yearsFrom: 2018, yearsTo: null, image: img("m8") },
  { id: "f91-m8", series: "8 Series", name: "M8 Competition", body: "Coupé", yearsFrom: 2019, yearsTo: null, image: img("m8") },
  { id: "g16-840i", series: "8 Series", name: "840i Gran Coupé", body: "Gran Coupé", yearsFrom: 2019, yearsTo: null, image: img("8-series") },

  { id: "e84-x1-18d", series: "X1", name: "X1 sDrive18d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, image: img("x1") },
  { id: "e84-x1-20d", series: "X1", name: "X1 xDrive20d", body: "SUV", yearsFrom: 2010, yearsTo: 2015, image: img("x1") },
  { id: "f48-x1-18i", series: "X1", name: "X1 sDrive18i", body: "SUV", yearsFrom: 2015, yearsTo: 2022, image: img("x1") },
  { id: "f48-x1-20d", series: "X1", name: "X1 xDrive20d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, image: img("x1") },
  { id: "f48-x1-25d", series: "X1", name: "X1 xDrive25d", body: "SUV", yearsFrom: 2015, yearsTo: 2022, image: img("x1") },
  { id: "u11-x1-20i", series: "X1", name: "X1 xDrive20i", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("x1") },
  { id: "u11-x1-23i", series: "X1", name: "X1 M35i", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("x1") },
  { id: "u11-ix1", series: "X1", name: "iX1 xDrive30", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("ix1") },

  { id: "f39-x2-18i", series: "X2", name: "X2 sDrive18i", body: "SUV", yearsFrom: 2018, yearsTo: 2023, image: img("x2") },
  { id: "f39-x2-20d", series: "X2", name: "X2 xDrive20d", body: "SUV", yearsFrom: 2018, yearsTo: 2023, image: img("x2") },
  { id: "f39-x2-m35i", series: "X2", name: "X2 M35i", body: "SUV", yearsFrom: 2019, yearsTo: 2023, image: img("x2") },
  { id: "u10-x2", series: "X2", name: "X2 (U10)", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("x2") },

  { id: "f25-x3-20d", series: "X3", name: "X3 xDrive20d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, image: img("x3") },
  { id: "f25-x3-30d", series: "X3", name: "X3 xDrive30d", body: "SUV", yearsFrom: 2011, yearsTo: 2017, image: img("x3") },
  { id: "f25-x3-35i", series: "X3", name: "X3 xDrive35i", body: "SUV", yearsFrom: 2011, yearsTo: 2017, image: img("x3") },
  { id: "g01-x3-20i", series: "X3", name: "X3 xDrive20i", body: "SUV", yearsFrom: 2017, yearsTo: 2024, image: img("x3") },
  { id: "g01-x3-30e", series: "X3", name: "X3 xDrive30e", body: "SUV", yearsFrom: 2019, yearsTo: 2024, image: img("x3") },
  { id: "g01-x3-20d", series: "X3", name: "X3 xDrive20d (G01)", body: "SUV", yearsFrom: 2017, yearsTo: 2024, image: img("x3") },
  { id: "g01-x3-30d", series: "X3", name: "X3 xDrive30d (G01)", body: "SUV", yearsFrom: 2017, yearsTo: 2024, image: img("x3") },
  { id: "f97-x3m", series: "X3", name: "X3 M", body: "SUV", yearsFrom: 2019, yearsTo: 2024, image: img("x3m") },
  { id: "g08-ix3", series: "X3", name: "iX3", body: "SUV", yearsFrom: 2020, yearsTo: null, image: img("ix3") },
  { id: "g45-x3", series: "X3", name: "X3 (G45)", body: "SUV", yearsFrom: 2024, yearsTo: null, image: img("x3") },

  { id: "f26-x4-20d", series: "X4", name: "X4 xDrive20d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, image: img("x4") },
  { id: "f26-x4-30d", series: "X4", name: "X4 xDrive30d", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2018, image: img("x4") },
  { id: "g02-x4-20d", series: "X4", name: "X4 xDrive20d (G02)", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, image: img("x4") },
  { id: "g02-x4-30i", series: "X4", name: "X4 xDrive30i", body: "SUV Coupé", yearsFrom: 2018, yearsTo: null, image: img("x4") },
  { id: "f98-x4m", series: "X4", name: "X4 M", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("x4m") },

  { id: "e70-x5-30d", series: "X5", name: "X5 xDrive30d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("x5") },
  { id: "e70-x5-40d", series: "X5", name: "X5 xDrive40d", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("x5") },
  { id: "e70-x5-50i", series: "X5", name: "X5 xDrive50i", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("x5") },
  { id: "e70-x5m", series: "X5", name: "X5 M (E70)", body: "SUV", yearsFrom: 2010, yearsTo: 2013, image: img("x5m") },
  { id: "f15-x5-25d", series: "X5", name: "X5 sDrive25d", body: "SUV", yearsFrom: 2013, yearsTo: 2018, image: img("x5") },
  { id: "f15-x5-30d", series: "X5", name: "X5 xDrive30d (F15)", body: "SUV", yearsFrom: 2013, yearsTo: 2018, image: img("x5") },
  { id: "f15-x5-40e", series: "X5", name: "X5 xDrive40e", body: "SUV", yearsFrom: 2015, yearsTo: 2018, image: img("x5") },
  { id: "f85-x5m", series: "X5", name: "X5 M (F85)", body: "SUV", yearsFrom: 2015, yearsTo: 2018, image: img("x5m") },
  { id: "g05-x5-30d", series: "X5", name: "X5 xDrive30d (G05)", body: "SUV", yearsFrom: 2018, yearsTo: null, image: img("x5") },
  { id: "g05-x5-40i", series: "X5", name: "X5 xDrive40i", body: "SUV", yearsFrom: 2018, yearsTo: null, image: img("x5") },
  { id: "g05-x5-45e", series: "X5", name: "X5 xDrive45e", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("x5") },
  { id: "g05-x5-50e", series: "X5", name: "X5 xDrive50e", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("x5") },
  { id: "f95-x5m", series: "X5", name: "X5 M (F95)", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("x5m") },

  { id: "e71-x6-30d", series: "X6", name: "X6 xDrive30d", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, image: img("x6") },
  { id: "e71-x6-40d", series: "X6", name: "X6 xDrive40d", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, image: img("x6") },
  { id: "e71-x6m", series: "X6", name: "X6 M (E71)", body: "SUV Coupé", yearsFrom: 2010, yearsTo: 2014, image: img("x6m") },
  { id: "f16-x6-30d", series: "X6", name: "X6 xDrive30d (F16)", body: "SUV Coupé", yearsFrom: 2014, yearsTo: 2019, image: img("x6") },
  { id: "f86-x6m", series: "X6", name: "X6 M (F86)", body: "SUV Coupé", yearsFrom: 2015, yearsTo: 2019, image: img("x6m") },
  { id: "g06-x6-30d", series: "X6", name: "X6 xDrive30d (G06)", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("x6") },
  { id: "g06-x6-40i", series: "X6", name: "X6 xDrive40i", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("x6") },
  { id: "f96-x6m", series: "X6", name: "X6 M (F96)", body: "SUV Coupé", yearsFrom: 2019, yearsTo: null, image: img("x6m") },

  { id: "g07-x7-30d", series: "X7", name: "X7 xDrive30d", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("x7") },
  { id: "g07-x7-40i", series: "X7", name: "X7 xDrive40i", body: "SUV", yearsFrom: 2019, yearsTo: null, image: img("x7") },
  { id: "g07-x7-m60i", series: "X7", name: "X7 M60i", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("x7") },
  { id: "g09-xm", series: "XM", name: "XM", body: "SUV", yearsFrom: 2023, yearsTo: null, image: img("xm") },

  { id: "e89-z4-23i", series: "Z4", name: "Z4 sDrive23i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, image: img("z4") },
  { id: "e89-z4-30i", series: "Z4", name: "Z4 sDrive30i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, image: img("z4") },
  { id: "e89-z4-35i", series: "Z4", name: "Z4 sDrive35i", body: "Roadster", yearsFrom: 2010, yearsTo: 2016, image: img("z4") },
  { id: "g29-z4-20i", series: "Z4", name: "Z4 sDrive20i", body: "Roadster", yearsFrom: 2018, yearsTo: null, image: img("z4") },
  { id: "g29-z4-30i", series: "Z4", name: "Z4 sDrive30i (G29)", body: "Roadster", yearsFrom: 2018, yearsTo: null, image: img("z4") },
  { id: "g29-z4-m40i", series: "Z4", name: "Z4 M40i", body: "Roadster", yearsFrom: 2018, yearsTo: null, image: img("z4") },

  { id: "i01-i3", series: "i", name: "i3", body: "Hatch", yearsFrom: 2013, yearsTo: 2022, image: img("i3") },
  { id: "i01-i3s", series: "i", name: "i3s", body: "Hatch", yearsFrom: 2017, yearsTo: 2022, image: img("i3") },
  { id: "i01-i3rex", series: "i", name: "i3 Range Extender", body: "Hatch", yearsFrom: 2013, yearsTo: 2018, image: img("i3") },
  { id: "g26-i4-40", series: "i", name: "i4 eDrive40", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, image: img("i4") },
  { id: "g26-i4-m50", series: "i", name: "i4 M50", body: "Gran Coupé", yearsFrom: 2021, yearsTo: null, image: img("i4") },
  { id: "i20-ix-40", series: "i", name: "iX xDrive40", body: "SUV", yearsFrom: 2021, yearsTo: null, image: img("ix") },
  { id: "i20-ix-50", series: "i", name: "iX xDrive50", body: "SUV", yearsFrom: 2021, yearsTo: null, image: img("ix") },
  { id: "i20-ix-m60", series: "i", name: "iX M60", body: "SUV", yearsFrom: 2022, yearsTo: null, image: img("ix") },
];

export function findBmwModel(id: string | null | undefined): BmwModel | null {
  if (!id) return null;
  return BMW_MODELS.find((m) => m.id === id) ?? null;
}

export function resolveModelImage(modelId: string | null | undefined, modelName?: string): string {
  const found = findBmwModel(modelId);
  if (found) return found.image;
  const hay = `${modelId ?? ""} ${modelName ?? ""}`.toLowerCase();
  if (hay.includes("x7")) return img("x7");
  if (hay.includes("x6 m") || hay.includes("x6m")) return img("x6m");
  if (hay.includes("x6")) return img("x6");
  if (hay.includes("x5 m") || hay.includes("x5m")) return img("x5m");
  if (hay.includes("x5")) return img("x5");
  if (hay.includes("x4 m") || hay.includes("x4m")) return img("x4m");
  if (hay.includes("x4")) return img("x4");
  if (hay.includes("x3 m") || hay.includes("x3m")) return img("x3m");
  if (hay.includes("ix3")) return img("ix3");
  if (hay.includes("x3")) return img("x3");
  if (hay.includes("x2")) return img("x2");
  if (hay.includes("ix1")) return img("ix1");
  if (hay.includes("x1")) return img("x1");
  if (hay.includes("z4")) return img("z4");
  if (hay.includes("i3")) return img("i3");
  if (hay.includes("i4") || hay.includes("i5")) return img("i4");
  if (hay.includes("ix") || hay.includes("i7")) return img("ix");
  if (hay.includes("m2")) return img("m2");
  if (hay.includes("m3")) return img("m3");
  if (hay.includes("m4")) return img("m4");
  if (hay.includes("m5")) return img("m5");
  if (hay.includes("m8") || hay.includes("m6")) return img("m8");
  if (hay.includes("8")) return img("8-series");
  if (hay.includes("7")) return img("7-series");
  if (hay.includes("6")) return img("6-series");
  if (hay.includes("5")) return img("5-series");
  if (hay.includes("4")) return img("4-series");
  if (hay.includes("3")) return img("3-series");
  if (hay.includes("2")) return img("2-series");
  if (hay.includes("1")) return img("1-series");
  return img("generic");
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
