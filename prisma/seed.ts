import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  // ===== COMPRIMENTO =====
  const comprimento = await prisma.conversionType.upsert({
    where: { name: "comprimento" },
    update: {},
    create: {
      name: "comprimento",
      label: "Comprimento",
      units: {
        create: [
          { unit: "km", label: "Quilômetro (km)", rate: 0.001 },
          { unit: "m", label: "Metro (m)", rate: 1 },
          { unit: "dm", label: "Decímetro (dm)", rate: 10 },
          { unit: "cm", label: "Centímetro (cm)", rate: 100 },
          { unit: "mm", label: "Milímetro (mm)", rate: 1000 },
          { unit: "μm", label: "Micrômetro (μm)", rate: 1000000 },
          { unit: "nm", label: "Nanômetro (nm)", rate: 1000000000 },
          { unit: "pm", label: "Picômetro (pm)", rate: 1000000000000 },
          {
            unit: "nmi",
            label: "Milha náutica (nmi)",
            rate: 0.000539956803455723,
          },
          { unit: "mi", label: "Milha (mi)", rate: 0.000621371 },
          { unit: "fur", label: "Furlong (fur)", rate: 0.004970969537898671 },
          { unit: "in", label: "Polegada (in)", rate: 39.3701 },
          { unit: "ft", label: "Pé (ft)", rate: 3.28084 },
          { unit: "yd", label: "Jarda (yd)", rate: 1.09361 },
          { unit: "fathom", label: "Fathom (ftm)", rate: 0.546806649 },
          { unit: "li", label: "Lí chinês (li)", rate: 0.002 },
          { unit: "zhang", label: "Zhang (zhang)", rate: 0.333333333 },
          { unit: "chi", label: "Chi chinês (chi)", rate: 3.333333333 },
          { unit: "cun", label: "Cun chinês (cun)", rate: 33.33333333 },
          { unit: "hao", label: "Hao chinês (hao)", rate: 33333.33333 },
          { unit: "parsec", label: "Parsec (pc)", rate: 3.240779289e-17 },
          { unit: "lunar_distance", label: "Distância Lunar", rate: 2.6014e-9 },
          {
            unit: "au",
            label: "Unidade Astronômica (UA)",
            rate: 6.684587122e-12,
          },
          { unit: "light_year", label: "Ano-luz (ly)", rate: 1.057000834e-16 },
        ],
      },
    },
  });

  // ===== MASSA =====
  const massa = await prisma.conversionType.upsert({
    where: { name: "massa" },
    update: {},
    create: {
      name: "massa",
      label: "Massa",
      units: {
        create: [
          { unit: "t", label: "Tonelada (t)", rate: 0.001 },
          { unit: "kg", label: "Quilograma (kg)", rate: 1 },
          { unit: "g", label: "Grama (g)", rate: 1000 },
          { unit: "mg", label: "Miligrama (mg)", rate: 1000000 },
          { unit: "µg", label: "Micrograma (µg)", rate: 1000000000 },
          { unit: "quintal", label: "Quintal (q)", rate: 0.01 },
          { unit: "lb", label: "Libra (lb)", rate: 2.2046226218 },
          { unit: "oz", label: "Onça (oz)", rate: 35.27396195 },
          { unit: "ct", label: "Quilate (ct)", rate: 5000 },
          { unit: "gr", label: "Grão (gr)", rate: 15432.358352941431 },
          {
            unit: "l.t",
            label: "Tonelada Britânica (UK)",
            rate: 0.0009842065276110607,
          },
          {
            unit: "sh.t",
            label: "Tonelada Norte Americana (US)",
            rate: 0.001102311310924388,
          },
          {
            unit: "cwt",
            label: "Quintal britânico (cwt)",
            rate: 0.01968413055222122,
          },
          {
            unit: "cwtt",
            label: "Quintal norte-americano (cwt)",
            rate: 0.022046226218487756,
          },
          { unit: "st", label: "Pedra (st)", rate: 0.15747304441776972 },
          { unit: "dr", label: "Dram (dr)", rate: 564.3833911932872 },
          { unit: "dan", label: "Dan (dan)", rate: 0.02 },
          { unit: "jin", label: "Jin (jin)", rate: 2 },
          { unit: "qian", label: "Qian (qian)", rate: 200 },
          { unit: "liang", label: "Liang (liang)", rate: 20 },
          {
            unit: "jin-taiwan",
            label: "Jin (Taiwan) (Jin Taiwan)",
            rate: 1.6666666666666667,
          },
        ],
      },
    },
  });

  // ===== ÁREA =====
  const area = await prisma.conversionType.upsert({
    where: { name: "area" },
    update: {},
    create: {
      name: "area",
      label: "Área",
      units: {
        create: [
          { unit: "km2", label: "Quilômetro quadrado (km²)", rate: 1e-6 },
          { unit: "ha", label: "Hectare (ha)", rate: 0.0001 },
          { unit: "a", label: "Are (a)", rate: 0.01 },
          { unit: "m2", label: "Metro quadrado (m²)", rate: 1 },
          { unit: "dm2", label: "Decímetro quadrado (dm²)", rate: 100 },
          { unit: "cm2", label: "Centímetro quadrado (cm²)", rate: 10000 },
          { unit: "mm2", label: "Milímetro quadrado (mm²)", rate: 1000000 },
          { unit: "µm2", label: "Micrômetro quadrado (µm²)", rate: 1e12 },
          { unit: "ac", label: "Acre (ac)", rate: 0.00024710538146716536 },
          {
            unit: "milha2",
            label: "Milha quadrada (sq mi)",
            rate: 3.861021585e-7,
          },
          { unit: "jd2", label: "Jarda quadrada (jd²)", rate: 0.0005 },
          { unit: "ft2", label: "Pé quadrado (ft²)", rate: 10.763910416709722 },
          {
            unit: "pol2",
            label: "Polegada quadrada (in²)",
            rate: 1550.0031000062001,
          },
          {
            unit: "rd2",
            label: "Vara quadrada (rd2)",
            rate: 0.03953686103474647,
          },
          { unit: "qing", label: "Qing (qing)", rate: 0.000015 },
          { unit: "mu", label: "Mu (mu)", rate: 0.0015 },
          { unit: "chi2", label: "Chi quadrado (chi²)", rate: 9 },
          { unit: "cun2", label: "Cun quadrado (cun²)", rate: 900 },
        ],
      },
    },
  });

  // ===== TEMPO =====
  const tempo = await prisma.conversionType.upsert({
    where: { name: "tempo" },
    update: {},
    create: {
      name: "tempo",
      label: "Tempo",
      units: {
        create: [
          { unit: "a", label: "Ano (a)", rate: 1 / 31557600 },
          { unit: "semana", label: "Semana", rate: 1 / 604800 },
          { unit: "d", label: "Dia (d)", rate: 1 / 86400 },
          { unit: "h", label: "Hora (h)", rate: 1 / 3600 },
          { unit: "min", label: "Minuto (min)", rate: 1 / 60 },
          { unit: "s", label: "Segundo (s)", rate: 1 },
          { unit: "ms", label: "Milissegundo (ms)", rate: 1000 },
          { unit: "μs", label: "Microssegundo (μs)", rate: 1000000 },
          { unit: "ps", label: "Picossegundo (ps)", rate: 1000000000 },
        ],
      },
    },
  });

  // ===== DADOS =====
  const dados = await prisma.conversionType.upsert({
    where: { name: "dados" },
    update: {},
    create: {
      name: "dados",
      label: "Dados",
      units: {
        create: [
          { unit: "B", label: "Byte (B)", rate: 1 },
          { unit: "KB", label: "Kibibyte (KiB)", rate: 1024 },
          { unit: "MB", label: "Mebibyte (MiB)", rate: 1024 ** 2 },
          { unit: "GB", label: "Gibibyte (GiB)", rate: 1024 ** 3 },
          { unit: "TB", label: "Tebibyte (TiB)", rate: 1024 ** 4 },
          { unit: "PB", label: "Pebibyte (PiB)", rate: 1024 ** 5 },
        ],
      },
    },
  });

  // ===== VOLUME =====
  const volume = await prisma.conversionType.upsert({
    where: { name: "volume" },
    update: {},
    create: {
      name: "volume",
      label: "Volume",
      units: {
        create: [
          { unit: "m3", label: "Metro cúbico (m³)", rate: 1 },
          { unit: "dm3", label: "Decímetro cúbico (dm³)", rate: 1000 },
          { unit: "mm3", label: "Milímetro cúbico (mm³)", rate: 1000000000 },
          { unit: "hl", label: "Hectolitro (hl)", rate: 10 },
          { unit: "L", label: "Litro (L)", rate: 1000 },
          { unit: "mL", label: "Mililitro (mL)", rate: 1000000 },
          { unit: "ft3", label: "Pé cúbico (ft³)", rate: 35.3147 },
          { unit: "in3", label: "Polegada cúbica (in³)", rate: 61023.7 },
          { unit: "yd3", label: "Jarda cúbica (yd³)", rate: 1.30795 },
          { unit: "af3", label: "Acre-pé (af³)", rate: 8.10714e-7 },
        ],
      },
    },
  });

  // ===== VELOCIDADE =====
  const velocidade = await prisma.conversionType.upsert({
    where: { name: "velocidade" },
    update: {},
    create: {
      name: "velocidade",
      label: "Velocidade",
      units: {
        create: [
          { unit: "m/s", label: "Metro por segundo (m/s)", rate: 1 },
          {
            unit: "c",
            label: "Velocidade da luz (c)",
            rate: 3.3356409519815205e-9,
          },
          { unit: "ma", label: "Mach (Ma)", rate: 0.002938589719085654 },
          { unit: "km/h", label: "Quilômetro por hora (km/h)", rate: 3.6 },
          { unit: "km/s", label: "Quilômetro por segundo (km/s)", rate: 0.001 },
          { unit: "kn", label: "Nó (kn)", rate: 1.94384 },
          { unit: "mph", label: "Milha por hora (mph)", rate: 2.23694 },
          { unit: "ips", label: "Polegada por segundo (ips)", rate: 39.3701 },
          { unit: "ft/s", label: "Pé por segundo (ft/s)", rate: 3.28084 },
        ],
      },
    },
  });

  // ===== TEMPERATURA =====
  const temperatura = await prisma.conversionType.upsert({
    where: { name: "temperatura" },
    update: {},
    create: {
      name: "temperatura",
      label: "Temperatura",
      units: {
        create: [
          { unit: "c", label: "Celsius", rate: 0 },
          { unit: "f", label: "Fahrenheit", rate: 0 },
          { unit: "k", label: "Kelvin", rate: 0 },
          { unit: "r", label: "Rankine", rate: 0 },
          { unit: "re", label: "Réaumur", rate: 0 },
        ],
      },
    },
  });

  const moedas = [
    { currency: "USD", label: "Dólar americano" },
    { currency: "AED", label: "Dirham dos Emirados Árabes Unidos" },
    { currency: "AFN", label: "Afegane afegão" },
    { currency: "ALL", label: "Lek albanês" },
    { currency: "AMD", label: "Dram armênio" },
    { currency: "ANG", label: "Florim das Antilhas Neerlandesas" },
    { currency: "AOA", label: "Kwanza angolano" },
    { currency: "ARS", label: "Peso argentino" },
    { currency: "AUD", label: "Dólar australiano" },
    { currency: "AWG", label: "Florim arubano" },
    { currency: "AZN", label: "Manat azeri" },
    { currency: "BAM", label: "Marco conversível da Bósnia e Herzegovina" },
    { currency: "BBD", label: "Dólar barbadense" },
    { currency: "BDT", label: "Taka bengali" },
    { currency: "BGN", label: "Lev búlgaro" },
    { currency: "BHD", label: "Dinar bareinita" },
    { currency: "BIF", label: "Franco burundiano" },
    { currency: "BMD", label: "Dólar das Bermudas" },
    { currency: "BND", label: "Dólar bruneano" },
    { currency: "BOB", label: "Boliviano" },
    { currency: "BRL", label: "Real brasileiro" },
    { currency: "BSD", label: "Dólar bahamense" },
    { currency: "BTN", label: "Ngultrum butanês" },
    { currency: "BWP", label: "Pula botsuanês" },
    { currency: "BYN", label: "Rublo bielorrusso" },
    { currency: "BZD", label: "Dólar belizenho" },
    { currency: "CAD", label: "Dólar canadense" },
    { currency: "CDF", label: "Franco congolês" },
    { currency: "CHF", label: "Franco suíço" },
    { currency: "CLF", label: "Unidade de Fomento chilena" },
    { currency: "CLP", label: "Peso chileno" },
    { currency: "CNH", label: "Yuan chinês (offshore)" },
    { currency: "CNY", label: "Yuan chinês (onshore)" },
    { currency: "COP", label: "Peso colombiano" },
    { currency: "CRC", label: "Colón costarriquenho" },
    { currency: "CUP", label: "Peso cubano" },
    { currency: "CVE", label: "Escudo cabo-verdiano" },
    { currency: "CZK", label: "Coroa tcheca" },
    { currency: "DJF", label: "Franco djiboutiano" },
    { currency: "DKK", label: "Coroa dinamarquesa" },
    { currency: "DOP", label: "Peso dominicano" },
    { currency: "DZD", label: "Dinar argelino" },
    { currency: "EGP", label: "Libra egípcia" },
    { currency: "ERN", label: "Nakfa eritreia" },
    { currency: "ETB", label: "Birr etíope" },
    { currency: "EUR", label: "Euro" },
    { currency: "FJD", label: "Dólar fijiano" },
    { currency: "FKP", label: "Libra das Ilhas Falkland" },
    { currency: "FOK", label: "Coroa feroesa" },
    { currency: "GBP", label: "Libra esterlina" },
    { currency: "GEL", label: "Lari georgiano" },
    { currency: "GGP", label: "Libra de Guernsey" },
    { currency: "GHS", label: "Cedi ganês" },
    { currency: "GIP", label: "Libra gibraltina" },
    { currency: "GMD", label: "Dalasi gambiano" },
    { currency: "GNF", label: "Franco guineano" },
    { currency: "GTQ", label: "Quetzal guatemalteco" },
    { currency: "GYD", label: "Dólar guianense" },
    { currency: "HKD", label: "Dólar de Hong Kong" },
    { currency: "HNL", label: "Lempira hondurenha" },
    { currency: "HRK", label: "Kuna croata" },
    { currency: "HTG", label: "Gourde haitiano" },
    { currency: "HUF", label: "Florim húngaro" },
    { currency: "IDR", label: "Rupia indonésia" },
    { currency: "ILS", label: "Novo shekel israelense" },
    { currency: "IMP", label: "Libra de Man" },
    { currency: "INR", label: "Rupia indiana" },
    { currency: "IQD", label: "Dinar iraquiano" },
    { currency: "IRR", label: "Rial iraniano" },
    { currency: "ISK", label: "Coroa islandesa" },
    { currency: "JEP", label: "Libra de Jersey" },
    { currency: "JMD", label: "Dólar jamaicano" },
    { currency: "JOD", label: "Dinar jordaniano" },
    { currency: "JPY", label: "Iene japonês" },
    { currency: "KES", label: "Xelim queniano" },
    { currency: "KGS", label: "Som quirguiz" },
    { currency: "KHR", label: "Riel cambojano" },
    { currency: "KID", label: "Dólar da Ilha Christmas" },
    { currency: "KMF", label: "Franco comoriano" },
    { currency: "KRW", label: "Won sul-coreano" },
    { currency: "KWD", label: "Dinar kuwaitiano" },
    { currency: "KYD", label: "Dólar das Ilhas Cayman" },
    { currency: "KZT", label: "Tenge cazaque" },
    { currency: "LAK", label: "Kip laosiano" },
    { currency: "LBP", label: "Libra libanesa" },
    { currency: "LKR", label: "Rupia do Sri Lanka" },
    { currency: "LRD", label: "Dólar liberiano" },
    { currency: "LSL", label: "Loti lesotiano" },
    { currency: "LYD", label: "Dinar líbio" },
    { currency: "MAD", label: "Dirham marroquino" },
    { currency: "MDL", label: "Leu moldavo" },
    { currency: "MGA", label: "Ariary malgaxe" },
    { currency: "MKD", label: "Denar macedônio" },
    { currency: "MMK", label: "Kyat birmanês" },
    { currency: "MNT", label: "Tugrik mongol" },
    { currency: "MOP", label: "Pataca de Macau" },
    { currency: "MRU", label: "Ouguiya mauritana" },
    { currency: "MUR", label: "Rupia mauriciana" },
    { currency: "MVR", label: "Rupia maldiva" },
    { currency: "MWK", label: "Kwacha malauiana" },
    { currency: "MXN", label: "Peso mexicano" },
    { currency: "MYR", label: "Ringgit malaio" },
    { currency: "MZN", label: "Metical moçambicano" },
    { currency: "NAD", label: "Dólar namibiano" },
    { currency: "NGN", label: "Naira nigeriana" },
    { currency: "NIO", label: "Córdoba nicaraguense" },
    { currency: "NOK", label: "Coroa norueguesa" },
    { currency: "NPR", label: "Rupia nepalesa" },
    { currency: "NZD", label: "Dólar neozelandês" },
    { currency: "OMR", label: "Rial omani" },
    { currency: "PAB", label: "Balboa panamenha" },
    { currency: "PEN", label: "Sol peruano" },
    { currency: "PGK", label: "Kina papuásia-nova-guineense" },
    { currency: "PHP", label: "Peso filipino" },
    { currency: "PKR", label: "Rupia paquistanesa" },
    { currency: "PLN", label: "Złoty polonês" },
    { currency: "PYG", label: "Guarani paraguaio" },
    { currency: "QAR", label: "Rial catariano" },
    { currency: "RON", label: "Leu romeno" },
    { currency: "RSD", label: "Dinar sérvio" },
    { currency: "RUB", label: "Rublo russo" },
    { currency: "RWF", label: "Franco ruandês" },
    { currency: "SAR", label: "Riyal saudita" },
    { currency: "SBD", label: "Dólar das Ilhas Salomão" },
    { currency: "SCR", label: "Rupia seichelense" },
    { currency: "SDG", label: "Libra sudanesa" },
    { currency: "SEK", label: "Coroa sueca" },
    { currency: "SGD", label: "Dólar singapuriano" },
    { currency: "SHP", label: "Libra de Santa Helena" },
    { currency: "SLE", label: "Leone do Serra Leoa" },
    { currency: "SLL", label: "Leone antigo do Serra Leoa" },
    { currency: "SOS", label: "Xelim somali" },
    { currency: "SRD", label: "Dólar surinamês" },
    { currency: "SSP", label: "Libra sul-sudanesa" },
    { currency: "STN", label: "Dobra de São Tomé e Príncipe" },
    { currency: "SYP", label: "Libra síria" },
    { currency: "SZL", label: "Lilangeni suazi" },
    { currency: "THB", label: "Baht tailandês" },
    { currency: "TJS", label: "Somoni tadjique" },
    { currency: "TMT", label: "Manat turcomeno" },
    { currency: "TND", label: "Dinar tunisiano" },
    { currency: "TOP", label: "Paʻanga tonganesa" },
    { currency: "TRY", label: "Lira turca" },
    { currency: "TTD", label: "Dólar de Trinidad e Tobago" },
    { currency: "TVD", label: "Dólar de Tuvalu" },
    { currency: "TWD", label: "Novo dólar taiwanês" },
    { currency: "TZS", label: "Xelim tanzaniano" },
    { currency: "UAH", label: "Hryvnia ucraniana" },
    { currency: "UGX", label: "Xelim ugandense" },
    { currency: "UYU", label: "Peso uruguaio" },
    { currency: "UZS", label: "Som uzbeque" },
    { currency: "VES", label: "Bolívar venezuelano" },
    { currency: "VND", label: "Dong vietnamita" },
    { currency: "VUV", label: "Vatu vanuatuense" },
    { currency: "WST", label: "Tala samoano" },
    { currency: "XAF", label: "Franco CFA BEAC" },
    { currency: "XCD", label: "Dólar do Caribe Oriental" },
    { currency: "XCG", label: "Florim das Antilhas Neerlandesas" },
    { currency: "XDR", label: "Direitos Especiais de Saque (FMI)" },
    { currency: "XOF", label: "Franco CFA BCEAO" },
    { currency: "XPF", label: "Franco CFP" },
    { currency: "YER", label: "Rial iemenita" },
    { currency: "ZAR", label: "Rand sul-africano" },
    { currency: "ZMW", label: "Kwacha zambiano" },
    { currency: "ZWG", label: "Dólar zimbabuano (gold)" },
    { currency: "ZWL", label: "Dólar zimbabuano (2009)" },
  ];

  for (const moeda of moedas) {
    await prisma.exchangeRate.upsert({
      where: { currency: moeda.currency },
      update: { label: moeda.label },
      create: {
        currency: moeda.currency,
        label: moeda.label,
        rate: 0, // Será atualizado pela API
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
