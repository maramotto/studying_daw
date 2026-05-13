const BASE_URL = "/api/ads";

export async function getAds(rented: boolean): Promise<AdDTO[]> {
  const response = await fetch(`${BASE_URL}/?rented=${rented}`);
  return response.json();
}

export async function getAd(id: string): Promise<AdDTO> {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
}

export async function createAd(ad: AdDTO): Promise<AdDTO> {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ad),
  });

  if (!response.ok) {
    throw new Error("Ad already exists");
  }

  return response.json();
}

export async function updateAd(ad: AdDTO): Promise<AdDTO> {
  const response = await fetch(`${BASE_URL}/${ad.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ad),
  });

  return response.json();
}

export async function deleteAd(id: number): Promise<void> {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
