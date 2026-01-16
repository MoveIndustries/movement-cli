import { execSync } from "child_process";
import { existsSync } from "fs";

import { GH_CLI_DOWNLOAD_URL } from "../utils/consts.js";
import { getOS } from "../utils/getUserOs.js";
import { getLocalBinPath } from "../utils/getLocalBinPath.js";

// Install the CLI.
export const installCli = async (force = false) => {
  const path = getLocalBinPath();
  if (!force && existsSync(path)) {
    console.log("Movement CLI is already installed");
    return;
  }

  const os = getOS();
  console.log(`Downloading Movement CLI for ${os}...`);

  if (os === "Windows") {
    // TODO: Add Windows support when tarball is available
    console.log("Windows is not yet supported. Please install manually.");
    return;
  } else if (os === "MacOS") {
    // Detect ARM vs Intel Mac
    const arch = execSync("uname -m", { encoding: "utf8" }).trim();
    const archSuffix = arch === "arm64" ? "arm64" : "x86_64";
    const url = `${GH_CLI_DOWNLOAD_URL}/movement-cli-l1-macos-${archSuffix}.tar.gz`;

    console.log(`Detected Mac architecture: ${archSuffix}`);
    execSync(
      `curl -L -o /tmp/movement.tar.gz ${url} && ` +
      `mkdir -p /tmp/movement_extract && ` +
      `tar -xzf /tmp/movement.tar.gz -C /tmp/movement_extract && ` +
      `chmod +x /tmp/movement_extract/movement && ` +
      `mv /tmp/movement_extract/movement ${path} && ` +
      `rm -rf /tmp/movement_extract /tmp/movement.tar.gz`
    );
  } else {
    // Linux
    const url = `${GH_CLI_DOWNLOAD_URL}/movement-cli-l1-linux-x86_64.tar.gz`;

    execSync(
      `curl -L -o /tmp/movement.tar.gz ${url} && ` +
      `mkdir -p /tmp/movement_extract && ` +
      `tar -xzf /tmp/movement.tar.gz -C /tmp/movement_extract && ` +
      `chmod +x /tmp/movement_extract/movement && ` +
      `mv /tmp/movement_extract/movement ${path} && ` +
      `rm -rf /tmp/movement_extract /tmp/movement.tar.gz`
    );
  }

  console.log("Movement CLI installed successfully!");
};

// === OLD APTOS INSTALL CODE (kept for reference) ===
// import { execSyncShell } from "../utils/execSyncShell.js";
// import { getCurrentOpenSSLVersion } from "../utils/versions.js";
// import { getLatestVersionGh } from "../utils/ghOperations.js";
// import { PNAME } from "../utils/consts.js";
//
// const latestCLIVersion = await getLatestVersionGh();
//
// Windows:
// const url = `${GH_CLI_DOWNLOAD_URL}/${PNAME}-v${latestCLIVersion}/${PNAME}-${latestCLIVersion}-${os}-x86_64.zip`;
// execSync(`powershell -Command "..." `);
//
// MacOS:
// execSyncShell("brew install movement", { encoding: "utf8" });
//
// Linux (with OpenSSL version detection):
// let osVersion = "x86_64";
// if (opensSslVersion.startsWith("3.")) { osVersion = "22.04-x86_64"; }
// const url = `${GH_CLI_DOWNLOAD_URL}/${PNAME}-v${latestCLIVersion}/${PNAME}-${latestCLIVersion}-${os}-${osVersion}.zip`;
// execSync(`curl -L -o /tmp/movement.zip ${url}; unzip ... `);
