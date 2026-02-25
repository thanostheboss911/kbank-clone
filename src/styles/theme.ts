export const theme = {
  colors: {
    textPrimary: '#020616',
    textInvert: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.7)',
    textAccent: '#4262ff',
    textPurple: '#650bda',
    textLink: '#0082ff',
    bgGradients: [
      'linear-gradient(180deg, #dbe7f4 0%, #dbe7f4 100%)',       // 0 브랜드
      'linear-gradient(180deg, #dbe7f4 0%, #3284c4 100%)',       // 1 예금
      'linear-gradient(180deg, #3284c4 0%, #242B38 100%)',       // 2 카드
      'linear-gradient(180deg, #242B38 0%, #7952B8 100%)',       // 3 대출
      'linear-gradient(180deg, #7952B8 0%, #287142 100%)',       // 4 라이프
      'linear-gradient(180deg, #287142 0%, #5a91bb 100%)',       // 5 투자
      'linear-gradient(180deg, #5a91bb 0%, #331c75 100%)',       // 6 사장님
      'linear-gradient(180deg, #331c75 0%, #243dbc 100%)',       // 7 스토리
      'linear-gradient(180deg, #243dbc 0%, #ffffff 100%)',       // 8 앱
    ],
  },
  fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
  radius: {
    card: '1.25rem',
    small: '0.5rem',
  },
  shadow: '0px 4px 8px 2px rgba(0,0,0,0.1)',
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.75rem',
    lg: '3rem',
    xl: '4.5rem',
  },
};

export type Theme = typeof theme;
