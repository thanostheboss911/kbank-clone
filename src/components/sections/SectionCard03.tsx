import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const Container = styled(motion.div)`
  width: 100%;
  height: 37.3125rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
`;

const ItemBox = styled(motion.div)`
  position: absolute;
  left: 1.75rem;
  bottom: 3.5rem;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
`;

const Desc = styled.p`
  font-size: clamp(0.85rem, 2vw, 1rem);
  color: rgba(255,255,255,0.75);
  line-height: 1.6;
  white-space: pre-line;
`;

// 무료 샘플 비디오 (Big Buck Bunny)
const VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';

const SectionCard03 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.4);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (inView) {
      onView?.();
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);

  return (
    <Container
      ref={ref}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: inView ? 1 : 0.5 }}
      transition={{ duration: 3 }}
      onClick={() => window.open('https://www.kbanknow.com', '_blank')}
    >
      <Video ref={videoRef} muted playsInline loop src={VIDEO_URL} />
      <ItemBox
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <Title>ONE 카드</Title>
        <Desc>{'매달 내 소비 상황에 맞는 혜택,\n꼭 필요한 혜택을 선택해서 쓰실수 있도록\n하나의 카드에 담았어요'}</Desc>
      </ItemBox>
    </Container>
  );
};

export default SectionCard03;
