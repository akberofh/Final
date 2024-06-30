import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const [itemPrice, setItemPrice] = useState(location.state && location.state.itemPrice);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (e) => {
        let formattedCardNumber = e.target.value.replace(/\s/g, '');
        if (formattedCardNumber.length > 0) {
            formattedCardNumber = formattedCardNumber.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        setCardNumber(formattedCardNumber);
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value;
        if (value.length === 2 && expiryDate.length === 1 && !value.includes('/')) {
            value += '/';
        }
        setExpiryDate(value);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };

    const handleShowCvv = () => {
        toast.info(`CVV: ${cvv}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!itemPrice || parseFloat(itemPrice) <= 0) {
            toast.error('Ürün fiyatı geçersiz.');
            return;
        }

        const enteredAmount = parseFloat(cardNumber.replace(/\s/g, ''));
        if (enteredAmount < parseFloat(itemPrice)) {
            toast.error('Yeterli para girilmedi.');
            return;
        }

        if (cardNumber.replace(/\s/g, '').length !== 16) {
            toast.error('Lütfen geçerli bir kart numarası girin.');
            return;
        }

        if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
            toast.error('Lütfen geçerli bir son kullanma tarihi girin (MM/YY formatında).');
            return;
        }

        const [month, year] = expiryDate.split('/');
        const today = new Date();
        const expiry = new Date(`20${year}`, month - 1);
        if (expiry < today) {
            toast.error('Kartınızın son kullanma tarihi geçmiş.');
            return;
        }

        if (cvv.length !== 3) {
            toast.error('CVV kodu 3 rakamdan oluşmalıdır.');
            return;
        }

        simulatePayment();
    };

    const simulatePayment = () => {
        // Simulate payment success
        setTimeout(() => {
            toast.success('Ödeme başarıyla gerçekleştirildi.');
            setCardNumber('');
            setExpiryDate('');
            setCvv('');
            // Update itemPrice to 0 after successful payment
            setItemPrice(0);
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                <h2 className="text-lg mb-4">Ödeme Formu</h2>
                <p>Fiyat: {itemPrice}$</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Kart Numarası
                        </label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="XXXX XXXX XXXX XXXX"
                            maxLength="19"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Son Kullanma Tarihi
                        </label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            CVV
                        </label>
                        <input
                            type="password"
                            value={cvv}
                            onChange={handleCvvChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="***"
                            maxLength="3"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-0 top-0 mt-3 mr-4"
                            onClick={handleShowCvv}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v4a1 1 0 11-2 0v-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Ödeme Yap
                    </button>
                </form>
            </div>
            <ToastContainer position="bottom-center" />
        </div>
    );
};

export default Payment;
