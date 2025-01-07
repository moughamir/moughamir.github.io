import { ThreeElements } from '@react-three/fiber'

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends ThreeElements {


                imageRevealMaterial
            }
        }
    }
}



export interface Size {
    width: number
    height: number
}

export interface Dimensions {
    width: number
    height: number
    pixelRatio: number
}

export interface Position {
    x: number
    y: number
}