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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.didKeyURLtoPubKeyHex = exports.didKeyIDtoPubKeyHex = exports.pubKeyHexToUint8Array = exports.rawKeyInHexfromUncompressed = exports.uncompressedKeyInHexfromRaw = exports.compressedKeyInHexfromRaw = exports.ECPointCompress = void 0;
const u8a = __importStar(require("uint8arrays"));
const multicodec_1 = __importDefault(require("multicodec"));
const multibase_1 = __importDefault(require("multibase"));
function ECPointCompress(x, y) {
    const out = new Uint8Array(x.length + 1);
    out[0] = 2 + (y[y.length - 1] & 1);
    out.set(x, 1);
    return out;
}
exports.ECPointCompress = ECPointCompress;
function compressedKeyInHexfromRaw(publicKeyHex) {
    const xHex = publicKeyHex.slice(0, publicKeyHex.length / 2);
    const yHex = publicKeyHex.slice(publicKeyHex.length / 2, publicKeyHex.length);
    const xOctet = u8a.fromString(xHex, 'base16');
    const yOctet = u8a.fromString(yHex, 'base16');
    const compressedPoint = ECPointCompress(xOctet, yOctet);
    const compressedPointHex = u8a.toString(compressedPoint, 'base16');
    return compressedPointHex;
}
exports.compressedKeyInHexfromRaw = compressedKeyInHexfromRaw;
function uncompressedKeyInHexfromRaw(publicKeyHex) {
    return '04' + publicKeyHex;
}
exports.uncompressedKeyInHexfromRaw = uncompressedKeyInHexfromRaw;
function rawKeyInHexfromUncompressed(publicKeyHex) {
    return publicKeyHex.slice(2);
}
exports.rawKeyInHexfromUncompressed = rawKeyInHexfromUncompressed;
function pubKeyHexToUint8Array(publicKeyHex) {
    if (publicKeyHex == null) {
        throw new TypeError('input cannot be null or undefined.');
    }
    if (publicKeyHex.length % 2 == 0) {
        return u8a.fromString(publicKeyHex, 'base16');
    }
    else {
        return u8a.fromString(('0' + publicKeyHex), 'base16');
    }
}
exports.pubKeyHexToUint8Array = pubKeyHexToUint8Array;
function didKeyIDtoPubKeyHex(didKeyID) {
    const buf = multibase_1.default.decode(didKeyID);
    const bufwoPrefix = multicodec_1.default.rmPrefix(buf);
    return u8a.toString(bufwoPrefix, 'base16');
}
exports.didKeyIDtoPubKeyHex = didKeyIDtoPubKeyHex;
function didKeyURLtoPubKeyHex(didKeyURL) {
    const didKeyID = didKeyURL.split(':')[2];
    return didKeyIDtoPubKeyHex(didKeyID);
}
exports.didKeyURLtoPubKeyHex = didKeyURLtoPubKeyHex;
//# sourceMappingURL=utils.js.map