'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MenuCategory, Store, WeeklyMenu } from '@/lib/data';

type Page = 'home' | 'story' | 'menu' | 'locations';
type Lang = 'pt' | 'en';
type MenuTab = 'weekly' | 'full';

const CONTENT = {
  pt: {
    nav: { home: 'Início', story: 'A Nossa História', menu: 'Menu', locations: 'Lojas' },
    header: { order: 'Encomendar' },
    hero: {
      eyebrow: 'Comida caseira portuguesa · desde 1987',
      title: 'O sabor de casa, pronto a levar.',
      sub: 'Há mais de 35 anos que cozinhamos com receitas de família. Todos os dias encontra comida fresca feita em loja, pronta a levar, e também pratos congelados para ter sempre em casa.',
      cta1: 'Ver o menu',
      cta2: 'As nossas lojas',
      imgLabel: '[ foto · mesa de família ]',
      badge: 'Desde',
    },
    values: ['Feito fresco todos os dias', 'Cerca de 10 opções por dia', 'Congelados disponíveis'],
    how: {
      eyebrow: 'Simples como comida de casa',
      heading: 'Como funciona',
      steps: [
        { n: '1', t: 'Escolha na loja', d: 'Todos os dias há cerca de 10 opções frescas, feitas em loja e prontas a levar.' },
        { n: '2', t: 'Leve fresco ou congelado', d: 'Escolha comida fresca para hoje ou pratos congelados para ter sempre à mão.' },
        { n: '3', t: 'Aqueça e sirva', d: 'Em casa, aqueça e sirva. Tão simples como comida caseira acabada de fazer.' },
      ],
      customHeading: 'Quer algo personalizado?',
      customSteps: [
        { n: '1', t: 'Escolha a loja', d: 'Escolha a loja onde quer levantar a sua encomenda.' },
        { n: '2', t: 'Ligue com 48h', d: 'Contacte a loja com pelo menos 48h de antecedência para combinar o pedido.' },
        { n: '3', t: 'Levante na data escolhida', d: 'Passe na loja selecionada no dia combinado.' },
      ],
      customCta: 'Ver lojas e contactos',
    },
    featured: { eyebrow: 'O nosso menu', heading: 'Pratos de sempre, cozinhados com tempo', link: 'Ver menu completo' },
    menu: {
      eyebrow: 'A nossa cozinha',
      heading: 'O nosso menu',
      note: 'Todos os dias temos cerca de 10 opções frescas feitas em loja, prontas a levar. Também há pratos congelados para guardar em casa. Para encomendas maiores ou pratos específicos, contacte a loja com 48 a 72 horas de antecedência. O menu pode variar conforme a época e a disponibilidade dos ingredientes.',
      weeklyTab: 'Menu semanal',
      fullTab: 'Menu completo',
      weeklyHeading: 'Menu semanal',
      weeklyText: 'Veja as opções frescas preparadas em loja para esta semana. A disponibilidade pode variar ao longo do dia, por isso contacte a loja se quiser confirmar um prato específico.',
      weeklyUpdated: 'Atualizado em',
      weeklyUnavailable: 'O menu semanal não está disponível neste momento. Contacte a loja para confirmar as opções frescas de hoje.',
      weeklyEmpty: 'Sem pratos indicados.',
      weeklyCta: 'Contactar a loja',
      fullHeading: 'Menu completo',
      fullText: 'Esta é a nossa lista completa de pratos. Para saber o que está fresco hoje, fale diretamente com a sua loja.',
    },
    story: {
      eyebrow: 'Desde 1987',
      heading: 'A Nossa História',
      lead: 'Comida portuguesa de sempre, feita com o cuidado de quem cozinha para a sua própria família.',
      paras: [
        'A nossa história começa dentro de casa com jantares especiais entre amigos e família.',
        'Em Fevereiro de 1987 servimos o nosso primeiro cocktail, a entrada para um negócio de sucesso.',
        'A tradição de servir bem continua até aos dias de hoje.',
        'O segredo? “Amamos o que fazemos, por isso fazemos bem”.',
        'É com este lema que servimos a comida de casa de muitas pessoas. Temos duas lojas que, além de vasta oferta de congelados, vendem uma média de 10 opções diferentes de pratos em sistema de take-away.',
        'Se preferir pode almoçar connosco, tanto na Amoreira como em Cascais será recebido num ambiente tranquilo e familiar.',
      ],
      quote: 'Cozinhamos como se fosse para a nossa própria família.',
      stats: [
        { v: '1987', l: 'Ano de fundação' },
        { v: '3', l: 'Lojas' },
        { v: '35+', l: 'Anos a cozinhar' },
      ],
    },
    loc: {
      eyebrow: 'Onde estamos',
      heading: 'As Nossas Lojas',
      sub: 'Encontre a loja Olguinhas mais perto de si. As encomendas são feitas por telefone ou diretamente em cada loja.',
      phoneLabel: 'Telefone',
      hoursLabel: 'Horário',
      orderNote: 'Passe pela loja para escolher entre as opções frescas do dia, feitas em loja, ou leve pratos congelados para guardar. Para encomendas maiores, contacte a loja com 48 a 72 horas de antecedência.',
    },
    cta: {
      heading: 'Pronto para encomendar?',
      sub: 'Visite a sua loja Olguinhas mais próxima para escolher as opções frescas do dia ou pratos congelados para ter sempre em casa.',
      btn: 'Ver as lojas',
    },
    footer: {
      tagline: 'Comida caseira portuguesa feita fresca todos os dias em loja, com opções prontas a levar e pratos congelados.',
      navTitle: 'Navegação',
      citiesTitle: 'Lojas',
      rights: '© 2026 Olguinhas · Todos os direitos reservados',
      slogan: 'Chop Chop do melhor',
    },
  },
  en: {
    nav: { home: 'Home', story: 'Our Story', menu: 'Menu', locations: 'Locations' },
    header: { order: 'Order' },
    hero: {
      eyebrow: 'Portuguese home cooking · since 1987',
      title: 'The taste of home, ready to go.',
      sub: 'For over 35 years we have cooked with family recipes. Every day you will find fresh food made in store, ready to take home, plus frozen dishes to keep on hand.',
      cta1: 'See the menu',
      cta2: 'Our stores',
      imgLabel: '[ photo · family table ]',
      badge: 'Since',
    },
    values: ['Made fresh every day', 'Around 10 options daily', 'Frozen dishes available'],
    how: {
      eyebrow: 'As simple as home cooking',
      heading: 'How it works',
      steps: [
        { n: '1', t: 'Choose in store', d: 'Every day there are around 10 fresh options, made in store and ready to go.' },
        { n: '2', t: 'Take fresh or frozen', d: 'Choose fresh food for today or frozen dishes to keep ready at home.' },
        { n: '3', t: 'Heat and serve', d: 'At home, heat and serve. As simple as freshly made home cooking.' },
      ],
      customHeading: 'Want something custom?',
      customSteps: [
        { n: '1', t: 'Choose the store', d: 'Choose the store where you want to pick up your order.' },
        { n: '2', t: 'Call with 48h notice', d: 'Contact the store at least 48h in advance to arrange the order.' },
        { n: '3', t: 'Pick it up', d: 'Collect it from the selected store on the agreed date.' },
      ],
      customCta: 'See stores and contacts',
    },
    featured: { eyebrow: 'Our menu', heading: 'Timeless dishes, slow-cooked with care', link: 'See full menu' },
    menu: {
      eyebrow: 'Our kitchen',
      heading: 'Our menu',
      note: 'Every day we have around 10 fresh options made in store, ready to go. Frozen dishes are also available to keep at home. For larger orders or specific dishes, contact the store 48 to 72 hours in advance. The menu may vary with the season and ingredient availability.',
      weeklyTab: 'Weekly menu',
      fullTab: 'Full menu',
      weeklyHeading: 'Weekly menu',
      weeklyText: 'See the fresh in-store options prepared for this week. Availability can change during the day, so contact the store if you want to confirm a specific dish.',
      weeklyUpdated: 'Updated on',
      weeklyUnavailable: 'The weekly menu is not available right now. Contact the store to confirm today’s fresh options.',
      weeklyEmpty: 'No dishes listed.',
      weeklyCta: 'Contact the store',
      fullHeading: 'Full menu',
      fullText: 'This is our full list of dishes. To know what is fresh today, contact your store directly.',
    },
    story: {
      eyebrow: 'Since 1987',
      heading: 'Our Story',
      lead: 'Everyday Portuguese food, made with the care of someone cooking for their own family.',
      paras: [
        'It all started in 1987, in a small kitchen in Cascais, with a wish to bring everyday Portuguese food to those who had no time to cook it.',
        'What began as a counter of dishes of the day became, over more than three decades, a family kitchen for many families. The recipes remain the same, passed from hand to hand, cooked with the care of someone cooking for their own.',
        'Today we are three stores — in Cascais, Estoril and Lisbon — but the way we do things has not changed: fresh ingredients, time to cook, and the genuine taste of home cooking, ready to take to your table.',
      ],
      quote: 'We cook as if it were for our own family.',
      stats: [
        { v: '1987', l: 'Year founded' },
        { v: '3', l: 'Stores' },
        { v: '35+', l: 'Years cooking' },
      ],
    },
    loc: {
      eyebrow: 'Where we are',
      heading: 'Our Stores',
      sub: 'Find the Olguinhas store nearest you. Orders are placed through the phone or directly at each store.',
      phoneLabel: 'Phone',
      hoursLabel: 'Hours',
      orderNote: 'Visit the store to choose from the fresh daily options made in store, or take frozen dishes home to keep. For larger orders, contact the store 48 to 72 hours in advance.',
    },
    cta: {
      heading: 'Ready to order?',
      sub: 'Visit your nearest Olguinhas store to choose the fresh daily options or frozen dishes to keep at home.',
      btn: 'See our stores',
    },
    footer: {
      tagline: 'Portuguese home cooking made fresh every day in store, with ready-to-go options and frozen dishes.',
      navTitle: 'Navigation',
      citiesTitle: 'Stores',
      rights: '© 2026 Olguinhas · All rights reserved',
      slogan: 'Chop Chop do melhor',
    },
  },
} as const;

