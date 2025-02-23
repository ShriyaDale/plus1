// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

// const ViewScreen = () => {
//   const [activeTab, setActiveTab] = useState("DateIdeas");
//   const [active, setActive] = useState("matches");

//   const dateIdeas = [
//     { id: 1, location: "coffee date", date: "2/23/2025" },
//     { id: 2, location: "movie night", date: "2/23/2025" },
//     { id: 3, location: "hiking", date: "2/23/2025" },
//   ];

//   const matches = [
//     { id: 1, name: "john", location: "coffee date" },
//     { id: 2, name: "rohan", location: "hiking" },
//     { id: 3, name: "marco", location: "coffee date" },
//   ]

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Image source={require('../constants/logo.png')} style={{ width: 100, height: 100 }} />
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === "DateIdeas" ? styles.activeTab : null]}
//           onPress={() => setActiveTab("DateIdeas")}
//         >
//           <Text style={[styles.tabText, activeTab === "DateIdeas" ? styles.activeTabText : null]}>
//             date ideas
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === "matches" ? styles.activeTab : null]}
//           onPress={() => setActiveTab("matches")}
//         >
//           <Text style={[styles.tabText, activeTab === "matches" ? styles.activeTabText : null]}>
//             matches
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       <ScrollView style={styles.contentContainer}>
//         {activeTab === "DateIdeas" &&
//           dateIdeas.map((date) => (
//             <View key={date.id} style={styles.card}>
//               <View style={styles.circle}></View>
//               <View>
//                 <Text style={styles.cardTitle}>{date.location}</Text>
//                 <Text style={styles.cardSubtitle}>selected: {date.date}</Text>
//               </View>
//             </View>
//           ))}
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>choose more</Text>
//         </TouchableOpacity>
//         {activeTab === "matches" &&
//           matches.map((match) => (
//             <View key={match.id} style={styles.card}>
//               <View style={styles.circle}></View>
//               <View>
//                 <Text style={styles.cardTitle}>{match.name}</Text>
//                 <Text style={styles.cardSubtitle}>preferred date: {match.location}</Text>
//               </View>
//             </View>
//           ))}
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>choose more</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Footer Navigation */}
//       <View style={styles.footer}>
//         <TouchableOpacity>
//           <Image source={require('../constants/house.png')} style={{ width: 25, height: 25 }} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={require('../constants/eye.png')} style={{ width: 25, height: 25 }} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={require('../constants/profile.png')} style={{ width: 25, height: 25 }} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ViewScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffb965",
//   },
//   header: {
//     backgroundColor: "#ffead1",
//     padding: 20,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#6A0DAD",
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#4B0082",
//   },
//   tabContainer: {
//     flexDirection: "row",
//     backgroundColor: "#ffead1",
//     height: 50,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15, 
//     overflow: "hidden",
//     outlineColor: '#ffa130',
//     color: '#e6635a'
//   },
//   tab: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     outlineColor: '#ffa130',
//     color: '#e6635a',
//     borderTopWidth: 2, // ✅ Adds black outline
//     borderRightWidth: 2, // ✅ Adds black outline
//     borderLeftWidth: 2, // ✅ Adds black outline
//     borderColor: "#ffb965"
//   },
//   activeTab: {
//     backgroundColor: "#ffb965",
//     height: "100%",
//     justifyContent: "center",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15, 
//     color: '#e6635a',
//     borderTopWidth: 0, // ✅ Adds black outline
//     borderRightWidth: 0, // ✅ Adds black outline
//     borderLeftWidth: 0, // ✅ Adds black outline  
//   },
//   tabText: {
//     fontSize: 16,
//     color: "#e6635a",
//   },
//   activeTabText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     padding: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   circle: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#e6635a",
//     borderRadius: 20,
//     marginRight: 15,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#e6635a",
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: "#e6635a",
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "#e6635a",
//     paddingVertical: 25,
//   },
//   icon: {
//     fontSize: 24,
//     color: "white",
//   },  
//   button: {
//     position: "absolute", // ✅ Fixes position on screen
//     top: 400, // ✅ Keeps it 30px above the screen bottom
//     left: "10%", // ✅ Centers it horizontally
//     width: "80%", // ✅ Makes button responsive
//     backgroundColor: "#ffead1",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#e6635a',
//     textAlign: "center", // ✅ Ensures text is centered
//     fontWeight: "bold",
//   },
// });

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

