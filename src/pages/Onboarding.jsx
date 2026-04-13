import { useState } from "react";
import { createTenant } from "../services/tenantService";

export default function Onboarding() {
   const [form, setForm] = useState({
      name: "",
      phoneNumberId: "",
      accessToken: ""
   });

   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = async () => {
      if (!form.name || !form.phoneNumberId || !form.accessToken) {
         return alert("All fields required");
      }

      try {
         setLoading(true);

         const res = await createTenant(form);

         // 🔥 save tenantId
         localStorage.setItem("tenantId", res.data.tenantId);

         alert("✅ Setup Complete!");

         window.location.href = "/"; // redirect to chat

      } catch (err) {
         console.error(err);
         alert("Error creating tenant");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div style={{
         height: "100vh",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         background: "#f5f7fb"
      }}>
         <div style={{
            width: "400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
         }}>
            <h2 style={{ marginBottom: "20px" }}>🚀 Setup Your Chatbot</h2>

            <input
               name="name"
               placeholder="Business Name"
               onChange={handleChange}
               style={inputStyle}
            />

            <input
               name="phoneNumberId"
               placeholder="Phone Number ID"
               onChange={handleChange}
               style={inputStyle}
            />

            <textarea
               name="accessToken"
               placeholder="Access Token"
               onChange={handleChange}
               style={{ ...inputStyle, height: "80px" }}
            />

            <button
               onClick={handleSubmit}
               disabled={loading}
               style={buttonStyle}
            >
               {loading ? "Setting up..." : "Start"}
            </button>
         </div>
      </div>
   );
}

const inputStyle = {
   width: "100%",
   padding: "10px",
   marginBottom: "12px",
   borderRadius: "6px",
   border: "1px solid #ccc"
};

const buttonStyle = {
   width: "100%",
   padding: "12px",
   background: "#1677ff",
   color: "#fff",
   border: "none",
   borderRadius: "6px",
   cursor: "pointer"
};