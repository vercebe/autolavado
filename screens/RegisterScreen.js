import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Button,
  TextInput,
  Headline,
  Provider as PaperProvider,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const clearFields = () => {
    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegister = () => {
    if (password.length < 6) {
      Alert.alert("Error", "La clave debe tener al menos 6 caracteres.");
      return;
    }

    if (password === confirmPassword) {
      Alert.alert("Éxito", "Usuario registrado exitosamente");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Las contraseñas no coinciden");
    }
  };

  return (
    <PaperProvider theme={darkTheme}>
      <View style={styles.container}>
        <Headline style={styles.title}>Registrar nuevo lavador</Headline>

        {/* Input de Nombre Lavador */}
        <TextInput
          mode="outlined"
          label="Nombre Lavador"
          value={name}
          onChangeText={setName}
          style={styles.input}
          theme={{
            colors: {
              placeholder: "#cccccc", // Placeholder gris claro o blanco
              primary: "#ffffff", // Borde más claro al activarse
              background: "#333333", // Fondo gris oscuro
              text: "#ffffff", // Texto blanco al escribir
            },
          }}
        />

        {/* Input de Nombre de Usuario */}
        <TextInput
          mode="outlined"
          label="Nombre de Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          theme={{
            colors: {
              placeholder: "#cccccc", // Placeholder gris claro o blanco
              primary: "#ffffff", // Borde más claro al activarse
              background: "#333333", // Fondo gris oscuro
              text: "#ffffff", // Texto blanco al escribir
            },
          }}
        />

        {/* Input de Clave con icono de mostrar/ocultar */}
        <TextInput
          mode="outlined"
          label="Clave"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye" : "eye-off"} // Icono invertido correctamente
              onPress={() => setShowPassword(!showPassword)}
              color="#ffffff" // Color blanco para el icono
            />
          }
          style={styles.input}
          theme={{
            colors: {
              placeholder: "#cccccc", // Placeholder gris claro o blanco
              primary: "#ffffff", // Borde más claro al activarse
              background: "#333333", // Fondo gris oscuro
              text: "#ffffff", // Texto blanco al escribir
            },
          }}
        />

        {/* Input de Confirmar Clave con icono de mostrar/ocultar */}
        <TextInput
          mode="outlined"
          label="Confirmar Clave"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye" : "eye-off"} // Icono invertido correctamente
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              color="#ffffff" // Color blanco para el icono
            />
          }
          style={styles.input}
          theme={{
            colors: {
              placeholder: "#cccccc", // Placeholder gris claro o blanco
              primary: "#ffffff", // Borde más claro al activarse
              background: "#333333", // Fondo gris oscuro
              text: "#ffffff", // Texto blanco al escribir
            },
          }}
        />

        {/* Botones de Borrar y Registrar */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={clearFields}
            style={[styles.button, styles.outlinedButton]} // Añadir borde
            labelStyle={styles.buttonText}
          >
            Borrar
          </Button>
          <Button
            mode="contained"
            onPress={handleRegister}
            style={[styles.button, styles.outlinedButton]} // Añadir borde
            labelStyle={styles.buttonText}
          >
            Registrar
          </Button>
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
    backgroundColor: "#000000", // Fondo negro
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff", // Texto blanco
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
  button: {
    width: "100%",
    marginVertical: 5,
    backgroundColor: "#555555", // Fondo gris para los botones
  },
  buttonText: {
    color: "#ffffff", // Texto blanco en los botones
  },
  outlinedButton: {
    borderColor: "#ffffff", // Borde blanco
    borderWidth: 1, // Grosor del borde
  },
});

export default RegisterScreen;
