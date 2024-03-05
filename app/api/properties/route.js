import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request, response) => {
    try {
        await connectDB();

        const properties = await Property.find();

        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        console.log('error in GET request', error);
        return new Response('something went wrong', { status: 500 });
    }
}