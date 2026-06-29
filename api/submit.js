export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, power } = req.body;

        if (!name || !power) {
            return res.status(400).json({
                error: "Missing required fields."
            });
        }

        const discordMessage = {
            embeds: [
                {
                    title: "🌑 Another Hope has surfaced.",
                    color: 0x2b2d31,
                    fields: [
                        {
                            name: "Name",
                            value: name
                        },
                        {
                            name: "Desired Power",
                            value: power
                        }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "The Depths"
                    }
                }
            ]
        };

        const response = await fetch(process.env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(discordMessage)
        });

        if (!response.ok) {
            throw new Error("Discord webhook failed.");
        }

        return res.status(200).json({
            success: true
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            error: "Internal Server Error"
        });

    }
}
