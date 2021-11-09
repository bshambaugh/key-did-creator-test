import * as name from './did-key-creator/lib/encodeDIDkey.js'
import * as utils from './did-key-creator/lib/utils.js'
import * as u8a from 'uint8arrays'
import ec from 'elliptic'
var EC = ec.ec;

var multicodecName = 'p256-pub';

const  ecurve = new EC('p256');
const  key = ecurve.genKeyPair();
const  pubPoint = key.getPublic('hex');

const rawKey = utils.rawKeyInHexfromUncompressed(pubPoint);
const compressedKey = utils.compressedKeyInHexfromRaw(rawKey);

const publicKey2 = u8a.fromString(compressedKey,'base16');
console.log(name.encodeDIDfromHexString(multicodecName,compressedKey));
console.log(name.encodeDIDfromBytes(multicodecName,publicKey2));
