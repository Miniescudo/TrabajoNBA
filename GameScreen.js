import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';

const imagenesEquipos = {
  "MIAMI HEAT": require('./assets/equipo/Miami heat.png'),
  "MILWAUKEE BUCKS": require('./assets/equipo/Bucks.png'),
  "DALLAS MAVERICKS": require('./assets/equipo/dallas.jpg'),
  "DENVER NUGGETS": require('./assets/equipo/nuggets.png'),
  "NY KNICKS": require('./assets/equipo/knicks.png'),
};

export default function GameScreen({ route, navigation }) {
  const { local = {}, visit = {} } = route.params || {};

  const TeamCard = ({ equipo, isLocal }) => (
    <View style={styles.card}>
      <Text style={styles.roleLabel}>{isLocal ? "HOME" : "VISITOR"}</Text>
      
      <View style={styles.logoContainer}>
        {imagenesEquipos[equipo.nombre] && (
          <Image source={imagenesEquipos[equipo.nombre]} style={styles.logo} />
        )}
      </View>

      <Text style={[styles.teamName, { color: String(equipo.color || '#FFF') }]}>
        {equipo.nombre}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.quintetoTitle}>STARTING FIVE</Text>
      <View style={styles.jugadoresContainer}>
        {equipo.jugadores && equipo.jugadores.map((jugador, index) => (
          <Text key={index} style={styles.jugadorText}>
            {index + 1}. {jugador}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.matchupWrapper}>
          <TeamCard equipo={local} isLocal={true} />

          <View style={styles.vsWrapper}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <TeamCard equipo={visit} isLocal={false} />
        </View>

        {/* BOTÓN PARA ECHAR ATRÁS */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>⬅ VOLVER A SELECCIÓN</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A0A0A' 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    alignItems: 'center'
  },
  matchupWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10
  },
  card: {
    flex: 1,
    backgroundColor: '#151515',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#333',
    padding: 10,
    alignItems: 'center',
    minHeight: 400,
    elevation: 10,
  },
  roleLabel: { color: '#AAA', fontSize: 10, fontWeight: 'bold', marginBottom: 10, letterSpacing: 2 },
  logoContainer: { height: 100, justifyContent: 'center', marginBottom: 10 },
  logo: { width: 90, height: 90, resizeMode: 'contain' },
  teamName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', height: 40 },
  divider: { width: '80%', height: 1, backgroundColor: '#333', marginVertical: 12 },
  quintetoTitle: { color: '#FFFF00', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  jugadoresContainer: { alignSelf: 'stretch' },
  jugadorText: { color: '#FFF', fontSize: 12, marginBottom: 5, paddingLeft: 5 },
  vsWrapper: { width: 50, alignItems: 'center' },
  vsText: { color: '#FFF', fontSize: 35, fontWeight: '900', fontStyle: 'italic' },
  
  // NUEVOS ESTILOS DEL BOTÓN
  backButton: {
    marginTop: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1
  }
});