//reusable code for fetching api data and turning them to json format
//notj used on user policies since the policies themselves are nested inside the InsuranceUserentity JSON so a different approach was needed
export async function apiGet(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
