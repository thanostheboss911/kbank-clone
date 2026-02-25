import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { smeHomeUrl } from '../../data/mockData';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div<{ bg?: string }>`
  width: 100%;
  height: 37.3125rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0,0,0,0.1);
  position: relative;
  background: ${({ bg }) => bg || '#e5ebff'};
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const PhoneFrame = styled.div`
  width: 13.375rem;
  height: 25rem;
  border-radius: 1.5rem 1.5rem 0 0;
  border: 2px solid #020616;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const ItemBox = styled.div`
  position: absolute;
  left: 1.75rem;
  top: 3.25rem;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  font-weight: 700;
  color: #020616;
  white-space: pre-line;
  line-height: 1.35;
`;

const AccentTitle = styled.span`
  color: #4D00BA;
`;

// Card 2 — 카운터
const Card2 = styled(Card)`
  padding: 3.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title2 = styled.h2`
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  font-weight: 700;
  color: #020616;
  white-space: pre-line;
  line-height: 1.35;
`;

const CounterNum = styled(motion.div)`
  font-size: 3rem;
  font-weight: 700;
  color: #020616;
`;

const SmallText = styled.p`
  font-size: 0.8rem;
  color: rgba(0,0,0,0.4);
  margin-top: 0.25rem;
`;

const DescText = styled.p`
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  color: rgba(0,0,0,0.5);
  line-height: 1.6;
  white-space: pre-line;
`;

/* Profile group */
const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -0.5rem;
  object-fit: cover;
  &:first-of-type {
    margin-left: 0;
  }
`;

const MoreBtn = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  margin-left: -0.5rem;
  color: #555;
  font-weight: 700;
`;

const PROFILE_SEEDS = ['profile1', 'profile2', 'profile3', 'profile4'];

const SectionCard06 = ({ onView }: { onView?: () => void }) => {
  const { ref, inView } = useInView(0.5);
  const [count, setCount] = useState(0);
  const [scrollY, setScrollY] = useState(130);
  const startRef = useRef<number | null>(null);

  // 카운터 애니메이션
  useEffect(() => {
    if (!inView) return;
    onView?.();
    startRef.current = performance.now();
    const target = 63542;
    const duration = 3000;

    const animate = (now: number) => {
      const elapsed = now - (startRef.current || now);
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(target * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView]);

  // 패럴랙스 스크롤
  useEffect(() => {
    const onScroll = () => {
      const val = Math.max(130, window.scrollY - 4600 + 130);
      setScrollY(val);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Container ref={ref}>
      {/* Card 1 - 스크롤 이미지 */}
      <Card onClick={() => window.open('https://www.kbanknow.com', '_blank')}>
        <ItemBox>
          <Title>
            {'힘드실 땐\n'}
            <AccentTitle>든든한 파트너</AccentTitle>
            {'가\n되어드릴게요'}
          </Title>
        </ItemBox>
        <PhoneFrame>
          <img
            src={smeHomeUrl}
            alt="SME"
            style={{
              width: '100%',
              height: 'auto',
              transform: `translateY(-${scrollY}px)`,
              transition: 'transform 0.1s linear',
            }}
          />
        </PhoneFrame>
      </Card>

      {/* Card 2 - 카운터 */}
      <Card2 bg="#e5ebff" onClick={() => window.open('https://www.kbanknow.com', '_blank')}>
        <Title2>
          {'사장님들은\n케이뱅크 대출을\n'}
          <AccentTitle>보고있어요</AccentTitle>
        </Title2>
        <div>
          <DescText>케이뱅크 사장님 대출상품{'\n'}총 가입자 수</DescText>
          <ProfileGroup>
            {PROFILE_SEEDS.map((seed) => (
              <ProfileImg
                key={seed}
                src={`https://picsum.photos/seed/${seed}/50/50`}
                alt="가입자"
              />
            ))}
            <MoreBtn>+</MoreBtn>
          </ProfileGroup>
          <CounterNum
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {count.toLocaleString()}+
          </CounterNum>
          <SmallText>25년 5월 25일 기준</SmallText>
        </div>
      </Card2>
    </Container>
  );
};

export default SectionCard06;
