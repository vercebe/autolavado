import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomNavigation,
  Appbar,
  Provider as PaperProvider,
  TextInput,
  Button,
  MD3DarkTheme as darkTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AppContext } from "../AppContext";

// Obtener dimensiones de la pantalla
const { width: screenWidth } = Dimensions.get("window");

// Componente de autocompletado para el modelo
const AutocompleteModel = ({
  modelo,
  setModelo,
  modelosGuardados,
  disabled,
}) => {
  const [filteredModelos, setFilteredModelos] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleModeloChange = (text) => {
    setModelo(text);
    if (text.length > 0) {
      const filtered = modelosGuardados.filter((item) =>
        item.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredModelos(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleModeloSelect = (modeloSeleccionado) => {
    setModelo(modeloSeleccionado);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setShowSuggestions(false); // Cerrar sugerencias al perder el enfoque
  };

  return (
    <View style={styles.autocompleteContainer}>
      <TextInput
        mode="outlined"
        label="Modelo"
        value={modelo}
        onChangeText={handleModeloChange}
        onBlur={handleBlur} // Ocultar las sugerencias al perder el enfoque
        disabled={disabled}
        style={styles.input}
        theme={{
          colors: {
            placeholder: "#888888",
            primary: "#ffffff",
            background: "#333333",
          },
        }}
      />
      {showSuggestions && filteredModelos.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {filteredModelos.map((item) => (
            <TouchableWithoutFeedback
              key={item}
              onPress={() => handleModeloSelect(item)}
            >
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{item}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )}
    </View>
  );
};

const MasRoute = ({ showForm, setShowForm }) => {
  const {
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
  } = useContext(AppContext);

  const [formDisabled, setFormDisabled] = useState(comenzado);
  const [modelosGuardados, setModelosGuardados] = useState([]);

  useEffect(() => {
    const cargarModelos = async () => {
      try {
        const modelos = await AsyncStorage.getItem("modelos");
        if (modelos) {
          setModelosGuardados(JSON.parse(modelos));
        }
      } catch (error) {
        console.log("Error al cargar modelos desde AsyncStorage", error);
      }
    };
    cargarModelos();
  }, []);

  const guardarModeloEnAsyncStorage = async (nuevoModelo) => {
    try {
      const modelos = await AsyncStorage.getItem("modelos");
      let modelosActualizados = modelos ? JSON.parse(modelos) : [];

      if (!modelosActualizados.includes(nuevoModelo)) {
        modelosActualizados.push(nuevoModelo);
        await AsyncStorage.setItem(
          "modelos",
          JSON.stringify(modelosActualizados)
        );
        setModelosGuardados(modelosActualizados);
        console.log("Modelo guardado:", nuevoModelo);
      } else {
        console.log("El modelo ya existe en la lista:", nuevoModelo);
      }
    } catch (error) {
      console.log("Error al guardar el modelo en AsyncStorage", error);
    }
  };

  const handleComenzar = () => {
    if (!placa || !modelo || !selectedPackage) {
      Alert.alert(
        "Error",
        "Por favor, complete los campos de Placa, Modelo y seleccione un paquete."
      );
      return;
    }

    guardarModeloEnAsyncStorage(modelo);
    setFormDisabled(true);
    setComenzado(true);
  };

  const handleModificar = () => {
    setFormDisabled(false);
    setComenzado(false);
  };

  const handleTerminar = () => {
    setFormDisabled(false);
    setComenzado(false);
    setShowForm(false);
  };

  // Función para limpiar todos los campos
  const handleLimpiar = () => {
    setPlaca("");
    setModelo("");
    setOtroPaquete("");
  };

  // Nueva función para cerrar sugerencias
  const closeSuggestions = () => {
    Keyboard.dismiss(); // Cerrar el teclado
  };

  return (
    <TouchableWithoutFeedback onPress={closeSuggestions}>
      <View style={styles.scene}>
        {!showForm && (
          <Icon
            name="plus"
            size={100}
            color="white"
            onPress={() => setShowForm(true)}
          />
        )}
        {showForm && (
          <View style={styles.formContainer}>
            {/* Selector de paquete */}
            <Text style={styles.packageTitle}>Seleccionar Paquete</Text>
            <View style={styles.packageContainer}>
              <Button
                mode={selectedPackage === 1 ? "contained" : "outlined"}
                onPress={() => setSelectedPackage(1)}
                disabled={formDisabled}
                style={[styles.packageButton, styles.outlinedButton]}
                labelStyle={styles.packageButtonText}
              >
                1
              </Button>
              <Button
                mode={selectedPackage === 2 ? "contained" : "outlined"}
                onPress={() => setSelectedPackage(2)}
                disabled={formDisabled}
                style={[styles.packageButton, styles.outlinedButton]}
                labelStyle={styles.packageButtonText}
              >
                2
              </Button>
            </View>

            {/* Inputs en el medio */}
            <TextInput
              mode="outlined"
              label="Placa"
              value={placa}
              onChangeText={setPlaca}
              style={styles.input}
              disabled={formDisabled}
              theme={{
                colors: {
                  placeholder: "#888888",
                  primary: "#ffffff",
                  background: "#333333",
                },
              }}
            />

            <AutocompleteModel
              modelo={modelo}
              setModelo={setModelo}
              modelosGuardados={modelosGuardados}
              disabled={formDisabled}
            />

            <TextInput
              mode="outlined"
              label="Otro"
              value={otroPaquete}
              onChangeText={setOtroPaquete}
              style={styles.input}
              disabled={formDisabled}
              theme={{
                colors: {
                  placeholder: "#888888",
                  primary: "#ffffff",
                  background: "#333333",
                },
              }}
            />

            {/* Distribución de los botones en dos columnas */}
            <View style={styles.buttonRow}>
              {/* Columna izquierda: Comenzar y Terminar */}
              <View style={styles.leftButtonColumn}>
                <Button
                  mode="contained"
                  style={styles.formButton}
                  icon={() => (
                    <Icon
                      name="play-circle"
                      size={20}
                      color={comenzado ? "green" : "white"}
                    />
                  )}
                  labelStyle={styles.buttonText}
                  onPress={handleComenzar}
                  disabled={comenzado}
                >
                  {comenzado ? "Iniciado" : "Comenzar"}
                </Button>

                <Button
                  mode="contained"
                  style={styles.formButton}
                  icon={() => (
                    <Icon
                      name="check-circle"
                      size={20}
                      color={comenzado ? "red" : "white"}
                    />
                  )}
                  labelStyle={styles.buttonText}
                  onPress={handleTerminar}
                >
                  Terminar
                </Button>
              </View>

              {/* Columna derecha: Limpiar y Modificar */}
              <View style={styles.rightButtonColumn}>
                <Button
                  mode="contained"
                  style={styles.limpiarButton}
                  icon={() => <Icon name="broom" size={20} color="white" />}
                  labelStyle={styles.buttonText}
                  onPress={handleLimpiar}
                >
                  Limpiar
                </Button>

                <Button
                  mode="contained"
                  style={styles.modificarButton}
                  icon={() => (
                    <Icon
                      name="pencil"
                      size={20}
                      color={comenzado ? "yellow" : "white"}
                    />
                  )}
                  labelStyle={styles.buttonText}
                  onPress={handleModificar}
                >
                  Modificar
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const PendientesRoute = () => (
  <View style={styles.scene}>
    <Icon name="clipboard-list" size={100} color="white" />
    <Text style={styles.text}>Pendientes</Text>
  </View>
);

const MiDiaRoute = () => (
  <View style={styles.scene}>
    <Icon name="calendar-today" size={100} color="white" />
    <Text style={styles.text}>Mi Día</Text>
  </View>
);

const MiSemanaRoute = () => (
  <View style={styles.scene}>
    <Icon name="calendar-week" size={100} color="white" />
    <Text style={styles.text}>Mi Semana</Text>
  </View>
);

// Menú hamburguesa personalizado
const CustomMenu = ({ visible, closeMenu, handleCloseApp }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={closeMenu}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <View style={styles.menuOverlay}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={handleCloseApp} style={styles.menuItem}>
              <Text style={styles.menuText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ControlLavadoScreen = () => {
  const [index, setIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [routes] = useState([
    { key: "mas", title: "Agregar", focusedIcon: "plus" },
    { key: "pendientes", title: "Pendientes", focusedIcon: "clipboard-list" },
    { key: "midia", title: "Mi Día", focusedIcon: "calendar-today" },
    { key: "misemana", title: "Mi Semana", focusedIcon: "calendar-week" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    mas: () => <MasRoute showForm={showForm} setShowForm={setShowForm} />,
    pendientes: PendientesRoute,
    midia: MiDiaRoute,
    misemana: MiSemanaRoute,
  });

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleCloseApp = () => {
    alert("Cerrando aplicación...");
    closeMenu();
  };

  return (
    <PaperProvider theme={darkTheme}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Control Lavado"
          titleStyle={styles.appbarTitle}
        />
        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
      </Appbar.Header>

      <CustomMenu
        visible={menuVisible}
        closeMenu={closeMenu}
        handleCloseApp={handleCloseApp}
      />

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor="#494646"
        inactiveColor="#fff"
        shifting={false}
        barStyle={styles.bottomNav}
        renderLabel={({ route, focused }) => (
          <Text
            style={[styles.label, { color: focused ? "#FFFFFF" : "#888888" }]}
          >
            {route.title}
          </Text>
        )}
        renderIcon={({ route, focused }) => (
          <Icon
            name={route.focusedIcon}
            color={focused ? "#fff" : "#888888"}
            size={24}
          />
        )}
      />
    </PaperProvider>
  );
};

// Estilos
const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#000",
  },
  appbarTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  text: {
    fontSize: 24,
    color: "white",
    marginTop: 20,
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 80, // Bajamos los botones
  },
  leftButtonColumn: {
    flexDirection: "column",
    width: "40%",
  },
  rightButtonColumn: {
    flexDirection: "column",
    width: "40%",
  },
  formButton: {
    marginBottom: 10,
    backgroundColor: "#555555",
    borderColor: "#ffffff", // Borde blanco
    borderWidth: 1, // Grosor del borde
  },
  limpiarButton: {
    marginBottom: 10,
    backgroundColor: "#666666", // Color gris más claro para el botón Limpiar
    borderColor: "#ffffff", // Borde blanco
    borderWidth: 1,
  },
  modificarButton: {
    marginBottom: 10,
    backgroundColor: "#777777", // Color gris más claro para el botón Modificar
    borderColor: "#ffffff", // Borde blanco
    borderWidth: 1,
  },
  buttonText: {
    color: "#ffffff",
  },
  bottomNav: {
    backgroundColor: "#000",
  },
  label: {
    fontSize: 12,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: "#555555",
    borderBottomColor: "#FFF",
    borderBottomWidth: 1,
  },
  suggestionText: {
    color: "#fff",
  },
  autocompleteContainer: {
    width: 357,
    right: -35,
  },
  packageTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  packageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 90,
  },
  packageButton: {
    width: "40%",
  },
  packageButtonText: {
    color: "#ffffff",
  },
  suggestionsContainer: {
    backgroundColor: "#333333",
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 5,
  },
  menuOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "#fff",
    padding: 10,
    width: screenWidth * 0.2, // 20% del ancho de la pantalla
    alignItems: "center",
    marginTop: 80,
    marginRight: 10,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ControlLavadoScreen;
