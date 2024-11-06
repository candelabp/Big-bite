import React, { useState, useEffect } from 'react';

function CriptoPaymentModal({ isOpen, onClose }) {
    const [bitcoinRate, setBitcoinRate] = useState(0);
    const [ethereumRate, setEthereumRate] = useState(0);
    const [conversionAmount, setConversionAmount] = useState(0);
    const [selectedCripto, setSelectedCripto] = useState('bitcoin');

    useEffect(() => {
        if (isOpen) {
            fetchCryptoRates();
        }
    }, [isOpen]);

    const fetchCryptoRates = async () => {
        try {
            const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=USD');
            const data = await response.json();
            setBitcoinRate(data.data.rates.BTC);
            setEthereumRate(data.data.rates.ETH);
        } catch (error) {
            console.error('Error fetching crypto rates:', error);
        }
    };

    const handleConversion = (amountInPesos) => {
        const rate = selectedCripto === 'bitcoin' ? bitcoinRate : ethereumRate;
        setConversionAmount(amountInPesos / rate);
    };

    return (
        isOpen && (
            <div className="modal">
                <h2>Pagar con Cripto</h2>
                <select onChange={(e) => setSelectedCripto(e.target.value)} value={selectedCripto}>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                </select>
                <input
                    type="number"
                    placeholder="Monto en pesos"
                    onChange={(e) => handleConversion(e.target.value)}
                />
                <p>Monto en {selectedCripto === 'bitcoin' ? 'BTC' : 'ETH'}: {conversionAmount.toFixed(8)}</p>
                <button onClick={onClose}>Cancelar</button>
                <button onClick={() => handlePayment(conversionAmount)}>Pagar</button>
            </div>
        )
    );
}

export default CriptoPaymentModal;
