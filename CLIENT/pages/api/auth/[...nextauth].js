import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function addSeconds(numOfSeconds, date = new Date()) {
  date.setSeconds(date.getSeconds() + numOfSeconds);

  return date;
}

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Requirements_uploader",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(
          `${process.env.API}/cms-users/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${process.env.LOGIN_AUTH}`
            },
          }
        );

        const user = await res.json();

        if (!res.ok) {
          throw new Error(`${user.message}`);
        }
        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            user,
          };
        }

        // Return null if user data could not be retrieved
        // return null;
      },
    }),
    // ...add more providers here
  ],
  // secret: process.env.CLIENT_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  session: {
    maxAge: 3600
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const {
          email,
          employee_no,
          first_name,
          last_name,
          mobile,
          department,
          gender,
          photo,
          status,
          active,
        } = user.user.profile;
        return {
          ...token,
          accessToken: user.user.accessToken,
          user: {
            user_id: user.user.user_id,
            email,
            employee_no,
            status,
            full_name: `${first_name} ${last_name}`,
            mobile,
            department,
            gender,
            photo,
            active,
          },
        };
      }

      return token;
    },



    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.user = token.user;

      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
