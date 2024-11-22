import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Vibration, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Camera, CameraView } from 'expo-camera'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Input from '@/components/Input'
import Select, { OptionType } from '@/components/Select'
import { useAppContext } from '@/hooks/useApp'
import { useMutation } from '@tanstack/react-query'
import { typesProcess } from '@/data/process'
import ThemedButton from '@/components/ThemedButton'
import { registerProcess } from '@/api/ProcessApi'
import queryClient from '@/lib/queryClient'
import { router, useLocalSearchParams } from 'expo-router'
import { ProcessType } from '@/types'

type Status = "PRINTING" | "ON_HOLD" | "PARAFFIN" | "CUT" | "PACKAGING" | "COMPLETED" | "DELIVERED";

function isValidStatus(value: string): value is Status {
    const validStatuses: Status[] = ["PRINTING", "ON_HOLD", "PARAFFIN", "CUT", "PACKAGING", "COMPLETED", "DELIVERED"];
    return validStatuses.includes(value as Status);
}
  

export default function createProcess() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState(true)
    const [rollMaterialId, setRollMaterialId] = useState<string | undefined>('')
    const [productId, setProductId] = useState<string | undefined>('')
    const [processType, setProcessType] = useState<string | undefined>('PRINTING')
    const [initialWeight, setInitialWeight] = useState<string | undefined>('')
    const [rollMaterialOptions, setRollMaterialOptions] = useState<OptionType[]>([])
    const [productOptions, setProductOptions] = useState<OptionType[]>([])

    const { rollMaterials, loading, products, process } = useAppContext()

    const { sale_id, process_id, type } = useLocalSearchParams<{
        sale_id?: string;
        process_id?: string;
        type?: string;
    }>();

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        const lot = data.slice(0, 4)
        const id = data.slice(4)
        const roll = rollMaterials?.filter(item => item.lot === lot && item.lot_id === +id)

        if(rollMaterialId) return

        if(roll?.length) {
            Vibration.vibrate()
            setRollMaterialId(roll[0].id.toString())
        } else {
            Alert.alert('Rollo Incorrecto', 'El tipo de rollo seleccionado no es el correcto', [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }
    };

    const { mutate } = useMutation({
        mutationFn: registerProcess, 
        onError: (error) => {
            Alert.alert('Hubo un error', error.message, [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: (data : string) => {
            Vibration.vibrate()

            Alert.alert('Proceso registrado con exito', data, [
                {text: 'Aceptar', style: 'default'}
            ])

            queryClient.invalidateQueries({queryKey: ['pendingProcess']})
            queryClient.invalidateQueries({queryKey: ['process']})

            router.back()
        }, 
    })

    const handleSubmit = () => {
        if (isValidStatus(processType!)) {
            mutate({
                roll_material_id: +rollMaterialId!, initial_weight: +initialWeight!, product_id: +productId!, type: processType, sale_id: +sale_id!
            })
        }
    }

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    }, []);


    useEffect(() => {
        if(rollMaterials) setRollMaterialOptions(rollMaterials.map(item => {  
            return {
                label: item.lot + "" + item.lot_id, value: item.id.toString()
            }
        }))
        if(products) setProductOptions(products.map(item => {  
            return {
                label: item.name, value: item.id.toString()
            }
        }))
    }, [rollMaterials])

    useEffect(() => {
        if(rollMaterialId && processType === 'PRINTING') {
            setInitialWeight(rollMaterials?.filter(item => item.id === +rollMaterialId)[0].weight.toString())
        } else if(!process_id) {
            setInitialWeight('')
        }
    }, [rollMaterialId, processType])

    if(loading) return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
        </View>
    )

    useEffect(() => {
        if(process && process_id) {
            const currentProcess : ProcessType = process.filter(item => item.id === +process_id)[0]

            if(currentProcess) {
                setInitialWeight(currentProcess.final_weight.toString())
                setRollMaterialId(currentProcess.roll_material_id.toString())
                setProductId(currentProcess.product_id.toString())
    
                const type = currentProcess.type
    
                switch(type) {
                    case 'PRINTING':
                        setProcessType('PARAFFIN')
                        break;
                    case 'PARAFFIN':
                        setProcessType('CUT')
                        break;
                    case 'CUT':
                        setProcessType('PACKAGING')
                        break;
                }
            }
        }
    }, [process_id, process])

    if (hasPermission === null) {
        return <ThemedText style={{marginTop: 50}}>Requesting for camera permission</ThemedText>
    }
    if (hasPermission === false) {
        return <ThemedText>No access to camera</ThemedText>
    }

    return (
        <ThemedView header>
            <ThemedText style={{marginTop: 0}} type='title'>Iniciar Proceso</ThemedText>
            <ThemedText style={{ marginBottom: 10 }}>Ingrese la información que se solicita para iniciar el proceso</ThemedText>

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
                <Select 
                    name='Rollo'
                    options={rollMaterialOptions}
                    value={rollMaterialId!}
                    selectValue={setRollMaterialId}
                />

                <Select 
                    name='Producto'
                    options={productOptions}
                    value={productId!}
                    selectValue={setProductId}
                />

                <Select 
                    name='Proceso'
                    options={typesProcess}
                    value={processType!}
                    selectValue={setProcessType}
                />

                <Input 
                    name='Peso inicial (kg)'
                    onChange={setInitialWeight}
                    value={initialWeight!}
                />

                <ThemedButton 
                    title='Registrar Proceso'
                    onPress={handleSubmit}
                />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 20, 
        gap: 6
    },
    camera: {
        flex: 1,
    },
    cameraContainer: {
        marginVertical: 10,
        height: 150
    }
})