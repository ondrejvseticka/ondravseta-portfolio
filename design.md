# Design system — Ondřej Všetička portfolio

Dokument pro lidi i agenty. Cíl: **editorial studio pro senior frontend / product engineera** — ne generický dev portfolio template.

---

## 1. Esence značky

| | |
|---|---|
| **Co to je** | Osobní portfolio s dvěma cestami: náborář rychle pochopí profil, klient uvidí práci a proces spolupráce. |
| **Pocit** | Teplý, sebevědomý, motion-aware editorial — jako studiový web, ne SaaS landing. |
| **Ne** | Indigo glass bento, uppercase eyebrow všude, fake browser mock, custom cursor, vague „pixel-perfect“ copy. |
| **Ano** | Konkrétní projekty, lab produkty (keeb, prsi), scroll carousel, aurora gradient, display serif. |

**Jedna věta:** *„Do 10 sekund víš, kdo jsem, co stavím, a kam kliknout — náborář i klient.“*

### Dual audience

| Badge | Kdy |
|-------|-----|
| **Pro klienty** | Work carousel, Process |
| **Pro náboráře** | Profile, stack marquee |
| **Obojí** | Hero, Capabilities, Contact |

---

## 2. Anti-slop pravidla

- **Zakázáno:** indigo-purple gradient na každém surface, `tracking-[0.2em]` uppercase label na každé sekci, identický `fade-up whileInView` na všech blocích, bento skill grid s fake UI, custom cursor, 3× stejné service cards.
- **Max 1** glass panel na viewport.
- **Každá animace** musí mít důvod v motion catalogu (§6).
- **Copy:** konkrétní („stavím X pro Y“), ne marketingové klišé.

---

## 3. Barevný systém

### Light
```
--bg-base:       #FAF8F5
--bg-elevated:   #FFFFFF
--bg-muted:      #F3EDE4
--text-primary:  #1C1917
--text-secondary:#57534E
--text-muted:    #A8A29E
--accent:        #C2410C
--accent-soft:   #FFEDD5
--aurora:        #6366F1  (jen highlight, ne primary)
```

### Dark
```
--bg-base:       #0A0908
--bg-elevated:   #1C1917
--accent:        #FBBF24
--aurora:        #818CF8
```

---

## 4. Typografie

| Role | Font | Použití |
|------|------|---------|
| Display | Instrument Serif | H1, H2, velké čísla |
| UI / body | Geist Sans | odstavce, nav, tlačítka |
| Mono | Geist Mono | stack tags, metadata |

- H1: display, `tracking-tight`, `clamp(2.5rem, 5vw, 4rem)`.
- Section label: sentence case, **ne** uppercase tracking everywhere.
- Accent slovo v nadpisu: aurora nebo accent barva.

---

## 5. Layout

- Content shell: `max-w-6xl mx-auto px-4 md:px-6`
- Section rhythm: `py-14 md:py-20`
- Hero: full viewport, aurora mesh pozadí
- Work: horizontální scroll carousel, filtry Client / Lab / All

---

## 6. Motion catalog

| Element | Chování | Fallback |
|---------|---------|----------|
| Hero aurora | slow CSS keyframe drift | static gradient |
| Hero text | stagger reveal | visible immediately |
| Stack marquee | infinite horizontal | static wrap |
| Work carousel | scroll-snap horizontal + GSAP scrub on desktop | native scroll |
| Capabilities | ScrollTrigger pin, crossfade panels | stacked static |
| Section headers | subtle fade on enter | none |

Easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Vždy `prefers-reduced-motion: reduce`.

---

## 7. Sekce & anchor IDs

| CS | EN |
|----|-----|
| `#o-mne` | `#about` |
| `#prace` | `#work` |
| `#schopnosti` | `#capabilities` |
| `#spoluprace` | `#process` |
| `#profil` | `#profile` |
| `#kontakt` | `#contact` |

---

## 8. Projekty

- **Client:** abivia, podpustevnami, zvonice — live site + popis
- **Lab:** keeb, prsi — GitHub + preview screenshot, technické highlights
