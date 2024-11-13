
import { Client , Account } from "appwrite";

export const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6733bea6002a53a184e8");


export const account = new Account(client);
export { ID } from "appwrite";