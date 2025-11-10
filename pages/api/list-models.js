import { getAdminClient } from "../../utils/builder.js";

export default async function handler(req, res) {
  try {
    const { sourceKey } = req.body;
    const adminSDK = getAdminClient(sourceKey);

    const data = await adminSDK.query({
      models: {
        id: true,
        name: true,
        kind: true,
        fields: true,
        helperText: true,
      },
    });

    res.status(200).json({ models: data.data.models });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
