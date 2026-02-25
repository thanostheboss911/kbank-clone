import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { kbankLogoUrl } from '../../data/mockData';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  background: transparent;
`;

/* ── 로고 ── */
const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.45rem;
  object-fit: cover;
`;

const LogoText = styled.span`
  font-size: 1.15rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.04em;
  line-height: 1;
`;

/* ── 우측 버튼 그룹 ── */
const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

/* 로그인 버튼 */
const LoginBtn = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  padding: 0.35rem 0.9rem;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
  border-radius: 2rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s;
  &:hover { background: rgba(255,255,255,0.15); }
`;

/* 햄버거 버튼 */
const MenuBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.28rem;
  width: 2.25rem;
  height: 2.25rem;
  background: rgba(255,255,255,0.15);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
`;

const Bar = styled.span`
  display: block;
  width: 1rem;
  height: 1.5px;
  background: #ffffff;
  border-radius: 2px;
`;

/* ── 드로어 ── */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
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
  box-shadow: -4px 0 24px rgba(0,0,0,0.15);
`;

const DrawerTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const DrawerLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const DrawerLogoImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.4rem;
  object-fit: cover;
`;

const DrawerLogoText = styled.span`
  font-size: 1.05rem;
  font-weight: 900;
  color: #020616;
  letter-spacing: -0.04em;
`;

const CloseBtn = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  &:hover { background: #f5f5f5; }
`;

const DrawerList = styled.nav`
  flex: 1;
  padding: 0.5rem 0;
  overflow-y: auto;
`;

const DrawerItem = styled.a`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #020616;
  text-decoration: none;
  padding: 0.9rem 1.5rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s;
  &:hover { background: #f8f8ff; color: #4262ff; }
`;

const DrawerArrow = styled.span`
  margin-left: auto;
  color: #ccc;
  font-size: 0.8rem;
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
        <LogoLink href="https://www.kbanknow.com" target="_blank" rel="noreferrer">
          <LogoImg src={kbankLogoUrl} alt="케이뱅크" />
          <LogoText>kbank</LogoText>
        </LogoLink>

        <RightGroup>
          <LoginBtn href="https://www.kbanknow.com" target="_blank" rel="noreferrer">
            로그인
          </LoginBtn>
          <MenuBtn onClick={() => setOpen(true)} aria-label="메뉴 열기">
            <Bar /><Bar /><Bar />
          </MenuBtn>
        </RightGroup>
      </HeaderWrapper>

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
              transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
            >
              <DrawerTop>
                <DrawerLogo>
                  <DrawerLogoImg src={kbankLogoUrl} alt="케이뱅크" />
                  <DrawerLogoText>kbank</DrawerLogoText>
                </DrawerLogo>
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
                    <DrawerArrow>›</DrawerArrow>
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
