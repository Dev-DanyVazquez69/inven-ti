export interface manufacturersProps {
    manufacturers:{
        id: number;
        name: string;
    }[]
}

export interface manufacturerProps {
    manufacturer:{
        id: number;
        name: string;
    }

}

export interface manufacturerBody {
    name: string
}