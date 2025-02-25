import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as zod from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionContext, (context) => {
    return context.createTransaction;
  });
  const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data;
    await createTransaction({
      category, 
      description, 
      price, 
      type
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transacao</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form action='' onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <input type="text" placeholder='Descricao' required { ...register('description') } />
        <input type="number" placeholder='Preco' required { ...register('price', { valueAsNumber: true }) } />
        <input type="text" placeholder='Categoria' required { ...register('category') } />

      <Controller 
        control={control}
        name="type"
        render={({ field }) => {
          return (
            <TransactionType onValueChange={field.onChange} value={field.value}>
              <TransactionTypeButton variant='income' value='income'>
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>
              <TransactionTypeButton variant='outcome' value='outcome'>
                <ArrowCircleDown size={24} />
                Saida
              </TransactionTypeButton>
            </TransactionType>
          );
        }}
      />


        <button type='submit' disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}