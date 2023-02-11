import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      async authorize(credentials, req) {
        console.log(credentials, req);
        const res = await fetch("https://taskstore.onrender.com/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const x = await res.json();
        // console.log("fetch", x.token);
        const user = {
          email: x.user.email,
          name: x.user.userName,
          image: x.token,
        };

        return user;
      },
    }),
  ],
  secret: "prakash",
  session: {
    strategy: "jwt",
  },
});
