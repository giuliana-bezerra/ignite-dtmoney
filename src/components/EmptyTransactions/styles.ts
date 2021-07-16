import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;

  h2 {
    color: var(--text-title);
  }

  p {
    color: var(--text-body);
  }
`;
