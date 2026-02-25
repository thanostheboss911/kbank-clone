import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const Logo = styled.a`
  font-size: 1.1rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.03em;
  text-decoration: none;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LoginBtn = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  padding: 0.3rem 0.8rem;
  border: 1.5px solid rgba(255,255,255,0.6);
  border-radius: 2rem;
  text-decoration: none;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.15); }
`;

const MenuBtn = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  span {
    display: block;
    width: 100%;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: all 0.2s;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
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
  padding: 4rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-shadow: -4px 0 20px rgba(0,0,0,0.15);
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const DrawerTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
  color: #020616;
  letter-spacing: -0.03em;
`;

const CloseBtn = styled.button`
  font-size: 1.4rem;
  color: #020616;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
`;

const DrawerItem = styled.a`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #020616;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  &:hover { color: #4262ff; }
`;

const MENU_ITEMS = [
  { label: '입출금통장', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/dpst/index.jsp' },
  { label: '적금', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/saving/index.jsp' },
  { label: '카드', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/card/index.jsp' },
  { label: '대출', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/loan/index.jsp' },
  { label: '투자', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/invest/index.jsp' },
  { label: '사장님', href: 'https://www.kbanknow.com/ib20/mbs/mpfin/sme/index.jsp' },
];

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <HeaderWrapper>
        <Logo href="https://www.kbanknow.com" target="_blank" rel="noreferrer">kbank</Logo>
        <RightGroup>
          <LoginBtn href="https://www.kbanknow.com" target="_blank" rel="noreferrer">로그인</LoginBtn>
          <MenuBtn onClick={() => setDrawerOpen(true)} aria-label="메뉴 열기">
            <span /><span /><span />
          </MenuBtn>
        </RightGroup>
      </HeaderWrapper>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <Overlay
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
            />
            <Drawer
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              <DrawerHeader>
                <DrawerTitle>kbank</DrawerTitle>
                <CloseBtn onClick={() => setDrawerOpen(false)} aria-label="메뉴 닫기">✕</CloseBtn>
              </DrawerHeader>
              {MENU_ITEMS.map((item) => (
                <DrawerItem
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </DrawerItem>
              ))}
            </Drawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
