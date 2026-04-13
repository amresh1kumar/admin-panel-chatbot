import { createContext, useContext, useState } from "react";

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
   const [tenantId, setTenantId] = useState(
      localStorage.getItem("tenantId") || null
   );

   const saveTenant = (id) => {
      localStorage.setItem("tenantId", id);
      setTenantId(id);
   };

   return (
      <TenantContext.Provider value={{ tenantId, saveTenant }}>
         {children}
      </TenantContext.Provider>
   );
};

export const useTenant = () => useContext(TenantContext);