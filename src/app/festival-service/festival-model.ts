export interface Band {
    name: string;
    recordLabel: string;
}

export interface MusicFestival {
    name: string;
    bands: Band[];
}

export interface RecordLabel {
    name: string;
    bands: BandInFestivals[];
}

export interface BandInFestivals {
    name: string;
    festivals: string[];
}