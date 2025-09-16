import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users`)
    console.log(response);
    const data = await response.json()
    return res.json(data)
  } catch (err) {
    console.log(err);
  }
})

export default router