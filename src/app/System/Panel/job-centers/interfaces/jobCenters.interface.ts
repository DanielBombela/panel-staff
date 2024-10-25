import { Companie } from "../../intances/interfaces/instance.interface";

export interface JobCenter {
    id:                    string;
    page:                  number;
    is_active:             boolean;
    is_deleted:            boolean;
    created_at:            Date;
    updated_at:            Date;
    deleted_at:            Date;
    name:                  string;
    slug:                  string;
    business_name:         string;
    health_manager:        string;
    taxpayer_registration: string;
    license_number:        string;
    email:                 string;
    phone:                 string;
    whatsapp:              string;
    web_page:              string;
    facebook:              string;
    messenger:             string;
    sanitary_license:      string;
    recommendations:       string;
    agreement:             string;
    address:               string;
    address_latitude:      null;
    address_longitude:     null;
    language:              string;
    code_phone:            string;
    company:               Companie;
}
export interface ResponseJobCenter {
    total:     number;
    page:      number;
    page_size: number;
    items:     JobCenter[];
}