const BRAND_MIST = '#d3dcd9';
const BRAND_MIST_BORDER = '#c2cdc8';
const LOGO_ASPECT_RATIO = 1537 / 1656;
const LOGO_MASK = 'url("/olguinhas_logo.svg") center / contain no-repeat';
const IMAGE_FALLBACK_SRC = '/images/placeholder.png';
const CATEGORY_IMAGE_SRC: Record<string, string> = {
  sopas: '/images/category-sopas.png',
  bacalhau: '/images/category-bacalhau.png',
  carne: '/images/category-carne.png',
  peixe: '/images/category-peixe.png',
  crepes: '/images/category-crepes.png',
  pies: '/images/category-pies.png',
  saladas: '/images/category-saladas.png',
  acomp: '/images/category-acompanhamentos.png',
  salgados: '/images/category-salgados.png',
  vegetariano: '/images/category-vegetariano.png',
  doces: '/images/category-doces.png',
};
const WEEKLY_CATEGORY_LABEL_EN: Record<string, string> = {
  sopa: 'Soup',
  carne: 'Meat',
  peixe: 'Fish',
  vegetariano: 'Vegetarian',
  acompanhamento: 'Side',
};
const WEEKLY_DAY_LABEL_EN: Record<string, string> = {
  segunda: 'Monday',
  terca: 'Tuesday',
  quarta: 'Wednesday',
  quinta: 'Thursday',
  sexta: 'Friday',
  sabado: 'Saturday',
  domingo: 'Sunday',
};

