import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export type OptionType = {
    value: string 
    label: string
}

type SelectProps = {
    name: string
    options: OptionType[]
    selectValue: React.Dispatch<React.SetStateAction<string | undefined>>
    value: string
}

const Select = ({name, options, value, selectValue} : SelectProps) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Mostrar/ocultar opciones

    const handleSelect = (value: string) => {
        selectValue(value);
        setIsDropdownVisible(false); // Ocultar la lista después de seleccionar
    };

    return (
        <View style={{position: 'relative'}}>
            <ThemedText style={styles.label}>{name}</ThemedText>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setIsDropdownVisible(!isDropdownVisible)}
            >
                <Text style={styles.selectedText}>
                {options.filter(item => item.value === value)[0]?.label || 'Select an option'}
                </Text>
            </TouchableOpacity>

            {isDropdownVisible && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => handleSelect(item.value)}
                            >
                                <Text style={styles.optionText}>{item?.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 20, 
        fontWeight: '600', 
        marginBottom: 4
    },
    selectButton: {
        height: 'auto',
        borderRadius: 0,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 0,
        marginBottom: 12,
        paddingHorizontal: 14,
        padding: 10,
    },
    selectedText: {
        fontSize: 18,
        color: '#333',
    },
    dropdown: {
        width: 'auto',
        marginTop: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        maxHeight: 150,
        position: 'absolute',
        top: 70, 
        zIndex: 10, 
        left: 0, 
        right: 0, 
        textAlign: 'center'
    },
    option: {
        height: 'auto',
        width: 'auto',
        borderRadius: 0,
        backgroundColor: '#e4e4e7',
        fontSize: 18,
        borderWidth: 0,
        paddingHorizontal: 14,
        padding: 10,
        textAlign: 'center', 
        right: 0, 
        left: 0
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
});

export default Select;
