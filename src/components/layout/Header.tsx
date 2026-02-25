import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

const Logo = styled.div`
  font-size: 1.1rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.03em;
`;

const MenuBtn = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  span {
    display: block;
    width: 100%;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
  }
`;

const Header = () => (
  <HeaderWrapper>
    <Logo>kbank</Logo>
    <MenuBtn>
      <span /><span /><span />
    </MenuBtn>
  </HeaderWrapper>
);

export default Header;
