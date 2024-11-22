export default function formatDate(dateString: string): string {
    // Crear un objeto Date a partir del string ISO
    const date = new Date(dateString);
  
    // Extraer día, mes y año
    const day = String(date.getDate()).padStart(2, '0'); // Asegurarse de que el día tenga dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
    const year = date.getFullYear();
  
    // Extraer horas y minutos
    const hours = String(date.getHours()).padStart(2, '0'); // Asegurarse de que las horas tengan dos dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegurarse de que los minutos tengan dos dígitos
  
    // Formatear en dd/MM/yyyy hh:mm
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
  