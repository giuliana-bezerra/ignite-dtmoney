import removeImg from '../../assets/remove.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { EmptyTransactions } from '../EmptyTransactions';
import { Container } from './styles';

export function TransactionTable() {
  const { transactions, removeTransaction } = useTransactions();

  async function handleRemoveTransaction(transactionId: number) {
    await removeTransaction(transactionId);
  }

  return transactions.length ? (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.ammount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createdAt)
                )}
              </td>
              <td>
                <button onClick={() => handleRemoveTransaction(transaction.id)}>
                  <img src={removeImg} alt="Remover" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  ) : (
    <EmptyTransactions />
  );
}
