import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Provider as PaperProvider,
  Button,
  TextInput,
  Headline,
  Text,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Control para mostrar u ocultar la contraseña

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleExit = () => {
    alert("Cerrar aplicación no está disponible en el entorno de desarrollo.");
  };

  return (
    <PaperProvider theme={darkTheme}>
      <View style={styles.container}>
        {/* Título */}
        <Headline style={styles.title}>Control Autolavado</Headline>

        {/* Fecha y hora */}
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>

        {/* Inputs de usuario */}
        <TextInput
          mode="outlined"
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          theme={{
            colors: {
              text: "#ffffff", // Texto blanco al escribir
              placeholder: "#ff0000", // Placeholder rojo
              primary: "#ffffff", // Borde activo blanco
              background: "#333333", // Fondo gris oscuro
            },
          }}
        />

        {/* Input de clave con icono de mostrar/ocultar */}
        <TextInput
          mode="outlined"
          label="Clave"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Controlar la visibilidad de la contraseña
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"} // Cambiar entre iconos
              color="#ffffff" // Color blanco para el icono
              onPress={() => setShowPassword(!showPassword)} // Alternar visibilidad
            />
          }
          style={styles.input}
          theme={{
            colors: {
              text: "#ffffff", // Texto blanco al escribir
              placeholder: "#ff0000", // Placeholder rojo
              primary: "#ffffff", // Borde blanco al activarse
              background: "#333333", // Fondo gris oscuro
            },
          }}
        />

        {/* Botones de Autenticar, Borrar, Registrar y Salir */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("ControlLavado")}
            style={[styles.button, styles.outlinedButton]} // Aplicar borde
            labelStyle={styles.buttonText}
          >
            Autenticar
          </Button>
          <Button
            mode="contained"
            onPress={clearFields}
            style={[styles.button, styles.outlinedButton]} // Aplicar borde
            labelStyle={styles.buttonText}
          >
            Borrar
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Register")}
            style={[styles.button, styles.outlinedButton]} // Aplicar borde
            labelStyle={styles.buttonText}
          >
            Registrar
          </Button>
        </View>

        {/* Espacio adicional para el botón "Salir" */}
        <View style={styles.exitButtonContainer}>
          <Button
            mode="contained"
            onPress={handleExit}
            style={[styles.button, styles.exitButton, styles.outlinedButton]} // Aplicar borde
            labelStyle={styles.buttonText}
          >
            Salir
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Designed by:</Text>
          <Text style={styles.footerTextBold}>CMG TECHNOLOGIES</Text>
          <Text style={styles.footerText}>Version 1.0</Text>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Fondo negro
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // Texto blanco
  },
  date: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
    color: "#fff", // Texto blanco
  },
  time: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // Texto blanco
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  exitButtonContainer: {
    width: "80%",
    marginTop: 30, // Espacio adicional entre los botones y el botón "Salir"
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%", // Asegura que todos los botones ocupen todo el ancho disponible
    marginVertical: 5,
    backgroundColor: "#555", // Color gris para los botones
  },
  buttonText: {
    color: "#fff", // Texto de botones en blanco
  },
  outlinedButton: {
    borderColor: "#ffffff", // Borde blanco
    borderWidth: 1, // Grosor del borde
  },
  exitButton: {
    backgroundColor: "red", // Botón Salir en rojo
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#888",
    fontSize: 14,
  },
  footerTextBold: {
    color: "#888",
    fontSize: 16,
    fontWeight: "bold", // Texto en negrita
  },
});

export default HomeScreen;
