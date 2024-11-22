import React, { createContext, useState, useEffect, FC, ReactNode, useMemo } from 'react'
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query'
import { Paper, ProcessType, ProductType, RawMaterial, RawMaterialType, RollMaterial, SaleProductType } from '@/types';
import { getPendingProcess, getProcess } from '@/api/ProcessApi';
import { getProducts } from '@/api/ProductApi';
import { getMaterials, getRolls } from '@/api/MaterialApi';
import { getPaper } from '@/api/PaperApi';

interface AppProviderProps {
    children: ReactNode;
}

interface AppContextInterface {
    rollMaterials: RollMaterial[] | undefined
    products: ProductType[] | undefined
    process: ProcessType[] | undefined
    papers: Paper[] | undefined
    materials: RawMaterial[] | undefined
    pendingProcess: SaleProductType[] | undefined
    loading: boolean
    refetchPProcess: (options?: RefetchOptions) => Promise<QueryObserverResult<SaleProductType[] | undefined, Error>>
}

export const AppContext = createContext<AppContextInterface | null>(null)

const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
  
    const { data: rollMaterials, isLoading: rollsIsLoading } = useQuery({
        queryKey: ['rolls'], 
        queryFn: getRolls
    })

    const { data: process, isLoading: IsLoadingProcess } = useQuery({
        queryKey: ['process'], 
        queryFn: getProcess
    })

    const { data: products, isLoading: productsIsLoading } = useQuery({
        queryKey: ['products'], 
        queryFn: getProducts
    })

    const { data: pendingProcess, isLoading: pendingProcessIsLoading, refetch: refetchPProcess } = useQuery({
        queryKey: ['pendingProcess'], 
        queryFn: getPendingProcess
    })

    const { data: papers, isLoading: papersIsLoading } = useQuery({
        queryKey: ['papers'], 
        queryFn: getPaper
    })
    
    const { data: materials, isLoading: materialsIsLoading } = useQuery({
        queryKey: ['materials'], 
        queryFn: getMaterials
    })

    useMemo(() => setLoading(rollsIsLoading || IsLoadingProcess || productsIsLoading || pendingProcessIsLoading || papersIsLoading || materialsIsLoading), [rollMaterials, process, products, pendingProcess, papers, materials])

    return (
        <AppContext.Provider value={{ 
            rollMaterials, 
            products, 
            process, 
            papers,
            materials,
            pendingProcess,
            loading, 
            refetchPProcess
        }}>
            {children}
        </AppContext.Provider>
    );
  };
  
  export default AppProvider