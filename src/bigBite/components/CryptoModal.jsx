import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/cryptomodal.css"
function CryptoModal({ totalPesos, onClose }) {
    const [btcRate, setBtcRate] = useState(null);
    const [ethRate, setEthRate] = useState(null);
    const [arsToBusdRate, setArsToBusdRate] = useState(null);
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        fetchCryptoRates();
    }, []);

    const fetchCryptoRates = async () => {
        try {
            // Obtener tasa de cambio ARS a BUSD
            const arsToBusdResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ARSBUSD');
            setArsToBusdRate(parseFloat(arsToBusdResponse.data.price));

            // Obtener tasa de cambio BTC a BUSD
            const btcResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCBUSD');
            setBtcRate(parseFloat(btcResponse.data.price));

            // Obtener tasa de cambio ETH a BUSD
            const ethResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHBUSD');
            setEthRate(parseFloat(ethResponse.data.price));
        } catch (error) {
            console.error('Error fetching crypto rates from Binance:', error);
        }
    };

    const handleConversion = () => {
        if (!arsToBusdRate) return;

        // Convertir ARS a BUSD
        const busdAmount = totalPesos / arsToBusdRate;

        // Convertir BUSD a criptomoneda seleccionada
        const cryptoRate = selectedCrypto === 'BTC' ? btcRate : ethRate;

        if (cryptoRate) {
            setConvertedAmount(busdAmount / cryptoRate);
        }
    };

    useEffect(() => {
        handleConversion();
    }, [selectedCrypto, btcRate, ethRate, arsToBusdRate, totalPesos]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="crypto-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Pagar con Cripto</h2>
                <p>Total en Pesos: ${totalPesos}</p>
                <label>
                    Selecciona Criptomoneda:
                    <select onChange={(e) => setSelectedCrypto(e.target.value)} value={selectedCrypto}>
                        <option value="BTC">Bitcoin (BTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                    </select>
                </label>
                <p>Monto en {selectedCrypto}: {convertedAmount.toFixed(8)}</p>
                <p>Haz la transferencia al siguiente CBU:</p>
                <p><strong>CBU:</strong> CBUEJEMPLO</p>
                <p>Luego envíanos el comprobante de transacción al siguiente número:</p>
                <p><strong>WhatsApp:</strong> 26111111</p>
                <p>Una vez confirmado el pago comenzaremos la preparación de tu pedido.</p>
                <button className="btn-cripto" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}

export default CryptoModal;