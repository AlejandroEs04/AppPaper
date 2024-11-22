import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useAppContext } from '@/hooks/useApp'
import RawMaterial from '@/components/RawMaterial'

export default function inventory() {
    const { rollMaterials, materials, loading } = useAppContext()

    if(loading) return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' />
        </View>
    )
    return (
        <ThemedView header scroll>
            <ThemedText style={{marginTop: 0}} type='title'>Inventario</ThemedText>
            <ThemedText style={{ marginBottom: 10 }}>Gestiona el inventario</ThemedText>

            <View style={{gap:10}}>
                {materials?.map(item => (
                    <RawMaterial 
                        key={item.id}
                        material={item}
                    />
                ))}
            </View>
        </ThemedView>
    )
}