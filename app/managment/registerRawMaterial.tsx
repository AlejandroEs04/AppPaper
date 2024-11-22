import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Input from '@/components/Input'
import ThemedButton from '@/components/ThemedButton'
import { useAppContext } from '@/hooks/useApp'
import { RawMaterial } from '@/types'
import Select, { OptionType } from '@/components/Select'

export default function registerRawMaterial() {
    const [stock, setStock] = useState<string | undefined>('')
    const [type_id, setType_id] = useState<string | undefined>('')
    const [materialsOptions, setMaterialsOptions] = useState<OptionType[]>([])

    const { materials, loading } = useAppContext()

    useEffect(() => {
        if(materials) setMaterialsOptions(materials.map(item => {  
            return {
                label: item.name, value: item.id.toString()
            }
        }))
    }, [materials])

    return (
        <ThemedView>
            <ThemedText style={{marginTop: 0}} type='title'>Registrar Material</ThemedText>
            <ThemedText style={{ marginBottom: 10 }}>Ingrese la información que se solicita para registrar materia prima</ThemedText>

            <View style={styles.form}>
                <Select 
                    options={materialsOptions}
                    selectValue={setType_id}
                    value={type_id!}
                    name='Material'
                />
                <Input 
                    name='Cantidad'
                    value={stock!}
                    onChange={setStock}
                />

                <ThemedButton 
                    title='Registrar Material'
                    onPress={() => console.log()}
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