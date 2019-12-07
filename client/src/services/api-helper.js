import axios from 'axios';

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://p4-lingo-api.herokuapp.com/'

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('jwt', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('jwt', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}

//adding new media
export const createVehicle = async (userId, data) => {
  const resp = await api.post('/vehicles', { vehicle: data })
  return resp.data
}

export const readAllVehicles = async () => {
  const resp = await api.get('/vehicles')
  return resp.data
}

// export const updateVehicle = async (id, data) => {
//   const resp = await api.put(`/vehicles/${id}`, { vehicle: data })
//   return resp.data
// }

export const updateVehicle = async (id, vehicleData) => {
  const resp = await api.put(`/vehicles/${id}`, vehicleData);
  return resp.data;
}

export const destroyVehicle = async (id) => {
  const resp = await api.delete(`/vehicles/${id}`)
  return resp.data
}

//adding new flashcards
export const createFlashcard = async (vehicleId, data) => {
  const resp = await api.post(`/vehicles/${vehicleId}/flashcards`, { flashcard: data })
  return resp.data
}

export const readAllFlashcards = async (vehicleId) => {

  const resp = await api.get(`/vehicles/${vehicleId}`)
  return resp.data.flashcards
}
export const updateFlashcard = async (id, data) => {
  const resp = await api.put(`/flashcards/${id}`, { flashcard: data })
  return resp.data
}

export const destroyFlashcard = async (id) => {
  const resp = await api.delete(`/flashcards/${id}`)
  return resp.data
}