function weeklyCategoryLabel(key: string, label: string, lang: Lang) {
  return lang === 'en' ? WEEKLY_CATEGORY_LABEL_EN[key] ?? label : label;
}

function weeklyDayLabel(day: string, label: string, lang: Lang) {
  return lang === 'en' ? WEEKLY_DAY_LABEL_EN[day] ?? label : label;
}

function ImageFrame({ src, alt, priority = false, style }: { src: string; alt: string; priority?: boolean; style?: React.CSSProperties }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div style={{ position: 'relative', background: BRAND_MIST, border: `1px solid ${BRAND_MIST_BORDER}`, ...style }}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => {
          if (imageSrc !== IMAGE_FALLBACK_SRC) {
            setImageSrc(IMAGE_FALLBACK_SRC);
          }
        }}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

function OlguinhasLogo({ color, label = 'Olguinhas', decorative = false, style }: { color: string; label?: string; decorative?: boolean; style?: React.CSSProperties }) {
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img' as const, 'aria-label': label };

  return (
    <span
      {...accessibilityProps}
      style={{
        display: 'block',
        aspectRatio: `${LOGO_ASPECT_RATIO}`,
        backgroundColor: color,
        mask: LOGO_MASK,
        WebkitMask: LOGO_MASK,
        ...style,
      }}
    />
  );
}

