let input = require('fs').readFileSync('input', 'utf8').trim().split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('')

class AbstractPacket{
  constructor(packet_string){
    this.version = parseInt(packet_string.substring(0, 3), 2)
    this.typeID = parseInt(packet_string.substring(3, 6), 2)
    this.ptr = 6
  }
}

class Packet extends AbstractPacket{
  constructor(packet_string){
    super(packet_string)
    if(this.typeID == 4) return new LiteralPacket(packet_string)
    else return new OperatorPacket(packet_string)
  }
}

class LiteralPacket extends AbstractPacket {
  constructor(packet_string){
    super(packet_string);
    this.value = "";
    while(true){
      let keep_reading = packet_string.substring(this.ptr, this.ptr+1)
      this.value += packet_string.substring(this.ptr+1, this.ptr+5)
      this.ptr+=5
      if(keep_reading == '0') break
    }
    this.value = parseInt(this.value, 2)
  }
}

class OperatorPacket extends AbstractPacket {
  constructor(packet_string){
    super(packet_string);
    this.packets = []
    this.length_typeID = packet_string.substring(this.ptr, this.ptr+1)
    this.ptr+=1
    if(this.length_typeID === '0'){
      this.length = parseInt(packet_string.substring(this.ptr, this.ptr+15), 2)
      this.ptr+=15
      let start = this.ptr
      for(; this.ptr-start < this.length;){
        let packet = new Packet(packet_string.substring(this.ptr))
        this.packets.push(packet)
        this.ptr += packet.ptr
      }

    } else if(this.length_typeID === '1'){
      this.length = parseInt(packet_string.substring(this.ptr, this.ptr+11), 2)
      this.ptr+=11
      for(let j = 0; j < this.length; j++){
        let packet = new Packet(packet_string.substring(this.ptr))
        this.packets.push(packet)
        this.ptr += packet.ptr
      }
    }
  }
}

function getSumVersions(packet){
  let total = packet.version
  if(packet.typeID == 4) return total
  for(let i = 0; i < packet.packets.length; i++){
    total += getSumVersions(packet.packets[i])
  }
  return total
}

let p = new Packet(input)
console.log(getSumVersions(p))

