import { getAdminClient } from "../../utils/builder.js";

export default async function handler(req, res) {
  try {
    const { sourceKey, modelName } = req.body;
    const adminSDK = getAdminClient(sourceKey);

    const data = await adminSDK.query({
      contentEntries: [
        { model: modelName },
        {
          id: true,
          name: true,
          data: true,
        },
      ],
    });

    res.status(200).json({ entries: data.data.contentEntries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
