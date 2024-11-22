import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import ThemedButton from '@/components/ThemedButton'
import * as SecureStore from 'expo-secure-store'

export default function inventory() {
    const handleLogOut = async() => {
        await SecureStore.deleteItemAsync('authToken')
        router.replace('/auth/login')
    }

    return (
        <ThemedView>
            <ThemedText type='title' style={{marginTop: 10}}>Almacén</ThemedText>
            <ThemedText>Gestiona los rollos y materias primas en almacén</ThemedText>

            <View style={{ backgroundColor: '#404040', marginTop: 20, marginHorizontal: -15 }}>
                <TouchableOpacity onPress={() => router.navigate('/managment/registerRollMaterial')} style={{paddingVertical: 12, gap:10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, paddingHorizontal: 15}}>
                    <Ionicons color={'#fff'} size={35} name='cube-outline' style={{width: 35}} />
                    <Text style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Registrar Rollo</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.navigate('/managment/registerRawMaterial')} style={{paddingVertical: 12, gap:10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, paddingHorizontal: 15}}>
                    <Ionicons color={'#fff'} size={35} name='enter-outline' style={{width: 35}} />
                    <Text style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Registrar Materia Prima</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.navigate('/managment/inventory')} style={{paddingVertical: 12, gap:10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: '#000', paddingHorizontal: 15}}>
                    <Ionicons color={'#fff'} size={35} name='document-text-outline' style={{width: 35}} />
                    <Text style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Ver inventario</Text>
                </TouchableOpacity>
            </View>

            <ThemedText type='title' style={{marginTop: 40}}>Procesos</ThemedText>
            <ThemedText>Gestiona los procesos activos</ThemedText>
            <View style={{ backgroundColor: '#404040', marginTop: 20, marginHorizontal: -15 }}>
                <TouchableOpacity onPress={() => router.navigate('/managment/registerRollMaterial')} style={{paddingVertical: 12, gap:10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, paddingHorizontal: 15}}>
                    <Ionicons color={'#fff'} size={35} name='settings-outline' style={{width: 35}} />
                    <Text style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Procesos Activos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.navigate('/process/createProcess')} style={{paddingVertical: 12, gap:10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, paddingHorizontal: 15}}>
                    <Ionicons color={'#fff'} size={35} name='add-outline' style={{width: 35}} />
                    <Text style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Iniciar Proceso</Text>
                </TouchableOpacity>
            </View>

            <ThemedButton 
                onPress={handleLogOut}
                title='Cerrar Sesión'
                type='danger'
                styles={{marginTop: 40}}
            />
        </ThemedView>
    )
}