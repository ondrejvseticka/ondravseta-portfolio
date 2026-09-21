export const revealEase = [0.22, 1, 0.36, 1] as const;

export const revealTransition = {
  duration: 0.55,
  ease: revealEase,
} as const;

export const crossfadeTransition = {
  duration: 0.35,
  ease: revealEase,
} as const;
