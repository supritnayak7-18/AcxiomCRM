const API_URL = 'http://localhost:5000/api'

export async function getCustomers(search = '') {
  const params = new URLSearchParams()

  if (search.trim()) {
    params.set('search', search.trim())
  }

  const response = await fetch(
    `${API_URL}/customers?${params.toString()}`
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to load customers')
  }

  return result.data
}

export async function addCustomer(customer) {
  const response = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create customer')
  }

  return result.data
}