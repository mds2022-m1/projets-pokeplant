import axios from "axios";
import { graphqldata } from "../app/types";

export default async function graphql(query: string): Promise<graphqldata> {
  const { data } = await axios.post(
    // Supabase GraphQL endpoint SHOULD NOT be exposed to the client
    process.env.REACT_APP_API_URL + "/graphql/v1",
    {
      query: query,
    },
    {
      headers: {
        // Supabase API key SHOULD NOT be exposed to the client
        apikey:
          process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
}
