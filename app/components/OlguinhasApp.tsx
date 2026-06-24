'use client';

import { useState } from 'react';
import type { MenuCategory, Store } from '@/lib/data';

type Page = 'home' | 'story' | 'menu' | 'locations';
type Lang = 'pt' | 'en';

const CONTENT = {
  pt: {
    nav: { home: 'Início', story: 'A Nossa História', menu: 'Menu', locations: 'Lojas' },
    header: { order: 'Encomendar' },
    hero: {
      eyebrow: 'Comida caseira portuguesa · desde 1987',
      title: 'O sabor de casa, pronto a levar.',
      sub: 'Há mais de 35 anos que cozinhamos com receitas de família. Encomende os seus pratos favoritos na sua loja Olguinhas e leve-os para casa, prontos a servir.',
      cta1: 'Ver o menu',
      cta2: 'As nossas lojas',
      imgLabel: '[ foto · mesa de família ]',
      badge: 'Desde',
    },
    values: ['Receitas de família', 'Ingredientes frescos', 'Cozinhado de raiz, todos os dias'],
    how: {
      eyebrow: 'Simples como comida de casa',
      heading: 'Como funciona',
      steps: [
        { n: '1', t: 'Escolha os seus pratos', d: 'Veja o nosso menu de sopas, peixe, carne, acompanhamentos e doces.' },
        { n: '2', t: 'Encomende na loja', d: 'Faça a sua encomenda diretamente na loja, com 48 a 72 horas de antecedência.' },
        { n: '3', t: 'Leve para casa', d: 'Levante na data combinada, aqueça e sirva. Tão simples como comida de casa.' },
      ],
    },
    featured: { eyebrow: 'O nosso menu', heading: 'Pratos de sempre, cozinhados com tempo', link: 'Ver menu completo' },
    menu: {
      eyebrow: 'A nossa cozinha',
      heading: 'O nosso menu',
      note: 'As encomendas são feitas diretamente na loja, com 48 a 72 horas de antecedência. O menu pode variar conforme a época e a disponibilidade dos ingredientes. Preços disponíveis na loja.',
    },
    story: {
      eyebrow: 'Desde 1987',
      heading: 'A Nossa História',
      lead: 'Comida portuguesa de sempre, feita com o cuidado de quem cozinha para a sua própria família.',
      imgLabel1: '[ foto · a cozinha / a fundadora ]',
      paras: [
        'Tudo começou em 1987, numa pequena cozinha em Cascais, com a vontade de levar a comida portuguesa de sempre a quem não tinha tempo para a cozinhar.',
        'O que começou como um balcão de pratos do dia tornou-se, ao longo de mais de três décadas, uma cozinha de família para muitas famílias. As receitas mantêm-se as mesmas, passadas de mãos em mãos, cozinhadas com o cuidado de quem cozinha para os seus.',
        'Hoje somos três lojas — em Cascais, no Estoril e em Lisboa — mas a forma de fazer não mudou: ingredientes frescos, tempo a cozinhar e o sabor genuíno da comida de casa, pronta para levar para a sua mesa.',
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
      sub: 'Encontre a loja Olguinhas mais perto de si. As encomendas são feitas diretamente em cada loja.',
      phoneLabel: 'Telefone',
      hoursLabel: 'Horário',
      orderNote: 'Moradas e contactos a confirmar. Para encomendas, contacte a loja com 48 a 72 horas de antecedência.',
    },
    cta: {
      heading: 'Pronto para encomendar?',
      sub: 'Visite ou ligue para a sua loja Olguinhas mais próxima e leve o sabor de casa à sua mesa.',
      btn: 'Ver as lojas',
    },
    footer: {
      tagline: 'Comida caseira portuguesa, pronta a levar para casa. Cozinhada de raiz desde 1987.',
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
      sub: 'For over 35 years we have cooked with family recipes. Order your favourite dishes at your Olguinhas store and take them home, ready to serve.',
      cta1: 'See the menu',
      cta2: 'Our stores',
      imgLabel: '[ photo · family table ]',
      badge: 'Since',
    },
    values: ['Family recipes', 'Fresh ingredients', 'Cooked from scratch, every day'],
    how: {
      eyebrow: 'As simple as home cooking',
      heading: 'How it works',
      steps: [
        { n: '1', t: 'Choose your dishes', d: 'Browse our menu of soups, fish, meat, sides and desserts.' },
        { n: '2', t: 'Order at the store', d: 'Place your order directly at the store, 48 to 72 hours in advance.' },
        { n: '3', t: 'Take it home', d: 'Pick up on the agreed day, reheat and serve. As simple as home cooking.' },
      ],
    },
    featured: { eyebrow: 'Our menu', heading: 'Timeless dishes, slow-cooked with care', link: 'See full menu' },
    menu: {
      eyebrow: 'Our kitchen',
      heading: 'Our menu',
      note: 'Orders are placed directly at the store, 48 to 72 hours in advance. The menu may vary with the season and ingredient availability. Prices available in store.',
    },
    story: {
      eyebrow: 'Since 1987',
      heading: 'Our Story',
      lead: 'Everyday Portuguese food, made with the care of someone cooking for their own family.',
      imgLabel1: '[ photo · the kitchen / the founder ]',
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
      sub: 'Find the Olguinhas store nearest you. Orders are placed directly at each store.',
      phoneLabel: 'Phone',
      hoursLabel: 'Hours',
      orderNote: 'Addresses and contacts to be confirmed. For orders, contact the store 48 to 72 hours in advance.',
    },
    cta: {
      heading: 'Ready to order?',
      sub: 'Visit or call your nearest Olguinhas store and bring the taste of home to your table.',
      btn: 'See our stores',
    },
    footer: {
      tagline: 'Portuguese home cooking, ready to take home. Cooked from scratch since 1987.',
      navTitle: 'Navigation',
      citiesTitle: 'Stores',
      rights: '© 2026 Olguinhas · All rights reserved',
      slogan: 'Chop Chop do melhor',
    },
  },
} as const;

const PLACEHOLDER_BG = 'repeating-linear-gradient(135deg, #d3dbd8, #d3dbd8 13px, #cbd5d0 13px, #cbd5d0 26px)';

function PlaceholderImg({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <div style={{ background: PLACEHOLDER_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #c2cdc8', ...style }}>
      <span style={{ fontFamily: "'Nunito Sans', monospace", fontSize: 13, letterSpacing: '0.08em', color: '#4a7366', background: '#f4eee2', padding: '8px 16px', borderRadius: 999, border: '1px solid #c2cdc8' }}>{label}</span>
    </div>
  );
}

interface Props {
  menuCategories: MenuCategory[];
  stores: Store[];
}

export default function OlguinhasApp({ menuCategories, stores }: Props) {
  const [page, setPage] = useState<Page>('home');
  const [lang, setLang] = useState<Lang>('pt');

  const t = CONTENT[lang];

  const go = (p: Page) => () => {
    setPage(p);
    try { window.scrollTo(0, 0); } catch (_) {}
  };

  const navKeys: Array<{ key: Page; label: string }> = [
    { key: 'home', label: t.nav.home },
    { key: 'story', label: t.nav.story },
    { key: 'menu', label: t.nav.menu },
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
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(244,238,226,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #d8cdb5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', height: 86, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <a onClick={go('home')} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', textDecoration: 'none' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-green.png" alt="Olguinhas" style={{ height: 58, width: 'auto', display: 'block' }} />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {navKeys.map(({ key, label }) => (
              <a key={key} onClick={go(key)} style={page === key ? { ...navBase, ...navActive } : navBase}>{label}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 64px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 22 }}>{t.hero.eyebrow}</div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 62, lineHeight: 1.04, letterSpacing: '-0.01em', color: '#2f4a43', margin: '0 0 24px', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>{t.hero.title}</h1>
                <p style={{ fontSize: 19, lineHeight: 1.62, color: '#586962', maxWidth: '30em', margin: '0 0 36px' }}>{t.hero.sub}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <a onClick={go('menu')} style={{ display: 'inline-flex', alignItems: 'center', background: '#4a7366', color: '#f4eee2', fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.hero.cta1}</a>
                  <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#4a7366', fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 999, border: '1.5px solid #b6c4be', cursor: 'pointer', textDecoration: 'none' }}>{t.hero.cta2}</a>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden', background: PLACEHOLDER_BG, border: '1px solid #c2cdc8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Nunito Sans', monospace", fontSize: 13, letterSpacing: '0.08em', color: '#4a7366', background: '#f4eee2', padding: '8px 16px', borderRadius: 999, border: '1px solid #c2cdc8' }}>{t.hero.imgLabel}</span>
                </div>
                <div style={{ position: 'absolute', bottom: -22, left: -22, background: '#fbf8f1', border: '1px solid #d8cdb5', borderRadius: 12, padding: '16px 22px', boxShadow: '0 14px 40px rgba(47,74,67,0.12)' }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#4a7366', lineHeight: 1 }}>1987</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a958f', marginTop: 4 }}>{t.hero.badge}</div>
                </div>
              </div>
            </section>

            {/* Values bar */}
            <section style={{ background: '#4a7366', color: '#e7ede9' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '22px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px 48px' }}>
                {t.values.map(v => (
                  <span key={v} style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: '#c2724f', display: 'inline-block' }} />
                    {v}
                  </span>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '84px 40px' }}>
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 14 }}>{t.how.eyebrow}</div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 44, color: '#2f4a43', margin: 0 }}>{t.how.heading}</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
                {t.how.steps.map(step => (
                  <div key={step.n} style={{ textAlign: 'center', padding: '0 12px' }}>
                    <div style={{ width: 64, height: 64, margin: '0 auto 22px', borderRadius: 999, background: '#f4eee2', border: '1.5px solid #4a7366', color: '#4a7366', fontFamily: "'DM Serif Display', serif", fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.n}</div>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 24, color: '#2f4a43', margin: '0 0 12px' }}>{step.t}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6f7c77', margin: 0 }}>{step.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured categories */}
            <section style={{ background: '#efe7d6' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto', padding: '84px 40px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 14 }}>{t.featured.eyebrow}</div>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 44, color: '#2f4a43', margin: 0, maxWidth: '12em' }}>{t.featured.heading}</h2>
                  </div>
                  <a onClick={go('menu')} style={{ fontWeight: 700, fontSize: 15, color: '#4a7366', cursor: 'pointer', borderBottom: '1.5px solid #4a7366', paddingBottom: 3, whiteSpace: 'nowrap' }}>{t.featured.link}</a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
                  {menuCategories.map(cat => (
                    <a key={cat.key} onClick={go('menu')} style={{ display: 'block', cursor: 'pointer', textDecoration: 'none', background: '#fbf8f1', border: '1px solid #e2dac8', borderRadius: 12, overflow: 'hidden' }}>
                      <div style={{ aspectRatio: '1/1', background: PLACEHOLDER_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: "'Nunito Sans', monospace", fontSize: 10, letterSpacing: '0.06em', color: '#4a7366', background: '#fbf8f1', padding: '5px 9px', borderRadius: 999 }}>[ {lang === 'pt' ? cat.namePt.toLowerCase() : cat.nameEn.toLowerCase()} ]</span>
                      </div>
                      <div style={{ padding: '16px 16px 18px' }}>
                        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 21, color: '#2f4a43', margin: '0 0 6px' }}>{lang === 'pt' ? cat.namePt : cat.nameEn}</h3>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: '#7a857f', margin: 0 }}>{lang === 'pt' ? cat.descPt : cat.descEn}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '92px 40px' }}>
              <div style={{ background: '#4a7366', borderRadius: 18, padding: '64px 56px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center', color: '#eef2ef' }}>
                <div>
                  <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 40, color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>{t.cta.heading}</h2>
                  <p style={{ fontSize: 18, lineHeight: 1.6, color: '#cfdcd6', margin: '0 0 30px', maxWidth: '28em' }}>{t.cta.sub}</p>
                  <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: '#f4eee2', color: '#4a7366', fontWeight: 800, fontSize: 16, padding: '15px 32px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.cta.btn}</a>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo-cream.png" alt="" style={{ width: '100%', maxWidth: 260, opacity: 0.92, marginLeft: 'auto', display: 'block' }} />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============ OUR STORY ============ */}
        {page === 'story' && (
          <div>
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px 56px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 18 }}>{t.story.eyebrow}</div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 56, color: '#2f4a43', margin: '0 0 22px', lineHeight: 1.05 }}>{t.story.heading}</h1>
              <p style={{ fontSize: 21, lineHeight: 1.6, color: '#586962', margin: '0 auto', maxWidth: '30em' }}>{t.story.lead}</p>
            </section>

            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 24px' }}>
              <PlaceholderImg label={t.story.imgLabel1} style={{ aspectRatio: '21/9', borderRadius: 16, overflow: 'hidden' }} />
            </section>

            <section style={{ maxWidth: 760, margin: '0 auto', padding: '56px 40px 24px' }}>
              {t.story.paras.map((para, i) => (
                <p key={i} style={{ fontSize: 19, lineHeight: 1.75, color: '#3f4f49', margin: '0 0 28px' }}>{para}</p>
              ))}
            </section>

            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 40px 40px' }}>
              <blockquote style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 38, lineHeight: 1.3, color: '#4a7366', textAlign: 'center', margin: '0 auto', maxWidth: '18em', padding: '32px 0', borderTop: '1px solid #d8cdb5', borderBottom: '1px solid #d8cdb5' }}>{t.story.quote}</blockquote>
            </section>

            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px 96px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {t.story.stats.map(stat => (
                  <div key={stat.l} style={{ background: '#efe7d6', borderRadius: 14, padding: '38px 28px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, color: '#4a7366', lineHeight: 1 }}>{stat.v}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a857f', marginTop: 12 }}>{stat.l}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ============ MENU ============ */}
        {page === 'menu' && (
          <div>
            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px 36px' }}>
              <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 16 }}>{t.menu.eyebrow}</div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 56, color: '#2f4a43', margin: '0 0 28px', lineHeight: 1.05 }}>{t.menu.heading}</h1>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#efe7d6', border: '1px solid #e2dac8', borderRadius: 12, padding: '20px 24px', maxWidth: 760 }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>🕐</span>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#586962', margin: 0 }}>{t.menu.note}</p>
              </div>
            </section>

            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 40px 96px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {menuCategories.map(cat => (
                <div key={cat.key} style={{ border: '1px solid #e2dac8', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ background: '#efe7d6', padding: '22px 32px', borderBottom: '1px solid #e2dac8', display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                    <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 32, color: '#2f4a43', margin: 0 }}>{lang === 'pt' ? cat.namePt : cat.nameEn}</h2>
                    <span style={{ fontSize: 15, color: '#7a857f', fontStyle: 'italic' }}>{lang === 'pt' ? cat.descPt : cat.descEn}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    {cat.items.map((dish, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 32px', background: Math.floor(i / 2) % 2 === 0 ? '#fbf8f1' : '#f4eee2', borderBottom: i < cat.items.length - (cat.items.length % 2 === 0 ? 2 : 1) ? '1px solid #ede8de' : 'none', borderRight: i % 2 === 0 ? '1px solid #e2dac8' : 'none' }}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: '#2f4a43' }}>{lang === 'pt' ? dish.namePt : dish.nameEn}</span>
                        <span style={{ flex: 1 }} />
                        {dish.tag && <span style={{ fontSize: 12, color: '#a07a4f', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{dish.tag}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 96px' }}>
              <div style={{ background: '#4a7366', borderRadius: 16, padding: 48, textAlign: 'center', color: '#eef2ef' }}>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 34, color: '#fff', margin: '0 0 14px' }}>{t.cta.heading}</h2>
                <p style={{ fontSize: 17, color: '#cfdcd6', margin: '0 0 26px' }}>{t.cta.sub}</p>
                <a onClick={go('locations')} style={{ display: 'inline-flex', alignItems: 'center', background: '#f4eee2', color: '#4a7366', fontWeight: 800, fontSize: 16, padding: '14px 30px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none' }}>{t.cta.btn}</a>
              </div>
            </section>
          </div>
        )}

        {/* ============ LOCATIONS ============ */}
        {page === 'locations' && (
          <div>
            <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px 48px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a7366', marginBottom: 18 }}>{t.loc.eyebrow}</div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 56, color: '#2f4a43', margin: '0 0 22px', lineHeight: 1.05 }}>{t.loc.heading}</h1>
              <p style={{ fontSize: 20, lineHeight: 1.6, color: '#586962', margin: '0 auto', maxWidth: '32em' }}>{t.loc.sub}</p>
            </section>

            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 40px 96px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
                {stores.map(store => (
                  <div key={store.city} style={{ background: '#fbf8f1', border: '1px solid #e2dac8', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ aspectRatio: '3/2', background: PLACEHOLDER_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e2dac8' }}>
                      <span style={{ fontFamily: "'Nunito Sans', monospace", fontSize: 11, letterSpacing: '0.06em', color: '#4a7366', background: '#fbf8f1', padding: '6px 12px', borderRadius: 999, border: '1px solid #c2cdc8' }}>[ foto · loja {store.city} ]</span>
                    </div>
                    <div style={{ padding: '26px 26px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 28, color: '#2f4a43', margin: '0 0 4px' }}>{store.city}</h2>
                      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a07a4f', marginBottom: 20 }}>{store.name}</div>
                      <div style={{ fontSize: 15, lineHeight: 1.55, color: '#4f5f59', marginBottom: 18 }}>{store.address}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 15, color: '#4f5f59', paddingTop: 18, borderTop: '1px solid #e2dac8', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <span style={{ color: '#4a7366', fontWeight: 800, minWidth: 64 }}>{t.loc.phoneLabel}</span>
                          <span style={{ fontWeight: 700, color: '#2f4a43' }}>{store.phone}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <span style={{ color: '#4a7366', fontWeight: 800, minWidth: 64 }}>{t.loc.hoursLabel}</span>
                          <span>{lang === 'pt' ? store.hoursWeekPt : store.hoursWeekEn}<br />{lang === 'pt' ? store.hoursSunPt : store.hoursSunEn}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#efe7d6', border: '1px solid #e2dac8', borderRadius: 12, padding: '20px 24px', marginTop: 32, maxWidth: 760 }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>📍</span>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#586962', margin: 0 }}>{t.loc.orderNote}</p>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{ background: '#2f4a43', color: '#b9c9c2', marginTop: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48 }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-cream.png" alt="Olguinhas" style={{ height: 78, width: 'auto', display: 'block', marginBottom: 18, opacity: 0.95 }} />
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
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 40px', borderTop: '1px solid #3e5a52', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#7a948b' }}>{t.footer.rights}</span>
          <span style={{ fontSize: 13, color: '#7a948b', fontStyle: 'italic' }}>{t.footer.slogan}</span>
        </div>
      </footer>

    </div>
  );
}
