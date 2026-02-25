import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { storyMockData } from '../../data/mockData';
import { useInView } from '../../hooks/useInView';
import Pagination from '../common/Pagination';

const Container = styled.div`
  width: 100%;
  height: 40.125rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
  background: #2f3b56;
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const Slide = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 40.125rem;
  background: url(${({ imgUrl }) => imgUrl}) center/cover no-repeat;
  position: relative;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(33,36,90,0.03) 50%, rgba(0,3,53,0.5) 84%);
`;

const ItemBox = styled.div`
  position: absolute;
  left: 1.8375rem;
  bottom: 3.185rem;
  z-index: 2;
  padding-right: 3rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  white-space: pre-line;
  line-height: 1.35;
  margin-bottom: 0.5rem;
`;

const SubDesc = styled.p`
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
`;

const PaginationWrapper = styled.div`
  position: absolute;
  right: 1.75rem;
  bottom: 1.75rem;
  z-index: 3;
`;

const SectionCard08 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.5);
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
        style={{ width: '100%', height: '100%' }}
      >
        {storyMockData.map((item, i) => (
          <SwiperSlide key={i}>
            <Slide imgUrl={item.imgUrl}>
              <Gradient />
              <ItemBox>
                <Title>{item.title}</Title>
                <SubDesc>{item.subDesc}</SubDesc>
              </ItemBox>
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
      <PaginationWrapper>
        <Pagination
          total={storyMockData.length}
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

export default SectionCard08;
