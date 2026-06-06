export default async function handler(req, res) {
  res.status(200).json({
    status: "ok",
    mensagem: "Arquivo cielo-pix funcionando",
    merchantIdExiste: !!process.env.CIELO_MERCHANT_ID,
    merchantKeyExiste: !!process.env.CIELO_MERCHANT_KEY
  });
}
