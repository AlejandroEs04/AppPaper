import { Paper, RollMaterial } from "@/types"

export default function getPapersPicker (data: Paper[]) {
    const papers = data?.map((paper: Paper) => {
        return {
            label: paper.name, 
            value: paper.id
        }
    })
    return papers
}

export function getRollPicker (data: RollMaterial[]) {
    const items = data?.map((item: RollMaterial) => {
        return {
            label: item.lot + "" + item.lot_id, 
            value: item.id
        }
    })
    return items
}