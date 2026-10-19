import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // Create a Svix instance with clerk webhook secret.
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting Headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp "],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verifying Headers
        await wh.verify(JSON.stringify(req.body), headers);

        // Getting Data from request body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        };

        // Switch Cases for different Events
        switch (type) {
            case "user.created": {
                await User.create(userData);
                break;
            }

            case "user.updated": {
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                break;
        }

        res.json({
            success: true,
            message: "Webhook received successfully",
        });

    } catch (error) {
        console.error("Error processing webhook:", error);

        res.json({
            success: false,
            message: "Error processing webhook",
        });
    }
};

export default clerkWebhooks;