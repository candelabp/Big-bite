import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-5587046613139858-102417-099a2759e9012e46415ad43fd4b9e702-460547099",
})

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)")
})

app.post("/create_preference" , async (req, res) => {
    try {

        console.log("Datos recibidos:", req.body);

        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: 1,
                    unit_price: Number(req.body.price),
                    description: req.body.description
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/",
                failure: "https://www.youtube.com/",
                pending: "https://www.youtube.com/",
            },
            auto_return: "approved"
        };

        const preference = new Preference(client);
        const result = await preference.create({ body});
        console.log("Datos enviados a MercadoPago:", body);  // Verifica qué se envía a MercadoPago
        console.log("Resultado de la creación de preferencia:", result);  // Verifica el resultado
        res.json({
            id: result.id,
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia >("
        });
    }
});

app.listen(port, () => {
    console.log(` El servidor esta corriendo en el puerto ${port}` );
})