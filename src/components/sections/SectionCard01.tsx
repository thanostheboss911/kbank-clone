import { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { brandImages } from '../../data/mockData';
import { useInView } from '../../hooks/useInView';

const Container = styled.div`
  width: 100%;
  height: 40.125rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
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
  background: linear-gradient(
    to bottom,
    rgba(16,41,183,0.04) 15%,
    rgba(16,41,183,0.2) 50%,
    rgba(16,41,183,0.6) 70%,
    #1029b8 100%
  );
`;

const ItemBox = styled(motion.div)`
  position: absolute;
  left: 1.8375rem;
  bottom: 3.185rem;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  white-space: pre-line;
  margin-bottom: 0.75rem;
`;

const Desc = styled.p`
  font-size: clamp(0.85rem, 2vw, 1rem);
  color: rgba(255,255,255,0.75);
  line-height: 1.6;
  white-space: pre-line;
`;

const SectionCard01 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.5);

  useEffect(() => {
    if (inView) onView?.();
  }, [inView]);

  return (
    <Container ref={ref} onClick={() => window.open('https://www.kbanknow.com', '_blank')}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        style={{ width: '100%', height: '100%' }}
      >
        {brandImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Slide imgUrl={img}>
              <Gradient />
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
      <ItemBox
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 3 }}
      >
        <Title>{'나의 금융생활이\n즐거움으로\n가득해지도록'}</Title>
        <Desc>{'복잡한 금융을 가깝고 편리하게\n매일을 기분 좋은 일상으로 만들어보세요'}</Desc>
      </ItemBox>
    </Container>
  );
};

export default SectionCard01;
