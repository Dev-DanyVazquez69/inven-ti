export interface countItemsProps {
    countItems:{
        countCollaboratorsInSectors: {
            typeId: number,
            typeName: string,
            count: number
        }[],
        countDeviceInTypes: {
            typeId: number,
            typeName: string,
            count: number
        }[],

    }
}

