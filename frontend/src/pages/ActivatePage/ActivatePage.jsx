// ActivatePage.jsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ActivatePage() {
 const { link } = useParams();
 const navigate = useNavigate();

 useEffect(() => {
  const activateUser = async () => {
   try {
    const res = await fetch(`http://localhost:5000/api/users/activate/${link}`);
    if (res.ok) {
     navigate("/dashboard");
    } else {
     alert("Activation failed");
    }
   } catch (err) {
    console.error(err);
   }
  };
  activateUser();
 }, [link, navigate]);

 return <h2>Activating...</h2>;
}
