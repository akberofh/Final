// BasketController.js
import BasketModel from "../models/BasketModel";

const basketPost = async (req, res) => {
  const { createdAt} = req.body;

  try {
    const note = await BasketModel.create({ createdAt});
    res.status(201).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToBasket = async (req, res) => {
  try {
    // İşlemler
    res.status(200).send("Ürün başarıyla sepete eklendi.");
  } catch (error) {
    res.status(500).send({ error: 'Sepete eklerken hata oluştu' });
  }
};

const removeFromBasket = async (req, res) => {
  try {
    // İşlemler
    res.status(200).send("Ürün başarıyla sepetten kaldırıldı.");
  } catch (error) {
    res.status(500).send({ error: 'Sepetten kaldırırken hata oluştu' });
  }
};

const getBasket = async (req, res) => {
  try {
    // İşlemler
    res.status(200).send("Kullanıcının sepeti başarıyla getirildi.");
  } catch (error) {
    res.status(500).send({ error: 'Sepeti getirirken hata oluştu' });
  }
};

module.exports = { addToBasket, removeFromBasket, getBasket, basketPost };
