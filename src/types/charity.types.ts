import { CharityCategory } from "./charityCategory";


export interface Charity {
    id: number;
    name: string,
    category: CharityCategory,
    description: string,
    impact_metric: string,
    impact_ratio: number,
    website_url: string,
    image: string | null
    }
