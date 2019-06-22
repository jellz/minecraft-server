// Lookup most clientbound packets.

const protocol = require('minecraft-data/data/pc/1.14/protocol.json');
const util = require('util');
const hex = process.argv[process.argv.length - 1].replace("0x", "");
if (!/^[0-F]{2}$/i.test(hex)) {
  console.error(`Invalid argument!
  Usage: node protocolJsonLookup.js 0x30 (or) 30
    (where 30 is the packet)`)
  process.exit(1);
}
const data = protocol.play.toClient.types;
const indexPacket = data.packet;
const mappings = indexPacket[1][0].type[1].mappings;
console.log(`Found packet ${mappings[`0x${hex}`]}`);
console.log(data[`packet_${mappings[`0x${hex}`]}`][1]);
// console.log(util.inspect(protocol.play.toClient.types,false,5));
