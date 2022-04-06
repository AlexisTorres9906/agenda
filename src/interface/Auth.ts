export interface Auth {
    checking: boolean,
    uid: string|null,
    name: string|null,
    area: {
        nombre: string,
        nombreCorto: string,
    }|null,
}