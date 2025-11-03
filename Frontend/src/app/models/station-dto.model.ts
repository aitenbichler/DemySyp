export interface StationDto {

    id: number,
    name: string,
    code?: string,
    type: string,
    stateCode: string,
    isRegional: boolean,
    isExpress: boolean,
    isIntercity: boolean,
    remark?: string,

    city?: string,
    infrastructures?: string[]
    railwayCompanies?: string[],
    lines?: string[]
}
