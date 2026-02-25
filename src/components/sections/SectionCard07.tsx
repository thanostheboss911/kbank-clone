import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { useEffect } from 'react';

const Container = styled.div`
  width: 100%;
  height: 19.0625rem;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:active { transform: scale(0.98); }
`;

const LogoBox = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, #243dbc, #4262ff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 12px 4px 24px 0px rgba(12,9,96,0.24);
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 900;
  color: #ffffff;
`;

const TextBox = styled(motion.div)`
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #020616;
  line-height: 1.35;
  white-space: pre-line;
`;

const SectionCard07 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.3);

  useEffect(() => {
    if (inView) onView?.();
  }, [inView]);

  return (
    <Container
      ref={ref}
      onClick={() => window.open('https://www.kbanknow.com', '_blank')}
    >
      <LogoBox
        initial={{ opacity: 0, y: 0 }}
        animate={inView ? { opacity: 1, y: -20 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <LogoText>K</LogoText>
      </LogoBox>
      <TextBox
        initial={{ opacity: 0, y: 0 }}
        animate={inView ? { opacity: 1, y: -20 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <Title>{'하나의 앱에서\n모두 경험하세요'}</Title>
      </TextBox>
    </Container>
  );
};

export default SectionCard07;
