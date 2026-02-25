import { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
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

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.4s ease;
`;

const Slide = styled.div<{ bg: string }>`
  min-width: 100%;
  height: 37.3125rem;
  background: ${({ bg }) => bg};
  padding: 3.25rem 1.75rem 3.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: flex-start;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #020616;
  line-height: 1.35;
  white-space: pre-line;
`;

const Accent = styled.span`
  color: #4262ff;
`;

const Desc = styled.p`
  font-size: 0.95rem;
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    const next = (idx + depositData.length) % depositData.length;
    setCurrent(next);
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateX(-${next * 100}%)`;
    }
  }, []);

  const startAuto = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % depositData.length;
        if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(-${next * 100}%)`;
        return next;
      });
    }, 3000);
    setIsPlaying(true);
  }, []);

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (inView) { onView?.(); startAuto(); }
    else stopAuto();
    return () => stopAuto();
  }, [inView]);

  return (
    <Container ref={ref}>
      <div style={{ overflow: 'hidden' }}>
        <SliderWrapper ref={wrapperRef}>
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
        </SliderWrapper>
      </div>
      <PaginationWrapper>
        <Pagination
          total={depositData.length}
          current={current}
          isPlaying={isPlaying}
          onDotClick={(i) => { goTo(i); }}
          onPlayToggle={() => isPlaying ? stopAuto() : startAuto()}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default SectionCard02;
