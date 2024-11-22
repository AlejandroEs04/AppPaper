import { View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import ThemedButton from '@/components/ThemedButton';
import { router } from 'expo-router';
import { useAppContext } from '@/hooks/useApp';
import PendingProcess from '@/components/PendingProcess';

export default function HomeScreen() {
  const { pendingProcess, loading, refetchPProcess } = useAppContext()

  if(loading) return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size='large' />
    </View>
  )

  return (
    <ThemedView refetch={refetchPProcess}>
      <ThemedText type='title' style={{ color: Colors.primary.textPrimaryLight, fontWeight: 'bold' }}>PaperWax App</ThemedText>

      <ThemedText style={{marginTop: 30}} type='title'>Procesos Pendientes</ThemedText>
      <ThemedText>Gestiona los procesos que estan pendientes</ThemedText>

      <ThemedButton 
        styles={{marginVertical: 10}}
        title='+ Iniciar Proceso'
        onPress={() => router.navigate('/process/createProcess')}
      />

      <View style={{gap:10}}>
        {pendingProcess?.length ? pendingProcess.map(item => !['COMPLETED', 'DELIVERED'].includes(item.status) && (
          <PendingProcess 
            key={`${item.sale_id}${item.product.id}`}
            process={item}
          />
        )) : (
          <View>
            <ThemedText>Aún no hay procesos pendientes</ThemedText>
          </View>
        )}
      </View>
    </ThemedView>
  );
}
