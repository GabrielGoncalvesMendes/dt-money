import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../../../contexts/TransactionsContext";

const serachFormSchema = zod.object({
  query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof serachFormSchema>;

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionContext)

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(serachFormSchema)
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transacoes"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}