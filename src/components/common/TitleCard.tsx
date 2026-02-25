import { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';

const COLORS: Record<string, string> = {
  type1: '#3284c4',
  type2: 'rgba(12,14,15)',
  type3: '#277243',
  type4: '#5A91BB',
  type5: '#2F1D71',
  type6: '#243DBC',
  type7: '#7952B8',
};

const Container = styled(motion.div)<{ cardType: string }>`
  display: flex;
  width: 100%;
  height: 8.125rem;
  padding: 0 1.75rem;
  flex-direction: column;
  justify-content: center;
  border-radius: 1.25rem;
  background: ${({ cardType }) => COLORS[cardType] || '#333'};
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const WhiteBox = styled(motion.div)`
  position: absolute;
  width: 2.5rem;
  height: 2.6rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.3);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  white-space: pre-line;
  position: relative;
  z-index: 1;
`;

const AccentTitle = styled.span<{ cardType: string }>`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: ${({ cardType }) => COLORS[cardType] ? 'rgba(255,255,255,0.6)' : '#ffffff'};
`;

interface Props {
  title: string;
  moveText: string;
  type: string;
  onView?: () => void;
}

const TitleCard = ({ title, moveText, type, onView }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (inView) onView?.();
  }, [inView, onView]);

  return (
    <Container
      ref={ref}
      cardType={type}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.6 }}
    >
      <WhiteBox
        initial={{ left: '-3rem' }}
        animate={inView ? { left: 'calc(100% + 1rem)' } : { left: '-3rem' }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
      />
      <Title>
        {title}
        <AccentTitle cardType={type}>{moveText}</AccentTitle>
      </Title>
    </Container>
  );
};

export default TitleCard;
