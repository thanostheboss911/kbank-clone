import { useEffect, useRef, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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
  width: 100%;
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
  flex-shrink: 0;
  border-radius: 1rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  const swiperRef = useRef<SwiperClass | null>(null);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!swiperRef.current) return;
    if (inView) {
      onView?.();
      swiperRef.current.autoplay?.start();
    } else {
      swiperRef.current.autoplay?.stop();
    }
  }, [inView]);

  return (
    <Container ref={ref}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(s: SwiperClass) => { swiperRef.current = s; }}
        onSlideChange={(s: SwiperClass) => setCurrent(s.realIndex)}
        style={{ width: '100%' }}
      >
        {depositData.map((item, i) => (
          <SwiperSlide key={i}>
            <Slide bg={item.bg}>
              <TextBox
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <Title>{item.title}{'\n'}<Accent>{item.accent}</Accent></Title>
                <Desc>{item.desc}</Desc>
              </TextBox>
              <ImgBox>
                <img src={item.imgUrl} alt={item.accent} />
              </ImgBox>
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
      <PaginationWrapper>
        <Pagination
          total={depositData.length}
          current={current}
          isPlaying={isPlaying}
          onDotClick={(i) => { swiperRef.current?.slideTo(i); }}
          onPlayToggle={() => {
            if (isPlaying) { swiperRef.current?.autoplay?.stop(); setIsPlaying(false); }
            else { swiperRef.current?.autoplay?.start(); setIsPlaying(true); }
          }}
        />
      </PaginationWrapper>
    </Container>
  );
};

export default SectionCard02;
