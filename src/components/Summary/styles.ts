import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -7rem;
`;

interface ContentProps {
  color: 'green' | 'red';
}

const colors = {
  green: '#33cc95',
  red: '#e52e4d',
};

export const Content = styled.div<ContentProps>`
  background: var(--shape);
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  color: var(--text-title);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 3rem;
    //color: var(--text-title);
    color: ${(props) => colors[props.color]};
  }

  &.highlight-background {
    background: ${(props) => colors[props.color]};
    color: #fff;

    strong {
      color: #fff;
    }
  }
`;
