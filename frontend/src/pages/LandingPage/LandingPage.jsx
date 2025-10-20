import { useNavigate } from "react-router";

export default function LandingPage() {
 const nav = useNavigate();

 return (
  <>
   <div>
    <h1>Welcome to App</h1>
    <button onClick={() => nav("/auth")}>Продолжить</button>
   </div>
  </>
 );
}
