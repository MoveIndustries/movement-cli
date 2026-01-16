import { dirname } from "path";
import { getOS } from "./getUserOs.js";
import { fileURLToPath } from "url";

// Binary name is "movement" (not "movement-cli")
const BINARY_NAME = "movement";

export const getLocalBinPath = () => {
  const os = getOS();
  const baseDir = dirname(fileURLToPath(import.meta.url));

  if (os === "Windows") {
    return `${baseDir}\\${BINARY_NAME}.exe`;
  } else {
    // MacOS and Linux use the same path structure
    return `${baseDir}/${BINARY_NAME}`;
  }
};

// === OLD BREW-BASED CODE (kept for reference) ===
// import { executableIsAvailable } from "./movementExecutableIsAvailable.js";
// import { getCliPathBrew } from "./brewOperations.js";
// import { PNAME } from "./consts.js";
//
// if (os === "MacOS") {
//   const brewInstalled = executableIsAvailable("brew");
//   if (!brewInstalled) {
//     throw "Please install brew to continue: https://brew.sh/";
//   }
//   try {
//     path = getCliPathBrew();
//   } catch (e) {
//     path = "";
//   }
// }
