export default async function handler(req, res) {
  try {
    const merchantId = process.env.CIELO_MERCHANT_ID?.trim();
    const merchantKey = process.env.CIELO_MERCHANT_KEY?.trim();

    if (!merchantId || !merchantKey) {
      return res.status(500).json({
        erro: true,
        mensagem: "Credenciais da Cielo não configuradas."
      });
    }

    const valor = req.method === "POST" ? Number(req.body?.valor || 1) : 1;
    const cliente = req.method === "POST" ? req.body?.cliente || "Cliente Teste" : "Cliente Teste";

    const pedido = `PEDIDO${Date.now()}`;
    const amount = Math.round(valor * 100);

    const payload = {
      MerchantOrderId: pedido,
      Customer: {
        Name: cliente
      },
      Payment: {
        Type: "Pix",
        Provider: "Cielo2",
        Amount: amount,
        QrCode: {
          Expiration: 3600
        }
      }
    };

    const resposta = await fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "MerchantId": merchantId,
        "MerchantKey": merchantKey
      },
      body: JSON.stringify(payload)
    });

    const texto = await resposta.text();

    let dados;
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = texto;
    }

    return res.status(200).json({
      sucesso: resposta.ok,
      status: resposta.status,
      pedido,
      valor,
      amount,
      respostaCielo: dados
    });

  } catch (erro) {
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao gerar Pix Cielo.",
      detalhe: erro.message
    });
  }
}
