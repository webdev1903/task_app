import axios from "axios";

export default async function SignUp(obj) {
  let res = await axios.post("https://taskstore.onrender.com/register", obj);
  return res;
}
