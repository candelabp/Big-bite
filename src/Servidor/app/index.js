import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-5587046613139858-102417-099a2759e9012e46415ad43fd4b9e702-460547099",
});

const app = express();
const port = 3000;

// Configurar CORS para permitir solicitudes desde localhost:5173
const corsOptions = {
    origin: 'http://localhost:5173', // URL de tu frontend
    methods: ['GET', 'POST'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)");
});

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: 1,
                    unit_price: Number(req.body.price),
                    description: req.body.description,
                },
            ],
            back_urls: {
                success: "https://big-bite-teal.vercel.app/",
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({ id: result.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear la preferencia >(" });
    }
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
