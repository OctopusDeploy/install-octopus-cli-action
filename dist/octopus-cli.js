"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installOctopusCli = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const httpm = __importStar(require("@actions/http-client"));
const osPlatform = os.platform();
const platform = osPlatform === 'win32' ? 'win' : osPlatform === 'darwin' ? 'osx' : 'linux';
const ext = osPlatform === 'win32' ? 'zip' : 'tar.gz';
const octopusTools = `https://download.octopusdeploy.com/octopus-tools`;
const latestUrl = `${octopusTools}/latest.json`;
const http = new httpm.HttpClient('action-install-octopus-cli', undefined, {
    keepAlive: false
});
const getLatest = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield http.getJson(latestUrl)).result;
});
const getDownloadUrl = (version) => __awaiter(void 0, void 0, void 0, function* () {
    let versionToDownload = version;
    if (version === 'latest') {
        try {
            const downloads = yield getLatest();
            if (downloads !== null) {
                versionToDownload = downloads.latest;
            }
        }
        catch (error) {
            core.setFailed(error);
        }
    }
    const downloadUrl = `${octopusTools}/${versionToDownload}/OctopusTools.${versionToDownload}.${platform}-x64.${ext}`;
    const statusCode = (yield http.head(downloadUrl)).message.statusCode;
    if (statusCode !== 200) {
        core.setFailed(`⚠️ Octopus CLI version not found: ${versionToDownload}`);
        throw new Error(`Octopus CLI version not found: ${versionToDownload}`);
    }
    core.info(`🎉 Octopus CLI version found: ${versionToDownload}`);
    return { version: versionToDownload, url: downloadUrl };
});
function installOctopusCli(version) {
    return __awaiter(this, void 0, void 0, function* () {
        let octopusCliDownload;
        try {
            octopusCliDownload = yield getDownloadUrl(version);
        }
        catch (error) {
            return '';
        }
        core.info(`⬇️ Downloading Octopus CLI ${octopusCliDownload.version}...`);
        const downloadPath = yield tc.downloadTool(octopusCliDownload.url);
        core.debug(`Downloaded to ${downloadPath}`);
        core.info(`📦 Extracting Octopus CLI ${octopusCliDownload.version}...`);
        let extPath = '';
        if (osPlatform === 'win32') {
            extPath = yield tc.extractZip(downloadPath);
        }
        else if (octopusCliDownload.url.endsWith('.gz')) {
            extPath = yield tc.extractTar(downloadPath);
        }
        core.debug(`Extracted to ${extPath}`);
        const cachePath = yield tc.cacheDir(extPath, 'octo', version);
        core.debug(`Cached to ${cachePath}`);
        const exePath = path.join(cachePath, osPlatform === 'win32' ? 'octo.exe' : 'octo');
        core.debug(`Executable path is ${exePath}`);
        core.info(`🐙 Octopus CLI ${octopusCliDownload.version} installed successfully`);
        return exePath;
    });
}
exports.installOctopusCli = installOctopusCli;
//# sourceMappingURL=octopus-cli.js.map