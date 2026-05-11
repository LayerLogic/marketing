/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly LEAD_FROM_EMAIL: string;
  readonly LEAD_TO_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
