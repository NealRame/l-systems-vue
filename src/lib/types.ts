import {
    type TLSystemWord,
    type TLSystemSymbols,
    type TLSystemProductionRulesMap,
    type TLSystemRenderingRulesMap,
} from "@nealrame/l-system"

type TLSystemRendererComponentProps<A extends TLSystemSymbols = TLSystemSymbols> = {
    axiom: TLSystemWord<A>
    productionRules: TLSystemProductionRulesMap<A>
    renderingRules: TLSystemRenderingRulesMap<A>
    steps: number
    backgroundColor?: string | null
    stroke?: string
    strokeWidth?: number
    padding?: number
}

export type TLSystemSVGRendererComponentProps<A extends TLSystemSymbols = TLSystemSymbols>
    = TLSystemRendererComponentProps<A>

export type TLSystemCanvasRendererComponentProps<A extends TLSystemSymbols = TLSystemSymbols>
    = TLSystemRendererComponentProps<A> & {
        width?: number
        height?: number
    }
