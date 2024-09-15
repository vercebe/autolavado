import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [otroPaquete, setOtroPaquete] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(2);
  const [comenzado, setComenzado] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  return (
    <AppContext.Provider
      value={{
        placa,
        setPlaca,
        modelo,
        setModelo,
        otroPaquete,
        setOtroPaquete,
        selectedPackage,
        setSelectedPackage,
        comenzado,
        setComenzado,
        formDisabled,
        setFormDisabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
