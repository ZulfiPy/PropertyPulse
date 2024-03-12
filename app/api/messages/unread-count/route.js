import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import Message from "@/models/Message";

export const dynamic = 'force-dynamic';

// GET /api/messages/:undread-count
export const GET = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return new Response('user ID is required', {
                status: 401
            });
        }

        const { userId } = sessionUser;

        const count = await Message.countDocuments({
            recipient: userId,
            read: false
        });

        return new Response(JSON.stringify(count), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {
            status: 500
        });
    }
}