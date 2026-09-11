export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fffaf1',
        bgmuted: '#fbf1de',
        surface: '#ffffff',
        line: '#f0e2c6',
        ink: '#2c2013',
        inksoft: '#7a6a52',
        primary: '#d97a1f',
        primarydk: '#b3620f',
        primarysoft: '#fbe6c8',
        yolk: '#f5a623',
        brown: '#a45c28',
        leaf: '#6b8f3c',
        cream: '#f2d9a1',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        xl2: '22px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(44,32,19,.08)',
        lift: '0 20px 48px rgba(44,32,19,.14)',
      },
      maxWidth: {
        shell: '1160px',
      },
    },
  },
  plugins: [],
}
