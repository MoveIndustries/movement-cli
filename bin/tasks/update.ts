import { existsSync } from "fs";

import { getLocalBinPath } from "../utils/getLocalBinPath.js";
import { installCli } from "./install.js";

export const updateCli = async () => {
  const path = getLocalBinPath();

  if (!existsSync(path)) {
    console.log(
      "Movement CLI not installed, run `npx @moveindustries/movement-cli --install` to install"
    );
    return;
  }

  // No versioning yet, so just re-download the latest
  console.log("Updating Movement CLI...");
  await installCli(true); // force = true to overwrite existing
  console.log("Movement CLI updated!");
};

// === OLD MOVEMENT UPDATE CODE (kept for reference) ===
// import { execSync } from "child_process";
// import { getOS } from "../utils/getUserOs.js";
// import { getLatestVersionGh } from "../utils/ghOperations.js";
// import { execSyncShell } from "../utils/execSyncShell.js";
//
// if (getOS() === "MacOS") {
//   return execSync("brew upgrade movement");
// } else {
//   const latestVersion = await getLatestVersionGh();
//   const currentVersion = execSyncShell(`${path} --version`, { encoding: "utf8" })
//     .trim().split(" ")[1];
//   if (currentVersion !== latestVersion) {
//     console.log(`A newer version available: ${latestVersion}, installing...`);
//     await installCli();
//   } else {
//     console.log(`CLI is up to date`);
//   }
// }
