import { execSyncShell } from "./execSyncShell.js";

/**
 * Based on the installation path of the movement formula, determine the path where the
 * CLI should be installed.
 */
export const getCliPathBrew = () => {
  const directory = execSyncShell("brew --prefix movement", { encoding: "utf8" })
    .toString()
    .trim();
  return `${directory}/bin/movement`;
};
