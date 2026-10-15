// eslint-disable-next-line import/no-commonjs
module.exports = {
  extends: ['github>OctopusDeploy/team-bmbb-renovate-config:github-action.json5'],

  // The github-action preset rebuilds dist/ after each update, but presets can't allow commands, so allow it here.
  allowShellExecutorForPostUpgradeCommands: true,
  allowedCommands: ['^npm ci --ignore-scripts && npm run build$'],
};
