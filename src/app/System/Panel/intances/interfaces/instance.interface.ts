export interface Companie {
    id:             string;
    is_active:      boolean;
    created_at:     Date;
    updated_at:     Date;
    folio:          string;
    name:           string;
    slug:           string;
    contact_name:   string;
    contact_email:  string;
    contact_phone:  string;
    document_logo:  string;
    document_stamp: string;
    web_logo:       string;
    web_color:      string;
    cutoff_date:    Date;
    package_type:   string;
    country:        Country;
}

export interface Country {
    id:             string;
    created_at:     Date;
    name:           string;
    code_country:   string;
    coin_country:   string;
    symbol_country: string;
}