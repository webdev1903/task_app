import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let status = await signIn("credentials", {
      redirect: false,
      userName: data.username,
      password: data.password,
      callbackUrl: "/",
    });
    // console.log(status);
    if (status.ok) router.push("/");
    else alert("Please try another user name or password");
  };
  return (
    // <div className="bg-red-800 w-full border-1">
    <div className="lg:absolute lg:w-505 left-111 top-28 sm:static sm:m-auto sm:w-10/12 border-0.5 border-solid-blackish bg-whitish rounded-lg p-2">
      <p className="font-sans mt-5 ml-5 text-xl">Welcome !</p>
      <p className="font-sans mt-5 ml-5 text-2xl font-semibold">Sign in to</p>
      <p className="font-sans ml-5">Lorem ispum is simply</p>
      <form onSubmit={handleSubmit} className="flex flex-col mx-5 mt-9">
        <label htmlFor="username">User name</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your user name"
          value={data.username}
          className="w-full px-2 py-3 border-0.5 box-border rounded-md"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
        />
        <div>
          <label htmlFor="password" className="mt-5">
            Password
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={data.password}
              className="w-full px-2 py-3 border-0.5 box-border rounded-md"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer mr-1"
                htmlFor="password"
                onClick={(e) => {
                  setPasswordVisibility(!passwordVisibility);
                }}
              >
                {passwordVisibility ? "hide" : "show"}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 text-xs">
          <div>
            <input type="checkbox" name="remember" />
            <label htmlFor="remember" className="ml-1">
              Remember me
            </label>
          </div>
          <p className="text-customgray">Forgot Password ?</p>
        </div>
        <input
          type="submit"
          value="Login"
          className="mt-10 w-full bg-black text-white py-3 text-sm box-border rounded-md"
        />
      </form>
      <p className="text-sm text-customgray font-sans text-center mt-5 mb-2">
        Don't have an account?
        <span
          className="font-bold text-black"
          onClick={() => router.push("/register")}
        >
          {" "}
          Register
        </span>
      </p>
    </div>
    // </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