const ViewScreen = () => {
  const [activeTab, setActiveTab] = useState("DateIdeas");
  const [active, setActive] = useState("matches");

  const dateIdeas = [
    { id: 1, location: "coffee date", date: "2/23/2025" },
    { id: 2, location: "movie night", date: "2/23/2025" },
    { id: 3, location: "hiking", date: "2/23/2025" },
  ];

  const matches = [
    { id: 1, name: "john", location: "coffee date" },
    { id: 2, name: "rohan", location: "hiking" },
    { id: 3, name: "marco", location: "coffee date" },
  ];

  // *** NEW: Mapping for match images (replace circles with these images)
  const matchImages = {
    john: require('../assets/images/john.png'),
    rohan: require('../assets/images/rohan.png'),
    marco: require('../assets/images/marco.png'),
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../constants/logo.png')} style={{ width: 50, height: 50 }} />      
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "DateIdeas" ? styles.activeTab : null]}
          onPress={() => setActiveTab("DateIdeas")}
        >
          <Text style={[styles.tabText, activeTab === "DateIdeas" ? styles.activeTabText : null]}>
            date ideas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "matches" ? styles.activeTab : null]}
          onPress={() => setActiveTab("matches")}
        >
          <Text style={[styles.tabText, activeTab === "matches" ? styles.activeTabText : null]}>
            matches
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {activeTab === "DateIdeas" &&
          dateIdeas.map((date) => (
            <View key={date.id} style={styles.card}>
              {/* For date ideas, keep the original circle */}
              <View style={styles.circle}></View>
              <View>
                <Text style={styles.cardTitle}>{date.location}</Text>
                <Text style={styles.cardSubtitle}>selected: {date.date}</Text>
              </View>
            </View>
          ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>choose more</Text>
        </TouchableOpacity>
        {activeTab === "matches" &&
          matches.map((match) => (
            <View key={match.id} style={styles.card}>
              {/* *** CHANGED: Replace the circle with an Image cropped to a circle */}
              <Image 
                source={matchImages[match.name]} 
                style={styles.circle} 
              />
              <View>
                <Text style={styles.cardTitle}>{match.name}</Text>
                <Text style={styles.cardSubtitle}>preferred date: {match.location}</Text>
              </View>
            </View>
          ))}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>choose more</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image source={require('../constants/house.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../constants/eye.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../constants/profile.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffb965",
  },
  header: {
    backgroundColor: "#ffead1",
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
    backgroundColor: "#ffead1",
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15, 
    overflow: "hidden",
    outlineColor: '#ffa130',
    color: '#e6635a'
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    outlineColor: '#ffa130',
    color: '#e6635a',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#ffb965"
  },
  activeTab: {
    backgroundColor: "#ffb965",
    height: "100%",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15, 
    color: '#e6635a',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  tabText: {
    fontSize: 16,
    color: "#e6635a",
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
  // *** UPDATED: Modify the circle style to crop images as circles
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20, // ensures the image is circular
    marginRight: 15,
    overflow: "hidden", // crop any overflow
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e6635a",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#e6635a",
  },
  button: {
    position: "absolute",
    top: 400,
    left: "10%",
    width: "80%",
    backgroundColor: "#ffead1",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#e6635a",
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e6635a",
    paddingVertical: 25,
  },
  icon: {
    fontSize: 24,
    color: "white",
  },
});
