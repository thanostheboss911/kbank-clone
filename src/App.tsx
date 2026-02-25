import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import Header from './components/layout/Header';
import { galaxyBgUrl } from './data/mockData';
import TitleCard from './components/common/TitleCard';
import SectionCard01 from './components/sections/SectionCard01';
import SectionCard02 from './components/sections/SectionCard02';
import SectionCard03 from './components/sections/SectionCard03';
import SectionCard04 from './components/sections/SectionCard04';
import SectionCard05 from './components/sections/SectionCard05';
import SectionCard06 from './components/sections/SectionCard06';
import SectionCard07 from './components/sections/SectionCard07';
import SectionCard08 from './components/sections/SectionCard08';
import SectionCard09 from './components/sections/SectionCard09';

const BgLayer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: -2;
  transition: background 1s ease-in-out;
`;

const GalaxyOverlay = styled.div<{ active: boolean; bgUrl: string }>`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url('${({ bgUrl }) => bgUrl}');
  background-size: cover;
  background-position: center;
  opacity: ${({ active }) => (active ? 0.15 : 0)};
  transition: opacity 1s ease-in-out;
  pointer-events: none;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 4.5rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 699px) {
    padding: 4.5rem 2.5rem 3rem;
  }
`;

const GRADIENTS = theme.colors.bgGradients;

function App() {
  const [bgIdx, setBgIdx] = useState(0);
  const [galaxyBg, setGalaxyBg] = useState(false);

  const handleSection03View = useCallback(() => {
    setBgIdx(2);
    setGalaxyBg(true);
  }, []);

  const handleOtherView = useCallback((idx: number) => {
    setBgIdx(idx);
    setGalaxyBg(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BgLayer animate={{ background: GRADIENTS[bgIdx] }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
      <GalaxyOverlay active={galaxyBg} bgUrl={galaxyBgUrl} />
      <Header />
      <PageWrapper>
        {/* Section 01 — 브랜드 */}
        <SectionCard01 onView={() => handleOtherView(0)} />

        {/* Section 02 — 예금 */}
        <TitleCard
          title="재미있는"
          moveText=" 돈모으기."
          type="type1"
          onView={() => setBgIdx(1)}
        />
        <SectionCard02 onView={() => handleOtherView(1)} />

        {/* Section 03 — 카드 */}
        <TitleCard
          title="카드 한 장으로 골라 쓰는"
          moveText=" 혜택."
          type="type2"
          onView={() => setBgIdx(2)}
        />
        <SectionCard03 onView={handleSection03View} />

        {/* Section 09 — 대출 */}
        <TitleCard
          title="비교할수록 가벼운"
          moveText=" 이자생활."
          type="type7"
          onView={() => { setBgIdx(3); setGalaxyBg(false); }}
        />
        <SectionCard09 onView={() => handleOtherView(3)} />

        {/* Section 04 — 라이프 */}
        <TitleCard
          title="일상이 돈이되는"
          moveText=" 마법."
          type="type3"
          onView={() => setBgIdx(4)}
        />
        <SectionCard04 onView={() => handleOtherView(4)} />

        {/* Section 05 — 투자 */}
        <TitleCard
          title="내 미래를 위한"
          moveText=" 자산관리도."
          type="type4"
          onView={() => setBgIdx(5)}
        />
        <SectionCard05 onView={() => handleOtherView(5)} />

        {/* Section 06 — 사장님 */}
        <TitleCard
          title="어서오세요,"
          moveText=" 사장님."
          type="type5"
          onView={() => setBgIdx(6)}
        />
        <SectionCard06 onView={() => handleOtherView(6)} />

        {/* Section 08 — 스토리 */}
        <TitleCard
          title="케이뱅크 속,"
          moveText=" 스토리."
          type="type6"
          onView={() => setBgIdx(7)}
        />
        <SectionCard08 onView={() => handleOtherView(7)} />

        {/* Section 07 — 앱 다운로드 */}
        <SectionCard07 onView={() => handleOtherView(8)} />
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
