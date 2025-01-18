import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
     CredentialsProvider({
      name: 'Phone OTP',
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        const { phoneNumber, otp } = credentials;
        
        try {
          // Send OTP to the phone number
          const confirmationResult = await sendOTP(phoneNumber, 'recaptcha-container');
          
          // After the OTP is sent, the user enters the OTP. Verify it here.
          const user = await verifyOTP(confirmationResult, otp);

          if (user) {
            // Return user object if OTP is valid
            return { id: user.phoneNumber, name: 'Phone User', email: `${phoneNumber}@otp.com` };
          } else {
            // Return null if OTP is invalid
            return null;
          }
        } catch (error) {
          console.error('OTP authentication failed:', error);
          return null; // Return null if there's an error
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
  },
  session: {
    jwt: true,  // Use JWT for session management
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.id; // Store phone number as part of the JWT
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      session.user.phoneNumber = token.phoneNumber;
      return session;
    },
  },
});
