import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

const imagenesEquipos = {
  "MIAMI HEAT": require('./assets/equipo/Miami heat.png'),
  "MILWAUKEE BUCKS": require('./assets/equipo/Bucks.png'),
  "DALLAS MAVERICKS": require('./assets/equipo/dallas.jpg'),
  "DENVER NUGGETS": require('./assets/equipo/nuggets.png'),
  "NY KNICKS": require('./assets/equipo/knicks.png'),
};

export default function MatchScreen({ route, navigation }) {
  const { local, visit } = route.params;

  const [puntosLocal, setPuntosLocal] = useState(0);
  const [puntosVisit, setPuntosVisit] = useState(0);
  const [stats, setStats] = useState({}); // 👈 stats por jugador

  const sumarLocal = (jugador, puntos) => {
    setPuntosLocal(prev => prev + puntos);
    setStats(prev => ({
      ...prev,
      [jugador]: (prev[jugador] || 0) + puntos
    }));
  };

  const sumarVisit = (jugador, puntos) => {
    setPuntosVisit(prev => prev + puntos);
    setStats(prev => ({
      ...prev,
      [jugador]: (prev[jugador] || 0) + puntos
    }));
  };

  const PlayerRow = ({ nombre, isLocal }) => (
    <View style={styles.playerRow}>
      <Text style={styles.playerName}>{nombre}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity 
          style={styles.pointBtn2}
          onPress={() => isLocal ? sumarLocal(nombre, 2) : sumarVisit(nombre, 2)}
        >
          <Text style={styles.btnText}>+2</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.pointBtn3}
          onPress={() => isLocal ? sumarLocal(nombre, 3) : sumarVisit(nombre, 3)}
        >
          <Text style={styles.btnText}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* MARCADOR CENTRAL */}
      <View style={styles.scoreboard}>
        <View style={styles.teamScore}>
          <Image source={imagenesEquipos[local.nombre]} style={styles.scoreLogo} />
          <Text style={[styles.scoreText, { color: local.color }]}>{puntosLocal}</Text>
        </View>

        <Text style={styles.scoreDivider}>:</Text>

        <View style={styles.teamScore}>
          <Image source={imagenesEquipos[visit.nombre]} style={styles.scoreLogo} />
          <Text style={[styles.scoreText, { color: visit.color }]}>{puntosVisit}</Text>
        </View>
      </View>

      {/* EQUIPOS */}
      <ScrollView contentContainerStyle={styles.teamsWrapper}>
        
        {/* LOCAL */}
        <View style={styles.teamColumn}>
          <Text style={styles.teamTitle}>HOME</Text>
          <Text style={[styles.teamName, { color: local.color }]}>{local.nombre}</Text>

          {local.jugadores.map((j, i) => (
            <PlayerRow key={i} nombre={j} isLocal={true} />
          ))}
        </View>

        {/* VISITANTE */}
        <View style={styles.teamColumn}>
          <Text style={styles.teamTitle}>VISITOR</Text>
          <Text style={[styles.teamName, { color: visit.color }]}>{visit.nombre}</Text>

          {visit.jugadores.map((j, i) => (
            <PlayerRow key={i} nombre={j} isLocal={false} />
          ))}
        </View>

      </ScrollView>

      {/* FIN DEL JUEGO */}
      <TouchableOpacity 
        style={styles.endButton}
        onPress={() => navigation.navigate('Winner', {
          local,
          visit,
          puntosLocal,
          puntosVisit,
          stats // 👈 PASAMOS STATS
        })}
      >
        <Text style={styles.endButtonText}>FIN DEL JUEGO</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#050505',
  },

  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderColor: '#222',
  },
  teamScore: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  scoreLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreDivider: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  teamsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  teamColumn: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
  },
  teamTitle: {
    color: '#AAA',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 4,
  },
  teamName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  playerRow: {
    backgroundColor: '#1A1A1A',
    borderRadius: 6,
    padding: 6,
    marginBottom: 6,
  },
  playerName: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointBtn2: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 4,
    alignItems: 'center',
  },
  pointBtn3: {
    flex: 1,
    backgroundColor: '#C62828',
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 4,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  endButton: {
    backgroundColor: '#C00',
    margin: 15,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
  },
  endButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});