export interface OwnersProps {
    manufacturers:{
        id: number;
        name: string;
    }[]
}

export interface OwnerProps {
    manufacturer:{
        id: number;
        name: string;
    }

}

export interface OwnerBody {
    name: string
}