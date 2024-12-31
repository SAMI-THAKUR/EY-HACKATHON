
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

// List Events
const listEvents = async (req, res) => {
  try {
    const events = await db.event.findMany();
    return res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error listing events:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get Event by ID
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await db.event.findUnique({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    console.error("Error retrieving event:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  listEvents,
  getEvent,
};