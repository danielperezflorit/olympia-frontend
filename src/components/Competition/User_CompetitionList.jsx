import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from "react-native";


export default function CompetitionList({
    competitions,
  }) 
  
  {
  return (
    <FlatList
      data={competitions}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.label}>Nombre: {item.getFullName()}</Text> 
          <Text style={styles.label}>Equipos: {item.getTeams()}</Text>
          <Text style={styles.label}>Deporte: {item.getSport()}</Text> 
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    width: "50%",
    paddingHorizontal: 20,
  },
  item: {
    borderWidth: 1,
    width: "25%",
    borderColor: "#0084C9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#ffffffff",
  },
  label: {
    fontSize: 16,
    color: "#0084C9",
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: "#ff0000ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ffffffff",
    fontSize: 16,
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#ffc44eff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#ffffffff",
    fontSize: 16,
    textAlign: "center",
  },
    modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});