import { useState } from "react";
import { useRouter } from "next/router";
import SignUp from "./api/auth/signup";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    confpassword: "",
  });
  const [confpasswordVisibility, setConfpasswordVisibility] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name == "confpassword") {
      if (!data.password.includes(e.target.value)) {
        setError(true);
      } else {
        setError(false);
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      email: data.email,
      password: data.password,
      userName: data.username,
    };
    try {
      let res = await SignUp(obj);
      let status = await signIn("credentials", {
        redirect: false,
        userName: data.username,
        password: data.password,
        callbackUrl: "/",
      });
      if (status.ok) router.push("/");
    } catch (error) {
      // console.log(error);
      alert("Email already exists");
    }
  };

  return (
    // <div className="bg-red-800 w-full border-1">
    <div className="lg:absolute sm:static sm:m-auto lg:w-505 sm:w-10/12 left-40 top-16 border-0.5 border-solid-blackish bg-whitish rounded-lg">
      <p className="font-sans mt-5 ml-5 text-xl">Welcome !</p>
      <p className="font-sans mt-5 ml-5 text-2xl font-semibold">Sign up to</p>
      <p className="font-sans ml-5">Lorem ispum is simply</p>
      <form onSubmit={handleSubmit} className="flex flex-col mx-5 mt-9">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={data.email}
          className="w-full px-2 py-3 border-0.5 box-border rounded-md"
          onChange={handleChange}
          required
        />
        <label htmlFor="username">User name</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your user name"
          value={data.username}
          className="w-full px-2 py-3 border-0.5 box-border rounded-md"
          onChange={handleChange}
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
              onChange={handleChange}
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
        <div>
          <label htmlFor="confpassword" className="mt-5">
            Confirm Password
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type={confpasswordVisibility ? "text" : "password"}
              name="confpassword"
              placeholder="Confirm your password"
              value={data.confpassword}
              className="w-full px-2 py-3 border-0.5 box-border rounded-md"
              onChange={handleChange}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer mr-1"
                onClick={(e) => {
                  setConfpasswordVisibility(!confpasswordVisibility);
                }}
              >
                {confpasswordVisibility ? "hide" : "show"}
              </label>
            </div>
          </div>
        </div>
        {error && (
          <p className="text-red-600 text-sm text-center">
            Password and Confirm Password doesn't match
          </p>
        )}
        <input
          type="submit"
          value="Register"
          className="mt-10 w-full bg-black text-white py-3 text-sm box-border rounded-md"
        />
      </form>
      <p className="text-sm text-customgray font-sans text-center mt-5 mb-2">
        Already have an account?
        <span
          className="font-bold text-black cursor-pointer"
          onClick={() => router.push("/login")}
        >
          {" "}
          Login
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
