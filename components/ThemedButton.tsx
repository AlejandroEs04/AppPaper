import { Text, TouchableOpacity, StyleSheet, TextProps } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'

export type StyledButtonProps = {
    title: string
    onPress: () => Promise<void> | void
    type?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'invisible' | 'sm'
    lightColor?: string
    darkColor?: string, 
    styles?: object
}

export default function ThemedButton({ 
    title, 
    onPress, 
    lightColor,
    darkColor,
    styles,
    type = 'primary'
} : StyledButtonProps) {
    return (
        <TouchableOpacity 
            style={[
                stylesInt.button, 
                type === 'primary' && stylesInt.primary,
                type === 'secondary' && stylesInt.secondary,
                type === 'invisible' && stylesInt.invisible, 
                type === 'danger' && stylesInt.danger, 
                type === 'sm' && stylesInt.sm, 
                styles
            ]} 
            onPress={onPress}
        >
            {type === 'invisible' ? (
                <ThemedText style={{ fontSize: 20, fontWeight: '800' }}>{title}</ThemedText>
            ) : (
                <Text style={stylesInt.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

const stylesInt = StyleSheet.create({
    button: {
      backgroundColor: Colors.primary.background, 
      paddingVertical: 12,      
      paddingHorizontal: 20,     
      borderRadius: 10,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff', 
      fontSize: 16,
      fontWeight: 'bold',
    },
    primary: {
        backgroundColor: Colors.primary.background
    }, 
    secondary: {
        backgroundColor: Colors.dark.container
    }, 
    invisible: {
        backgroundColor: 'transparent',
        paddingVertical: 5, 
    },
    danger: {
        backgroundColor: '#dc2626'
    },
    sm: {
        backgroundColor: Colors.primary.backgroundSecondary, 
        paddingVertical: 10,      
        paddingHorizontal: 20,     
        borderRadius: 10,
        alignItems: 'center'
    }
});