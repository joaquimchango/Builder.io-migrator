import { getAdminClient } from "../../utils/builder.js";
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { sourceKey, targetKey, selectedModels } = req.body;

    const source = getAdminClient(sourceKey);
    const target = getAdminClient(targetKey);

    let result;

    for (const model of selectedModels) {
      console.log(`Migrating ${model.name}`);

      // Create model in target
      try {
        result = await target.chain.mutation.addModel({
          body: {
            name: model.name,
            kind: model.kind,
            fields: model.fields || [],
            helperText: `Migrated from source`,
          },
        }).execute({ id: true, name: true });



      } catch (e) {
        console.warn(`Model "${model.name}" may already exist.`);
      }


     const sourceModelId =  model.id;


console.log(`📦 Fetching content for model "${model.name}"...`, model.id);

// Fetch all entries from the source (Admin SDK)
const modelContent = await source.query({
    model: [{
        id: model.id
      }, {
      id: true,
        name: true,
        fields: true,
        content: true}]
  });


const modelName = modelContent?.content?.model?.name || model.name;
const entries = modelContent?.data?.model?.content || [];
console.log(modelContent,entries);
console.log(`🧩 Found ${entries.length} entries for "${modelName}"`);


for (const entry of entries) {
  try {
    const writeUrl = `https://builder.io/api/v1/write/${modelName}`;
    
    const payload = { 
      name: entry.name || `Imported ${modelName}`,
      published: "draft",
      data: entry.data || {},
      meta: entry.meta || {},
       testRatio: entry.testRatio || 1,
        variations: entry.variations || {},
    };

    console.log(`📝 Creating entry "${payload.name}"...`);

    const res = await axios.post(writeUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${targetKey}`,
      },
    });

    console.log(`✅ Created entry: ${res.data.id || "(no id returned)"}, ${JSON.stringify(res.data)}`);
  } catch (err) {
    console.error(`❌ Failed to import entry for ${modelName}:`, err.message);
  }
}


    }

    res.status(200).json({ message: "Migration complete!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
