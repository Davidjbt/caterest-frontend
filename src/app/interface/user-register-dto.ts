export interface UserRegisterDto {
    username: string,
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    biography?: string,
    dateOfBirth?: string,
    telephoneNumber?: string,
    city?: string,
    country?: string
}
