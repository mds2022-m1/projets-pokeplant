import L from "leaflet";
import { useEffect, useState } from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { useAppSelector } from "../app/hooks";
import graphql from "../graphql/graphql";
import { pokePlant } from "../app/types";
export function LeafletMap() {
  const userId = useAppSelector((state) => state.user.id);
  const [isLoading, setIsLoading] = useState(false);
  const [center] = useState([45.764043, 4.835659]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [pokeplants, setPokeplants] = useState<any[]>([]);

  // Using postgresql function directly
  // async function getAllPokeplants() {
  //   setMarkers([]);
  //   setIsLoading(true);
  //   try {
  //     const { data, error } = await supabase.rpc("get_all_pokeplants");
  //     if (error) {
  //       console.error(error);
  //     }
  //     if (data) {
  //       console.log(data);
  //       setPokeplants(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // Using graphql
  async function getAllPokeplantsGraphql() {
    setIsLoading(true);
    let pokeplants: pokePlant[] = [];
    try {
      const data = await graphql(`
        query getAllPokeplant {
          pokeplantCollection {
            edges {
              node {
                id
                name
                latitude
                longitude
                hp
                atk
                atk_spe
                def
                spd
                base_stats
                owner
                moves
                image
              }
            }
          }
        }
      `);
      data.pokeplantCollection.edges.map((edge: { node: pokePlant}) => {
        pokeplants.push(edge.node);
        return pokeplants;
      });
      setPokeplants(pokeplants);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function marker_icon(pokeplant: any): string {
    if (pokeplant.owner === userId) {
      return "https://icon-library.com/images/marker-icon-png/marker-icon-png-12.jpg";
    } else if (pokeplant.owner !== userId) {
      return "https://icons-for-free.com/download-icon-map+marker+pin+place+point+pointer+icon-1320086111521922120_256.ico";
    } else {
      return "https://icons-for-free.com/download-icon-map+marker+pin+place+point+pointer+icon-1320086111521922120_256.ico";
    }
  }

  async function generateMarkers() {
    setMarkers([]);
    pokeplants.map((pokeplant) => {
      if (pokeplant.latitude !== null && pokeplant.longitude !== null)
        setMarkers((markers: any) => [
          ...markers,
          {
            lat: pokeplant.latitude,
            lng: pokeplant.longitude,
            popup: (
              <>
                <h1>{pokeplant.name}</h1>
                <img
                  src={pokeplant.image}
                  alt="pokeplant-marker"
                  width={"100%"}
                ></img>
              </>
            ),
            iconUrl: marker_icon(pokeplant),
          },
        ]);
    });
  }

  useEffect(() => {
    getAllPokeplantsGraphql();
    //getAllPokeplants();
    console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  }, []);

  useEffect(() => {
    generateMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeplants, userId]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <MapContainer
          center={center as L.LatLngExpression}
          zoom={14}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.lat, marker.lng]}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [35, 41],
              })}
            >
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
}
