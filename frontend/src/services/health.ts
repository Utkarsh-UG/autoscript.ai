import axios from 'axios'

export type HealthResponse = {
  status: string
  service: string
  timestamp: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await axios.get<HealthResponse>('/api/health')
  return data
}
