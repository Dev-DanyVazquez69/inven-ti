export interface TypesDeivceProps {
    manufacturers:{
        id: number;
        name: string;
    }[]
}

export interface TypeDeviceProps {
    manufacturer:{
        id: number;
        name: string;
    }

}

export interface TypeDeviceBody {
    name: string
}