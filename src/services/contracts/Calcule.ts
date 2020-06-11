import Balance from '../../models/Balance';

export default interface Calcule {
  calcular(balance: Balance, value: number): Balance;
}
