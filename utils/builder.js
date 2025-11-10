import { createAdminApiClient } from "@builder.io/admin-sdk";

export function getAdminClient(apiKey) {
  return createAdminApiClient(apiKey);
}
