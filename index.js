import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const openai = new OpenAI({
    apiKey: "",
});



const app = express();
const port = 3000;

    app.use(bodyParser.json());
    app.use(cors());

    app.post("/", async (req, res) => {

    const { message } = req.body;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a assissant who make question paper for the given syllabus. The question paper should have four - 2 mark questions and four - 13 mark questions. Dont add extra content other than question paper."},
            {role: "user", content: `${message}`},
        ]
    })

res.json({
    message: completion.choices[0].message.content
})
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

