export default async function handler(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET") {
      return res.status(405).json({
        erro: true,
        mensagem: "Método não permitido. Use GET para teste ou POST para pedido real."
      });
    }

    const merchantId = process.env.CIELO_MERCHANT_ID;
    const merchantKey = process.env.CIELO_MERCHANT_KEY;

    if (!merchantId || !merchantKey) {
      return res.status(500).json({
        erro: true,
        mensagem: "Credenciais da Cielo não configuradas na Vercel."
      });
    }

    const dados = req.method === "POST" ? req.body : {};

    const valor = dados.valor || 1.00;
    const cliente = dados.cliente || "Cliente Teste";
    const pedido = dados.pedido || `PEDIDO-${Date.now()}`;

    const amount = Math.round(Number(valor) * 100);

    const payload = {
      MerchantOrderId: pedido,
      Customer: {
        Name: cliente
      },
      Payment: {
        Type: "Pix",
        Amount: amount
      }
    };

    const resposta = await fetch("https://apisandbox.cieloecommerce.cielo.com.br/1/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "MerchantId": merchantId,
        "MerchantKey": merchantKey
      },
      body: JSON.stringify(payload)
    });

    const texto = await resposta.text();

    let resultado;
    try {
      resultado = JSON.parse(texto);
    } catch {
      resultado = texto;
    }

    return res.status(resposta.status).json({
      sucesso: resposta.ok,
      statusHttp: resposta.status,
      pedido,
      valor,
      amount,
      respostaCielo: resultado
    });

  } catch (erro) {
    return res.status(500).json({
      erro: true,
      mensagem: "Erro ao comunicar com a Cielo.",
      detalhe: erro.message
    });
  }
}
