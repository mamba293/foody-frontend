import { useState } from "react";
import { registerUserAction } from "./api";

export default function AuthPage() {
 const [email, setEmail] = useState("");
 const [phone, setPhone] = useState("");
 const [password, setPassword] = useState("");

 const handleRegisterClick = async () => {
  try {
   const data = await registerUserAction(email, phone, password);
   alert("Check your email for activation link!");
   console.log(data);
  } catch (err) {
   alert(err.message);
  }
 };

 return (
  <div>
   <input
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
   />
   <input
    placeholder="Phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
   />
   <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
   />
   <button onClick={handleRegisterClick}>Register</button>
  </div>
 );
}
