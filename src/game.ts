import { image, texture } from '@engine'

import { Container, Renderer, Sprite, Texture, Ticker } from 'pixi.js'

const { windowWidth, windowHeight } = wx.getSystemInfoSync()

const stage = new Container()

const renderer = new Renderer({
    width: windowWidth,
    height: windowHeight,
    view: GameGlobal.canvas,
    backgroundColor: 0x88aa88
})

Ticker.shared.add(() => renderer.render(stage))

class AssetsImage {
    @image('bullet.png') static Bullet: string
}

class AssetsTexture {
    @texture(AssetsImage.Bullet) static Bullet: Texture
}

class Bullet extends Sprite {
    constructor() {
        super()
        this.texture = AssetsTexture.Bullet
    }
}

const spriteBullet = new Bullet()

stage.addChild(spriteBullet)
