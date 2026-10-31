# Panadería — design plan

**Concept: Vitrina.** The store is a neighbourhood bakery's display case.
Photos sit in bread-roll frames (a domed top on a flatter base), categories
are pastry boxes with a striped lid in the category's own colour, and the
home page's featured items stand on a glass shelf with a chocolate ledge.
Steam rises from the hero loaf when the page opens. The opening hours sit in
the hero, never only in the footer.

Serves: bakeries, pastry shops, custom cakes (encargos), cafés.

## Palette

| Token | Hex | Role |
|---|---|---|
| flour | `#FFFDF9` | page |
| mint box | `#CFE8DA` | pastry-box stripes, the store's second colour |
| mint soft | `#E8F4EC` | quiet surfaces (case glass, highlights, placeholders) |
| chocolate | `#4A2A1C` | headings, text, footer, the case's ledge, strong buttons |
| soft chocolate | `#7A5A48` | secondary text |
| butter | `#F3D27A` | demo notice, cart count, hero badge, order-ahead pill, crumbs |
| crust | `#9E5524` | the store's accent (org primary): main buttons, the mark |
| rose | `#F7D9DE` | a box colour for categories without one |
| raspberry | `#A12D47` | offers and low stock |

Contrast (computed): chocolate on flour 12.6:1 · soft chocolate on flour
6.1:1 · crust as text on flour 5.5:1 · white on crust 5.6:1 · chocolate on
butter 8.7:1 · chocolate on mint soft 11.3:1 · soft chocolate on mint soft
5.5:1 · raspberry on flour 6.9:1 · white on raspberry 7.0:1 · flour on
chocolate 12.6:1 · `#E8D6C6` on chocolate 9.1:1. Dark mode ("after closing
time"): `#FBEFE3` on `#1F1611` 15.7:1 · `#D9C2AE` on the raised `#35271E`
8.4:1 · offer `#F08BA0` on `#1F1611` 7.5:1.

## Type

**Caprasimo** for display (one heavy, soft-shouldered weight, like a bakery's
hand-lettered window) and **Rethink Sans** 400–800 for text. No all-caps
eyebrows, no monospace labels.

## Layout

```
HOME
 [Recién horneado]                         ≈ ≈ ≈   (steam, 3 rises)
 Pan que se hornea                      ╭──────────╮
 cada mañana                            │  CMS     │  bread-roll frame,
 subtitle                               │  photo   │  rises once
 [Ver la vitrina] [Horario y ubicación] ╰──────────╯
 ┌ (clock) Horario · the store's hours text ┐
 En la vitrina: pastry boxes (striped lid in the category colour, photo in a
 roll frame, name, count)
 Hoy en la vitrina: the glass case — roll-framed cards, scroll-snap, arrows
 only when it overflows; chocolate ledge underneath
 highlights ×3 (mint) · story (roll frame) · chocolate CTA with a box lid
CATALOG: title + count │ search + Filtros (sheet on phones) │ category chips │
one group per category or a grid (filtered/sorted)
PRODUCT: roll-framed photo, name, price, order-ahead pill (services), facts
(category, type "Por encargo", availability), quantity + add
```

## Signature

The display case: `.bun` frames (`--radius-bun`), `BoxTile`, `Vitrina`
(`.vitrina` glass + ledge), and `Steam` over the hero loaf (three rises, then
rest). The hero frame "rises" once (`.rise`, transform only). Adding to the
order shakes a few butter crumbs off the button (`.crumb`) and settles the
bag in the header. All CSS; `prefers-reduced-motion` and `?motion=reduce`
jump to the final states (steam hidden, crumbs gone). No WebGL.

## Data

Services are encargos: the catalog's type filter says "Encargos", cards wear a
"Por encargo" badge and the product page shows "Encargar con {duration} de
anticipación" when the item has a duration. Box colours come from the
category's `background_color` (POS category drawer); a category without one
takes the next colour of the box rotation. The hours are the store's own text
(`businessHours`), never an "open now" claim.

## Changed from the generic default

- Left "cream + high-contrast serif + terracotta": flour and mint pastry-box
  paper, a soft display face, crust only as the action colour.
- Image frames are bread rolls, not rounded rectangles.
- Categories are pastry boxes, not image tiles with overlaid text.
- Featured items stand in a display case instead of another card grid.
