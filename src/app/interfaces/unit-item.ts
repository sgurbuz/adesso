export interface Units {
    units: UnitItem[];
}

export interface UnitItem {
    id: number;
    name: string;
    description: string;
    expansion?:  string;
    age: string;
    cost: Costs | null;
    build_time?: number;
    reload_time: number;
    movement_rate: number;
    line_of_sight: number;
    hit_points: number;
    range: number | string;
    attack: number;
    armor: string;
    attack_bonus?: string[];
    accuracy?: string;
    blast_radius?: number;
}

export interface Costs {
    Wood?: number;
    Gold?: number;
    Food?: number;
}
