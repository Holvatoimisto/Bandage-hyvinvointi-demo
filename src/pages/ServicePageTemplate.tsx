import { useParams, Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  duration: string;
  image: string;
  eyebrow: string;
}

const services: ServiceDetail[] = [
  {
    slug: 'klassinen-hieronta',
    eyebrow: 'KLASSINEN HIERONTA',
    title: 'Klassinen hieronta',
    subtitle: 'Perinteistä pehmytkudosten käsittelyä ammattitaidolla',
    description: 'Klassinen hieronta on käsin tehtävää kehon pehmytkudosten käsittelyä, joka rentouttaa lihaksia, parantaa verenkiertoa ja helpottaa jännitystä. Hoito on rauhallisempaa ja rentouttavaa, ja sen voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan. Tarvittaessa hoidossa voidaan hyödyntää myös thermisia- ja TENS-hoitoja.',
    benefits: ['Rentouttaa lihaksia', 'Parantaa verenkiertoa', 'Auttaa palautumisessa', 'Lieventää kipua', 'Lisää liikkuvuutta', 'Vähentää stressiä'],
    duration: '30–120 min',
    image: '/assets/bandage_room.jpg',
  },
  {
    slug: 'urheiluhieronta',
    eyebrow: 'URHEILUHIERONTA',
    title: 'Urheiluhieronta',
    subtitle: 'Syvempää käsittelyä urheilijoille ja aktiiviliikkujille',
    description: 'Urheiluhieronnassa käytetään voimakkaampia tekniikoita lihaskireyksien hoitoon ja palautumisen tukemiseen. Hoito auttaa liikkuvuuden ylläpidossa sekä harjoittelun aiheuttamien lihasjännitysten käsittelyssä. Se sopii urheilijoille ja aktiiviliikkujille, mutta myös kaikille, jotka kaipaavat syvempää käsittelyä.',
    benefits: ['Nopeuttaa palautumista', 'Käsittelee lihaskireyksiä', 'Ylläpitää liikkuvuutta', 'Ehkäisee vammoja', 'Tehokkaammat tekniikat', 'Yksilöllisesti räätälöity'],
    duration: '30–120 min',
    image: '/assets/bandage_rooms.jpg',
  },
  {
    slug: 'yrityspalvelut',
    eyebrow: 'YRITYSPALVELUT',
    title: 'Yritysten hyvinvointipäivät',
    subtitle: 'Räätälöidyt hyvinvointipaketit yrityksille ja ryhmille',
    description: 'Järjestämme yritysten ja ryhmien hyvinvointipäiviä Turun alueella. Paketit räätälöidään toiveidenne mukaan, ja palvelut voidaan järjestää myös asiakkaan tiloissa. Laskutus onnistuu suoraan yritykselle. Kysy lisää ja pyydä tarjous puhelimitse tai sähköpostitse.',
    benefits: ['Räätälöidyt paketit', 'Myös asiakkaan tiloissa', 'Laskutus yritykselle', 'Turun alue ja lähikunnat', 'Sopii ryhmille', 'Helppo järjestää'],
    duration: 'Sopimuksen mukaan',
    image: '/assets/bandage_storefront.jpg',
  },
];

export function ServicePageTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="bg-white pt-32 pb-20 px-6 text-center">
        <h1 className="font-cormorant text-2xl text-[#181818] mb-4">Palvelua ei löytynyt</h1>
        <Link to="/" className="font-inter text-[13px] text-[#565656] hover:text-[#181818]">
          Takaisin etusivulle
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[100dvh]">
      {/* Header spacer */}
      <div className="h-[60px] md:h-[68px]" />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[3px] text-white/40 mb-4">
              {service.eyebrow}
            </p>
            <h1 className="font-cormorant text-[28px] md:text-[36px] text-white leading-[1.2] mb-4">
              {service.title}
            </h1>
            <p className="font-inter text-[14px] text-white/60 max-w-[400px] mx-auto">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-6 md:px-12">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 font-inter text-[13px] text-[#565656] hover:text-[#181818] transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              Takaisin etusivulle
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="font-cormorant text-[22px] md:text-[26px] text-[#181818] leading-[1.3] mb-6">
              {service.subtitle}
            </h2>
            <p className="font-inter text-[15px] text-[#181818] leading-[1.75] mb-10">
              {service.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#565656] mb-5">
              Hoidon hyödyt
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#181818]/50 shrink-0" />
                  <span className="font-inter text-[14px] text-[#181818]">{b}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center gap-4 mb-10 py-4 border-t border-b border-[#1A1A1A]/[0.05]">
              <span className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#565656]">
                Kesto
              </span>
              <span className="font-inter text-[15px] font-medium text-[#181818]">
                {service.duration}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <a
              href="tel:+358400675453"
              className="inline-flex items-center justify-center px-14 py-[16px] rounded font-inter text-[14px] font-semibold tracking-wide bg-[#181818] text-white hover:bg-[#565656] transition-colors duration-300 mb-4"
            >
              Varaa aika
            </a>
            <p className="font-inter text-[13px] text-[#565656]/60">
              Soita tai WhatsApp <a href="tel:+358400675453" className="text-[#565656] hover:text-[#181818]">040 067 5453</a>
            </p>
          </ScrollReveal>

          {/* All services nav */}
          <ScrollReveal delay={0.25}>
            <div className="mt-14 pt-10 border-t border-[#1A1A1A]/[0.05]">
              <h3 className="font-inter text-[13px] font-semibold uppercase tracking-[2px] text-[#565656] mb-5">
                Kaikki palvelut
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/palvelut/${s.slug}`}
                    className={`font-inter text-[13px] py-2 transition-colors duration-300 flex items-center gap-1.5 ${
                      s.slug === service.slug
                        ? 'text-[#181818] font-medium'
                        : 'text-[#181818] hover:text-[#181818]'
                    }`}
                  >
                    {s.title.split(' ')[0]}
                    {s.slug !== service.slug && <ArrowRight size={11} strokeWidth={1.5} />}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
