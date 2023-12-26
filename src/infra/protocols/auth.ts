export interface Authentication {
    auth: (authenticationParams: any) => Promise<any>
}
