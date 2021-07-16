import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, Content } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.ammount;
        acc.total += transaction.ammount;
      } else {
        acc.withdraws += transaction.ammount;
        acc.total -= transaction.ammount;
      }

      return acc;
    },
    { deposits: 0, withdraws: 0, total: 0 }
  );

  return (
    <Container>
      <Content color="green">
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </Content>
      <Content color="red">
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </Content>
      <Content
        className="highlight-background"
        color={summary.total >= 0 ? 'green' : 'red'}
      >
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </Content>
    </Container>
  );
}
