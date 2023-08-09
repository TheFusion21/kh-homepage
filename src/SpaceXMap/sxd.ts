//https://github.com/r-spacex/SpaceX-API
const API_HOST = 'api.spacexdata.com';

export interface Launchpad {
  name: string | null;
  full_name: string | null;
  status: 'active' | 'inactive' | 'unknown' | 'retired' | 'lost' | 'under construction';
  type: string | null;
  locality: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  landing_attempts: number;
  landing_successes: number;
  wikipedia: string | null;
  details: string | null;
  launches: string[];
  id: string;
}

export interface Launch {

}


export const getAllLaunchpads = (): Promise<Launchpad[]> =>
  fetch(`https://${API_HOST}/v4/launchpads`).then((response) => response.json());

export const getLaunchpad = (id: string): Promise<Launchpad> =>
  fetch(`https://${API_HOST}/v4/launchpads/${id}`).then((response) => response.json());

export const getLaunch = (id: string): Promise<Launch> =>
  fetch(`https://${API_HOST}/v4/launches/${id}`).then((response) => response.json());

  