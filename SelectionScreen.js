import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
// Asegúrate de que la ruta sea correcta según tu estructura de carpetas
import Equipos from './Data/Equipos.json'; 

// Objeto de logos integrado (con comillas para permitir espacios)
export const Logos = {
  "MIAMI HEAT": require('./assets/equipo/Miami heat.png'),
  "MILWAUKEE BUCKS": require('./assets/equipo/Bucks.png'),
  "DALLAS MAVERICKS": require('./assets/equipo/dallas.jpg'),
  "DENVER NUGGETS": require('./assets/equipo/nuggets.png'),
  "NY KNICKS": require('./assets/equipo/knicks.png'),
};

export default function SelectionScreen({ navigation }) {
  const [localIdx, setLocalIdx] = useState(0);
  const [visitIdx, setVisitIdx] = useState(1);

  if (!Equipos || !Equipos.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>No hay equipos disponibles</Text>
      </View>
    );
  }

  const local = Equipos[localIdx];
  const visit = Equipos[visitIdx];

  const nextTeam = (current, setter, otherIdx) => {
    let next = (current + 1) % Equipos.length;
    if (next === otherIdx) {
      next = (next + 1) % Equipos.length;
    }
    setter(next);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>CHOOSE YOUR MATCHUP</Text>
      
      <View style={styles.selectionArea}>

        {/* TARJETA LOCAL (HOME) */}
        <View style={styles.card}>
          <Text style={styles.roleLabel}>HOME</Text>
          <View style={styles.teamDisplay}>
            {/* Buscamos en Logos usando el nombre exacto del equipo */}
            <Image 
              source={Logos[local.nombre]} 
              style={styles.logoStyle} 
            />
            <Text style={[styles.teamName, { color: String(local.color || '#FFF') }]}>
              {local.nombre}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.changeBtn} 
            onPress={() => nextTeam(localIdx, setLocalIdx, visitIdx)}
          >
            <Text style={styles.changeBtnText}>CHANGE TEAM</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.vsText}>VS</Text>

        {/* TARJETA VISITANTE (VISITOR) */}
        <View style={styles.card}>
          <Text style={styles.roleLabel}>VISITOR</Text>
          <View style={styles.teamDisplay}>
            <Image 
              source={Logos[visit.nombre]} 
              style={styles.logoStyle} 
            />
            <Text style={[styles.teamName, { color: String(visit.color || '#FFF') }]}>
              {visit.nombre}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.changeBtn} 
            onPress={() => nextTeam(visitIdx, setVisitIdx, localIdx)}
          >
            <Text style={styles.changeBtnText}>CHANGE TEAM</Text>
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity 
        style={styles.btnContinue}
        onPress={() => navigation.navigate('Game', { local, visit })}
      >
        <Text style={styles.btnText}>CONFIRM MATCHUP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0000AA', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  headerText: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 40, 
    letterSpacing: 1 
  },
  selectionArea: { 
    flexDirection: 'row', 
    width: '95%', 
    height: '45%', 
    alignItems: 'center' 
  },
  card: { 
    flex: 1, 
    backgroundColor: '#000', 
    borderWidth: 3, 
    borderColor: '#FFF', 
    padding: 15, 
    margin: 5, 
    borderRadius: 10, 
    height: 250, 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  roleLabel: { 
    color: '#FFFF00', 
    fontSize: 14, 
    fontWeight: 'bold', 
    letterSpacing: 2 
  },
  teamDisplay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoStyle: { 
    width: 90, 
    height: 90, 
    resizeMode: 'contain', 
    marginBottom: 10 
  },
  teamName: { 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  vsText: { 
    color: '#FFF', 
    fontSize: 32, 
    fontWeight: 'bold', 
    fontStyle: 'italic', 
    marginHorizontal: 10 
  },
  changeBtn: { 
    backgroundColor: '#333', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#FFF' 
  },
  changeBtnText: { 
    color: '#FFF', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  btnContinue: { 
    marginTop: 50, 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderWidth: 3, 
    borderColor: '#FFF', 
    backgroundColor: '#C00' 
  },
  btnText: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  }
});