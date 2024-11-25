export type TypeFilter = {
    name?: {
        contains: string,
        mode: string
    }
    collaboratorId?: string
    sectorId?: string
    ownerId?: number
    manufacturerId?: number

}