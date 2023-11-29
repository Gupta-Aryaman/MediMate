import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default { 
    driver: "pg",
    schema: "/Volumes/Codes/minor/app/src/lib/db/schema.tsx",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    }
    //host: "localhost",
} satisfies Config;


//npx drizzle-kit push:pg