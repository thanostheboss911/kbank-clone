import { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { lifeData } from '../../data/mockData';
import { useInView } from '../../hooks/useInView';
import Pagination from '../common/Pagination';

const Container = styled.div`
  width: 100%;
  height: 37.3125rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const SliderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemBox = styled.div`
  position: absolute;
  left: 1.75rem;
  bottom: 3.5rem;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  white-space: pre-line;
  line-height: 1.35;
  margin-bottom: 0.75rem;
`;

const Desc = styled(motion.p)`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.6;
  white-space: pre-line;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  right: 1.75rem;
  bottom: 1.75rem;
  z-index: 3;
`;

const SectionCard04 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.5);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    const next = (idx + lifeData.length) % lifeData.length;
    videoRefs.current[current]?.pause();
    if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(-${next * 100}%)`;
    setCurrent(next);
    videoRefs.current[next]?.play().catch(() => {});
  }, [current]);

  const startAuto = useCallback(() => {
    if (timerRef.current) return;
    videoRefs.current[current]?.play().catch(() => {});
    timerRef.current = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % lifeData.length;
        videoRefs.current[prev]?.pause();
        if (wrapperRef.current) wrapperRef.current.style.transform = `translateX(-${next * 100}%)`;
        videoRefs.current[next]?.play().catch(() => {});
        return next;
      });
    }, 5000);
    setIsPlaying(true);
  }, [current]);

  const stopAuto = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    videoRefs.current.forEach(v => v?.pause());
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (inView) { onView?.(); startAuto(); }
    else stopAuto();
    return () => stopAuto();
  }, [inView]);

  return (
    <Container ref={ref}>
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <SliderWrapper ref={wrapperRef}>
          {lifeData.map((item, i) => (
            <Slide key={i}>
              <Video
                ref={el => { videoRefs.current[i] = el; }}
                muted playsInline loop
                src={item.videoUrl}
              />
            </Slide>
          ))}
        </SliderWrapper>
      </div>
      <ItemBox>
        <Title
          key={current}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {lifeData[current].title}{'\n'}{lifeData[current].title2}
        </Title>
        <Desc
          key={`desc-${current}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {lifeData[current].desc}
        </Desc>
      </ItemBox>
      <PaginationWrapper>
        <Pagination
          total={lifeData.length}
          current={current}
          isPlaying={isPlaying}
          onDotClick={goTo}
          onPlayToggle={() => isPlaying ? stopAuto() : startAuto()}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default SectionCard04;
