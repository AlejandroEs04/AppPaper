import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { RawMaterial as RawMaterialType } from '@/types';
import ThemedButton from './ThemedButton';

type RawMaterialProps = {
    material: RawMaterialType
}

export default function RawMaterial({ material } : RawMaterialProps) {
    const backgroundColor = useThemeColor({ light: '#f5f5f5', dark: '#262626' }, 'background');

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <View style={styles.infoContainer}>
                <View style={{width: '50%'}}>
                    <ThemedText style={{fontSize: 24, fontWeight: 700}}>{material.name}</ThemedText>
                    <ThemedText style={{fontSize: 20, fontWeight: 500}}>Stock: {material.stock}</ThemedText>
                </View>

                <View style={{width: '50%'}}>
                    <ThemedText style={{textAlign: 'right', fontSize: 18}}>{material.amount} Kg</ThemedText>
                    <ThemedText style={{textAlign: 'right', fontSize: 18, fontWeight: 600, marginTop: 5}}>Total: </ThemedText>
                    <ThemedText style={{textAlign: 'right', fontSize: 18}}>{material.amount * material.stock} Kg</ThemedText>
                </View>
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
