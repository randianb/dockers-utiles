export class UserRolesOrganization {
    organization_id: string;
    organization_description: string;
}

export class UserRolesFilter {
    filter_id: string;
    filter_description: string;
}

export class UserRoles {
    uid: string;
    cn: string;
    email: string;
    one_shot: boolean;
    organization: UserRolesOrganization;
    payload: any;
    roles: Roles[];
    user_profiles: UserProfile[];
}

export class Roles {
    rol_id: string;
    rol_description: string;
}

export class UserProfile {
    profile_id: string;
    profile_description: string;
}
