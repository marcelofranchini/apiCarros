interface IUserResponseDTO {
    name: string;
    driver_license: string;
    email: string;
    id: string;
    avatar: string;
    avatar_url(): string;
}

export { IUserResponseDTO };
