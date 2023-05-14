export interface Country {
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    name: {
        common: string;
        official: string;
        nativeName: {
            spa: {
                official: string;
                common: string;
            };
        };
    };
    independent: boolean;
    unMember: boolean;
    capital: string[];
    region: string;
    flag: string;
    population: number;
    id: number;
}