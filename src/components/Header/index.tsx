import { HeaderConatiner, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from '../../assets/Logo.svg';

export function Header() {
  return (
    <HeaderConatiner>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <NewTransactionButton>Nova transacao</NewTransactionButton>
      </HeaderContent>
    </HeaderConatiner>
  );
}