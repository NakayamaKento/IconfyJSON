"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const tools_1 = require("@iconify/tools");
// Import icons
const iconSet = (0, tools_1.importDirectorySync)('Azure_Public_Service_Icons/Icons/allicons', {
    prefix: 'Azure',
});
// Validate, clean up, fix palette and optimise
iconSet.forEachSync((name, type) => {
    if (type !== 'icon') {
        return;
    }
    const svg = iconSet.toSVG(name);
    if (!svg) {
        // Invalid icon
        iconSet.remove(name);
        return;
    }
    // Clean up and optimise icons
    try {
        // Clean up icon code
        (0, tools_1.cleanupSVG)(svg);
        /*
        // Assume icon is monotone: replace color with currentColor, add if missing
        // If icon is not monotone, remove this code
        parseColors(svg, {
            defaultColor: 'currentColor',
            callback: (attr, colorStr, color) => {
                return !color || isEmptyColor(color)
                    ? colorStr
                    : 'currentColor';
            },
        });
        */
        // Optimise
        (0, tools_1.runSVGO)(svg);
    }
    catch (err) {
        // Invalid icon
        console.error(`Error parsing ${name}:`, err);
        iconSet.remove(name);
        return;
    }
    // Update icon
    iconSet.fromSVG(name, svg);
});
// Export
console.log(iconSet.export());
// Export to file
const output = iconSet.export();
fs.writeFileSync('allicons.json', JSON.stringify(output, null, 2));
//# sourceMappingURL=app.js.map