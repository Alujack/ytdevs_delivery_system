// "use client"
// import { useState } from 'react'

// const OTPGenerator = () => {
//   const [phone, setPhone] = useState('')
//   const [otp, setOTP] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [message, setMessage] = useState('')
//   const [otpSent, setOtpSent] = useState(false)

//   const handleSendOTP = async (event:any) => {
//     event.preventDefault()
//     setIsLoading(true)
//     setMessage('') // reset message

//     try {
//       const response = await fetch('/api/auth/generateOTP', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone }),
//       })

//       if (response.ok) {
//         setMessage('OTP has been sent to your phone.')
//         setOtpSent(true)
//       } else {
//         const data = await response.json()
//         setMessage(data.error)
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again.')
//       console.error(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleVerifyOTP = async (event:any) => {
//     event.preventDefault()
//     setIsLoading(true)
//     setMessage('') // reset message

//     try {
//       const response = await fetch('/api/auth/verifyOTP', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone, otp }),
//       })

//       if (response.ok) {
//         setMessage('OTP verification successful!')
//         setOtpSent(false)
//         setPhone('')
//         setOTP('')
//       } else {
//         const data = await response.json()
//         setMessage(data.error)
//       }
//     } catch (error:any) {
//       setMessage(error)
//       console.error(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div>
//       {!otpSent ? (
//         <form onSubmit={handleSendOTP}>
//           <label>
//             Phone Number:
//             <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           </label>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Sending...' : 'Send OTP'}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOTP}>
//           <label>
//             Enter OTP:
//             <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />
//           </label>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Verifying...' : 'Verify OTP'}
//           </button>
//         </form>
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   )
// }

// export default OTPGenerator