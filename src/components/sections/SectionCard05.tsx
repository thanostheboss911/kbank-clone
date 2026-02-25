import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { investImages } from '../../data/mockData';
import { useInView } from '../../hooks/useInView';

const Container = styled.div`
  width: 100%;
  height: 37.3125rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
  background: #e5ebff;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const PhoneFrame = styled.div`
  width: 13.375rem;
  height: 22.9375rem;
  border-radius: 1.5rem 1.5rem 0 0;
  border: 2px solid #020616;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemBox = styled.div`
  position: absolute;
  left: 1.75rem;
  top: 3.25rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #020616;
  line-height: 1.35;
  white-space: pre-line;
  margin-bottom: 0.5rem;
`;

const AccentText = styled.span`
  background: linear-gradient(90deg, #098bfe 3%, #4262ff 77%, #201e81 304%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: 700;
`;

const SectionCard05 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.4);
  const [imgIdx, setImgIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (inView) {
      onView?.();
      timerRef.current = setInterval(() => {
        setImgIdx(p => (p + 1) % investImages.length);
      }, 2000);
    } else {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView]);

  return (
    <Container ref={ref} onClick={() => window.open('https://www.kbanknow.com', '_blank')}>
      <ItemBox>
        <Title>{'가치와 수익을\n모두잡는\n새로운 '}</Title>
        <AccentText>투자 길잡이</AccentText>
      </ItemBox>
      <PhoneFrame>
        <Img src={investImages[imgIdx]} alt="투자" />
      </PhoneFrame>
    </Container>
  );
};

export default SectionCard05;
