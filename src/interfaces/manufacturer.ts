export interface ManufacturersProps {
    manufacturers:{
        id: number;
        name: string;
    }[]
}

export interface ManufacturerProps {
    manufacturer:{
        id: number;
        name: string;
    }

}

export interface ManufacturerBody {
    name: string
}