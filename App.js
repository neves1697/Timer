import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador';

export default function App() {
  console.disableYellowBox = true;
  const [estado, setarEstado] = useState('Selecionar');
  const [segundos, setarSegundos] = useState(1);
  const [minutos, setarMinutos] = useState(0);
  const [alarmeSom, setaralarmeSound] = useState([
    {
      id: 1,
      selecionado: true,
      som: 'alarme 1',
      file: require('./assets/alarme1.mp3')
    },

    {
      id: 2,
      selecionado: false,
      som: 'alarme 2',
      file: require('./assets/alarme2.mp3')
    }
  ]);

  var numeros = [];
  for (var i = 0; i <= 60; i++) {
    numeros.push(i);
  }

  function setarAlarme(id) {
    let alarmesTemp = alarmeSom.map(function (val) {
      if (id != val.id)
        val.selecionado = false;

      else
        val.selecionado = true;
      return val;
    });

    setaralarmeSound(alarmesTemp);

  }

  if (estado == 'Selecionar') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LinearGradient
          colors={['rgba(195, 107, 119, 1)', 'rgb(255, 209, 220)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }} />

        <View style={{ alignItems: 'center', marginBottom: '60%' }}>
          <Text style={{ fontSize: 30 }}>Pomodoro</Text>
          <Text style={{ fontSize: 20 }} >Selecione o seu tempo</Text>

          <View style={{ flexDirection: 'row' }}>

            <Text style={{ paddingTop: 15 }} >Minutos</Text>
            <Picker style={{ height: 50, width: 100 }}
              selectedValue={minutos} onValueChange={(itemValue, itemIndex) => setarMinutos(itemValue)}>
              {
                numeros.map(function (val) {
                  return (
                    <Picker.Item label={val.toString()} value={val.toString()} />
                  );
                })
              }

            </Picker>

            <Text style={{ paddingTop: 15, marginLeft: 10 }} >Segundos</Text>

            <Picker style={{ height: 50, width: 100 }} selectedValue={segundos}
              onValueChange={(itemValue, itemIndex) => setarSegundos(itemValue)}>
              
              <Picker.Item label='1' value="1" />

              {
                numeros.map(function (val) {
                  return (
                    <Picker.Item label={val.toString()} value={val.toString()} />
                  );
                })
              }

            </Picker>

          </View>

          <View style={{ flexDirection: 'row' }} >

            {
              alarmeSom.map(function (val) {
                if (val.selecionado) {
                  return (
                    <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.btnEscolherSelecionado} >
                      <Text style={{ color: 'black', fontWeight: '500' }}> {val.som} </Text>
                    </TouchableOpacity>
                  );
                }

                else {
                  return (
                    <TouchableOpacity onPress={() => setarAlarme(val.id)} style={styles.btnEscolher}>
                      <Text style={{ color: 'black', fontWeight: '500' }}> {val.som} </Text>
                    </TouchableOpacity>
                  );
                }
              })
            }

          </View>

          <View style={styles.btnIniciar} >
            <TouchableOpacity onPress={() => setarEstado('Iniciar')} >
              <Text style={styles.centralizandoIniciar} >Iniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }

  else if (estado == 'Iniciar') {
    return (
      <Contador alarmes={alarmeSom} setarMinutos={setarMinutos} setarSegundos={setarSegundos}
        setarEstado={setarEstado} minutos={minutos} segundos={segundos}>
      </Contador>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ffc0cb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnEscolher: {
    padding: 8
    , backgroundColor: 'rgba(185, 90, 102, 1)'
    , borderRadius: 10
    , marginRight: 10
  },

  btnEscolherSelecionado: {
    padding: 8
    , backgroundColor: 'rgba(185, 90, 102, 0.6)'
    , borderRadius: 10
    , marginRight: 10
    , borderColor: '#ffc0cb'
    , borderWidth: 1
  },

  btnIniciar: {
    backgroundColor: '#ffc0cb'
    , marginTop: '20%'
    , width: 100
    , height: 100
    , borderRadius: 50
    , borderColor: '#ffadbb'
    , borderWidth: 9
    , flexDirection: 'row'

  },

  centralizandoIniciar: {
    marginTop: '30%',
    marginLeft: '7%',
    fontWeight: '500',
    color: '#FA8072',
    fontSize: 25
  }
});


/**
<Contador setarEstado={setarEstado} minutos={minutos} segundos={segundos} >

      </Contador>

 */