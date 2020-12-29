import * as pulumi from '@pulumi/pulumi';
import * as azure from '@pulumi/azure';

const location = process.env["RG_LOCATION"] || "centralus"
const dbLogin = process.env["DB_LOGIN"] 
const dbPassword = process.env["DB_PASSWORD"] 

// Create an Azure Resource Group
export const resourceGroup = new azure.core.ResourceGroup("mitch-devops-rg", {
  location: location
}, {additionalSecretOutputs: ["location"]});

export const psqlServer = new azure.postgresql.Server("exampleServer", {
    location: resourceGroup.location,
    resourceGroupName: resourceGroup.name,
    skuName: "B_Gen5_2",
    storageMb: 5120,
    geoRedundantBackupEnabled: false,
    administratorLogin: dbLogin,
    administratorLoginPassword: dbPassword,
    version: "9.5",
    sslEnforcementEnabled: true,
});

// Create an Azure resource (Storage Account)
// const account = new azure.storage.Account('storage', {
//   // The location for the storage account will be derived automatically from the resource group.
//   resourceGroupName: resourceGroup.name,
//   accountTier: 'Standard',
//   accountReplicationType: 'LRS',
// });

// Export the connection string for the storage account
//export const connectionString = account.primaryConnectionString;
