export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const TONE_TILE = {
  primary: 'bg-primarysoft text-primarydk',
  brown: 'bg-brown/15 text-brown',
  yolk: 'bg-yolk/20 text-primarydk',
  leaf: 'bg-leaf/15 text-leaf',
  cream: 'bg-cream/70 text-primarydk',
}

export const TONE_GRADIENT = {
  primary: 'from-primarysoft to-bgmuted',
  brown: 'from-brown/25 to-bgmuted',
  yolk: 'from-yolk/25 to-bgmuted',
  leaf: 'from-leaf/25 to-bgmuted',
  cream: 'from-cream to-bgmuted',
}

export function toneTile(tone = 'primary') {
  return TONE_TILE[tone] ?? TONE_TILE.primary
}

export function toneGradient(tone = 'primary') {
  return TONE_GRADIENT[tone] ?? TONE_GRADIENT.primary
}
