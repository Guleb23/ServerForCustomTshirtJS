import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const router = express();

const config = new Configuration(
    {
        apiKey: process.env.OPENAI_KEY,
    }
)

const openAi = new OpenAIApi(config);
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Routes" });
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openAi.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        });

        const image = response.data.data[0].b64_json;
        res.status(200).json({ photo: image })

    } catch (error) {
        console.log(error);
        res.status(500);
    }

})

export default router;