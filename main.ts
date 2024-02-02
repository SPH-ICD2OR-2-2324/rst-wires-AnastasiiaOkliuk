namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function _4wires () {
    redcounter = 0
    blueCounter = 0
    yellowCounter = 0
    for (let value of WireList) {
        if (value == 0) {
            redcounter += 1
        } else if (value == 1) {
            blueCounter += 1
        } else if (value == 2) {
            yellowCounter += 2
        } else if (value == 2) {
        	
        }
    }
    if (redcounter > 1 && SerialNumber % 2 == 1) {
        if (WireList[3] == 0) {
            game.splash("Cut Wire 4")
        } else if (WireList[2] == 0) {
            game.splash("Cut Wire 3")
        } else {
            game.splash("Cut Wire 2")
        }
    }
    if (yellowCounter >= 1 && redcounter == 0) {
        if (WireList[4] == 1) {
            game.splash("Cut Wire 1")
        }
    } else if (yellowCounter > 1) {
        game.splash("Cut Wire 4")
    } else if (blueCounter == 1) {
        game.splash("Cut Wire 1")
    } else {
        game.splash("Cut Wire 2")
    }
}
function _5wires () {
    blackCounter = 0
    redcounter = 0
    yellowCounter = 0
    for (let value of WireList) {
        if (value == 0) {
            blackCounter += 1
        } else if (value == 1) {
            redcounter += 1
        } else if (value == 2) {
            yellowCounter += 2
        }
    }
    if (blackCounter >= 1 && SerialNumber % 2 == 1) {
        if (WireList[6] == 1) {
            game.splash("Cut Wire 4")
        }
    }
    if (redcounter == 1 && yellowCounter > 1) {
        game.splash("Cut Wire 1")
    } else if (blackCounter == 0) {
        game.splash("Cut Wire 2")
    } else {
        game.splash("Cut Wire 1")
    }
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        _3Wires()
    } else if (wireCount == 4) {
        _4wires()
    } else if (wireCount == 5) {
        _5wires()
    } else if (wireCount == 6) {
        _6wires()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function _6wires () {
    yellowCounter = 0
    whiteCounter = 0
    redcounter = 0
    for (let value of WireList) {
        if (value == 1) {
            yellowCounter += 1
        } else if (value == 1) {
            whiteCounter += 1
        } else if (value == 0) {
            redcounter += 0
        }
    }
    if (yellowCounter == 0 && SerialNumber % 2 == 1) {
        game.splash("Cut Wire 3")
    }
    if (yellowCounter == 1 && whiteCounter > 1) {
        game.splash("Cut Wire 4")
    } else if (redcounter == 0) {
        game.splash("Cut Wire 6")
    } else {
        game.splash("Cut Wire 4")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _3Wires () {
    redcounter = 0
    whiteCounter = 0
    blueCounter = 0
    for (let value of WireList) {
        if (value == 0) {
            redcounter += 1
        } else if (value == 1) {
            whiteCounter += 1
        } else if (value == 2) {
            blueCounter += 2
        }
    }
    if (redcounter == 0) {
        game.splash("Cut Wire 2")
    } else if (blueCounter > 1) {
        game.splash("Cut The Last Blue Wire ")
    } else if (whiteCounter > 1) {
        if (WireList[3] == 1) {
            game.splash("Cut Wire 3")
        }
    } else {
        game.splash("Cut Wire 3")
    }
}
let whiteCounter = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let blackCounter = 0
let SerialNumber = 0
let WireList: number[] = []
let yellowCounter = 0
let blueCounter = 0
let redcounter = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
