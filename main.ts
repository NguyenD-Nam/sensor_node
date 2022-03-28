let gas = 0
let wind = 0
let light2 = 0
NPNLCD.LcdInit()
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
basic.forever(function () {
    NPNBitKit.DHT11Read(DigitalPin.P5)
    NPNLCD.ShowString("Temp:" + NPNBitKit.DHT11Temp() + "C", 0, 0)
    NPNLCD.ShowString("Humid:" + NPNBitKit.DHT11Hum() + "%", 0, 1)
    light2 = pins.analogReadPin(AnalogPin.P3)
    if (light2 < 700) {
        NPNLCD.ShowString("Night", 10, 0)
    } else {
        NPNLCD.ShowString("Day  ", 10, 0)
    }
    wind = pins.analogReadPin(AnalogPin.P10)
    if (wind < 350) {
        NPNLCD.ShowString("Normal", 10, 1)
    } else {
        NPNLCD.ShowString("Windy ", 10, 1)
    }
    gas = pins.digitalReadPin(DigitalPin.P4)
    if (gas == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    serial.writeString("!1:TEMP:" + NPNBitKit.DHT11Temp() + "#" + "!1:HUMID:" + NPNBitKit.DHT11Hum() + "#" + "!1:WIND:" + pins.analogReadPin(AnalogPin.P10) + "#")
    basic.pause(6000)
})
