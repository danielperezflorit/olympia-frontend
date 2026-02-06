import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function Admin_TeamList({ teams, onDeleteTeam, onUpdateTeam })

  {
    const { t } = useTranslation();

    return (
      <FlatList
        data={teams}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.label}>{t("admin_teamlist.name")}: {item.getFullName()}</Text> 
            <Text style={styles.label}>{t("admin_teamlist.university")}: {item.getUniversity()}</Text> 
            <Text style={styles.label}>{t("admin_teamlist.competition")}: {item.getCompetition()}</Text>
            <Text style={styles.label}>{t("admin_teamlist.capitan")}: {item.getCaptain()}</Text>
            <Text style={styles.label}>{t("admin_teamlist.players")}: {item.getPlayers()}</Text>
            <Text style={styles.label}>{t("admin_teamlist.played_matches")}: {item.getMatches()}</Text> 
            <Text style={styles.label}>{t("admin_teamlist.wins")}: {item.getWins()}</Text>
            <Text style={styles.label}>{t("admin_teamlist.loses")}: {item.getLoses()}</Text>
            <Text style={styles.label}>{t("admin_teamlist.draws")}: {item.getDraws()}</Text>

            <TouchableOpacity style={styles.updateButton} onPress={() => onUpdateTeam(item)} >
              <Text style={styles.updateButtonText}>{t("admin_teamlist.edit_team")}r</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDeleteTeam(item._id)} >
            <Text style={styles.deleteButtonText}>{t("admin_teamlist.delete_team")}</Text>
            </TouchableOpacity>
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
    width: isMobile? "100%" : "25%",
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