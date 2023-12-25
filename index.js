
import express from 'express'
import Razorpay from 'razorpay'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post('/api/payment', async (req, res) => {
    const { amount } = req.body;
  
    const options = {
      amount: amount * 100, // Razorpay expects amount in paisa
      currency: 'INR',
      receipt: 'receipt#1',
    };
  
    try {
      const response = await razorpay.orders.create(options);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.get("/", (req, res) => {
    res.send("Working.....")
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
