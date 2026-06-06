export default async function handler(req, res) {

  const merchantId = process.env.CIELO_MERCHANT_ID;
  const merchantKey = process.env.CIELO_MERCHANT_KEY;

  try {

    const response = await fetch(
      "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          MerchantId: merchantId,
          MerchantKey: merchantKey
        },
        body: JSON.stringify({
          MerchantOrderId: "PEDIDO-" + Date.now(),

          Customer: {
            Name: "Cliente Teste"
          },

          Payment: {
            Type: "CreditCard",
            Amount: 100,
            Installments: 1,
            SoftDescriptor: "TESTE",
            CreditCard: {
              CardNumber: "4551870000000183",
              Holder: "Teste",
              ExpirationDate: "12/2030",
              SecurityCode: "123",
              Brand: "Visa"
            }
          }
        })
      }
    );

    const data = await response.text();

    res.status(200).json({
      statusHttp: response.status,
      resposta: data
    });

  } catch (erro) {

    res.status(500).json({
      erro: erro.message
    });

  }
}
