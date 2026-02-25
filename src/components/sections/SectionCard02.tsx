import { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { depositData } from '../../data/mockData';
import { useInView } from '../../hooks/useInView';
import Pagination from '../common/Pagination';

const Container = styled.div`
  width: 100%;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const Slide = styled.div<{ bg: string }>`
  width: 100%;
  height: 37.3125rem;
  background: ${({ bg }) => bg};
  padding: 3.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const TextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  font-weight: 700;
  color: #020616;
  line-height: 1.35;
  white-space: pre-line;
`;

const Accent = styled.span`
  color: #4262ff;
`;

const Desc = styled.p`
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  color: rgba(0,0,0,0.5);
  line-height: 1.6;
  white-space: pre-line;
`;

const ImgBox = styled.div`
  width: 13.375rem;
  height: 12.1875rem;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PaginationWrapper = styled.div`
  position: absolute;
  right: 1.75rem;
  bottom: 1.75rem;
  z-index: 3;
`;

const SectionCard02 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.4);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const flickingRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
  }, []);

  const startAuto = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % depositData.length;
        flickingRef.current?.moveTo(next, 400).catch(() => {});
        return next;
      });
    }, 3000);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (inView) { onView?.(); startAuto(); }
    else stopAuto();
    return () => stopAuto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const handleDotClick = (i: number) => {
    flickingRef.current?.moveTo(i, 400).catch(() => {});
    setCurrent(i);
  };

  return (
    <Container ref={ref}>
      <Flicking
        ref={flickingRef}
        align="prev"
        circular={true}
        onChanged={(e: any) => setCurrent(e.index)}
      >
        {depositData.map((item, i) => (
          <Slide key={i} bg={item.bg}>
            <TextBox
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <Title>{item.title}{'\n'}<Accent>{item.accent}</Accent></Title>
              <Desc>{item.desc}</Desc>
            </TextBox>
            <ImgBox><img src={item.imgUrl} alt={item.accent} /></ImgBox>
          </Slide>
        ))}
      </Flicking>
      <PaginationWrapper>
        <Pagination
          total={depositData.length}
          current={current}
          isPlaying={isPlaying}
          onDotClick={handleDotClick}
          onPlayToggle={() => isPlaying ? stopAuto() : startAuto()}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default SectionCard02;
