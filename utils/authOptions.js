import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import User from '@/models/User';
import connectDB from '@/config/database';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    //Invoked on success login
    async signIn({ profile }){
       // 1. Connect to database
       await connectDB();
       // 2. Check if user exists in database
       const userExists = await User.findOne({ email: profile.email });
 
       // 3. If not, create user in database
       if (!userExists) {
         // Truncate user name if too long
         const username = profile.name ? profile.name.slice(0, 20) : profile.email.split('@')[0];

         // derive a default storename from the email (left of @), sanitized
         const emailLocal = (profile.email || '').split('@')[0] || '';
         const defaultStoreName = emailLocal
           .replace(/\./g, ' ')
           .replace(/[^a-z0-9-_]/gi, '')
           .toLowerCase();

         await User.create({
           email: profile.email,
           username,
           storename: defaultStoreName,
           image: profile.picture,
         });
       }
       // 4. return true to allow sign in
      return true
    },

    async session({session}){
       // 1. Get user from database
       const user = await User.findOne({ email: session.user.email });
       // 2. Assign user id from database to session
       session.user.id = user._id.toString();
       // 3. return session
      return session
    }
  }
}

export default NextAuth(authOptions)