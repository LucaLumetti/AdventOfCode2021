let input = require('fs').readFileSync('input', 'utf8').trim().split('').map(i => parseInt(i, 16).toString(2).padStart(4, '0')).join('')

class AbstractPacket{
  constructor(packet_string){
    this.version = parseInt(packet_string.substring(0, 3), 2)
    this.typeID = parseInt(packet_string.substring(3, 6), 2)
    this.ptr = 6
    this.value;
  }
}

class Packet extends AbstractPacket{
  constructor(packet_string){
    super(packet_string)
    if(this.typeID == 0) return new SumPacket(packet_string)
    if(this.typeID == 1) return new ProdPacket(packet_string)
    if(this.typeID == 2) return new MinPacket(packet_string)
    if(this.typeID == 3) return new MaxPacket(packet_string)
    if(this.typeID == 4) return new LiteralPacket(packet_string)
    if(this.typeID == 5) return new GTPacket(packet_string)
    if(this.typeID == 6) return new LTPacket(packet_string)
    if(this.typeID == 7) return new EQPacket(packet_string)
    else console.log('Unknown packet type')
  }
}

class LiteralPacket extends AbstractPacket {
  constructor(packet_string){
    super(packet_string);
    let value_str = ""
    while(true){
      let keep_reading = packet_string.substring(this.ptr, this.ptr+1)
      value_str += packet_string.substring(this.ptr+1, this.ptr+5)
      this.ptr+=5
      if(keep_reading == '0') break
    }
    this.value = parseInt(value_str, 2)
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

class SumPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets.reduce((acc, packet) => acc + packet.value, 0)
  }
}

class ProdPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets.reduce((acc, packet) => acc * packet.value, 1)
  }
}

class MinPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets.reduce((acc, packet) => Math.min(acc, packet.value), this.packets[0].value)
  }
}

class MaxPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets.reduce((acc, packet) => Math.max(acc, packet.value), this.packets[0].value)
  }
}

class GTPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets[0].value > this.packets[1].value ? 1 : 0
  }
}

class LTPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets[0].value < this.packets[1].value ? 1 : 0
  }
}

class EQPacket extends OperatorPacket {
  constructor(packet_string){
    super(packet_string)
    this.value = this.packets[0].value == this.packets[1].value ? 1 : 0
  }
}

let p = new Packet(input)
console.log(p.value)
