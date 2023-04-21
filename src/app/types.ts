// export type LocalStreamsType = { [key: string]: MediaStream | null; };
// export type RemoteStreamsType = { [key: string]: MediaStream | null; };

// Repository of MediaStreams received from other peers
export type test = { test: string };

export interface pokePlant {
  id: string; // PK
  created_at: Date;
  name: string;
  owner: profiles["id"]; // FK
  image: string;
  description: string;
  moves: number[];
  type: string;
  hp: number;
  def: number;
  atk: number;
  spd: number;
  atk_spe: number;
  base_stats: number;
  latitude: number; // float8
  longitude: number; // float8
}

export interface poke_types {
  id: string; // PK
  created_at: Date;
  name: string; // PK
}

export interface poke_moves {
  id: string; // PK
  created_at: Date;
  name: string;
  power_points: number;
  power: number;
  nature: boolean; // true = physical, false = special
  type: poke_types["name"]; // FK
  accuracy: number; // 10-100
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

export type edge = {
  node: pokePlant | any;
}

export type graphqldata = {
    [key: string]: {
        edges: edge[];
    }
}
