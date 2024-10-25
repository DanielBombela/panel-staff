
export interface AuthResponse {
    data:    Data;
    code:    number;
    message: string;
}

export interface Data {
    access_token:  string;
    refresh_token: string;
    type:          string;
    user:          User;
}

export interface User {
    id:                string;
    last_login:        null;
    is_superuser:      boolean;
    name:              string;
    first_name:        string;
    last_name:         null;
    email:             null;
    is_verified:       boolean;
    is_active:         boolean;
    confirmation_code: null;
    device_token:      null;
    role:              string;
    is_staff:          boolean;
    is_deleted:        boolean;
    created_at:        Date;
    updated_at:        Date;
}
