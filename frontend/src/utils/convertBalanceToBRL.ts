export function convertBalanceToBRL(balance: number) {
  return balance.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
