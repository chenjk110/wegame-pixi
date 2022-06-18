import { trace } from "console"
import { Texture } from "pixi.js"

const resolveImageUrl = (src: string) => {
    if (/\.?\.\//.test(src) || /^\\/.test(src) || /^@/.test(src)) {
        return require(src)
    }
    return require(`@/assets/images/${src}`)
}

export function image(src: string): any
export function image(target: new () => any, key?: any): any
export function image(target: new () => any, key?: any): any
export function image(...args: any) {
    if (typeof args[0] === 'string') {
        let [src] = args
        return (target: any, key: any) => {
            src = src ?? target[key]
            target[key] = resolveImageUrl(src)
        }
    }
    const [target, key] = args
    target[key] = resolveImageUrl(target[key])
}

export function texture(image: string)
export function texture(target: any, key: any)
export function texture(...args: any): any {
    if (typeof args[0] === 'string') {
        const [imageSrc] = args
        return (target: any, key: any) => {
            target[key] = Texture.from(image(imageSrc))
        }
    }
    const [target, key] = args
    target[key] = Texture.from(target[key])
}
