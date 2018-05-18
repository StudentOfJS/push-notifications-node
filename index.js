const express = require("express")
const bodyParser = require("body-parser")
const webpush = require("web-push")
const path = require("path")
const app = express()

// set static path
app.use(express.static(path.resolve(__dirname, "client")))

app.use(bodyParser.json())

const publicVapidKey = "BP5aoNI5eKqoB0DPh1744mn-Bpm1Kl92TxAWFzftm5YIIX-Rwo5Q5s2LFgAGcCjiRCsKUHlfoHvAD1SfbigtOoc"
const privateVapidKey = "u05PWA2a8dSYHwk_-Wmgu8dSBhOFyIZPBXsdhFmJBn0"
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey)

// SUbscribe Route
app.post("/subscribe", (req, res) => {
  // Get push subscription object
  const subscription = req.body

  // Send 201 - resource created
  res.status(201).json({})

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" })

  // Pass object into sendNotifiction
  webpush.sendNotification(subscription, payload).catch(err => console.error(err))
})

const port = 5000

app.listen(port, () => console.log(`server started on ${port}`))