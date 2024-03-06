const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchPropertiesData() {
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
            return [];
        }

        const res = await fetch(`${apiDomain}/properties`, {
            cache: 'no-cache'
        });

        if (!res.ok) {
            throw new Erroror('Failed to fetch data');
        }

        return res.json();
    } catch (Error) {
        console.log(Error);
        return [];
    }
}

// Fetch signle propertie
async function fetchProperty(id) {
    try {
        if (!apiDomain) return null;

        const res = await fetch(`${apiDomain}/properties/${id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return res.json();
    } catch (Error) {
        console.log(Error);
        return null
    }
}

export {
    fetchPropertiesData,
    fetchProperty
}