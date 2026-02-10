import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

const imagenesEquipos = {
  "MIAMI HEAT": require('./assets/equipo/Miami heat.png'),
  "MILWAUKEE BUCKS": require('./assets/equipo/Bucks.png'),
  "DALLAS MAVERICKS": require('./assets/equipo/dallas.jpg'),
  "DENVER NUGGETS": require('./assets/equipo/nuggets.png'),
  "NY KNICKS": require('./assets/equipo/knicks.png'),
};

export default function WinnerScreen({ route, navigation }) {
  const { local, visit, puntosLocal, puntosVisit, stats } = route.params;

  const empate = puntosLocal === puntosVisit;
  const ganador = puntosLocal > puntosVisit ? local : visit;

  // TOP 5 ANOTADORES
  const ranking = Object.entries(stats || {})
    .map(([nombre, puntos]) => ({ nombre, puntos }))
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 5);

  const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* RESULTADO */}
        {!empate ? (
          <>
            <Text style={styles.title}>🏆 WINNER 🏆</Text>

            <Image 
              source={imagenesEquipos[ganador.nombre]} 
              style={styles.logo}
            />

            <Text style={[styles.teamName, { color: String(ganador.color || '#FFF') }]}>
              {ganador.nombre}
            </Text>

            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>
                {puntosLocal} - {puntosVisit}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>🤝 DRAW 🤝</Text>

            <View style={styles.drawContainer}>
              <Image source={imagenesEquipos[local.nombre]} style={styles.logoDraw} />
              <Image source={imagenesEquipos[visit.nombre]} style={styles.logoDraw} />
            </View>

            <Text style={styles.drawText}>EMPATE</Text>

            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>
                {puntosLocal} - {puntosVisit}
              </Text>
            </View>
          </>
        )}

        {/* TOP 5 */}
        <View style={styles.topBox}>
          <Text style={styles.topTitle}>🔥 TOP 5 ANOTADORES 🔥</Text>

          {ranking.length === 0 ? (
            <Text style={styles.noData}>No se registraron puntos</Text>
          ) : (
            ranking.map((p, i) => (
              <View key={i} style={styles.topRow}>
                <Text style={styles.medal}>{medals[i]}</Text>
                <Text style={styles.player}>{p.nombre}</Text>
                <Text style={styles.points}>{p.puntos} pts</Text>
              </View>
            ))
          )}
        </View>

        {/* BOTÓN */}
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => navigation.navigate('Selection')}
        >
          <Text style={styles.btnText}>NUEVO PARTIDO</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  scroll:{
    alignItems: 'center',
    paddingVertical: 40
  },
  title: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    letterSpacing: 2
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 15
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  scoreBox: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 10
  },
  scoreText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold'
  },

  /* DRAW */
  drawContainer: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 20
  },
  logoDraw: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  drawText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },

  /* TOP 5 */
  topBox:{
    marginTop: 40,
    width:'85%',
    backgroundColor:'#111',
    borderRadius:12,
    padding:15,
    borderWidth:2,
    borderColor:'#FFD700'
  },
  topTitle:{
    color:'#FFD700',
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:15,
    letterSpacing:1
  },
  topRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'#1A1A1A',
    paddingVertical:8,
    paddingHorizontal:10,
    borderRadius:8,
    marginBottom:6
  },
  medal:{
    fontSize:18,
    width:30
  },
  player:{
    flex:1,
    color:'#FFF',
    fontSize:13,
    fontWeight:'bold'
  },
  points:{
    color:'#00E676',
    fontSize:13,
    fontWeight:'bold'
  },
  noData:{
    color:'#AAA',
    textAlign:'center',
    fontStyle:'italic'
  },

  /* BUTTON */
  btn: {
    marginTop: 40,
    backgroundColor: '#C00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1
  }
});
