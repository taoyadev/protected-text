export type PasswordScore = {
  score: number;
  label: string;
  color: string;
};

export function getPasswordScore(password: string): PasswordScore {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ['Weak', 'Fair', 'Okay', 'Good', 'Strong'];
  const colors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-amber-400',
    'bg-lime-400',
    'bg-emerald-400',
  ];

  return {
    score,
    label: labels[Math.min(score, labels.length - 1)],
    color: colors[Math.min(score, colors.length - 1)],
  };
}
