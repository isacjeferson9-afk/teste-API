export default async function handler(req, res) {
  return res.status(200).json({
    merchantId: process.env.CIELO_MERCHANT_ID?.substring(0, 8),
    merchantKeyTamanho: process.env.CIELO_MERCHANT_KEY?.length,
    merchantIdExiste: !!process.env.CIELO_MERCHANT_ID,
    merchantKeyExiste: !!process.env.CIELO_MERCHANT_KEY
  });
}
