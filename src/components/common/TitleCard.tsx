import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const COLORS: Record<string, string> = {
  type1: '#3284c4',
  type2: 'rgba(12,14,15)',
  type3: '#277243',
  type4: '#5A91BB',
  type5: '#2F1D71',
  type6: '#243DBC',
  type7: '#7952B8',
};

const Container = styled(motion.div)<{ cardType: string }>`
  display: flex;
  width: 100%;
  height: 8.125rem;
  padding: 0 1.75rem;
  flex-direction: column;
  justify-content: center;
  border-radius: 1.25rem;
  background: ${({ cardType }) => COLORS[cardType] || '#333'};
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  white-space: pre-line;
`;

const AccentTitle = styled.span<{ cardType: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ cardType }) => COLORS[cardType] ? 'rgba(255,255,255,0.6)' : '#ffffff'};
`;

interface Props {
  title: string;
  moveText: string;
  type: string;
}

const TitleCard = ({ title, moveText, type }: Props) => {
  return (
    <Container
      cardType={type}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <Title>
        {title}
        <AccentTitle cardType={type}>{moveText}</AccentTitle>
      </Title>
    </Container>
  );
};

export default TitleCard;
