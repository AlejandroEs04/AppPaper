import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ProcessType, SaleProductType } from '@/types'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { ThemedText } from './ThemedText'
import ThemedButton from './ThemedButton'
import { useAppContext } from '@/hooks/useApp'
import formatDate from '@/utils/formatDate'
import { typeDictionary } from '@/data/process'
import { router } from 'expo-router'

type PendingProcessProps = {
    process: SaleProductType
}

export default function PendingProcess({process} : PendingProcessProps) {
    const [currentProcess, setCurrentProcess] = useState<ProcessType>()
    const backgroundColor = useThemeColor({ light: '#f5f5f5', dark: '#262626' }, 'background');

    const {loading, process: processFromApi} = useAppContext()

    if(loading) return <ActivityIndicator />

    useEffect(() => {
        setCurrentProcess(processFromApi?.filter(item => item.sale_id === process.sale_id && item.type === process.status && item.product_id === process.product.id)[0])
    }, [processFromApi, process])

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <View style={styles.infoContainer}>
                <View style={{width: '50%'}}>
                    <ThemedText style={{fontSize: 20, fontWeight: 700}}>{process.product.name}</ThemedText>
                    <ThemedText style={{fontSize: 16, fontWeight: 400, marginTop: 5}}>Status:</ThemedText>
                    <ThemedText style={{fontSize: 18, fontWeight: 400, color: '#22c55e'}}>{typeDictionary[process.status]}</ThemedText>
                    <ThemedText style={{fontSize: 18, fontWeight: 600}}>Cantidad: {process.quantity}</ThemedText>
                </View>

                <View style={{width: '50%'}}>
                    <ThemedText style={{textAlign: 'right'}}>Inicio</ThemedText>
                    <ThemedText style={{textAlign: 'right', fontSize: 18, fontWeight: 600}}>{formatDate(currentProcess?.start_time!)}</ThemedText>
                    {currentProcess?.final_weight && (
                        <>
                            <ThemedText style={{textAlign: 'right', marginTop: 6}}>Finalizada</ThemedText>
                            <ThemedText style={{textAlign: 'right', fontSize: 18, fontWeight: 600}}>{formatDate(currentProcess?.end_time!)}</ThemedText>
                        </>
                    )}
                </View>
            </View>

            <View>
                {currentProcess?.end_time ? (
                    <ThemedButton 
                        type='sm'
                        styles={{marginTop: 10}}
                        title='Continuar'
                        onPress={() => router.navigate(`/process/createProcess?process_id=${currentProcess.id}&sale_id=${process.sale_id}&type=${process.status}`)}
                    />
                ) : (
                    <ThemedButton 
                        type='sm'
                        styles={{marginTop: 10, backgroundColor: '#10b981'}}
                        title='Finalizar'
                        onPress={() => router.navigate(`/process/finishProcessPage?process_id=${currentProcess?.id}`)}
                    />
                )}
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10, 
        backgroundColor: '#fff'
    }, 
    infoContainer: {
        display: 'flex', 
        flexDirection: 'row'
    }
})