interface Props {
  menuCategories: MenuCategory[];
  stores: Store[];
  weeklyMenu: WeeklyMenu | null;
}

export default function OlguinhasApp({ menuCategories, stores, weeklyMenu }: Props) {
  const [page, setPage] = useState<Page>('home');
  const [lang, setLang] = useState<Lang>('pt');
  const [menuTab, setMenuTab] = useState<MenuTab>('weekly');

  const t = CONTENT[lang];

  const go = (p: Page) => () => {
    setPage(p);
    try { window.scrollTo(0, 0); } catch {}
  };

  const navKeys: Array<{ key: Page; label: string }> = [
    { key: 'home', label: t.nav.home },
    { key: 'menu', label: t.nav.menu },
    { key: 'story', label: t.nav.story },
    { key: 'locations', label: t.nav.locations },
  ];

  const navBase: React.CSSProperties = {
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    textDecoration: 'none',
    paddingBottom: 4,
    color: '#6f7c77',
    borderBottom: '2px solid transparent',
  };
  const navActive: React.CSSProperties = { color: '#2f4a43', borderBottom: '2px solid #4a7366' };

  const langOn: React.CSSProperties = { cursor: 'pointer', color: '#2f4a43', padding: '2px 4px' };
  const langOff: React.CSSProperties = { cursor: 'pointer', color: '#a99e84', padding: '2px 4px' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f4eee2' }}>

      {/* Header */}
      <header className="og-header" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,238,226,0.92)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${BRAND_MIST}` }}>
        <div className="og-header-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', height: 86, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <a className="og-logo-link" onClick={go('home')} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', textDecoration: 'none' }}>
            <OlguinhasLogo color="#2f4a43" style={{ height: 58, width: 58 * LOGO_ASPECT_RATIO }} />
          </a>
          <nav className="og-main-nav" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {navKeys.map(({ key, label }) => (
              <a key={key} onClick={go(key)} style={page === key ? { ...navBase, ...navActive } : navBase}>{label}</a>
            ))}
          </nav>
          <div className="og-header-actions" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.04em' }}>
              <span onClick={() => setLang('pt')} style={lang === 'pt' ? langOn : langOff}>PT</span>
              <span style={{ color: '#b9ad93' }}>/</span>
              <span onClick={() => setLang('en')} style={lang === 'en' ? langOn : langOff}>EN</span>
            </div>
            <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: '#4a7366', color: '#f4eee2', fontWeight: 700, fontSize: 14, letterSpacing: '0.02em', padding: '11px 22px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.header.order}</a>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>

        {/* ============ HOME ============ */}
        {page === 'home' && (
          <div>
            {/* Hero */}
            <section className="og-hero" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 64px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 22 }}>{t.hero.eyebrow}</div>
                <h1 className="og-hero-title" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 62, lineHeight: 1.04, letterSpacing: '-0.01em', color: '#2f4a43', margin: '0 0 24px', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>{t.hero.title}</h1>
                <p style={{ fontSize: 19, lineHeight: 1.62, color: '#586962', maxWidth: '31em', margin: '0 0 36px' }}>{t.hero.sub}</p>
                <div className="og-button-row" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <a onClick={go('menu')} style={{ display: 'inline-flex', alignItems: 'center', background: '#4a7366', color: '#f4eee2', fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.hero.cta1}</a>
                  <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#4a7366', fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 999, border: `1.5px solid ${BRAND_MIST_BORDER}`, cursor: 'pointer', textDecoration: 'none' }}>{t.hero.cta2}</a>
                </div>
              </div>
              <div className="og-hero-media" style={{ position: 'relative' }}>
                <ImageFrame src="/images/hero-family-table.png" alt={lang === 'pt' ? 'Comida caseira Olguinhas pronta a levar' : 'Olguinhas home-style food ready to take home'} priority style={{ aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden' }} />
                <div className="og-hero-badge" style={{ position: 'absolute', bottom: -22, left: -22, background: '#fbf8f1', border: '1px solid #d8cdb5', borderRadius: 12, padding: '16px 22px', boxShadow: '0 14px 40px rgba(47,74,67,0.12)' }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#4a7366', lineHeight: 1 }}>1987</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a958f', marginTop: 4 }}>{t.hero.badge}</div>
                </div>
              </div>
            </section>

            {/* Values bar */}
            <section style={{ background: '#4a7366', color: '#e7ede9' }}>
              <div className="og-values-bar" style={{ maxWidth: 1200, margin: '0 auto', padding: '22px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px 48px' }}>
                {t.values.map(v => (
                  <span key={v} style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: '#c2724f', display: 'inline-block' }} />
                    {v}
                  </span>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section className="og-section og-how" style={{ maxWidth: 1200, margin: '0 auto', padding: '84px 40px' }}>
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 14 }}>{t.how.eyebrow}</div>
                <h2 className="og-section-heading" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 44, color: '#2f4a43', margin: 0 }}>{t.how.heading}</h2>
              </div>
              <div className="og-step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                {t.how.steps.map(step => (
                  <div key={step.n} style={{ textAlign: 'center', padding: '0 12px' }}>
                    <div style={{ width: 64, height: 64, margin: '0 auto 22px', borderRadius: 999, background: '#f4eee2', border: '1.5px solid #4a7366', color: '#4a7366', fontFamily: "'DM Serif Display', serif", fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.n}</div>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 24, color: '#2f4a43', margin: '0 0 12px' }}>{step.t}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6f7c77', margin: 0 }}>{step.d}</p>
                  </div>
                ))}
              </div>
              <div style={{ margin: '72px auto 0', borderTop: `1px solid ${BRAND_MIST_BORDER}`, paddingTop: 56 }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                  <h2 className="og-section-heading" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 44, color: '#2f4a43', margin: 0 }}>{t.how.customHeading}</h2>
                </div>
                <div className="og-step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                  {t.how.customSteps.map(step => (
                    <div key={step.n} style={{ textAlign: 'center', padding: '0 12px' }}>
                      <div style={{ width: 64, height: 64, margin: '0 auto 22px', borderRadius: 999, background: '#f4eee2', border: '1.5px solid #4a7366', color: '#4a7366', fontFamily: "'DM Serif Display', serif", fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.n}</div>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 24, color: '#2f4a43', margin: '0 0 12px' }}>{step.t}</h3>
                      <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6f7c77', margin: 0 }}>{step.d}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                  <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: '#4a7366', color: '#f4eee2', fontWeight: 800, fontSize: 16, padding: '14px 30px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.how.customCta}</a>
                </div>
              </div>
            </section>

            {/* Featured categories */}
            <section style={{ background: BRAND_MIST }}>
              <div className="og-section og-featured" style={{ maxWidth: 1200, margin: '0 auto', padding: '84px 40px' }}>
                <div className="og-featured-head" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 14 }}>{t.featured.eyebrow}</div>
                    <h2 className="og-section-heading" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 44, color: '#2f4a43', margin: 0, maxWidth: '12em' }}>{t.featured.heading}</h2>
                  </div>
                  <a onClick={go('menu')} style={{ fontWeight: 700, fontSize: 15, color: '#4a7366', cursor: 'pointer', borderBottom: '1.5px solid #4a7366', paddingBottom: 3, whiteSpace: 'nowrap' }}>{t.featured.link}</a>
                </div>
                <div className="og-category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
                  {menuCategories.map(cat => (
                    <a key={cat.key} onClick={go('menu')} style={{ display: 'block', cursor: 'pointer', textDecoration: 'none', background: '#fbf8f1', border: `1px solid ${BRAND_MIST_BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
                      <ImageFrame src={CATEGORY_IMAGE_SRC[cat.key] ?? IMAGE_FALLBACK_SRC} alt={lang === 'pt' ? cat.namePt : cat.nameEn} style={{ aspectRatio: '1/1', border: 0, borderBottom: `1px solid ${BRAND_MIST_BORDER}` }} />
                      <div style={{ padding: '16px 16px 18px' }}>
                        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 21, color: '#2f4a43', margin: '0 0 6px' }}>{lang === 'pt' ? cat.namePt : cat.nameEn}</h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============ OUR STORY ============ */}
        {page === 'story' && (
          <div>
            <section className="og-page-intro" style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px 56px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 18 }}>{t.story.eyebrow}</div>
              <h1 className="og-page-title" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 56, color: '#2f4a43', margin: '0 0 22px', lineHeight: 1.05 }}>{t.story.heading}</h1>
              <p style={{ fontSize: 21, lineHeight: 1.6, color: '#586962', margin: '0 auto', maxWidth: '30em' }}>{t.story.lead}</p>
            </section>

            <section className="og-story-copy" style={{ maxWidth: 760, margin: '0 auto', padding: '24px 40px 24px' }}>
              {t.story.paras.map((para, i) => (
                <p key={i} style={{ fontSize: 19, lineHeight: 1.75, color: '#3f4f49', margin: '0 0 28px' }}>{para}</p>
              ))}
            </section>
          </div>
        )}

        {/* ============ MENU ============ */}
        {page === 'menu' && (
          <div>
            <section className="og-page-intro og-menu-intro" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 40px' }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 16 }}>{t.menu.eyebrow}</div>
                <h1 className="og-page-title" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 56, color: '#2f4a43', margin: '0 0 20px', lineHeight: 1.05 }}>{t.menu.heading}</h1>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: '#586962', margin: '0 auto', maxWidth: 760 }}>{t.menu.note}</p>
              </div>
              <div className="og-menu-tabs" role="tablist" aria-label={t.menu.heading} style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                {(['weekly', 'full'] as const).map(tab => {
                  const active = menuTab === tab;

                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMenuTab(tab)}
                      style={{
                        appearance: 'none',
                        border: `1.5px solid ${active ? '#4a7366' : BRAND_MIST_BORDER}`,
                        background: active ? '#4a7366' : '#fbf8f1',
                        color: active ? '#f4eee2' : '#4a7366',
                        borderRadius: 999,
                        padding: '12px 24px',
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: 15,
                        cursor: 'pointer',
                      }}
                    >
                      {tab === 'weekly' ? t.menu.weeklyTab : t.menu.fullTab}
                    </button>
                  );
                })}
              </div>
            </section>

            {menuTab === 'weekly' ? (
              <section className="og-menu-panel" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 96px' }}>
                <div style={{ background: '#fbf8f1', border: `1px solid ${BRAND_MIST_BORDER}`, borderRadius: 14, padding: '36px 40px', textAlign: 'center' }}>
                  <h2 className="og-section-heading" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 40, color: '#2f4a43', margin: '0 0 14px' }}>{t.menu.weeklyHeading}</h2>
                  <p style={{ fontSize: 17, lineHeight: 1.65, color: '#586962', margin: '0 auto 24px', maxWidth: 720 }}>{t.menu.weeklyText}</p>
                  {weeklyMenu ? (
                    <div className="og-weekly-menu">
                      <div className="og-weekly-title" style={{ color: '#4a7366', fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{weeklyMenu.ementa}</div>
                      {weeklyMenu.ultimaAtualizacao && (
                        <div className="og-weekly-updated" style={{ color: '#7a857f', fontSize: 13, marginBottom: 28 }}>
                          {t.menu.weeklyUpdated} {weeklyMenu.ultimaAtualizacao.slice(0, 10)}
                        </div>
                      )}
                      <div className="og-weekly-menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18, textAlign: 'left' }}>
                        {weeklyMenu.dias.map(day => {
                          const hasDishes = weeklyMenu.categorias.some(category => (day.pratos[category.key] ?? []).length > 0);

                          return (
                            <div className="og-weekly-day-card" key={day.dia} style={{ border: `1px solid ${BRAND_MIST_BORDER}`, borderRadius: 12, overflow: 'hidden', background: '#fffaf2' }}>
                              <div className="og-weekly-day-heading" style={{ background: BRAND_MIST, borderBottom: `1px solid ${BRAND_MIST_BORDER}`, color: '#2f4a43', fontFamily: "'DM Serif Display', serif", fontSize: 26, padding: '16px 20px' }}>
                                {weeklyDayLabel(day.dia, day.diaLabel, lang)}
                              </div>
                              <div className="og-weekly-day-body" style={{ display: 'grid', gap: 16, padding: '18px 20px' }}>
                                {hasDishes ? weeklyMenu.categorias.map(category => {
                                  const dishes = day.pratos[category.key] ?? [];
                                  if (dishes.length === 0) return null;

                                  return (
                                    <div className="og-weekly-category" key={category.key} style={{ borderTop: `1px solid ${BRAND_MIST}`, paddingTop: 12 }}>
                                      <div className="og-weekly-category-label" style={{ background: BRAND_MIST, borderRadius: 999, color: '#2f4a43', display: 'inline-flex', fontSize: 14, fontWeight: 900, letterSpacing: '0.06em', marginBottom: 10, padding: '5px 12px', textTransform: 'uppercase' }}>
                                        {weeklyCategoryLabel(category.key, category.label, lang)}
                                      </div>
                                      <ul className="og-weekly-dish-list" style={{ display: 'grid', gap: 0, listStyle: 'none', margin: 0, padding: 0 }}>
                                        {dishes.map(dish => (
                                          <li className="og-weekly-dish" key={dish} style={{ color: '#2f4a43', fontSize: 15, fontWeight: 700, lineHeight: 1.45, padding: '7px 0 7px 12px', borderLeft: `3px solid ${BRAND_MIST}` }}>{dish}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                }) : (
                                  <p style={{ color: '#7a857f', fontSize: 15, margin: 0 }}>{t.menu.weeklyEmpty}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: BRAND_MIST, border: `1px solid ${BRAND_MIST_BORDER}`, borderRadius: 10, color: '#3f4f49', fontSize: 15, lineHeight: 1.6, margin: '0 auto 26px', maxWidth: 680, padding: '16px 20px' }}>{t.menu.weeklyUnavailable}</div>
                  )}
                  <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: '#4a7366', color: '#f4eee2', fontWeight: 800, fontSize: 15, marginTop: 28, padding: '12px 26px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.menu.weeklyCta}</a>
                </div>
              </section>
            ) : (
              <section className="og-menu-panel og-full-menu" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 96px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ borderBottom: `1px solid ${BRAND_MIST_BORDER}`, paddingBottom: 42, marginBottom: 28 }}>
                  <div style={{ textAlign: 'center', marginBottom: 42 }}>
                    <h2 className="og-section-heading" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 38, color: '#2f4a43', margin: 0 }}>{t.how.customHeading}</h2>
                  </div>
                  <div className="og-step-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                    {t.how.customSteps.map(step => (
                      <div key={step.n} style={{ textAlign: 'center', padding: '0 12px' }}>
                        <div style={{ width: 64, height: 64, margin: '0 auto 22px', borderRadius: 999, background: '#f4eee2', border: '1.5px solid #4a7366', color: '#4a7366', fontFamily: "'DM Serif Display', serif", fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.n}</div>
                        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 24, color: '#2f4a43', margin: '0 0 12px' }}>{step.t}</h3>
                        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6f7c77', margin: 0 }}>{step.d}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
                    <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: '#4a7366', color: '#f4eee2', fontWeight: 800, fontSize: 16, padding: '14px 30px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.how.customCta}</a>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                  <h2 className="og-section-heading" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 44, color: '#2f4a43', margin: '0 0 12px' }}>{t.menu.fullHeading}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: '#586962', margin: '0 auto', maxWidth: 680 }}>{t.menu.fullText}</p>
                </div>
                {menuCategories.map(cat => (
                  <div className="og-menu-category" key={cat.key} style={{ border: `1px solid ${BRAND_MIST_BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ background: BRAND_MIST, padding: '22px 32px', borderBottom: `1px solid ${BRAND_MIST_BORDER}`, display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 32, color: '#2f4a43', margin: 0 }}>{lang === 'pt' ? cat.namePt : cat.nameEn}</h2>
                    </div>
                    <div className="og-dish-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                      {cat.items.map((dish, i) => (
                        <div className="og-dish-row" key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 32px', background: Math.floor(i / 2) % 2 === 0 ? '#fbf8f1' : '#f4eee2', borderBottom: i < cat.items.length - (cat.items.length % 2 === 0 ? 2 : 1) ? `1px solid ${BRAND_MIST}` : 'none', borderRight: i % 2 === 0 ? `1px solid ${BRAND_MIST_BORDER}` : 'none' }}>
                          <span style={{ fontSize: 16, fontWeight: 600, color: '#2f4a43' }}>{lang === 'pt' ? dish.namePt : dish.nameEn}</span>
                          <span style={{ flex: 1 }} />
                          {dish.tag && <span style={{ fontSize: 12, color: '#a07a4f', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{dish.tag}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}


          </div>
        )}

        {/* ============ LOCATIONS ============ */}
        {page === 'locations' && (
          <div>
            <section className="og-page-intro" style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px 48px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 18 }}>{t.loc.eyebrow}</div>
              <h1 className="og-page-title" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 56, color: '#2f4a43', margin: '0 0 22px', lineHeight: 1.05 }}>{t.loc.heading}</h1>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#586962', margin: '0 auto', maxWidth: '32em' }}>{t.loc.sub}</p>
            </section>

            <section className="og-stores-section" style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 40px 96px' }}>
              <div className="og-store-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
                {stores.map(store => (
                  <div key={store.city} style={{ background: '#fbf8f1', border: `1px solid ${BRAND_MIST_BORDER}`, borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div className="og-store-card-body" style={{ padding: '26px 26px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 28, color: '#2f4a43', margin: '0 0 4px' }}>{store.city}</h2>
                      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a07a4f', marginBottom: 20 }}>{store.name}</div>
                      <div style={{ fontSize: 15, lineHeight: 1.55, color: '#4f5f59', marginBottom: 18 }}>{store.address}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 15, color: '#4f5f59', paddingTop: 18, borderTop: `1px solid ${BRAND_MIST}`, marginTop: 'auto' }}>
                        <div className="og-store-info-row" style={{ display: 'flex', gap: 10 }}>
                          <span style={{ color: '#4a7366', fontWeight: 800, minWidth: 64 }}>{t.loc.phoneLabel}</span>
                          <a href={`tel:${store.phone.replace(/\s/g, '')}`} style={{ fontWeight: 700, color: '#2f4a43', textDecoration: 'none' }}>{store.phone}</a>
                        </div>
                        <div className="og-store-info-row" style={{ display: 'flex', gap: 10 }}>
                          <span style={{ color: '#4a7366', fontWeight: 800, minWidth: 64 }}>{t.loc.hoursLabel}</span>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${BRAND_MIST}`, borderRadius: 8, overflow: 'hidden', background: '#fffaf2' }}>
                            {store.schedule.map((day, dayIndex) => {
                              const hours = lang === 'pt' ? day.hoursPt : day.hoursEn;
                              const closed = hours.toLowerCase() === 'encerrado' || hours.toLowerCase() === 'closed';

                              return (
                                <div className="og-schedule-row" key={day.dayEn} style={{ display: 'grid', gridTemplateColumns: '82px 1fr', gap: 10, padding: '7px 10px', borderBottom: dayIndex < store.schedule.length - 1 ? `1px solid ${BRAND_MIST}` : 'none', alignItems: 'baseline' }}>
                                  <span style={{ color: '#4a7366', fontWeight: 800, fontSize: 13 }}>{lang === 'pt' ? day.dayPt : day.dayEn}</span>
                                  <span style={{ color: closed ? '#9a8f7f' : '#2f4a43', fontWeight: closed ? 600 : 700, fontSize: 13 }}>{hours}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{ background: '#2f4a43', color: '#b9c9c2', marginTop: 'auto' }}>
        <div className="og-footer-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48 }}>
          <div>
            <OlguinhasLogo color="#f4eee2" style={{ height: 78, width: 78 * LOGO_ASPECT_RATIO, marginBottom: 18, opacity: 0.95 }} />
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#93a8a0', margin: 0, maxWidth: '24em' }}>{t.footer.tagline}</p>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6f8a81', marginBottom: 18 }}>{t.footer.navTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {navKeys.map(({ key, label }) => (
                <a key={key} onClick={go(key)} style={{ fontSize: 15, color: '#c5d4cd', cursor: 'pointer', textDecoration: 'none', width: 'fit-content' }}>{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6f8a81', marginBottom: 18 }}>{t.footer.citiesTitle}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {stores.map(store => (
                <span key={store.city} style={{ fontSize: 15, color: '#c5d4cd' }}>{store.city}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="og-footer-bottom" style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 40px', borderTop: '1px solid #3e5a52', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#7a948b' }}>{t.footer.rights}</span>
          <span style={{ fontSize: 13, color: '#7a948b', fontStyle: 'italic' }}>{t.footer.slogan}</span>
        </div>
      </footer>

    </div>
  );
}
