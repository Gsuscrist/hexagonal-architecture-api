

export interface JwtRepository{


    generateToken(data: any): Promise<any>

    addToBlackList(token: any):void

    isTokenRevoked(token: string): Promise<boolean>
}