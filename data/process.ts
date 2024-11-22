export type TypeProcess = {
    label: string 
    value: 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING'
}

export const typesProcess : TypeProcess[] = [
    {
        label: 'Impresión', 
        value: 'PRINTING'
    },
    {
        label: 'Parafinado', 
        value: 'PARAFFIN'
    },
    {
        label: 'Corte', 
        value: 'CUT'
    },
    {
        label: 'Empaquetado', 
        value: 'PACKAGING'
    },
]

export const typeDictionary = {
    ON_HOLD: 'En espera',
    PRINTING: 'Impresión',
    PARAFFIN: 'Parafinado',
    CUT: 'Corte',
    PACKAGING: 'Empaquetado',
    COMPLETED: 'Completado', 
    DELIVERED: 'Entregado'
}