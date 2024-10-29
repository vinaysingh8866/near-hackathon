import { createListCollection, ListCollection } from "@chakra-ui/react"
import { SelectRoot,SelectLabel,SelectTrigger,SelectValueText,SelectContent, SelectItem } from "../ui/select"
import { Dispatch, SetStateAction } from "react"

enum fields{
    'name',
        'type',
        'assets',
        'startegy',
        'materialChanges',
        'holdings',
        'managers',
}

interface SelectFieldProps{
    value:{
        name: string;
        type: string;
        assets: string;
        startegy: string;
        materialChanges: string;
        holdings: string;
        managers: string;
    },
    field: string,
    setValue:Dispatch<SetStateAction<{name: string;
        type: string;
        assets: string;
        startegy: string;
        materialChanges: string;
        holdings: string;
        managers: string;}>>,
    listItem:ListCollection
}

export default function SelectField({value,field,setValue,listItem}:SelectFieldProps ){


    return(
        <SelectRoot w={'full'} maxW={{'base':'full','md':'85%'}} collection={listItem} 
        onValueChange={(e) => {
            console.log(e.value)
            // setValue((prev)=>{

            //     return{
            //         ...prev,
            //         // prev[field]: e.value[0],
            //     }
            // })
        }}>
            <SelectLabel fontSize={{'base':'14px','md':'18px'}} fontWeight={'semibold'}>Connection List</SelectLabel>
            <SelectTrigger rounded={'full'}>
                <SelectValueText fontSize={{'base':'14px','md':'16px'}} rounded={'full'} px={'1rem'} placeholder="Select Connection" />
            </SelectTrigger>
            <SelectContent >
                {listItem.items.map((movie) => (
                    <SelectItem px={'1rem'} py={'0.25rem'} item={movie} key={movie.value}>
                        {movie.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    )
}