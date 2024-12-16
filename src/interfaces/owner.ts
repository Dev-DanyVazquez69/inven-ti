export interface OwnersProps {
    owners:{
        id: number;
        name: string;
    }[]
}

export interface OwnerProps {
    owner:{
        id: number;
        name: string;
    }

}

export interface OwnerBody {
    name: string
}