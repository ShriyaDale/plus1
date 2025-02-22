import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

const ViewScreen = () => {
  const [activeTab, setActiveTab] = useState("DateIdeas");

  const dateIdeas = [
    { id: 1, location: "Date location", date: "2/22/2025" },
    { id: 2, location: "Date location", date: "2/22/2025" },
    { id: 3, location: "Date location", date: "2/22/2025" },
    { id: 4, location: "Date location", date: "2/22/2025" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../constants/logo.png')} style={{ width: 146, height: 80 }} />
        <Text style={styles.subtitle}>View Menu</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "DateIdeas" ? styles.activeTab : null]}
          onPress={() => setActiveTab("DateIdeas")}
        >
          <Text style={[styles.tabText, activeTab === "DateIdeas" ? styles.activeTabText : null]}>
            Date Ideas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "Matches" ? styles.activeTab : null]}
          onPress={() => setActiveTab("Matches")}
        >
          <Text style={[styles.tabText, activeTab === "Matches" ? styles.activeTabText : null]}>
            Matches
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {activeTab === "DateIdeas" &&
          dateIdeas.map((date) => (
            <View key={date.id} style={styles.card}>
              <View style={styles.circle}></View>
              <View>
                <Text style={styles.cardTitle}>{date.location}</Text>
                <Text style={styles.cardSubtitle}>Selected: {date.date}</Text>
              </View>
            </View>
          ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Choose More</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.icon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>👁</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8BFD8",
  },
  header: {
    backgroundColor: "#E6E6FA",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  subtitle: {
    fontSize: 18,
    color: "#4B0082",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#DDA0DD",
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#BA55D3",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "#6A0DAD",
    borderRadius: 20,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A0DAD",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#4B0082",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#6A0DAD",
    paddingVertical: 15,
  },
  icon: {
    fontSize: 24,
    color: "white",
  },  
});