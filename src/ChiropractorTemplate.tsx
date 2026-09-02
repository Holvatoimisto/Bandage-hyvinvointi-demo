import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Train,
  Car,
  Instagram,
  Facebook,
  Plus,
  Minus,
  Star,
} from 'lucide-react';

const templateData = {
  business: {
    name: 'Bandage Hyvinvointi',
    tagline: 'Koulutettu hieroja Turussa',
    fullTagline: 'BANDAGE HYVINVOINTI – KOULUTETTU HIEROJA TURKU',
    address: 'Käsityöläiskatu 18, 20100 Turku',
    phone: '040 067 5453',
    phoneLink: 'tel:+358400675453',
    email: 'bandagehyvinvointi@gmail.com',
    emailLink: 'mailto:bandagehyvinvointi@gmail.com',
    bookingUrl: 'tel:+358400675453',
    googleReviewUrl: '',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=K%C3%A4sity%C3%B6l%C3%A4iskatu+18+20100+Turku',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100079473602379',
    instagramUrl: 'https://www.instagram.com/bandagehyvinvointi/',
  },
  navigation: {
    logo: '/assets/bandage_logo.jpg',
    logoDark: '/assets/bandage_logo.jpg',
    backgroundColor: '#181818',
    links: [
      { label: 'ETUSIVU', href: '#' },
      { label: 'Palvelut', href: '#palvelut' },
      { label: 'Hinnasto', href: '#hinnasto' },
      { label: 'Galleria', href: '#galleria' },
      { label: 'Yhteystiedot', href: '#yhteystiedot' },
    ],
    extraLinks: [
      { label: 'Arvostelut', href: '#arvostelut' },
      { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
    ],
    ctaButton: { label: 'Varaa aika', href: 'tel:+358400675453' },
  },
  hero: {
    backgroundImages: [
      { src: '/assets/bandage_mika.jpg', position: 'center center', dim: 0.15 },
      { src: '/assets/bandage_bemer_room.jpg', position: 'center 45%', dim: 0.09 },
      { src: '/assets/bandage_lounge2.jpg', position: 'center 40%', dim: 0.18 },
      { src: '/assets/bandage_bemer_window.jpg', position: 'center 40%', dim: 0.09 },
      { src: '/assets/bandage_storefront.jpg', position: 'center 45%', dim: 0.21 },
    ],
    eyebrow: 'BANDAGE HYVINVOINTI | KOULUTETTU HIEROJA TURUSSA',
    headline: 'Ammattitaitoista hierontaa Turun keskustassa',
    subheadline: 'Klassista hierontaa ja urheiluhierontaa Turun keskustassa, yksilöllisesti toteutettuna.',
    ctaPrimary: { label: 'Varaa aika', href: 'tel:+358400675453' },
    ctaSecondary: { label: 'Tutustu palveluihin', href: '#palvelut' },
    stats: [
      { value: '5,0', label: 'Google-arvosana' },
      { value: 'Koulutettu', label: 'hieroja' },
      { value: '17 v', label: 'kokemusta alalla' },
    ],
  },
  intro: {
    text: 'Tervetuloa ottamaan hetki itsellesi. Olipa tavoitteesi rentoutua, palautua tai helpottaa kehon kireyksiä.',
    backgroundColor: '#181818',
  },
  services: {
    eyebrow: 'PALVELUT',
    headline: 'Hierontaa ja hyvinvointia ammattitaidolla',
    body: 'Valitse tarpeisiisi sopiva hoito. Jokainen hoito räätälöidään aina asiakkaan tarpeiden mukaan.',
    reassurance: 'Etkö ole varma mikä palvelu sopii sinulle? Soita 040 067 5453 ja kysy.',
    primaryServices: [
      {
        image: '/assets/bandage_room.jpg',
        objectPosition: 'center center',
        title: 'Klassinen hieronta',
        description: 'Käsin tehtävää kehon pehmytkudosten käsittelyä, joka rentouttaa lihaksia, parantaa verenkiertoa ja helpottaa jännitystä. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan.',
        linkText: 'Tutustu klassiseen hierontaan',
        linkHref: '/palvelut/klassinen-hieronta',
      },
      {
        image: '/assets/bandage_mika.jpg',
        objectPosition: 'center 55%',
        title: 'Urheiluhieronta',
        description: 'Voimakkaampaa ja syvempää käsittelyä urheilijoille ja aktiiviliikkujille. Auttaa palautumisessa, lihaskireyksissä ja liikkuvuuden ylläpidossa.',
        linkText: 'Tutustu urheiluhierontaan',
        linkHref: '/palvelut/urheiluhieronta',
      },
    ],
    secondaryLabel: 'Myös saatavilla',
    secondaryServices: [
      { image: '/assets/bandage_bemer_room.jpg', objectPosition: 'center 45%', title: 'Thermiset hoidot', linkHref: '/palvelut/klassinen-hieronta' },
      { image: '/assets/Bandage-lahjakortti.png', objectPosition: 'center center', title: 'Lahjakortti', linkHref: '/palvelut/urheiluhieronta' },
      { image: '/assets/bandage_storefront.jpg', objectPosition: 'center 45%', title: 'Yritysten hyvinvointipäivät', linkHref: '/palvelut/yrityspalvelut' },
    ],
  },
  pricing: {
    eyebrow: 'HINNASTO',
    headline: 'Selkeät hinnat, ei yllätyksiä',
    body: 'Sama hinnasto klassiseen hierontaan ja urheiluhierontaan.',
    tabs: [
      {
        key: 'klassinen',
        label: 'Klassinen hieronta',
        description: 'Rauhallisempaa ja rentouttavaa käsittelyä koko keholle tai tietylle alueelle.',
        items: [
          { duration: '30 min', price: '38' },
          { duration: '45 min', price: '48' },
          { duration: '60 min', price: '56' },
          { duration: '75 min', price: '64' },
          { duration: '90 min', price: '71' },
          { duration: '120 min', price: '88' },
        ],
      },
      {
        key: 'urheiluhieronta',
        label: 'Urheiluhieronta',
        description: 'Syvempiä tekniikoita urheilijoille ja aktiiviliikkujille.',
        items: [
          { duration: '30 min', price: '38' },
          { duration: '45 min', price: '48' },
          { duration: '60 min', price: '56' },
          { duration: '75 min', price: '64' },
          { duration: '90 min', price: '71' },
          { duration: '120 min', price: '88' },
        ],
      },
    ],
  },
  reviews: {
    eyebrow: 'ASIAKASKOKEMUKSIA',
    headline: 'Mitä asiakkaamme sanovat',
    description: 'Aitoja kokemuksia Bandage Hyvinvoinnin asiakkailta Timmassa.',
    items: [
      { name: 'Mikko T', text: 'Erittäin hyvä hieroja, osaa työnsä. Suosittelen.', service: 'Timma-arvostelu' },
      { name: 'Minna-maria W', text: 'Hieronta avasi erittäin hyvin kehoni jumeja. Hieroja oli mukava ja ammattitaitoinen.', service: 'Timma-arvostelu' },
      { name: 'Anni T', text: 'Aina paras hieronta. Heti kun nousee pöydältä, odottaa jo seuraavaa kertaa.', service: 'Timma-arvostelu' },
      { name: 'Erika', text: 'Huippuosaaja! Oma luottohieroja, joka laittaa paikat kuntoon sekä rupattelee mukavia. Suosittelen lämpimästi.', service: 'Timma-arvostelu' },
      { name: 'Kim F', text: 'Erittäin hyvä kokonaisvaltainen hieronta!', service: 'Timma-arvostelu' },
      { name: 'Marjut V', text: 'Erittäin hyvä ja ammattitaitoinen hieronta!', service: 'Timma-arvostelu' },
    ],
  },
  team: {
    eyebrow: 'TUTUSTU HIEROJIIN',
    headline: 'Asiantuntijat sinua varten',
    members: [
      {
        name: 'Mika Ljungqvist',
        firstName: 'Mikalta',
        title: 'Koulutettu hieroja',
        role: 'Hieroja',
        image: '/assets/bandage_mika.jpg',
        imagePosition: '30% 15%',
        avatar: '/assets/bandage_hero.jpg',
        ctaName: 'Mikasta',
        bio: 'Bandage Hyvinvoinnin taustalla on koulutettu hieroja Mika Ljungqvist. Mikan osaamiseen kuuluvat klassinen hieronta, urheiluhieronta sekä thermiset ja TENS-hoidot.\n\nJokainen hoito suunnitellaan yksilöllisesti kehosi tilanteen ja tarpeidesi mukaan. Tavoitteena on auttaa sinua voimaan ja jaksamaan paremmin arjessa, ja tarvittaessa saat mukaasi myös selkeitä ohjeita hyvinvoinnin ylläpitämiseen hoitokertojen välillä.',
      },
      {
        name: 'Mirek',
        firstName: 'Mirekiltä',
        title: 'Osana Bandage Hyvinvoinnin tiimiä',
        role: 'Tiimi',
        image: '/assets/mirek-bandage.jpg',
        imagePosition: 'center 20%',
        avatar: '/assets/mirek-bandage.jpg',
        ctaName: 'Mirekistä',
        bio: 'Mirek on osa Bandage Hyvinvoinnin tiimiä ja kohtaa jokaisen asiakkaan yksilöllisesti. Hoidossa huomioidaan kehon tämänhetkinen tilanne, asiakkaan omat tarpeet sekä se, millaista apua tai palautumista käynniltä haetaan.\n\nTavoitteena on luoda rauhallinen ja luottamuksellinen hoitokokemus, jossa voit keskittyä omaan hyvinvointiisi ja antaa keholle aikaa palautua arjen kuormituksesta.',
      },
    ],
  },
  location: {
    eyebrow: 'VASTAANOTTO',
    headline: 'Vastaanotto Turun keskustassa',
    body: 'Bandage Hyvinvoinnin vastaanotto sijaitsee Käsityöläiskadulla aivan Turun keskustassa. Tänne on helppo saapua niin jalan, julkisilla kuin autolla.',
    image: '/assets/bandage_storefront.jpg',
    address: 'Käsityöläiskatu 18, 20100 Turku',
    points: [
      {
        icon: 'train',
        heading: 'Lähellä rautatieasemaa',
        text: 'Lyhyt kävelymatka Turun rautatieasemalta.',
      },
      {
        icon: 'car',
        heading: 'Maksuton asiakaspysäköinti',
        text: 'Maksuton pysäköinti vastaanoton yhteydessä.',
      },
    ],
    mapLinkLabel: 'Katso sijainti kartalla',
  },
  faq: {
    eyebrow: 'ENNEN ENSIMMÄISTÄ KÄYNTIÄ',
    headline: 'Usein kysyttyä',
    items: [
      {
        question: 'Minkä pituinen hieronta minulle?',
        answer: 'Ensikertalaisille suosittelemme 45–60 minuutin hoitoa. 30 min riittää, jos haluat keskittyä vain yhteen alueeseen. 90 min antaa aikaa koko keholle perusteellisesti.',
        includePhone: false,
      },
      {
        question: 'Sopiiko hieronta minulle?',
        answer: 'Kyllä! Hieronta sopii kaikille ikään ja kuntoon katsomatta. Palvelen kaikenikäisiä asiakkaita, niin urheilijoita, toimistotyöntekijöitä kuin senioreitakin.',
        includePhone: false,
      },
      {
        question: 'Mitä eroa on klassisella ja urheiluhieronalla?',
        answer: 'Klassinen hieronta on rauhallisempaa ja rentouttavampaa. Urheiluhieronnassa käytetään voimakkaampia tekniikoita lihaskireyksien hoitoon ja palautumiseen. Molemmat sopivat kaikille.',
        includePhone: false,
      },
      {
        question: 'Miten ajanvaraus toimii?',
        answer: 'Ajanvaraus toimii puhelimitse tai WhatsAppilla numerosta 040 067 5453. Vastaamme mahdollisimman pian.',
        includePhone: true,
      },
    ],
  },
  finalCta: {
    backgroundImage: '/assets/bandage_storefront.jpg',
    eyebrow: 'VARAA AIKA',
    headline: 'Tule käymään, kehosi kiittää sinua',
    supportText: 'Varaa hieronta soittamalla tai WhatsAppilla',
    ctaLabel: 'Varaa aika',
    phone: '040 067 5453',
    phoneSupport: 'Soita tai WhatsApp',
    trustItems: [
      { icon: 'star', label: '5,0 Google-arvosana' },
      { icon: 'clock', label: 'Palvelemme päivittäin klo 10–18' },
      { icon: 'calendar', label: 'Ilmainen asiakaspysäköinti pihapiirissä' },
    ],
  },
  footer: {
    columns: [
      {
        title: 'Palvelut',
        links: [
          { label: 'Klassinen hieronta', href: '/palvelut/klassinen-hieronta' },
          { label: 'Urheiluhieronta', href: '/palvelut/urheiluhieronta' },
          { label: 'Yritysten hyvinvointipäivät', href: '/palvelut/yrityspalvelut' },
        ],
      },
      {
        title: 'Yritys',
        links: [
          { label: 'Tutustu hierojaan', href: '#asiantuntijat' },
          { label: 'Asiakkaiden kokemuksia', href: '#arvostelut' },
          { label: 'Usein kysyttyä', href: '/usein-kysyttya' },
        ],
      },
      {
        title: 'Yhteystiedot',
        links: [
          { label: '040 067 5453', href: 'tel:+358400675453' },
          { label: 'bandagehyvinvointi@gmail.com', href: 'mailto:bandagehyvinvointi@gmail.com' },
          { label: 'WhatsApp', href: 'https://wa.me/358400675453' },
          { label: 'Käsityöläiskatu 18, 20100 Turku', href: 'https://www.google.com/maps/search/?api=1&query=K%C3%A4sity%C3%B6l%C3%A4iskatu+18+20100+Turku' },
        ],
      },
    ],
    paymentMethods: 'Palvelemme päivittäin klo 10–18, muuten sopimuksen mukaan',
    copyright: 'Band Age Oy. Kaikki oikeudet pidätetään.',
  },
};

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const serviceDropdownItems = [
  { label: 'Klassinen hieronta', href: '/palvelut/klassinen-hieronta' },
  { label: 'Urheiluhieronta', href: '/palvelut/urheiluhieronta' },
  { label: 'Yritysten hyvinvointipäivät', href: '/palvelut/yrityspalvelut' },
];

export function ChiropractorTemplate() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [teamTransitioning, setTeamTransitioning] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activePricingTab, setActivePricingTab] = useState(0);
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const getRecommendation = (answers: string[]) => {
    const [, symptom] = answers;
    if (symptom === 'urheiluvamma' || answers[3] === 'palautuminen') {
      return {
        title: 'Suosittelemme urheiluhierontaa',
        description: 'Urheiluhieronta auttaa palautumisessa, liikkuvuuden ylläpidossa sekä harjoittelun aiheuttamien lihasjännitysten käsittelyssä.',
        serviceLink: '/palvelut/urheiluhieronta',
        bookingUrl: 'tel:+358400675453',
      };
    }
    return {
      title: 'Suosittelemme klassista hierontaa',
      description: 'Klassinen hieronta sopii monenlaisiin oireisiin. Se auttaa lihaskireyksiin, parantaa verenkiertoa ja edistää kehon omaa palautumiskykyä. Hoidon yhteydessä voimme tarvittaessa hyödyntää myös thermisia- ja TENS-hoitoja.',
      serviceLink: '/palvelut/klassinen-hieronta',
      bookingUrl: 'tel:+358400675453',
    };
  };

  const surveyQuestions = [
    {
      question: 'Missä oireesi sijaitsee?',
      options: [
        { label: 'Niska ja hartiat', value: 'niska' },
        { label: 'Selkä', value: 'selka' },
        { label: 'Leuka ja purenta', value: 'leuka' },
        { label: 'Käsi tai olkapää', value: 'kasi' },
        { label: 'Jalka tai lonkka', value: 'jalka' },
        { label: 'Useampi alue', value: 'useampi' },
      ],
    },
    {
      question: 'Mikä kuvaa tilannettasi parhaiten?',
      options: [
        { label: 'Lihaskireys', value: 'kireys' },
        { label: 'Kipu liikkuessa', value: 'kipu' },
        { label: 'Päänsärky tai migreeni', value: 'paansarky' },
        { label: 'Puutuminen tai säteilyoire', value: 'puutuminen' },
        { label: 'Urheiluvamma', value: 'urheiluvamma' },
        { label: 'Palautuminen harjoittelusta', value: 'palautuminen' },
      ],
    },
    {
      question: 'Kuinka kauan oire on jatkunut?',
      options: [
        { label: 'Alle viikon', value: 'viikko' },
        { label: '1–4 viikkoa', value: '4vko' },
        { label: '1–6 kuukautta', value: '6kk' },
        { label: 'Yli 6 kuukautta', value: 'yli6kk' },
        { label: 'Toistuu säännöllisesti', value: 'toistuu' },
      ],
    },
    {
      question: 'Mitä toivot hoidolta eniten?',
      options: [
        { label: 'Kivun lievitystä', value: 'kivunlievitys' },
        { label: 'Parempaa liikkuvuutta', value: 'liikkuvuus' },
        { label: 'Lihaskireyden helpotusta', value: 'kireydenhelpotus' },
        { label: 'Nopeampaa palautumista', value: 'palautuminen' },
        { label: 'Selvyyttä oireen syyhyn', value: 'selvyys' },
      ],
    },
  ];

  const handleTeamSelect = useCallback((index: number) => {
    if (index === activeTeamIndex || teamTransitioning) return;
    setTeamTransitioning(true);
    setTimeout(() => {
      setActiveTeamIndex(index);
      setTeamTransitioning(false);
    }, 350);
  }, [activeTeamIndex, teamTransitioning]);

  const [heroIndex, setHeroIndex] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % templateData.hero.backgroundImages.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const prevReview = () => setReviewIndex((i) => (i === 0 ? templateData.reviews.items.length - 1 : i - 1));
  const nextReview = () => setReviewIndex((i) => (i === templateData.reviews.items.length - 1 ? 0 : i + 1));

  const activeTeamMember = templateData.team.members[activeTeamIndex];
  const visibleReviews = [
    templateData.reviews.items[reviewIndex % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 1) % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 2) % templateData.reviews.items.length],
    templateData.reviews.items[(reviewIndex + 3) % templateData.reviews.items.length],
  ];

  return (
    <div className="min-h-[100dvh] font-inter antialiased">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: headerScrolled ? 'rgba(18,18,18,0.73)' : 'rgba(18,18,18,0.82)',
          backdropFilter: headerScrolled ? 'blur(13px)' : 'blur(11.5px)',
          WebkitBackdropFilter: headerScrolled ? 'blur(13px)' : 'blur(11.5px)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          transition: 'background 400ms ease, backdrop-filter 400ms ease, -webkit-backdrop-filter 400ms ease',
        }}
      >
        <div className="max-w-[1160px] mx-auto px-5 md:px-10 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link to="/" className="relative z-10 flex-shrink-0 mr-8">
            <img
              src={templateData.navigation.logo}
              alt={templateData.business.name}
              className="h-9 md:h-10 w-auto bg-white rounded-[4px] px-2 py-1 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-7">
            {/* Etusivu */}
            <a
              href="#"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300"
            >
              Etusivu
            </a>

            {/* Palvelut dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Palvelut
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-[240px] bg-[#242424] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-[#F4F4F4]/[0.06] py-2 overflow-hidden"
                >
                  {serviceDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block px-4 py-2.5 font-inter text-[13px] text-[#FFFFFF]/80 hover:text-[#F0F0EA] hover:bg-[#F4F4F4]/[0.04] transition-colors duration-200"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-[#F4F4F4]/[0.06] mt-1 pt-1">
                    <a
                      href="#palvelut"
                      className="block px-4 py-2.5 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#F0F0EA]/80 hover:text-[#F0F0EA] transition-colors duration-200"
                      onClick={() => setServicesOpen(false)}
                    >
                      Kaikki palvelut →
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Hinnasto */}
            <a
              href="#hinnasto"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300"
            >
              Hinnasto
            </a>

            {/* Galleria */}
            <a
              href="#galleria"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300"
            >
              Galleria
            </a>

            {/* Yhteystiedot */}
            <a
              href="#yhteystiedot"
              className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300"
            >
              Yhteystiedot
            </a>

            {/* Extra links */}
            {templateData.navigation.extraLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-inter text-[13px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-[#FFFFFF]/90 hover:text-[#F0F0EA] transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            )}

            {/* CTA Button */}
            <a
              href={templateData.navigation.ctaButton.href}
              className="inline-flex items-center justify-center px-7 py-3 rounded-md font-inter text-[13px] font-semibold tracking-[0.06em] whitespace-nowrap text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
            >
              {templateData.navigation.ctaButton.label}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden relative z-10 text-[#FFFFFF] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-[#181818] border-t border-[#F4F4F4]/[0.06] px-5 py-6"
          >
            <a href="#" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Etusivu</a>

            {/* Mobile services dropdown */}
            <div className="border-b border-[#F4F4F4]/[0.06]">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-3 font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 bg-transparent border-none cursor-pointer"
              >
                <span>Palvelut</span>
                <ChevronDown size={16} strokeWidth={1.5} className={`text-[#FFFFFF]/50 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pb-3 pl-3">
                  {serviceDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block py-2 font-inter text-[13px] text-[#FFFFFF]/70 hover:text-[#F0F0EA] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a href="#palvelut" onClick={() => setMobileOpen(false)} className="block py-2 font-inter text-[12px] font-semibold uppercase tracking-wider text-[#B3B3B3]/70">Kaikki palvelut →</a>
                </div>
              )}
            </div>

            <a href="#hinnasto" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Hinnasto</a>
            <a href="#galleria" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Galleria</a>
            <a href="#yhteystiedot" onClick={() => setMobileOpen(false)} className="block font-inter text-[14px] font-semibold uppercase tracking-wider text-[#FFFFFF]/90 py-3 border-b border-[#F4F4F4]/[0.06]">Yhteystiedot</a>

            {templateData.navigation.extraLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#F4F4F4]/[0.06] last:border-0"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-inter text-[14px] text-[#FFFFFF]/60 py-3 border-b border-[#F4F4F4]/[0.06] last:border-0"
                >
                  {link.label}
                </a>
              )
            )}

            <div className="mt-4 pt-4 border-t border-[#F4F4F4]/[0.06]">
              <a
                href={templateData.navigation.ctaButton.href}
                className="inline-flex items-center justify-center w-full px-5 py-3.5 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] bg-[#181818] text-white hover:bg-[#565656] transition-colors duration-300"
              >
                {templateData.navigation.ctaButton.label}
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {templateData.hero.backgroundImages.map((img, i) => (
          <div
            key={img.src}
            aria-hidden={i !== heroIndex}
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundPosition: img.position,
              filter: 'contrast(1.12)',
              opacity: i === heroIndex ? 1 : 0,
              transition: 'opacity 1600ms ease-in-out',
            }}
          >
            <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${img.dim ?? 0})` }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 35% 50%, rgba(0,0,0,0.49) 0%, rgba(0,0,0,0.64) 50%, rgba(0,0,0,0.79) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.03 }} />
        <div className="relative z-10 w-full max-w-[1160px] mx-auto px-6 md:px-10 flex flex-col items-start text-left pt-[60px]">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-inter text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#B3B3B3] mb-4"
          >
            {templateData.hero.eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-cormorant font-bold text-[29px] md:text-[38px] lg:text-[44px] text-[#FFFFFF] leading-[1.15] mb-5 max-w-[640px]"
          >
            {templateData.hero.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-inter text-[13px] md:text-[14px] text-[#F0F0EA]/65 leading-[1.7] mb-8 max-w-[480px]"
          >
            {templateData.hero.subheadline}
          </motion.p>

          {/* CTA pair */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8"
          >
            <a
              href={templateData.hero.ctaPrimary.href}
              className="inline-flex items-center justify-center px-9 py-[15px] rounded-md font-inter text-[13px] font-semibold tracking-[0.08em] text-[#FFFFFF] hover:-translate-y-1 transition-all duration-300"
              style={{
                background: 'rgba(20,20,20,0.62)',
                border: '1px solid rgba(255,255,255,0.30)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,20,20,0.78)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,20,20,0.62)'; }}
            >
              {templateData.hero.ctaPrimary.label}
            </a>
            <a
              href={templateData.hero.ctaSecondary.href}
              className="inline-flex items-center justify-center px-9 py-[15px] rounded-md font-inter text-[13px] font-semibold tracking-[0.06em] text-[#FFFFFF]/80 border border-[#FFFFFF]/25 hover:border-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-all duration-300"
            >
              {templateData.hero.ctaSecondary.label}
            </a>
          </motion.div>

          {/* Stat cards — premium glass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex items-center justify-start gap-4 md:gap-5"
          >
            {templateData.hero.stats.map((stat, i) => {
              const isNumeric = /^[0-9]/.test(stat.value);
              return (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center px-4 py-3.5 md:px-6 md:py-4 rounded-[14px] min-w-[124px] md:min-w-[156px] min-h-[68px] md:min-h-[78px]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className={`${isNumeric ? 'font-cormorant text-[22px] md:text-[27px]' : 'font-cormorant text-[16px] md:text-[18px] tracking-[0.02em]'} text-[#FFFFFF] leading-none mb-1.5 whitespace-nowrap`}>{stat.value}</p>
                <p className="font-inter text-[10px] text-[#B3B3B3] tracking-[0.06em] whitespace-nowrap">{stat.label}</p>
              </div>
              );
            })}
          </motion.div>
        </div>

        {/* Subtle carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {templateData.hero.backgroundImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setHeroIndex(i)}
              aria-label={`Hero-kuva ${i + 1}`}
              className="bg-transparent border-none p-0 cursor-pointer rounded-full transition-all duration-500"
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: i === heroIndex ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.22)',
              }}
            />
          ))}
        </div>
      </section>

      {/* Welcome / brand intro */}
      <section className="bg-[#F5F4F0] px-6 md:px-10 py-[110px] md:py-[130px]">
        <div className="max-w-[1160px] mx-auto px-0 md:px-[56px] grid grid-cols-1 md:grid-cols-[44%_40%] gap-10 md:gap-0 md:justify-between items-start">
          <ScrollReveal>
            <div>
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656]/70 mb-7">Tervetuloa Bandage Hyvinvointiin</p>
              <h2 className="font-cormorant font-bold text-[30px] md:text-[39px] text-[#181818] leading-[1.18] max-w-[460px]">Hetki palautumiselle, paremmalle ololle ja omalle hyvinvoinnille.</h2>
              <div className="mt-12 flex items-center gap-4">
                <div className="inline-flex shrink-0 items-center bg-[#FFFFFF] border border-[#181818]/[0.08] rounded-md px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <img src={templateData.navigation.logo} alt="Bandage Hyvinvointi" className="block h-6 w-auto" />
                </div>
                <div
                  className="inline-flex items-center gap-3 rounded-md px-5 py-3"
                  style={{
                    background: 'rgba(24,24,24,0.88)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.10)',
                  }}
                >
                  <span className="flex items-center gap-[3px] text-[#F0F0EA]">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} size={12} strokeWidth={0} fill="currentColor" />
                    ))}
                  </span>
                  <span className="font-inter text-[13px] font-semibold text-[#FFFFFF] whitespace-nowrap">62 Timma-arvostelua</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="md:pt-36 max-w-[380px]">
              <div className="w-10 border-t border-[#181818]/[0.18] mb-7" />
              <p className="font-inter text-[15px] md:text-[16.5px] text-[#565656] leading-[1.8]">Bandage Hyvinvoinnissa jokainen hoito lähtee sinun tarpeistasi. Olipa tavoitteesi rentoutua, palautua rasituksesta tai helpottaa kehon kireyksiä, saat rauhallisen hetken ja yksilöllisesti toteutetun hoidon Turun keskustassa.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section id="palvelut" className="bg-[#FFFFFF] pt-16 md:pt-20 pb-16 md:pb-20 px-6 md:px-12">
        <div className="max-w-[920px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-18">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-5">{templateData.services.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#181818] leading-[1.35] mb-6">{templateData.services.headline}</h2>
              <p className="font-inter text-[14px] text-[#181818] leading-[1.75] max-w-[440px] mx-auto">{templateData.services.body}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {templateData.services.primaryServices.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Link to={service.linkHref} className="group block rounded-[12px] overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]" style={{ background: 'rgba(236,236,231,0.62)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(24,24,24,0.12)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)' }}>
                  <div className="relative overflow-hidden">
                    <img src={service.image} alt={service.title} loading="lazy" style={{ objectPosition: service.objectPosition }} className="w-full aspect-[16/10.5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(86,86,86,0.018) 0%, transparent 40%, rgba(222,222,222,0.15) 100%)', mixBlendMode: 'multiply' }} />
                  </div>
                  <div className="px-8 pt-7 pb-9 md:px-10 md:pt-8 md:pb-10">
                    <h3 className="font-cormorant font-bold text-[26px] md:text-[28px] text-[#181818] mb-4">{service.title}</h3>
                    <p className="font-inter text-[14px] text-[#565656] leading-[1.75] mb-8 max-w-[340px]">{service.description}</p>
                    <span className="inline-flex items-center gap-1.5 font-inter text-[13px] text-[#181818]/45 group-hover:text-[#565656] transition-colors duration-300">
                      {service.linkText}
                      <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-18 md:mt-22 pt-12 border-t border-[#181818]/[0.04]">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#565656]/70 text-center mb-10">{templateData.services.secondaryLabel}</p>
              <div className="grid grid-cols-3 gap-4 md:gap-5">
                {templateData.services.secondaryServices.map((service, i) => (
                  <Link key={i} to={service.linkHref} className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]" style={{ border: '1px solid rgba(24,24,24,0.12)' }}>
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img src={service.image} alt={service.title} loading="lazy" style={{ objectPosition: service.objectPosition }} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(43,43,43,0.3) 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <p className="font-cormorant font-bold text-[15px] md:text-[17px] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">{service.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Symptom Survey — hidden for now */}
              {false && (
              <div className="mt-14 md:mt-18 max-w-[520px] mx-auto">
                {surveyStep === 0 ? (
                  /* Intro view */
                  <div className="text-center">
                    <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-4">ETKÖ OLE VARMA?</p>
                    <h3 className="font-cormorant text-[22px] md:text-[26px] text-[#181818] leading-[1.35] mb-3">Selvitä mikä hoito sopii tilanteeseesi</h3>
                    <p className="font-inter text-[14px] text-[#565656] leading-[1.7] mb-6">Vastaa muutamaan kysymykseen ja saat suosituksen oireidesi perusteella.</p>
                    <button
                      onClick={() => { setSurveyStep(1); setSurveyAnswers([]); }}
                      className="inline-flex items-center justify-center px-10 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] bg-[#181818] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:bg-[#565656] transition-all duration-300 cursor-pointer"
                    >
                      Aloita oirekysely
                    </button>
                    <p className="font-inter text-[12px] text-[#565656]/50 mt-3">Kestää noin 30 sekuntia</p>
                  </div>
                ) : surveyStep <= 4 ? (
                  /* Question views */
                  <div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mb-8">
                      <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565656]">Vaihe {surveyStep} / 4</span>
                      <div className="flex-1 h-[2px] bg-[#181818]/[0.08] rounded-full overflow-hidden">
                        <div className="h-full bg-[#181818] rounded-full transition-all duration-500" style={{ width: `${(surveyStep / 4) * 100}%` }} />
                      </div>
                    </div>
                    {/* Question */}
                    <h3 className="font-cormorant text-[22px] md:text-[24px] text-[#181818] leading-[1.35] mb-6">{surveyQuestions[surveyStep - 1].question}</h3>
                    {/* Options grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {surveyQuestions[surveyStep - 1].options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            const newAnswers = [...surveyAnswers];
                            newAnswers[surveyStep - 1] = opt.value;
                            setSurveyAnswers(newAnswers);
                            if (surveyStep < 4) {
                              setSurveyStep(surveyStep + 1);
                            } else {
                              setSurveyStep(5);
                            }
                          }}
                          className="text-left px-5 py-4 rounded-xl bg-white/[0.5] border border-[#B3B3B3]/60 hover:bg-white hover:border-[#181818]/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer"
                        >
                          <span className="font-inter text-[14px] text-[#181818]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                    {/* Back button */}
                    {surveyStep > 1 && (
                      <button
                        onClick={() => { setSurveyStep(surveyStep - 1); }}
                        className="font-inter text-[13px] text-[#565656] hover:text-[#181818] transition-colors cursor-pointer"
                      >
                        ← Takaisin
                      </button>
                    )}
                  </div>
                ) : (
                  /* Result view */
                  (() => {
                    const rec = getRecommendation(surveyAnswers);
                    return (
                      <div className="text-center">
                        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-4">SUOSITUKSEMME</p>
                        <h3 className="font-cormorant text-[24px] md:text-[28px] text-[#181818] leading-[1.3] mb-4">{rec.title}</h3>
                        <p className="font-inter text-[14px] text-[#565656] leading-[1.75] mb-8">{rec.description}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                          <a
                            href={rec.bookingUrl}
                            className="inline-flex items-center justify-center px-10 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] bg-[#181818] text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:bg-[#565656] transition-all duration-300"
                          >
                            Varaa aika
                          </a>
                          <Link
                            to={rec.serviceLink}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-md font-inter text-[14px] font-medium tracking-wide text-[#181818] border border-[#181818]/20 hover:border-[#181818]/40 hover:bg-[#181818]/[0.04] transition-all duration-300"
                          >
                            Tutustu hoitomuotoon
                          </Link>
                        </div>
                        <button
                          onClick={() => { setSurveyStep(0); setSurveyAnswers([]); }}
                          className="font-inter text-[13px] text-[#565656] hover:text-[#181818] transition-colors mt-6 cursor-pointer"
                        >
                          Tee kysely uudelleen
                        </button>
                      </div>
                    );
                  })()
                )}
              </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing */}
      <section id="hinnasto" className="bg-[#F0F0EA] py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-10">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-5">{templateData.pricing.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[30px] text-[#181818] leading-[1.35] mb-4">{templateData.pricing.headline}</h2>
              <p className="font-inter text-[14px] text-[#181818]/80 leading-[1.75] max-w-[400px] mx-auto">{templateData.pricing.body}</p>
            </div>
          </ScrollReveal>

          {/* Tab selector */}
          <ScrollReveal delay={0.1}>
            <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {templateData.pricing.tabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActivePricingTab(i)}
                  className={`shrink-0 px-4 py-2.5 rounded-lg font-inter text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer border ${
                    i === activePricingTab
                      ? 'bg-[#181818] text-white border-[#181818] shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                      : 'bg-transparent text-[#181818] border-[#B3B3B3] hover:bg-[#181818]/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Active tab content */}
          <ScrollReveal delay={0.15}>
            <div className="mb-8">
              <p className="font-inter text-[13px] text-[#565656] mb-4">{templateData.pricing.tabs[activePricingTab].description}</p>
              <div className="border-t border-[#181818]/[0.1]">
                {templateData.pricing.tabs[activePricingTab].items.map((item, ii) => (
                  <div
                    key={ii}
                    className={`flex justify-between items-baseline py-4 ${
                      ii < templateData.pricing.tabs[activePricingTab].items.length - 1 ? 'border-b border-[#181818]/[0.08]' : ''
                    }`}
                  >
                    <span className="font-inter text-[15px] font-medium text-[#181818]">{item.duration}</span>
                    <span className="flex items-baseline gap-1">
                      <span className="font-cormorant text-[22px] text-[#181818]">{item.price}</span>
                      <span className="font-inter text-[13px] text-[#565656]/60">&euro;</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={templateData.business.bookingUrl}
                className="inline-flex items-center justify-center px-10 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'rgba(64,64,62,0.86)',
                  border: '1px solid rgba(24,24,24,0.45)',
                  backdropFilter: 'blur(16px) saturate(1.1)',
                  WebkitBackdropFilter: 'blur(16px) saturate(1.1)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.24), 0 0 0 1px rgba(255,255,255,0.06), 0 6px 18px rgba(0,0,0,0.10)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56,56,54,0.92)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(64,64,62,0.86)'; }}
              >
                Varaa aika
              </a>
              <a
                href={templateData.business.phoneLink}
                className="inline-flex items-center justify-center px-8 py-4 rounded-md font-inter text-[14px] font-medium tracking-wide text-[#181818] border border-[#181818]/20 hover:border-[#181818]/40 hover:bg-[#181818]/[0.04] transition-all duration-300"
              >
                Kysy sopiva hoito
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Reviews */}
      <section id="arvostelut" className="bg-[#181818] pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(86,86,86,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px', opacity: 0.02 }} />
        <div className="relative max-w-[1200px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-8">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B3B3B3]/70 mb-4">{templateData.reviews.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.35] mb-3">{templateData.reviews.headline}</h2>
              <p className="font-inter text-[14px] text-[#B0B0B0]/75 leading-[1.7] max-w-[420px] mx-auto">{templateData.reviews.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="text-center mb-8 md:mb-10">
              <div className="flex items-center justify-center gap-2.5">
                <Star size={15} strokeWidth={1.5} className="text-[#F0F0EA]/80" />
                <span className="font-inter text-[13px] md:text-[14px] font-semibold text-[#FFFFFF]/90">5,0/5 tähteä</span>
                <span className="font-inter text-[13px] md:text-[14px] text-[#B3B3B3]/50">&bull;</span>
                <span className="font-inter text-[13px] md:text-[14px] text-[#B0B0B0]/70">62 Timma-arvostelua</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              <div className="flex justify-center gap-5 md:gap-6 pb-4">
                {visibleReviews.slice(0, 3).map((review, i) => (
                  <div key={`${reviewIndex}-${i}`} className="flex-shrink-0 w-[280px] md:w-[310px]">
                    <div className="rounded-xl p-8 md:p-10 h-full flex flex-col border border-[#FFFFFF]/[0.20]" style={{ background: 'rgba(20,20,20,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                      <p className="font-inter text-[14px] text-[#FFFFFF]/90 leading-[1.75] italic flex-1">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#FFFFFF]/[0.06]">
                        <div className="w-10 h-10 rounded-full bg-[#2E2E2E] border border-[#FFFFFF]/[0.06] flex items-center justify-center">
                          <span className="font-cormorant text-[15px] text-[#FFFFFF]/60">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-inter text-[14px] font-semibold text-[#FFFFFF]">{review.name}</p>
                          <p className="font-inter text-[11px] text-[#F0F0EA]/50">{review.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={prevReview} aria-label="Edelliset arvostelut" className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#F4F4F4]/10 items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button onClick={nextReview} aria-label="Seuraavat arvostelut" className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#F4F4F4]/10 items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
              <div className="flex md:hidden justify-center gap-3 mt-6">
                <button onClick={prevReview} aria-label="Edelliset arvostelut" className="w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                  <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button onClick={nextReview} aria-label="Seuraavat arvostelut" className="w-10 h-10 rounded-full border border-[#F4F4F4]/10 flex items-center justify-center text-[#FFFFFF]/40 hover:text-[#FFFFFF]/80 hover:border-[#F4F4F4]/25 transition-colors bg-transparent cursor-pointer">
                  <ChevronRight size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex justify-center mt-8 md:mt-10">
                <a href="#arvostelut" className="group inline-flex items-center gap-2 rounded-full border border-[#F4F4F4]/15 px-6 py-2.5 font-inter text-[13px] font-medium text-[#F0F0EA]/80 hover:text-[#FFFFFF] hover:border-[#F4F4F4]/30 transition-colors">
                  Katso kaikki arvostelut
                  <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section id="asiantuntijat" className="relative bg-[#181818] pt-20 md:pt-28 pb-8 md:pb-10 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 25%, rgba(86,86,86,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />
        <div className="relative max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F0F0EA]/70 mb-5">{templateData.team.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#FFFFFF] leading-[1.2]">{templateData.team.headline}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-8 md:gap-14 items-start">
            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <div className="relative overflow-hidden rounded-lg mx-auto md:mx-0 max-w-[320px] md:max-w-none">
                <img src={activeTeamMember.image} alt={activeTeamMember.name} loading="lazy" style={{ objectPosition: activeTeamMember.imagePosition }} className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(43,43,43,0.45) 100%)' }} />
              </div>
            </div>

            <div style={{ opacity: teamTransitioning ? 0 : 1, transform: teamTransitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 350ms ease-in-out, transform 350ms ease-out' }}>
              <p className="font-cormorant font-bold text-[22px] md:text-[24px] text-[#FFFFFF] mb-2">{activeTeamMember.name}</p>
              <p className="font-inter text-[12px] font-medium text-[#F0F0EA]/60 tracking-[0.12em] uppercase mb-8">{activeTeamMember.title}</p>
              <div className="font-inter text-[14px] text-[#F0F0EA]/85 leading-[1.8] mb-7 max-w-[420px] space-y-4">
                {activeTeamMember.bio.split('\\n\\n').map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>

              {/* Profile selector (only when multiple experts) */}
              {templateData.team.members.length > 1 && (
              <div className="flex gap-7 md:gap-8">
                {templateData.team.members.map((t, i) => (
                  <button key={i} onClick={() => handleTeamSelect(i)} className="group flex flex-col items-center text-center cursor-pointer bg-transparent border-none p-0">
                    <div className={`rounded-full overflow-hidden mb-2 transition-all duration-300 ${i === activeTeamIndex ? 'w-12 h-12 md:w-14 md:h-14 border-2 border-[#B3B3B3] opacity-100 scale-105' : 'w-10 h-10 md:w-11 md:h-11 border border-[#565656]/20 opacity-60 group-hover:opacity-85 scale-100'}`}>
                      <img src={t.avatar} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <p className={`font-inter text-[11px] mb-px transition-colors duration-300 ${i === activeTeamIndex ? 'text-[#FFFFFF]/80' : 'text-[#FFFFFF]/25 group-hover:text-[#FFFFFF]/50'}`}>{t.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
              )}

              <a href="#asiantuntijat" className="group inline-flex items-center gap-2 mt-6 font-inter text-[13px] font-medium text-[#F0F0EA]/75 hover:text-[#FFFFFF] transition-colors">
                <span className="underline underline-offset-4 decoration-[#F0F0EA]/25 group-hover:decoration-[#F0F0EA]/70 transition-colors">Lue lisää {activeTeamMember.ctaName}</span>
                <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vastaanotto */}
      <section className="bg-[#F0F0EA] pt-16 md:pt-24 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[55%_1fr] gap-10 md:gap-14 items-center">
            {/* Exterior image with address overlay */}
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-lg border border-[#181818]/[0.08]">
                <img
                  src={templateData.location.image}
                  alt="Bandage Hyvinvoinnin liiketila Käsityöläiskadulla"
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg px-4 py-2.5 border border-[#FFFFFF]/15" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                  <MapPin size={14} strokeWidth={1.5} className="text-[#FFFFFF]/80 shrink-0" />
                  <span className="font-inter text-[12px] md:text-[13px] font-medium tracking-[0.04em] text-[#FFFFFF]/90 whitespace-nowrap">{templateData.location.address}</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Location content */}
            <ScrollReveal delay={0.1}>
              <div>
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#565656] mb-4">{templateData.location.eyebrow}</p>
                <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#181818] leading-[1.2] mb-4">{templateData.location.headline}</h2>
                <p className="font-inter text-[14px] md:text-[15px] text-[#565656] leading-[1.7] mb-6 max-w-[420px]">{templateData.location.body}</p>

                <div>
                  {templateData.location.points.map((point, i) => (
                    <div key={i} className={`flex items-start gap-4 py-3 ${i > 0 ? 'border-t border-[#181818]/[0.06]' : ''}`}>
                      <span className="shrink-0 mt-[2px] text-[#181818]/60">
                        {point.icon === 'train' && <Train size={17} strokeWidth={1.5} />}
                        {point.icon === 'car' && <Car size={17} strokeWidth={1.5} />}
                      </span>
                      <div>
                        <p className="font-inter text-[14px] font-semibold text-[#181818] leading-[1.4] mb-1">{point.heading}</p>
                        <p className="font-inter text-[13px] text-[#565656] leading-[1.6]">{point.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {templateData.business.googleMapsUrl && (
                  <a
                    href={templateData.business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 font-inter text-[13px] font-medium text-[#181818]/70 tracking-[0.04em] no-underline hover:text-[#181818] hover:underline underline-offset-4 decoration-[#181818]/20 transition-colors duration-300"
                  >
                    {templateData.location.mapLinkLabel}
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#E6E6E1] pt-16 md:pt-20 pb-6 md:pb-8 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-14">
              <p className="font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-[#565656]/70 mb-5">{templateData.faq.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[26px] md:text-[32px] text-[#181818] leading-[1.25]">{templateData.faq.headline}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-12 md:mb-14">
              {templateData.faq.items.map((faq, i) => (
                <div key={i} className="border-t border-[#181818]/[0.06]">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="group w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left bg-transparent border-none cursor-pointer">
                    <span className="font-inter text-[15px] md:text-[16px] font-semibold text-[#181818] leading-[1.5]">{faq.question}</span>
                    <span className="shrink-0 mt-[2px] text-[#565656]/50 group-hover:text-[#565656]/70 transition-colors duration-300">
                      {openFaqIndex === i ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-[400ms] ease-out" style={{ maxHeight: openFaqIndex === i ? '220px' : '0px', opacity: openFaqIndex === i ? 1 : 0 }}>
                    <div className="font-inter text-[14px] text-[#565656] leading-[1.75] pb-5 md:pb-6 max-w-[540px]">
                      {faq.answer}
                      {faq.includePhone && (
                        <a href={templateData.business.phoneLink} className="block mt-3 font-inter text-[14px] text-[#181818]/70 tracking-wider no-underline hover:text-[#181818] hover:underline underline-offset-4 decoration-[#4A4540]/20 transition-colors duration-300">
                          📞 {templateData.business.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-[#181818]/[0.06]" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110" style={{ backgroundImage: `url(${templateData.finalCta.backgroundImage})` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 48%, rgba(20,16,12,0.38) 0%, rgba(20,16,12,0.68) 55%, rgba(20,16,12,0.92) 100%), linear-gradient(180deg, rgba(20,16,12,0.72) 0%, rgba(20,16,12,0.15) 35%, rgba(20,16,12,0.32) 65%, rgba(20,16,12,0.88) 100%)' }} />
        <div className="relative z-10 w-full max-w-[480px] mx-auto px-6 pt-[2vh]">
          <ScrollReveal>
            <div className="text-center">
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B0B0B0] mb-4">{templateData.finalCta.eyebrow}</p>
              <h2 className="font-cormorant font-bold text-[28px] md:text-[34px] text-[#FFFFFF] leading-[1.25] mb-4">{templateData.finalCta.headline}</h2>
              <p className="font-inter text-[15px] text-[#D8D8D8] leading-[1.6] mb-10 max-w-[340px] mx-auto">{templateData.finalCta.supportText}</p>

              <div className="flex flex-col items-center gap-3 mb-8">
                <a href={templateData.business.bookingUrl} className="inline-flex items-center justify-center px-14 py-4 rounded-md font-inter text-[14px] font-semibold tracking-[0.08em] text-[#FFFFFF] hover:-translate-y-0.5 transition-all duration-300 w-full max-w-[280px]"
                  style={{
                    background: 'rgba(20,20,20,0.55)',
                    border: '1px solid rgba(255,255,255,0.30)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,20,20,0.72)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20,20,20,0.55)'; }}
                >
                  {templateData.finalCta.ctaLabel}
                </a>
                <a href={templateData.business.phoneLink} className="inline-flex items-center justify-center gap-2 font-inter text-[15px] font-medium text-[#D8D8D8] tracking-wide no-underline hover:text-[#FFFFFF] transition-colors duration-300 py-2">
                  <Phone size={15} strokeWidth={1.5} />
                  {templateData.finalCta.phone}
                </a>
                <p className="font-inter text-[12px] text-[#A0A0A0] tracking-wide">{templateData.finalCta.phoneSupport}</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="font-inter text-[12px] text-[#D0D0D0] tracking-wide">★ 5,0 Google &bull; 62 arviota Timmassa &bull; Turku</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="yhteystiedot" className="bg-[#181818] pt-14 md:pt-16 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
            <div>
              <h3 className="font-cormorant text-[18px] text-[#FFFFFF] mb-1">{templateData.business.name}</h3>
              <p className="font-inter text-[13px] text-[#9A9A94]/80 mb-4">{templateData.business.tagline}</p>
              <ul className="space-y-2">
                <li className="font-inter text-[14px] text-[#9A9A94] flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" /> {templateData.business.address}
                </li>
                <li>
                  <a href={templateData.business.phoneLink} className="font-inter text-[14px] text-[#9A9A94] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 no-underline">
                    <Phone size={14} className="shrink-0" /> {templateData.business.phone}
                  </a>
                </li>
                <li>
                  <a href={templateData.business.emailLink} className="font-inter text-[14px] text-[#9A9A94] hover:text-[#FFFFFF] transition-colors flex items-center gap-2 no-underline">
                    <Mail size={14} className="shrink-0" /> {templateData.business.email}
                  </a>
                </li>
              </ul>
            </div>
            {templateData.footer.columns.map((col, i) => (
              <div key={i}>
                <h4 className="font-inter text-[13px] font-semibold uppercase tracking-wider text-[#FFFFFF] mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="font-inter text-[14px] text-[#9A9A94] hover:text-[#FFFFFF] transition-colors no-underline">{link.label}</Link>
                      ) : (
                        <a href={link.href} className="font-inter text-[14px] text-[#9A9A94] hover:text-[#FFFFFF] transition-colors no-underline">{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F4F4F4]/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-inter text-[12px] text-[#8A8A82]/70">{templateData.footer.copyright}</p>
            <p className="font-inter text-[12px] text-[#8A8A82]/60">{templateData.footer.paymentMethods}</p>
            <div className="flex gap-4">
              <a href={templateData.business.instagramUrl} className="text-[#8A8A82]/70 hover:text-[#FFFFFF]/80 transition-colors"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.facebookUrl} className="text-[#8A8A82]/70 hover:text-[#FFFFFF]/80 transition-colors"><Facebook size={18} strokeWidth={1.5} /></a>
              <a href={templateData.business.phoneLink} className="text-[#8A8A82]/70 hover:text-[#FFFFFF]/80 transition-colors"><Phone size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
