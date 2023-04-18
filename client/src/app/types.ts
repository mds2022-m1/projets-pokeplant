

// export type LocalStreamsType = { [key: string]: MediaStream | null; };
// export type RemoteStreamsType = { [key: string]: MediaStream | null; };


// Repository of MediaStreams received from other peers
export type test = { test : string }

export interface pokePlant {
    id: string; // PK
    created_at: Date;
    name: string;
    owner: profiles["id"]; // FK
    image: string;
    description: string;
    moves: string[];
    type: string;
}

export interface profiles {
    id: string; // PK
    updated_at: Date;
    username: string; 
    full_name: string;
    avatar_url: string;
    website: string;
    gender: "Male" | "Female";
}