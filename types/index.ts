import { BottomTabDescriptor } from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types"

export type Paper = {
    id: number 
    name: string
}

export type User = {
    id?: number | string 
    userName?: string 
    password: string
}

export type ProductCreate = {
    name: string;
    description: string;
    paper_id: number;
    quantity: number;
}

export type UserLogin = Pick<User, 'id' | 'userName' | 'password'>

export type RawMaterial = {
    id: number;
    name: string;
    stock: number;
    type_id: number;
    type: RawMaterialType;
    unit: string;
    amount: number;
}

export type RawMaterialCreate = Pick<RawMaterial, 'name' | 'stock' | 'type_id' | 'unit' | 'amount'>

export type RawMaterialType = {
    id: number;
    description: string;
}

export type RollMaterial = {
    id: number;
    status: "AVAIBLE" | "DISABLE" | "INACTIVE";
    material_id: number;
    paper_id: number;
    lot: string;
    lot_id: number;
    weight: number;
}

export type RollMaterialCreate = Pick<RollMaterial, 'lot' | 'lot_id' | 'weight' | 'paper_id' | 'material_id'>

export type ProductType = {
    id: number;
    name: string;
    description: string;
    paper_id: number;
    quantity: number;
    processes: ProcessType[]
    paper: Paper
}

export type ProcessType = {
    id: number;
    type: 'ON_HOLD' | 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING' | 'COMPLETED' | 'DELIVERED';
    start_time: string;
    end_time: string;
    roll_material_id: number;
    initial_weight: number;
    final_weight: number;
    finished_product_id: number;
    finished_quantity: number;
    product_id: number;
    product: ProductType
    roll_material: RollMaterial, 
    sale_id?: number
}

export type ProcessCreate = Pick<ProcessType, 'initial_weight' | 'product_id' | 'type' | 'roll_material_id' | 'sale_id'>

export type BottomTabDescriptorMap = Record<string, BottomTabDescriptor>;

export type SaleProductType = {
    sale_id: number 
    quantity: number
    product: ProductType
    status: 'ON_HOLD' | 'PRINTING' | 'PARAFFIN' | 'CUT' | 'PACKAGING' | 'COMPLETED' | 'DELIVERED'
}