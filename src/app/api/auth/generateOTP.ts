// pages/api/generateOTP.js
import crypto from 'crypto'
import twilio from 'twilio'
import bcrypt from 'bcrypt'
import { MongoClient } from 'mongodb'

export default async function handler(req:any, res:any) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  // Generate a six digit number using the crypto module
  const otp = crypto.randomInt(100000, 999999)

  // Hash the OTP
  const hashedOtp = await bcrypt.hash(otp.toString(), 10)

  // Initialize the Twilio client
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

  try {
    // Send the OTP via SMS
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
      to: req.body.phone, // your user's phone number
    })

    // Store the hashed OTP in the database along with the phone number and expiry time
    const mongoClient = new MongoClient(process.env.MONGODB_URI as string)
    await mongoClient.connect()
    const otps = mongoClient.db().collection('otps')
    await otps.insertOne({                                      
      phone: req.body.phone,
      otp: hashedOtp,
      expiry: Date.now() + 10 * 60 * 1000, // OTP expires after 10 minutes
    })
    await mongoClient.close()

    // Respond with a success status
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not send OTP' })
  }
}