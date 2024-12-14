export default function Icon() {
  const createSvgIcon = (size: number) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
        <rect width="100" height="100" fill="#15423B"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#E1D8C6" font-family="Times New Roman" font-size="40">LHS</text>
      </svg>
    `.trim();

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  };

  return [
    {
      url: createSvgIcon(16),
      sizes: '16x16',
      type: 'image/svg+xml',
    },
    {
      url: createSvgIcon(32),
      sizes: '32x32',
      type: 'image/svg+xml',
    },
    {
      url: createSvgIcon(180),
      sizes: '180x180',
      type: 'image/svg+xml',
    },
  ];
} 