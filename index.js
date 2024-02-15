import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const openai = new OpenAI({
    apiKey: "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",
});



const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {

const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        // {role: "system", content: "You are a helpful assistant."},
        {role: "user", content: "hello"},
    ]
})


res.json({
    message: completion.data.choices[0].message.content
})

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

