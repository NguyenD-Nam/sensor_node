gas = 0
wind = 0
light2 = 0
NPNLCD.lcd_init()
pins.digital_write_pin(DigitalPin.P1, 0)
pins.digital_write_pin(DigitalPin.P2, 0)

def on_forever():
    global light2, wind, gas
    NPNBitKit.dht11_read(DigitalPin.P5)
    NPNLCD.show_string("Temp:" + str(NPNBitKit.dht11_temp()) + "C", 0, 0)
    NPNLCD.show_string("Humid:" + str(NPNBitKit.dht11_hum()) + "%", 0, 1)
    light2 = pins.analog_read_pin(AnalogPin.P3)
    if light2 < 600:
        NPNLCD.show_string("Night", 10, 0)
    else:
        NPNLCD.show_string("Day  ", 10, 0)
    wind = pins.analog_read_pin(AnalogPin.P10)
    if wind < 750:
        NPNLCD.show_string("Normal", 10, 1)
    else:
        NPNLCD.show_string("Windy ", 10, 1)
    gas = pins.digital_read_pin(DigitalPin.P4)
    if gas == 0:
        pins.digital_write_pin(DigitalPin.P1, 0)
        pins.digital_write_pin(DigitalPin.P2, 1)
    else:
        pins.digital_write_pin(DigitalPin.P1, 1)
        pins.digital_write_pin(DigitalPin.P2, 0)
    serial.write_string("!TEMP:" + str(NPNBitKit.dht11_temp()) + "#" + "!HUMID:" + str(NPNBitKit.dht11_hum()) + "#" + "!WIND:" + str(pins.analog_read_pin(AnalogPin.P10)) + "#")
    basic.pause(5000)
basic.forever(on_forever)
