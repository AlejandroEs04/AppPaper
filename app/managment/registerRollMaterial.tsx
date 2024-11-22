import { View, StyleSheet, Vibration, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Camera, CameraView } from 'expo-camera';
import { useMutation } from '@tanstack/react-query'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Input from '@/components/Input';
import ThemedButton from '@/components/ThemedButton';
import { createRollMaterial } from '@/api/MaterialApi';
import { useAppContext } from '@/hooks/useApp';
import { Paper } from '@/types';
import Select, { OptionType } from '@/components/Select';

export default function registerRollMaterial() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(true)
    const [papersOptions, setPapersOptions] = useState<OptionType[]>([])

    const [lot, setLot] = useState<string | undefined>('')
    const [lotId, setLotId] = useState<string | undefined>('')
    const [weight, setWeight] = useState<string | undefined>('')
    const [paperId, setPaperId] = useState<string | undefined>('')

    const { papers, loading } = useAppContext()

    const { mutate } = useMutation({
        mutationFn: createRollMaterial, 
        onError: () => {
            Alert.alert('Hubo un error', 'Hubo un error al tratar de registrar el rollo', [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: (data : string) => {
            Vibration.vibrate()

            Alert.alert('Rollo registrado con exito', data, [
                {text: 'Aceptar', style: 'default'}
            ])
        }
    })

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setLot(data.slice(0, 4)) 
        setLotId(data.slice(4)) 
        
        if(!lot && !lotId) Vibration.vibrate()
    };

    const handleForm = () => mutate({
        lot: lot!, lot_id: +lotId!, paper_id: +paperId!, weight: +weight!, material_id: 2
    })

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        if(papers) setPapersOptions(papers.map(item => {  
            return {
                label: item.name, value: item.id.toString()
            }
        }))
    }, [papers])

    if(loading) return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
        </View>
    )


    if (hasPermission === null) {
        return <ThemedText style={{marginTop: 50}}>Requesting for camera permission</ThemedText>
    }
    if (hasPermission === false) {
        return <ThemedText>No access to camera</ThemedText>
    }

    return (
        <ThemedView header>
            <ThemedText style={{marginTop: 0}} type='title'>Registrar Rollo</ThemedText>
            <ThemedText style={{ marginBottom: 10 }}>Ingrese la información que se solicita para registrar un rollo</ThemedText>

            {showCamera && (
                <View style={styles.cameraContainer}>
                    <CameraView 
                        style={styles.camera}
                        facing='back'
                        barcodeScannerSettings={{
                            barcodeTypes: ['codabar', 'code128']
                        }}
                        onBarcodeScanned={(value) => handleBarCodeScanned(value)}
                    />
                </View>
            )}

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: showCamera ? -40 : 0, marginRight: showCamera ? 10 : 0 }}>
                <TouchableOpacity 
                    style={{ 
                        width:'auto', 
                        height:'auto', 
                        backgroundColor: Colors.dark.container,
                        padding: 5, 
                        borderRadius: 10, 
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: 10, 
                        alignItems: 'center'
                    }}
                    onPress={() => setShowCamera(!showCamera)}
                >
                    <Ionicons size={25} name='camera-outline' color={'#fff'} />

                    {!showCamera && (
                        <Text style={{ color:'#fff', fontSize: 18 }}>Activar Camara</Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Input 
                    name='Lote'
                    value={lot!}
                    onChange={setLot}
                />
                <Input 
                    name='Identificador'
                    value={lotId!}
                    onChange={setLotId}
                />
                <Input 
                    name='Peso (kg)'
                    value={weight!}
                    onChange={setWeight}
                />
                <Select 
                    name='Tipo de papel'
                    value={paperId!}
                    selectValue={setPaperId}
                    options={papersOptions}
                />

                <ThemedButton 
                    title='Registrar Rollo'
                    styles={{marginTop: 10}}
                    onPress={handleForm}
                />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    input: {
        height: 'auto',
        borderRadius: 0,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 0,
        marginBottom: 12,
        paddingHorizontal: 14,
    },
    camera: {
        flex: 1,
    },
    cameraContainer: {
        marginVertical: 10,
        height: 150
    }
})