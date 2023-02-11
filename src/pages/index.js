import { useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import axios from "axios";

const current = new Date()
  .toString()
  .split(" ")
  .filter((e, i) => i <= 3)
  .join(" ")
  .trim();

export default function Home({ data }) {
  const { data: session } = useSession();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([...data]);
  const [limit, setLimit] = useState(false);

  const handleTask = async () => {
    if (tasks.length >= 5) {
      setLimit(true);
      setTimeout(() => {
        setLimit(false);
      }, 2000);
      setTask("");
      return;
    }
    if (task == "") {
      alert("Please enter a task");
      return;
    }
    const config = {
      headers: { authorization: `Bearer ${session.user.image}` },
    };
    let res = await axios.post(
      "https://taskstore.onrender.com/tasks",
      { task },
      config
    );
    // console.log("newTask", res);
    if (res.status == 201) {
      setTasks([...tasks, res.data.task]);
    }
    setTask("");
  };
  return (
    <div className="w-505 border-0.5 border-solid-blackish bg-red.800 rounded-lg m-auto text-left p-8 mt-20">
      <p className="font-sans text-xl">Hello</p>
      <p className="font-sans text-2xl font-semibold mt-3">
        {session.user.name}
      </p>
      <p className="font-sans mt-4">Good to see you here!</p>
      <div className="mt-7  h-48 min-h-full">
        <p className="font-sans font-bold text-sm">Tasks for {current}:</p>
        <ul className="mt-4 ml-6">
          {tasks.map((e, i) => (
            <li className="list-disc font-sans text-sm font-sm" key={i}>
              {e.task}
            </li>
          ))}
        </ul>
      </div>
      <p
        className={
          limit
            ? "text-red-500 leading-none visible"
            : "text-red-500 leading-none invisible"
        }
      >
        Daily Limit Exceeded!
      </p>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Eg: need to finish my assignment"
        className=" mt-4 w-full py-3 px-3 text-sm box-border rounded-md border-0.5 border-black"
      />
      <button
        className="mt-2 w-full bg-black text-white py-3 text-sm box-border rounded-md"
        onClick={handleTask}
      >
        Add New Task
      </button>
      <p
        onClick={signOut}
        className="font-sans text-xs text-center mt-2 font-semibold cursor-pointer"
      >
        Logout
      </p>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  const config = {
    headers: { authorization: `Bearer ${session.user.image}` },
  };
  const res = await axios.get("https://taskstore.onrender.com/tasks", config);

  return {
    props: { session, data: res.data },
  };
}
