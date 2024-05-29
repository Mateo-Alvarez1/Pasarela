import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({ accessToken:process.env.ACCESS_TOKEN })
 
app.post('/preference' ,async (req , res) => {
    const body = {
        items: [{
            title: req.body.title ,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
            currency_id: "ARS" ,
        }],
        back_urls: {
            success: "/success",
            failure: "/failure",
            pending: "/pending"
        } ,
        auto_return: "approved"
    }
    try {
        const preference = await new Preference(client).create({ body });
        res.json({ redirectUrl: preference.init_point });
    } catch (error) {
        res.json(error)
    }
})


app.listen(PORT , () => {
    console.log(`Server listen in http://localhost:${PORT}`);
})