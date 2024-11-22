import { View, StyleSheet, Vibration, Alert, ActivityIndicator } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { finishProcess } from '@/api/ProcessApi'
import { useAppContext } from '@/hooks/useApp'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Input from '@/components/Input'
import ThemedButton from '@/components/ThemedButton'
import queryClient from '@/lib/queryClient'

export default function finishProcessPage() {
    const { process, loading } = useAppContext()
    const [finalWeight, setFinalWeight] = useState<string | undefined>('')
    const [initialWeight, setInitialWeight] = useState<string | undefined>('')

    const { process_id } = useLocalSearchParams<{
        process_id?: string;
    }>();

    const { mutate } = useMutation({
        mutationFn: finishProcess, 
        onError: (error) => {
            Alert.alert('Hubo un error', error.message, [
                {text: 'Aceptar', style: 'cancel'}
            ])
        }, 
        onSuccess: (data) => {
            Vibration.vibrate()

            Alert.alert('Proceso registrado con exito', data, [
                {text: 'Aceptar', style: 'default'}
            ])

            queryClient.invalidateQueries({queryKey: ['pendingProcess']})
            queryClient.invalidateQueries({queryKey: ['process']})

            router.back()
        }
    })

    const handleSubmit = () => {
        mutate({
            data: {
                ...process?.filter(item => +item.id === +process_id!)[0]!, 
                end_time: new Date().toISOString(), 
                final_weight: +finalWeight!
            }, 
            processId: +process_id!
        })    
    }

    if(loading) return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
        </View>
    )

    useEffect(() => {
        setInitialWeight(process?.filter(item => +item.id === +process_id!)[0]?.initial_weight.toString())
    }, [process])

    return (
        <ThemedView header>
            <ThemedText style={{marginTop: 0}} type='title'>Finalizar Proceso</ThemedText>
            <ThemedText style={{ marginBottom: 10 }}>Ingrese la información que se solicita para iniciar el proceso</ThemedText>

            <View style={styles.form}>
                <Input 
                    name='Peso Inicial (kg)'
                    value={initialWeight!}
                />

                <Input 
                    name='Peso final (kg)'
                    onChange={setFinalWeight}
                    value={finalWeight!}
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