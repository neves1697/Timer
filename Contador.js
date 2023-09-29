import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export default function Contador(props) {
    var done = false;

    useEffect(() => {
        const timer = setInterval(() => {

            props.setarSegundos(props.segundos - 1);

            if (props.segundos <= 0) {
                if (props.minutos > 0) {
                    props.setarMinutos(minutos - 1);
                    props.setarSegundos(59);
                }

                else {
                    if (!done) {
                        done = true;
                        props.setarEstado('Selecionar');
                        props.setarMinutos(0);
                        props.setarSegundos(1);
                        alert('Seu tempo de concentração acabou, recomendo 5 minutos de pausa');
                        playSom();
                        // teste
                    }
                }
            }
        }, 1000);

        return () => clearInterval(timer);

    });


    async function playSom() {
        const soundObject = new Audio.Sound();

        try {
            var alarme;
            props.alarmes.map(function (val) {
                if (val.selecionado) {
                    alarme = val.file;
                }
            });
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();
        } catch (error) {

        }
    }

    function resetar() {
        /*
            Arrumar o estado, quando clicar em "Reset", fazer com que pause os minutos/segundos e haja uma forma de selecionar novamente o tempo
            Foi possível fazer algo semelhante, apenas trocando o pros.setarEstado('Selecionar') porém tem que ser validado.
        */
        props.setarEstado('Leitura');
        props.setarMinutos(0);
        props.setarSegundos(1);
    }

    function formatarNumero(number) {
        var finalNumber = '';
        if (number < 10) {
            finalNumber = "0" + number;
        }
        else {
            finalNumber = number;
        }

        return finalNumber;
    }

    var segundos = formatarNumero(props.segundos);
    var minutos = formatarNumero(props.minutos);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <LinearGradient
                colors={['rgba(195, 107, 119, 1)', 'rgb(255, 209, 220)']}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }}
            />

            <View style={{ flexDirection: 'row' }} >
                <Text style={styles.textContador}>
                    {minutos}:
                </Text>

                <Text style={styles.textContador} >
                    {segundos}
                </Text>
            </View>

            <View style={styles.btnResetar} >
                <TouchableOpacity onPress={() => resetar()} >
                    <Text style={styles.centralizandoResetar} >Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        , alignItems: 'center'
        , justifyContent: 'center'
    },

    textContador: {
        color: '#FCE4EC',
        fontSize: 50
        // decidir entre #ffc0cb e #FCE4EC
    },

    btnResetar: {
        backgroundColor: '#ffc0cb'
        , marginTop: '20%'
        , width: 100
        , height: 100
        , borderRadius: 50
        , borderColor: '#ffadbb'
        , borderWidth: 9
        , flexDirection: 'row'
    },

    centralizandoResetar: {
        marginTop: '30%',
        marginLeft: '10%',
        fontWeight: '500',
        color: '#FA8072',
        fontSize: 25
    }
});

/*
<TouchableOpacity onPress={() => props.setarEstado('Selecionar')} >
    <Text style={styles.centralizandoResetar} >Reset</Text>
</TouchableOpacity>
*/