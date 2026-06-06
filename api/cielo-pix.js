export default async function handler(req, res) {
  const resposta = await fetch(
    "https://apisandbox.cieloecommerce.cielo.com.br/1/sales",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "MerchantId": process.env.CIELO_MERCHANT_ID,
        "MerchantKey": process.env.CIELO_MERCHANT_KEY
      },
      body: JSON.stringify({
        MerchantOrderId: "TESTE001",
        Customer: {
          Name: "Cliente Teste"
        },
        Payment: {
          Type: "CreditCard",
          Amount: 100,
          Installments: 1,
          SoftDescriptor: "TESTE",
          CreditCard: {
            CardNumber: "0000000000000001",
            Holder: "Teste",
            ExpirationDate: "12/2030",
            SecurityCode: "123",
            Brand: "Visa"
          }
        }
      })
    }
  );

  const texto = await resposta.text();

  return res.status(200).json({
    status: resposta.status,
    resposta: texto
  });
}
