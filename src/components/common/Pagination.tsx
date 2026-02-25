import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const Dot = styled.button<{ active: boolean }>`
  width: ${({ active }) => (active ? '0.75rem' : '0.5rem')};
  height: ${({ active }) => (active ? '0.75rem' : '0.5rem')};
  border-radius: 50%;
  background: ${({ active }) => (active ? '#ffffff' : 'rgba(255,255,255,0.4)')};
  transition: all 0.2s;
`;

const PlayBtn = styled.button`
  width: 0.75rem;
  height: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.6rem;
  opacity: 0.8;
`;

interface Props {
  total: number;
  current: number;
  isPlaying: boolean;
  onDotClick: (i: number) => void;
  onPlayToggle: () => void;
  fillColor?: string;
}

const Pagination = ({ total, current, isPlaying, onDotClick, onPlayToggle, fillColor }: Props) => {
  return (
    <Wrapper>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} active={i === current} onClick={(e) => { e.stopPropagation(); onDotClick(i); }} />
      ))}
      <PlayBtn onClick={(e) => { e.stopPropagation(); onPlayToggle(); }}>
        {isPlaying ? '⏸' : '▶'}
      </PlayBtn>
    </Wrapper>
  );
};

export default Pagination;
