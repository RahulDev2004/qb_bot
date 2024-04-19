import Anthropic from '@anthropic-ai/sdk';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const anthropic = new Anthropic({
    apiKey: "", // defaults to process.env["ANTHROPIC_API_KEY"]
});


// const model = "claude-2.1";
// const url = "https://api.anthropic.com/messages/"

const app = express();
const port = 3000;

    app.use(bodyParser.json());
    app.use(cors());

    app.post("/", async (req, res) => {
        try {

    const { message } = req.body;
    const createQuestionPaper = async (difficulty) => {

    const msg = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        temperature: 0,
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": `Create a ${difficulty} difficulty level Question Paper with 5 X 2 mark questions on the syllabus of ${message} and also provide the answer key at the end of the paper.`
              }
            ]
          }
        ]
      });
        console.log(msg.content[0].text);
        return msg.content[0].text;
    }

    const easy = await createQuestionPaper("easy");
    
    const medium = "hello"
    const hard = "hello"

res.json({
    message: {
        easy,
        medium,
        hard
    }
})
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});