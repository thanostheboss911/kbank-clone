import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────── Header ─────────────── */
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 3.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

/* ── 로고: "Kbank" K 대문자, 짙은 남색 ── */
const Logo = styled.a`
  font-size: 1.45rem;
  font-weight: 900;
  color: #17008c;
  letter-spacing: -0.04em;
  text-decoration: none;
  line-height: 1;

  /* K는 대문자, bank는 소문자 그대로 */
  span.k {
    color: #17008c;
  }
`;

/* ── 우측 버튼 그룹 ── */
const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

/* "앱 다운로드" 버튼 */
const AppBtn = styled.a`
  font-size: 0.825rem;
  font-weight: 700;
  color: #ffffff;
  background: #4262ff;
  padding: 0.4rem 0.9rem;
  border-radius: 2rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s;
  &:hover { background: #2d4de0; }
`;

/* 햄버거 메뉴 버튼 — 원형 배경 없음, 단순 3선 */
const MenuBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 0.3rem;
  width: 1.75rem;
  height: 1.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Bar = styled.span<{ short?: boolean }>`
  display: block;
  width: ${({ short }) => (short ? '0.85rem' : '1.25rem')};
  height: 1.75px;
  background: #020616;
  border-radius: 2px;
`;

/* ─────────────── Drawer ─────────────── */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 300;
`;

const Drawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 72%;
  max-width: 300px;
  background: #fff;
  z-index: 301;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
`;

const DrawerTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
`;

const DrawerLogo = styled.span`
  font-size: 1.25rem;
  font-weight: 900;
  color: #17008c;
  letter-spacing: -0.04em;
`;

const CloseBtn = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.15s;
  &:hover { background: #f5f5f5; color: #333; }
`;

const DrawerList = styled.nav`
  flex: 1;
  overflow-y: auto;
`;

const DrawerItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  color: #020616;
  text-decoration: none;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s, color 0.15s;
  &:hover { background: #f8f8ff; color: #4262ff; }
`;

const Arrow = styled.span`
  color: #ccc;
  font-size: 1rem;
`;

const MENU_ITEMS = [
  { label: '입출금통장', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/dpst/index.jsp' },
  { label: '적금',       href: 'https://www.kbanknow.com/ib20/mbs/mpfin/saving/index.jsp' },
  { label: '카드',       href: 'https://www.kbanknow.com/ib20/mbs/mpfin/card/index.jsp' },
  { label: '대출',       href: 'https://www.kbanknow.com/ib20/mbs/mpfin/loan/index.jsp' },
  { label: '투자',       href: 'https://www.kbanknow.com/ib20/mbs/mpfin/invest/index.jsp' },
  { label: '사장님',     href: 'https://www.kbanknow.com/ib20/mbs/mpfin/sme/index.jsp' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        {/* 로고: Kbank */}
        <Logo href="https://www.kbanknow.com" target="_blank" rel="noreferrer">
          Kbank
        </Logo>

        <RightGroup>
          {/* 앱 다운로드 버튼 */}
          <AppBtn href="https://www.kbanknow.com" target="_blank" rel="noreferrer">
            앱 다운로드
          </AppBtn>

          {/* 햄버거 메뉴 버튼 */}
          <MenuBtn onClick={() => setOpen(true)} aria-label="메뉴 열기">
            <Bar />
            <Bar />
            <Bar short />
          </MenuBtn>
        </RightGroup>
      </HeaderWrapper>

      {/* 드로어 */}
      <AnimatePresence>
        {open && (
          <>
            <Overlay
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setOpen(false)}
            />
            <Drawer
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.26, ease: 'easeInOut' }}
            >
              <DrawerTop>
                <DrawerLogo>Kbank</DrawerLogo>
                <CloseBtn onClick={() => setOpen(false)} aria-label="닫기">✕</CloseBtn>
              </DrawerTop>
              <DrawerList>
                {MENU_ITEMS.map(item => (
                  <DrawerItem
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <Arrow>›</Arrow>
                  </DrawerItem>
                ))}
              </DrawerList>
            </Drawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
