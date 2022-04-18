bluetooth.onBluetoothConnected(function () {
    let a: number;
let b: number;
let distance: number;
basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
    TPBot.headlightColor(0x00ff00)
    basic.pause(1000)
    TPBot.headlightClose()
    connected = 1
    while (connected == 1) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        CarCtrl()
        domusic()
        SevenColorLED()
        a = 0
        if (input.buttonIsPressed(Button.A)) {
            a = 1
        }
        b = 0
        distance = Tinybit.Ultrasonic_Car()
        if (input.buttonIsPressed(Button.B)) {
            b = 1
        }
        left = 0
        if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black)) {
            left = 1
        }
        right = 0
        if (Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            right = 1
        }
        str1 = "" + distance + ","
        str2 = "" + a + "," + b + ","
        str3 = "" + left + "," + right + "#"
        CSB = "$CSB" + str1 + str2 + str3
        bluetooth.uartWriteString(CSB)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
    connected = 0
    basic.showString(control.deviceName())
})
function domusic () {
    if (uartdata == "1") {
        music.ringTone(262)
    } else if (uartdata == "2") {
        music.ringTone(294)
    } else if (uartdata == "3") {
        music.ringTone(330)
    } else if (uartdata == "4") {
        music.ringTone(349)
    } else if (uartdata == "5") {
        music.ringTone(392)
    } else if (uartdata == "6") {
        music.ringTone(440)
    } else if (uartdata == "7") {
        music.ringTone(494)
    } else if (uartdata == "8") {
        music.ringTone(523)
    } else if (uartdata == "B1") {
        music.ringTone(277)
    } else if (uartdata == "B2") {
        music.ringTone(311)
    } else if (uartdata == "B3") {
        music.ringTone(370)
    } else if (uartdata == "B4") {
        music.ringTone(415)
    } else if (uartdata == "B5") {
        music.ringTone(466)
    } else if (uartdata == "O") {
        music.stopAllSounds()
    }
}
function SevenColorLED () {
    if (uartdata == "G") {
        TPBot.headlightColor(0xff0000)
    } else if (uartdata == "H") {
        TPBot.headlightColor(0x00ff00)
    } else if (uartdata == "I") {
        TPBot.headlightColor(0x007fff)
    } else if (uartdata == "J") {
        TPBot.headlightColor(0xffff00)
    } else if (uartdata == "K") {
        TPBot.headlightColor(0x00ffff)
    } else if (uartdata == "L") {
        TPBot.headlightColor(0xff9da5)
    } else if (uartdata == "M") {
        TPBot.headlightColor(0xffffff)
    } else if (uartdata == "N") {
        TPBot.headlightClose()
    }
}
function CarCtrl () {
    if (uartdata == "A") {
        TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 100)
    } else if (uartdata == "B") {
        TPBot.setTravelSpeed(TPBot.DriveDirection.Backward, 100)
    } else if (uartdata == "C") {
        TPBot.setWheels(0, 100)
    } else if (uartdata == "D") {
        TPBot.setTravelSpeed(TPBot.DriveDirection.Right, 100)
    } else if (uartdata == "E") {
        TPBot.setTravelSpeed(TPBot.DriveDirection.Left, 100)
    } else if (uartdata == "F") {
        TPBot.setWheels(100, 0)
    } else if (uartdata == "0") {
        TPBot.stopCar()
    }
}
let CSB = ""
let str3 = ""
let str2 = ""
let str1 = ""
let right = 0
let left = 0
let uartdata = ""
let connected = 0
let distance2 = 0
Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
bluetooth.startLEDService()
basic.showString(control.deviceName())
basic.showString("S")
