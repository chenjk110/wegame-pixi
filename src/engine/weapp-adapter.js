;(function() {
    'use strict'

    function noop() {}

    let performance

    if (wx.getPerformance) {
        const { platform } = wx.getSystemInfoSync()
        const wxPerf = wx.getPerformance()
        const initTime = wxPerf.now()

        const clientPerfAdapter = Object.assign({}, wxPerf, {
            now: function() {
                return (wxPerf.now() - initTime) / 1000
            }
        })

        performance = platform === 'devtools' ? wxPerf : clientPerfAdapter
    } else {
        performance = {
            timeOrigin: Date.now(),
            now: function() {
                return Date.now() - this.timeOrigin
            }
        }
    }

    var performance$1 = performance

    const {
        screenWidth,
        screenHeight,
        devicePixelRatio
    } = wx.getSystemInfoSync()

    const innerWidth = screenWidth
    const innerHeight = screenHeight
    const screen = {
        width: screenWidth,
        height: screenHeight,
        availWidth: innerWidth,
        availHeight: innerHeight,
        availLeft: 0,
        availTop: 0
    }
    const scrollX = 0
    const scrollY = 0
    const ontouchstart = null
    const ontouchmove = null
    const ontouchend = null

    function parentNode(obj, level) {
        if (!('parentNode' in obj)) {
            let _parent

            if (level === 0) {
                _parent = function() {
                    // return document
                    return null
                }
            } else if (level === 1) {
                _parent = function() {
                    return document.documentElement
                }
            } else {
                _parent = function() {
                    return document.body
                }
            }

            Object.defineProperty(obj, 'parentNode', {
                enumerable: true,
                get: _parent
            })
        }

        if (!('parentElement' in obj)) {
            let _parent

            if (level === 0) {
                _parent = function() {
                    return null
                }
            } else if (level === 1) {
                _parent = function() {
                    return document.documentElement
                }
            } else {
                _parent = function() {
                    return document.body
                }
            }

            Object.defineProperty(obj, 'parentElement', {
                enumerable: true,
                get: _parent
            })
        }
    }

    function style$1(obj) {
        obj.style = obj.style || {}

        Object.assign(obj.style, {
            top: '0px',
            left: '0px',
            width: innerWidth + 'px',
            height: innerHeight + 'px',
            margin: '0px',
            padding: '0px'
        })
    }

    function clientRegion(obj) {
        if (!('clientLeft' in obj)) {
            obj.clientLeft = 0
            obj.clientTop = 0
        }
        if (!('clientWidth' in obj)) {
            obj.clientWidth = innerWidth
            obj.clientHeight = innerHeight
        }

        if (!('getBoundingClientRect' in obj)) {
            obj.getBoundingClientRect = function() {
                const ret = {
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0,
                    width: this.clientWidth,
                    height: this.clientHeight
                }
                ret.right = ret.width
                ret.bottom = ret.height

                return ret
            }
        }
    }

    function offsetRegion(obj) {
        if (!('offsetLeft' in obj)) {
            obj.offsetLeft = 0
            obj.offsetTop = 0
        }
        if (!('offsetWidth' in obj)) {
            obj.offsetWidth = innerWidth
            obj.offsetHeight = innerHeight
        }
    }

    function scrollRegion(obj) {
        if (!('scrollLeft' in obj)) {
            obj.scrollLeft = 0
            obj.scrollTop = 0
        }
        if (!('scrollWidth' in obj)) {
            obj.scrollWidth = innerWidth
            obj.scrollHeight = innerHeight
        }
    }

    function classList(obj) {
        const noop = function() {}
        obj.classList = []
        obj.classList.add = noop
        obj.classList.remove = noop
        obj.classList.contains = noop
        obj.classList.toggle = noop
    }

    function Canvas() {
        const canvas = wx.createCanvas()

        canvas.getContext

        // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

        if (!('tagName' in canvas)) {
            canvas.tagName = 'CANVAS'
        }

        canvas.type = 'canvas'

        parentNode(canvas)
        style$1(canvas)
        classList(canvas)
        clientRegion(canvas)
        offsetRegion(canvas)

        canvas.focus = function() {}
        canvas.blur = function() {}

        canvas.addEventListener = function(type, listener, options = {}) {
            // console.log('canvas.addEventListener', type);
            document.addEventListener(type, listener, options)
        }

        canvas.removeEventListener = function(type, listener) {
            // console.log('canvas.removeEventListener', type);
            document.removeEventListener(type, listener)
        }

        canvas.dispatchEvent = function(event = {}) {
            console.log('canvas.dispatchEvent', event.type, event)
            // nothing to do
        }

        return canvas
    }

    const style = {
        '0': 'animation-delay',
        '1': 'animation-direction',
        '2': 'animation-duration',
        '3': 'animation-fill-mode',
        '4': 'animation-iteration-count',
        '5': 'animation-name',
        '6': 'animation-play-state',
        '7': 'animation-timing-function',
        '8': 'background-attachment',
        '9': 'background-blend-mode',
        '10': 'background-clip',
        '11': 'background-color',
        '12': 'background-image',
        '13': 'background-origin',
        '14': 'background-position',
        '15': 'background-repeat',
        '16': 'background-size',
        '17': 'border-bottom-color',
        '18': 'border-bottom-left-radius',
        '19': 'border-bottom-right-radius',
        '20': 'border-bottom-style',
        '21': 'border-bottom-width',
        '22': 'border-collapse',
        '23': 'border-image-outset',
        '24': 'border-image-repeat',
        '25': 'border-image-slice',
        '26': 'border-image-source',
        '27': 'border-image-width',
        '28': 'border-left-color',
        '29': 'border-left-style',
        '30': 'border-left-width',
        '31': 'border-right-color',
        '32': 'border-right-style',
        '33': 'border-right-width',
        '34': 'border-top-color',
        '35': 'border-top-left-radius',
        '36': 'border-top-right-radius',
        '37': 'border-top-style',
        '38': 'border-top-width',
        '39': 'bottom',
        '40': 'box-shadow',
        '41': 'box-sizing',
        '42': 'break-after',
        '43': 'break-before',
        '44': 'break-inside',
        '45': 'caption-side',
        '46': 'clear',
        '47': 'clip',
        '48': 'color',
        '49': 'content',
        '50': 'cursor',
        '51': 'direction',
        '52': 'display',
        '53': 'empty-cells',
        '54': 'float',
        '55': 'font-family',
        '56': 'font-kerning',
        '57': 'font-size',
        '58': 'font-stretch',
        '59': 'font-style',
        '60': 'font-variant',
        '61': 'font-variant-ligatures',
        '62': 'font-variant-caps',
        '63': 'font-variant-numeric',
        '64': 'font-variant-east-asian',
        '65': 'font-weight',
        '66': 'height',
        '67': 'image-rendering',
        '68': 'isolation',
        '69': 'justify-items',
        '70': 'justify-self',
        '71': 'left',
        '72': 'letter-spacing',
        '73': 'line-height',
        '74': 'list-style-image',
        '75': 'list-style-position',
        '76': 'list-style-type',
        '77': 'margin-bottom',
        '78': 'margin-left',
        '79': 'margin-right',
        '80': 'margin-top',
        '81': 'max-height',
        '82': 'max-width',
        '83': 'min-height',
        '84': 'min-width',
        '85': 'mix-blend-mode',
        '86': 'object-fit',
        '87': 'object-position',
        '88': 'offset-distance',
        '89': 'offset-path',
        '90': 'offset-rotate',
        '91': 'opacity',
        '92': 'orphans',
        '93': 'outline-color',
        '94': 'outline-offset',
        '95': 'outline-style',
        '96': 'outline-width',
        '97': 'overflow-anchor',
        '98': 'overflow-wrap',
        '99': 'overflow-x',
        '100': 'overflow-y',
        '101': 'padding-bottom',
        '102': 'padding-left',
        '103': 'padding-right',
        '104': 'padding-top',
        '105': 'pointer-events',
        '106': 'position',
        '107': 'resize',
        '108': 'right',
        '109': 'scroll-behavior',
        '110': 'speak',
        '111': 'table-layout',
        '112': 'tab-size',
        '113': 'text-align',
        '114': 'text-align-last',
        '115': 'text-decoration',
        '116': 'text-decoration-line',
        '117': 'text-decoration-style',
        '118': 'text-decoration-color',
        '119': 'text-decoration-skip-ink',
        '120': 'text-underline-position',
        '121': 'text-indent',
        '122': 'text-rendering',
        '123': 'text-shadow',
        '124': 'text-size-adjust',
        '125': 'text-overflow',
        '126': 'text-transform',
        '127': 'top',
        '128': 'touch-action',
        '129': 'transition-delay',
        '130': 'transition-duration',
        '131': 'transition-property',
        '132': 'transition-timing-function',
        '133': 'unicode-bidi',
        '134': 'vertical-align',
        '135': 'visibility',
        '136': 'white-space',
        '137': 'widows',
        '138': 'width',
        '139': 'will-change',
        '140': 'word-break',
        '141': 'word-spacing',
        '142': 'word-wrap',
        '143': 'z-index',
        '144': 'zoom',
        '145': '-webkit-appearance',
        '146': 'backface-visibility',
        '147': '-webkit-border-horizontal-spacing',
        '148': '-webkit-border-image',
        '149': '-webkit-border-vertical-spacing',
        '150': '-webkit-box-align',
        '151': '-webkit-box-decoration-break',
        '152': '-webkit-box-direction',
        '153': '-webkit-box-flex',
        '154': '-webkit-box-flex-group',
        '155': '-webkit-box-lines',
        '156': '-webkit-box-ordinal-group',
        '157': '-webkit-box-orient',
        '158': '-webkit-box-pack',
        '159': '-webkit-box-reflect',
        '160': 'column-count',
        '161': 'column-gap',
        '162': 'column-rule-color',
        '163': 'column-rule-style',
        '164': 'column-rule-width',
        '165': 'column-span',
        '166': 'column-width',
        '167': 'align-content',
        '168': 'align-items',
        '169': 'align-self',
        '170': 'flex-basis',
        '171': 'flex-grow',
        '172': 'flex-shrink',
        '173': 'flex-direction',
        '174': 'flex-wrap',
        '175': 'justify-content',
        '176': '-webkit-font-smoothing',
        '177': 'grid-auto-columns',
        '178': 'grid-auto-flow',
        '179': 'grid-auto-rows',
        '180': 'grid-column-end',
        '181': 'grid-column-start',
        '182': 'grid-template-areas',
        '183': 'grid-template-columns',
        '184': 'grid-template-rows',
        '185': 'grid-row-end',
        '186': 'grid-row-start',
        '187': 'grid-column-gap',
        '188': 'grid-row-gap',
        '189': '-webkit-highlight',
        '190': 'hyphens',
        '191': '-webkit-hyphenate-character',
        '192': '-webkit-line-break',
        '193': '-webkit-line-clamp',
        '194': '-webkit-locale',
        '195': '-webkit-margin-before-collapse',
        '196': '-webkit-margin-after-collapse',
        '197': '-webkit-mask-box-image',
        '198': '-webkit-mask-box-image-outset',
        '199': '-webkit-mask-box-image-repeat',
        '200': '-webkit-mask-box-image-slice',
        '201': '-webkit-mask-box-image-source',
        '202': '-webkit-mask-box-image-width',
        '203': '-webkit-mask-clip',
        '204': '-webkit-mask-composite',
        '205': '-webkit-mask-image',
        '206': '-webkit-mask-origin',
        '207': '-webkit-mask-position',
        '208': '-webkit-mask-repeat',
        '209': '-webkit-mask-size',
        '210': 'order',
        '211': 'perspective',
        '212': 'perspective-origin',
        '213': '-webkit-print-color-adjust',
        '214': '-webkit-rtl-ordering',
        '215': 'shape-outside',
        '216': 'shape-image-threshold',
        '217': 'shape-margin',
        '218': '-webkit-tap-highlight-color',
        '219': '-webkit-text-combine',
        '220': '-webkit-text-decorations-in-effect',
        '221': '-webkit-text-emphasis-color',
        '222': '-webkit-text-emphasis-position',
        '223': '-webkit-text-emphasis-style',
        '224': '-webkit-text-fill-color',
        '225': '-webkit-text-orientation',
        '226': '-webkit-text-security',
        '227': '-webkit-text-stroke-color',
        '228': '-webkit-text-stroke-width',
        '229': 'transform',
        '230': 'transform-origin',
        '231': 'transform-style',
        '232': '-webkit-user-drag',
        '233': '-webkit-user-modify',
        '234': 'user-select',
        '235': '-webkit-writing-mode',
        '236': '-webkit-app-region',
        '237': 'buffered-rendering',
        '238': 'clip-path',
        '239': 'clip-rule',
        '240': 'mask',
        '241': 'filter',
        '242': 'flood-color',
        '243': 'flood-opacity',
        '244': 'lighting-color',
        '245': 'stop-color',
        '246': 'stop-opacity',
        '247': 'color-interpolation',
        '248': 'color-interpolation-filters',
        '249': 'color-rendering',
        '250': 'fill',
        '251': 'fill-opacity',
        '252': 'fill-rule',
        '253': 'marker-end',
        '254': 'marker-mid',
        '255': 'marker-start',
        '256': 'mask-type',
        '257': 'shape-rendering',
        '258': 'stroke',
        '259': 'stroke-dasharray',
        '260': 'stroke-dashoffset',
        '261': 'stroke-linecap',
        '262': 'stroke-linejoin',
        '263': 'stroke-miterlimit',
        '264': 'stroke-opacity',
        '265': 'stroke-width',
        '266': 'alignment-baseline',
        '267': 'baseline-shift',
        '268': 'dominant-baseline',
        '269': 'text-anchor',
        '270': 'writing-mode',
        '271': 'vector-effect',
        '272': 'paint-order',
        '273': 'd',
        '274': 'cx',
        '275': 'cy',
        '276': 'x',
        '277': 'y',
        '278': 'r',
        '279': 'rx',
        '280': 'ry',
        '281': 'caret-color',
        '282': 'line-break',

        display: 'inline',
        dominantBaseline: 'auto',
        emptyCells: 'show',
        fill: 'rgb(0, 0, 0)',
        fillOpacity: '1',
        fillRule: 'nonzero',
        filter: 'none',
        flex: '0 1 auto',
        flexBasis: 'auto',
        flexDirection: 'row',
        flexFlow: 'row nowrap',
        flexGrow: '0',
        flexShrink: '1',
        flexWrap: 'nowrap',
        float: 'none',
        floodColor: 'rgb(0, 0, 0)',
        floodOpacity: '1',
        font: 'normal normal 400 normal 16px / normal "PingFang SC"',
        fontDisplay: '',
        fontFamily: '"PingFang SC"',
        fontFeatureSettings: 'normal',
        fontKerning: 'auto',
        fontSize: '16px',
        fontStretch: '100%',
        fontStyle: 'normal',
        fontVariant: 'normal',
        fontVariantCaps: 'normal',
        fontVariantEastAsian: 'normal',
        fontVariantLigatures: 'normal',
        fontVariantNumeric: 'normal',
        fontVariationSettings: 'normal',
        fontWeight: '400',
        grid: 'none / none / none / row / auto / auto',
        gridArea: 'auto / auto / auto / auto',
        gridAutoColumns: 'auto',
        gridAutoFlow: 'row',
        gridAutoRows: 'auto',
        gridColumn: 'auto / auto',
        gridColumnEnd: 'auto',
        gridColumnGap: '0px',
        gridColumnStart: 'auto',
        gridGap: '0px 0px',
        gridRow: 'auto / auto',
        gridRowEnd: 'auto',
        gridRowGap: '0px',
        gridRowStart: 'auto',
        gridTemplate: 'none / none / none',
        gridTemplateAreas: 'none',
        gridTemplateColumns: 'none',
        gridTemplateRows: 'none',
        height: '0px',
        hyphens: 'manual',
        imageRendering: 'auto',
        inlineSize: '0px',
        isolation: 'auto',
        justifyContent: 'normal',
        justifyItems: 'normal',
        justifySelf: 'auto',
        left: 'auto',
        letterSpacing: 'normal',
        lightingColor: 'rgb(255, 255, 255)',
        lineBreak: 'auto',
        lineHeight: 'normal',
        listStyle: 'disc outside none',
        listStyleImage: 'none',
        listStylePosition: 'outside',
        listStyleType: 'disc',
        margin: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marker: '',
        markerEnd: 'none',
        markerMid: 'none',
        markerStart: 'none',
        mask: 'none',
        maskType: 'luminance',
        maxBlockSize: 'none',
        maxHeight: 'none',
        maxInlineSize: 'none',
        maxWidth: 'none',
        maxZoom: '',
        minBlockSize: '0px',
        minHeight: '0px',
        minInlineSize: '0px',
        minWidth: '0px',
        minZoom: '',
        mixBlendMode: 'normal',
        objectFit: 'fill',
        objectPosition: '50% 50%',
        offset: 'none 0px auto 0deg',
        offsetDistance: '0px',
        offsetPath: 'none',
        offsetRotate: 'auto 0deg',
        opacity: '1',
        order: '0',
        orientation: '',
        orphans: '2',
        outline: 'rgb(0, 0, 0) none 0px',
        outlineColor: 'rgb(0, 0, 0)',
        outlineOffset: '0px',
        outlineStyle: 'none',
        outlineWidth: '0px',
        overflow: 'visible',
        overflowAnchor: 'auto',
        overflowWrap: 'normal',
        overflowX: 'visible',
        overflowY: 'visible',
        overscrollBehavior: 'auto auto',
        overscrollBehaviorX: 'auto',
        overscrollBehaviorY: 'auto',
        padding: '0px',
        paddingBottom: '0px',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '0px',
        page: '',
        pageBreakAfter: 'auto',
        pageBreakBefore: 'auto',
        pageBreakInside: 'auto',
        paintOrder: 'fill stroke markers',
        perspective: 'none',
        perspectiveOrigin: '0px 0px',
        placeContent: 'normal normal',
        placeItems: 'normal normal',
        placeSelf: 'auto auto',
        pointerEvents: 'auto',
        position: 'static',
        quotes: '',
        r: '0px',
        resize: 'none',
        right: 'auto',
        rx: 'auto',
        ry: 'auto',
        scrollBehavior: 'auto',
        shapeImageThreshold: '0',
        shapeMargin: '0px',
        shapeOutside: 'none',
        shapeRendering: 'auto',
        size: '',
        speak: 'normal',
        src: '',
        stopColor: 'rgb(0, 0, 0)',
        stopOpacity: '1',
        stroke: 'none',
        strokeDasharray: 'none',
        strokeDashoffset: '0px',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: '4',
        strokeOpacity: '1',
        strokeWidth: '1px',
        tabSize: '8',
        tableLayout: 'auto',
        textAlign: 'start',
        textAlignLast: 'auto',
        textAnchor: 'start',
        textCombineUpright: 'none',
        textDecoration: 'none solid rgb(0, 0, 0)',
        textDecorationColor: 'rgb(0, 0, 0)',
        textDecorationLine: 'none',
        textDecorationSkipInk: 'auto',
        textDecorationStyle: 'solid',
        textIndent: '0px',
        textOrientation: 'mixed',
        textOverflow: 'clip',
        textRendering: 'auto',
        textShadow: 'none',
        textSizeAdjust: 'auto',
        textTransform: 'none',
        textUnderlinePosition: 'auto',
        top: 'auto',
        touchAction: 'auto',
        transform: 'none',
        transformBox: 'view-box',
        transformOrigin: '0px 0px',
        transformStyle: 'flat',
        transition: 'all 0s ease 0s',
        transitionDelay: '0s',
        transitionDuration: '0s',
        transitionProperty: 'all',
        transitionTimingFunction: 'ease',
        unicodeBidi: 'normal',
        unicodeRange: '',
        userSelect: 'auto',
        userZoom: '',
        vectorEffect: 'none',
        verticalAlign: 'baseline',
        visibility: 'visible',
        webkitAppRegion: 'no-drag',
        webkitAppearance: 'none',
        webkitBorderAfter: '0px none rgb(0, 0, 0)',
        webkitBorderAfterColor: 'rgb(0, 0, 0)',
        webkitBorderAfterStyle: 'none',
        webkitBorderAfterWidth: '0px',
        webkitBorderBefore: '0px none rgb(0, 0, 0)',
        webkitBorderBeforeColor: 'rgb(0, 0, 0)',
        webkitBorderBeforeStyle: 'none',
        webkitBorderBeforeWidth: '0px',
        webkitBorderEnd: '0px none rgb(0, 0, 0)',
        webkitBorderEndColor: 'rgb(0, 0, 0)',
        webkitBorderEndStyle: 'none',
        webkitBorderEndWidth: '0px',
        webkitBorderHorizontalSpacing: '0px',
        webkitBorderImage: 'none',
        webkitBorderStart: '0px none rgb(0, 0, 0)',
        webkitBorderStartColor: 'rgb(0, 0, 0)',
        webkitBorderStartStyle: 'none',
        webkitBorderStartWidth: '0px',
        webkitBorderVerticalSpacing: '0px',
        webkitBoxAlign: 'stretch',
        webkitBoxDecorationBreak: 'slice',
        webkitBoxDirection: 'normal',
        webkitBoxFlex: '0',
        webkitBoxFlexGroup: '1',
        webkitBoxLines: 'single',
        webkitBoxOrdinalGroup: '1',
        webkitBoxOrient: 'horizontal',
        webkitBoxPack: 'start',
        webkitBoxReflect: 'none',
        webkitColumnBreakAfter: 'auto',
        webkitColumnBreakBefore: 'auto',
        webkitColumnBreakInside: 'auto',
        webkitFontSizeDelta: '',
        webkitFontSmoothing: 'auto',
        webkitHighlight: 'none',
        webkitHyphenateCharacter: 'auto',
        webkitLineBreak: 'auto',
        webkitLineClamp: 'none',
        webkitLocale: 'auto',
        webkitLogicalHeight: '0px',
        webkitLogicalWidth: '0px',
        webkitMarginAfter: '0px',
        webkitMarginAfterCollapse: 'collapse',
        webkitMarginBefore: '0px',
        webkitMarginBeforeCollapse: 'collapse',
        webkitMarginBottomCollapse: 'collapse',
        webkitMarginCollapse: '',
        webkitMarginEnd: '0px',
        webkitMarginStart: '0px',
        webkitMarginTopCollapse: 'collapse',
        webkitMask: '',
        webkitMaskBoxImage: 'none',
        webkitMaskBoxImageOutset: '0px',
        webkitMaskBoxImageRepeat: 'stretch',
        webkitMaskBoxImageSlice: '0 fill',
        webkitMaskBoxImageSource: 'none',
        webkitMaskBoxImageWidth: 'auto',
        webkitMaskClip: 'border-box',
        webkitMaskComposite: 'source-over',
        webkitMaskImage: 'none',
        webkitMaskOrigin: 'border-box',
        webkitMaskPosition: '0% 0%',
        webkitMaskPositionX: '0%',
        webkitMaskPositionY: '0%',
        webkitMaskRepeat: 'repeat',
        webkitMaskRepeatX: '',
        webkitMaskRepeatY: '',
        webkitMaskSize: 'auto',
        webkitMaxLogicalHeight: 'none',
        webkitMaxLogicalWidth: 'none',
        webkitMinLogicalHeight: '0px',
        webkitMinLogicalWidth: '0px',
        webkitPaddingAfter: '0px',
        webkitPaddingBefore: '0px',
        webkitPaddingEnd: '0px',
        webkitPaddingStart: '0px',
        webkitPerspectiveOriginX: '',
        webkitPerspectiveOriginY: '',
        webkitPrintColorAdjust: 'economy',
        webkitRtlOrdering: 'logical',
        webkitRubyPosition: 'before',
        webkitTapHighlightColor: 'rgba(0, 0, 0, 0.4)',
        webkitTextCombine: 'none',
        webkitTextDecorationsInEffect: 'none',
        webkitTextEmphasis: '',
        webkitTextEmphasisColor: 'rgb(0, 0, 0)',
        webkitTextEmphasisPosition: 'over right',
        webkitTextEmphasisStyle: 'none',
        webkitTextFillColor: 'rgb(0, 0, 0)',
        webkitTextOrientation: 'vertical-right',
        webkitTextSecurity: 'none',
        webkitTextStroke: '',
        webkitTextStrokeColor: 'rgb(0, 0, 0)',
        webkitTextStrokeWidth: '0px',
        webkitTransformOriginX: '',
        webkitTransformOriginY: '',
        webkitTransformOriginZ: '',
        webkitUserDrag: 'auto',
        webkitUserModify: 'read-only',
        webkitWritingMode: 'horizontal-tb',
        whiteSpace: 'normal',
        widows: '2',
        width: '0px',
        willChange: 'auto',
        wordBreak: 'normal',
        wordSpacing: '0px',
        wordWrap: 'normal',
        writingMode: 'horizontal-tb',
        x: '0px',
        y: '0px',
        zIndex: 'auto',
        zoom: '1'
    }

    function getImageComputedStyle(image) {
        const width = image.width
        const height = image.height
        const style$1 = Object.assign(style, {
            display: 'inline',
            position: 'static',
            inlineSize: width + 'px',
            perspectiveOrigin: width / 2 + 'px ' + height / 2 + 'px',
            transformOrigin: width / 2 + 'px ' + height / 2 + 'px',
            webkitLogicalWidth: width + 'px',
            webkitLogicalHeight: height + 'px',
            width: width + 'px',
            height: height + 'px'
        })
        return style$1
    }

    function getCanvasComputedStyle(canvas) {
        const rect = canvas.getBoundingClientRect()
        const style$1 = Object.assign(style, {
            display: 'inline',
            position: 'static',
            inlineSize: rect.width + 'px',
            perspectiveOrigin: rect.width / 2 + 'px ' + rect.height / 2 + 'px',
            transformOrigin: rect.width / 2 + 'px ' + rect.height / 2 + 'px',
            webkitLogicalWidth: rect.width + 'px',
            webkitLogicalHeight: rect.height + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px'
        })
        return style$1
    }

    class Event {
        constructor(type) {
            this.cancelBubble = false
            this.cancelable = false
            this.target = null
            this.currentTarget = null
            this.preventDefault = noop
            this.stopPropagation = noop

            this.type = type
            this.timeStamp = Date.now()
        }
    }

    const _events = new WeakMap()

    class EventTarget {
        constructor() {
            _events.set(this, {})
        }

        addEventListener(type, listener, options = {}) {
            let events = _events.get(this)

            if (!events) {
                events = {}
                _events.set(this, events)
            }
            if (!events[type]) {
                events[type] = []
            }
            events[type].push(listener)

            if (options.capture);
            if (options.once);
            if (options.passive);
        }

        removeEventListener(type, listener, options = {}) {
            const events = _events.get(this)

            if (events) {
                const listeners = events[type]

                if (listeners && listeners.length > 0) {
                    for (let i = listeners.length; i--; i > 0) {
                        if (listeners[i] === listener) {
                            listeners.splice(i, 1)
                            break
                        }
                    }
                }
            }
        }

        dispatchEvent(event = {}) {
            const listeners = _events.get(this)[event.type]

            if (listeners) {
                for (let i = 0; i < listeners.length; i++) {
                    listeners[i](event)
                }
            }
        }
    }

    class Node extends EventTarget {
        constructor() {
            super()
            this.childNodes = []
        }

        appendChild(node) {
            this.childNodes.push(node)
            // if (node instanceof Node) {
            //   this.childNodes.push(node)
            // } else {
            //   throw new TypeError('Failed to executed \'appendChild\' on \'Node\': parameter 1 is not of type \'Node\'.')
            // }
        }

        cloneNode() {
            const copyNode = Object.create(this)

            Object.assign(copyNode, this)
            return copyNode
        }

        removeChild(node) {
            const index = this.childNodes.findIndex(child => child === node)

            if (index > -1) {
                return this.childNodes.splice(index, 1)
            }
            return null
        }
    }

    class Element extends Node {
        constructor() {
            super()

            this.className = ''
            this.children = []
        }

        setAttribute(name, value) {
            this[name] = value
        }

        getAttribute(name) {
            return this[name]
        }

        setAttributeNS(name, value) {
            this[name] = value
        }

        getAttributeNS(name) {
            return this[name]
        }
    }

    class HTMLElement extends Element {
        constructor(tagName = '', level) {
            super()

            this.className = ''
            this.children = []

            this.focus = noop
            this.blur = noop

            this.insertBefore = noop
            this.appendChild = noop
            this.removeChild = noop
            this.remove = noop

            this.onerror = noop
            this.onlaod = noop

            this.innerHTML = ''

            this.tagName = tagName.toUpperCase()

            parentNode(this, level)
            style$1(this)
            classList(this)
            clientRegion(this)
            offsetRegion(this)
            scrollRegion(this)
        }
    }

    class HTMLMediaElement extends HTMLElement {
        constructor(tagName) {
            super(tagName)
        }

        addTextTrack() {}

        captureStream() {}

        fastSeek() {}

        load() {}

        pause() {}

        play() {}
    }

    class HTMLVideoElement extends HTMLMediaElement {
        constructor() {
            super('video')
        }
    }

    function Image$1() {
        const image = wx.createImage()

        if (!('tagName' in image)) {
            image.tagName = 'IMG'
        }

        parentNode(image)
        classList(image)

        return image
    }

    class HTMLAudioElement extends HTMLMediaElement {
        constructor() {
            super('audio')
        }
    }

    let SN_SEED = 1

    const _innerAudioContextMap = {}

    class Audio extends HTMLAudioElement {
        constructor(url) {
            super()

            this._$sn = SN_SEED++

            this.readyState = Audio.HAVE_NOTHING

            const innerAudioContext = wx.createInnerAudioContext()

            _innerAudioContextMap[this._$sn] = innerAudioContext

            this._canplayEvents = [
                'load',
                'loadend',
                'canplay',
                'canplaythrough',
                'loadedmetadata'
            ]

            innerAudioContext.onCanplay(() => {
                this._loaded = true
                this.readyState = Audio.HAVE_CURRENT_DATA

                this._canplayEvents.forEach(type => {
                    this.dispatchEvent({ type: type })
                })
            })
            innerAudioContext.onPlay(() => {
                this._paused = _innerAudioContextMap[this._$sn].paused
                this.dispatchEvent({ type: 'play' })
            })
            innerAudioContext.onPause(() => {
                this._paused = _innerAudioContextMap[this._$sn].paused
                this.dispatchEvent({ type: 'pause' })
            })
            innerAudioContext.onEnded(() => {
                this._paused = _innerAudioContextMap[this._$sn].paused
                if (_innerAudioContextMap[this._$sn].loop === false) {
                    this.dispatchEvent({ type: 'ended' })
                }
                this.readyState = Audio.HAVE_ENOUGH_DATA
            })
            innerAudioContext.onError(() => {
                this._paused = _innerAudioContextMap[this._$sn].paused
                this.dispatchEvent({ type: 'error' })
            })

            if (url) {
                this.src = url
            } else {
                this._src = ''
            }

            this._loop = innerAudioContext.loop
            this._autoplay = innerAudioContext.autoplay
            this._paused = innerAudioContext.paused
            this._volume = innerAudioContext.volume
            this._muted = false
        }

        addEventListener(type, listener, options = {}) {
            type = String(type).toLowerCase()

            super.addEventListener(type, listener, options)

            if (this._loaded && this._canplayEvents.indexOf(type) !== -1) {
                this.dispatchEvent({ type: type })
            }
        }

        load() {
            // console.warn('HTMLAudioElement.load() is not implemented.')
            // weixin doesn't need call load() manually
        }

        play() {
            _innerAudioContextMap[this._$sn].play()
        }

        resume() {
            _innerAudioContextMap[this._$sn].resume()
        }

        pause() {
            _innerAudioContextMap[this._$sn].pause()
        }

        destroy() {
            _innerAudioContextMap[this._$sn].destroy()
        }

        canPlayType(mediaType = '') {
            if (typeof mediaType !== 'string') {
                return ''
            }

            if (
                mediaType.indexOf('audio/mpeg') > -1 ||
                mediaType.indexOf('audio/mp4')
            ) {
                return 'probably'
            }
            return ''
        }

        get currentTime() {
            return _innerAudioContextMap[this._$sn].currentTime
        }

        set currentTime(value) {
            _innerAudioContextMap[this._$sn].seek(value)
        }

        get duration() {
            return _innerAudioContextMap[this._$sn].duration
        }

        get src() {
            return this._src
        }

        set src(value) {
            this._src = value
            this._loaded = false
            this.readyState = Audio.HAVE_NOTHING

            const innerAudioContext = _innerAudioContextMap[this._$sn]

            innerAudioContext.src = value
        }

        get loop() {
            return this._loop
        }

        set loop(value) {
            this._loop = value
            _innerAudioContextMap[this._$sn].loop = value
        }

        get autoplay() {
            return this._autoplay
        }

        set autoplay(value) {
            this._autoplay = value
            _innerAudioContextMap[this._$sn].autoplay = value
        }

        get paused() {
            return this._paused
        }

        get volume() {
            return this._volume
        }

        set volume(value) {
            this._volume = value
            if (!this._muted) {
                _innerAudioContextMap[this._$sn].volume = value
            }
        }

        get muted() {
            return this._muted
        }

        set muted(value) {
            this._muted = value
            if (value) {
                _innerAudioContextMap[this._$sn].volume = 0
            } else {
                _innerAudioContextMap[this._$sn].volume = this._volume
            }
        }

        cloneNode() {
            const newAudio = new Audio()
            newAudio.loop = this.loop
            newAudio.autoplay = this.autoplay
            newAudio.src = this.src
            return newAudio
        }
    }

    Audio.HAVE_NOTHING = 0
    Audio.HAVE_METADATA = 1
    Audio.HAVE_CURRENT_DATA = 2
    Audio.HAVE_FUTURE_DATA = 3
    Audio.HAVE_ENOUGH_DATA = 4

    class DocumentElement extends HTMLElement {
        constructor() {
            super('html', 0)
        }
    }

    class Body extends HTMLElement {
        constructor() {
            // 为了性能, 此处不按照标准的DOM层级关系设计
            // 将 body 设置为 0级, parent元素为null
            super('body', 0)
        }
    }

    const location = {
        href: 'game.js',

        reload() {},

        replace(href) {
            this.href = href
        }
    }

    class TouchEvent extends Event {
        constructor(type) {
            super(type)

            this.touches = []
            this.targetTouches = []
            this.changedTouches = []

            this.target = window.canvas
            this.currentTarget = window.canvas
        }
    }

    function eventHandlerFactory$2(type) {
        return rawEvent => {
            const event = new TouchEvent(type)

            event.changedTouches = rawEvent.changedTouches
            event.touches = rawEvent.touches
            event.targetTouches = Array.prototype.slice.call(rawEvent.touches)
            event.timeStamp = rawEvent.timeStamp

            document.dispatchEvent(event)
        }
    }

    wx.onTouchStart(eventHandlerFactory$2('touchstart'))
    wx.onTouchMove(eventHandlerFactory$2('touchmove'))
    wx.onTouchEnd(eventHandlerFactory$2('touchend'))
    wx.onTouchCancel(eventHandlerFactory$2('touchcancel'))

    class PointerEvent extends Event {
        constructor(type) {
            super(type)

            this.target = window.canvas
            this.currentTarget = window.canvas
        }
    }

    const CLONE_PROPS = [
        // MouseEvent
        'bubbles',
        'cancelable',
        'view',
        'detail',
        'screenX',
        'screenY',
        'clientX',
        'clientY',
        'ctrlKey',
        'altKey',
        'shiftKey',
        'metaKey',
        'button',
        'relatedTarget',

        // PointerEvent
        'pointerId',
        'width',
        'height',
        'pressure',
        'tiltX',
        'tiltY',
        'pointerType',
        'hwTimestamp',
        'isPrimary',

        // event instance
        'pageX',
        'pageY',
        'timeStamp'
    ]

    const CLONE_DEFAULTS = [
        // MouseEvent
        false,
        false,
        null,
        null,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null,

        // DOM Level 3
        0,

        // PointerEvent
        0,
        0,
        0,
        0,
        0,
        0,
        '',
        0,
        false,

        // event instance
        0,
        0,
        0
    ]

    const POINTER_TYPE = 'touch'

    function touchToPointer(type, touch, rawEvent) {
        const e = new PointerEvent(type)

        for (let i = 0; i < CLONE_PROPS.length; i++) {
            const p = CLONE_PROPS[i]
            e[p] = touch[p] || CLONE_DEFAULTS[i]
        }

        e.type = type
        e.target = window.canvas
        e.currentTarget = window.canvas
        e.buttons = typeToButtons(type)
        e.which = e.buttons

        e.pointerId = (touch.identifier || 0) + 2
        e.bubbles = true
        e.cancelable = true
        // e.detail = this.clickCount;
        e.button = 0

        e.width = (touch.radiusX || 0.5) * 2
        e.height = (touch.radiusY || 0.5) * 2
        e.pressure = touch.force || 0.5
        e.isPrimary = isPrimaryPointer(touch)
        e.pointerType = POINTER_TYPE

        // forward modifier keys
        e.altKey = rawEvent.altKey
        e.ctrlKey = rawEvent.ctrlKey
        e.metaKey = rawEvent.metaKey
        e.shiftKey = rawEvent.shiftKey

        if (rawEvent.preventDefault) {
            e.preventDefault = function() {
                rawEvent.preventDefault()
            }
        }

        return e
    }

    function typeToButtons(type) {
        let ret = 0
        if (
            type === 'touchstart' ||
            type === 'touchmove' ||
            type === 'pointerdown' ||
            type === 'pointermove'
        ) {
            ret = 1
        }
        return ret
    }

    let firstPointer = null

    function isPrimaryPointer(touch) {
        return firstPointer === touch.identifier
    }

    function setPrimaryPointer(touch) {
        if (firstPointer === null) {
            firstPointer = touch.identifier
        }
    }

    function removePrimaryPointer(touch) {
        if (firstPointer === touch.identifier) {
            firstPointer = null
        }
    }

    function eventHandlerFactory$1(type) {
        return rawEvent => {
            const changedTouches = rawEvent.changedTouches

            for (let i = 0; i < changedTouches.length; i++) {
                const touch = changedTouches[i]

                if (i === 0 && type === 'pointerdown') {
                    setPrimaryPointer(touch)
                } else if (type === 'pointerup' || type === 'pointercancel') {
                    removePrimaryPointer(touch)
                }

                const event = touchToPointer(type, touch, rawEvent)
                document.dispatchEvent(event)
            }
        }
    }

    wx.onTouchStart(eventHandlerFactory$1('pointerdown'))
    wx.onTouchMove(eventHandlerFactory$1('pointermove'))
    wx.onTouchEnd(eventHandlerFactory$1('pointerup'))
    wx.onTouchCancel(eventHandlerFactory$1('pointercancel'))

    class MouseEvent extends Event {
        constructor(type) {
            super(type)
        }
    }

    const getGlobalCanvas = () => {
        if (typeof canvas !== 'undefined') return cavnas
    }

    const events = {}

    const document$1 = {
        readyState: 'complete',
        visibilityState: 'visible', // 'visible' , 'hidden'
        hidden: false,
        fullscreen: true,

        location: location,

        scripts: [],
        style: {},

        ontouchstart: null,
        ontouchmove: null,
        ontouchend: null,
        onvisibilitychange: null,

        parentNode: null,
        parentElement: null,
        documentElement: new DocumentElement(),
        head: new HTMLElement('head'),
        body: new Body(),

        createElement(tagName) {
            tagName = tagName.toLowerCase()
            if (tagName === 'canvas') {
                return new Canvas()
            } else if (tagName === 'audio') {
                return new Audio()
            } else if (tagName === 'img') {
                return new Image$1()
            } else if (tagName === 'video') {
                return new HTMLVideoElement()
            }

            return new HTMLElement(tagName)
        },

        createElementNS(nameSpace, tagName) {
            return this.createElement(tagName)
        },

        createTextNode(text) {
            // TODO: Do we need the TextNode Class ???
            return text
        },

        getElementById(id) {
            const canvas = getGlobalCanvas()
            if (cavnas && id === canvas.id) {
                return canvas
            }
            return null
        },

        getElementsByTagName(tagName) {
            tagName = tagName.toLowerCase()
            if (tagName === 'head') {
                return [document$1.head]
            } else if (tagName === 'body') {
                return [document$1.body]
            } else if (tagName === 'canvas') {
                return [getGlobalCanvas()]
            }
            return []
        },

        getElementsByTagNameNS(nameSpace, tagName) {
            return this.getElementsByTagName(tagName)
        },

        getElementsByName(tagName) {
            if (tagName === 'head') {
                return [document$1.head]
            } else if (tagName === 'body') {
                return [document$1.body]
            } else if (tagName === 'canvas') {
                return [getGlobalCanvas()]
            }
            return []
        },

        querySelector(query) {
            if (query === 'head') {
                return document$1.head
            } else if (query === 'body') {
                return document$1.body
            } else if (query === 'canvas') {
                return getGlobalCanvas()
            } else if (query === `#${getGlobalCanvas().id}`) {
                return getGlobalCanvas()
            }
            return null
        },

        querySelectorAll(query) {
            if (query === 'head') {
                return [document$1.head]
            } else if (query === 'body') {
                return [document$1.body]
            } else if (query === 'canvas') {
                return [getGlobalCanvas()]
            }
            return []
        },

        addEventListener(type, listener) {
            if (!events[type]) {
                events[type] = []
            }
            events[type].push(listener)
        },

        removeEventListener(type, listener) {
            const listeners = events[type]

            if (listeners && listeners.length > 0) {
                for (let i = listeners.length; i--; i > 0) {
                    if (listeners[i] === listener) {
                        listeners.splice(i, 1)
                        break
                    }
                }
            }
        },

        dispatchEvent(event) {
            const type = event.type
            const listeners = events[type]

            if (listeners) {
                for (let i = 0; i < listeners.length; i++) {
                    listeners[i](event)
                }
            }

            if (
                event.target &&
                typeof event.target['on' + type] === 'function'
            ) {
                event.target['on' + type](event)
            }
        }
    }

    function onVisibilityChange(visible) {
        return function() {
            document$1.visibilityState = visible ? 'visible' : 'hidden'

            const hidden = !visible
            if (document$1.hidden === hidden) {
                return
            }
            document$1.hidden = hidden

            const event = new Event('visibilitychange')

            event.target = document$1
            event.timeStamp = Date.now()

            document$1.dispatchEvent(event)
        }
    }

    if (wx.onHide) {
        wx.onHide(onVisibilityChange(false))
    }
    if (wx.onShow) {
        wx.onShow(onVisibilityChange(true))
    }

    // TODO 需要 wx.getSystemInfo 获取更详细信息
    const systemInfo = wx.getSystemInfoSync()

    const system = systemInfo.system
    const platform$1 = systemInfo.platform
    const language = systemInfo.language

    const android = system.toLowerCase().indexOf('android') !== -1

    const uaDesc = android
        ? 'Android; CPU Android 6.0'
        : 'iPhone; CPU iPhone OS 10_3_1 like Mac OS X'
    const ua = `Mozilla/5.0 (${uaDesc}) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/${language}`

    const navigator = {
        platform: platform$1,
        language: language,
        appVersion: `5.0 (${uaDesc}) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`,
        userAgent: ua,
        onLine: true, // TODO 用 wx.getNetworkStateChange 和 wx.onNetworkStateChange 来返回真实的状态

        // TODO 用 wx.getLocation 来封装 geolocation
        geolocation: {
            getCurrentPosition: noop,
            watchPosition: noop,
            clearWatch: noop
        }
    }

    if (wx.onNetworkStatusChange) {
        wx.onNetworkStatusChange(function(event) {
            navigator.onLine = event.isConnected
        })
    }

    const _requestHeader = new WeakMap()
    const _responseHeader = new WeakMap()
    const _requestTask = new WeakMap()

    function _triggerEvent(type, event = {}) {
        event.target = event.target || this

        if (typeof this[`on${type}`] === 'function') {
            this[`on${type}`].call(this, event)
        }
    }

    function _changeReadyState(readyState, event = {}) {
        this.readyState = readyState

        event.readyState = readyState

        _triggerEvent.call(this, 'readystatechange', event)
    }

    function _isRelativePath(url) {
        return !/^(http|https|ftp|wxfile):\/\/.*/i.test(url)
    }

    class XMLHttpRequest extends EventTarget {
        constructor() {
            super()

            /*
             * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
             */
            this.onabort = null
            this.onerror = null
            this.onload = null
            this.onloadstart = null
            this.onprogress = null
            this.ontimeout = null
            this.onloadend = null

            this.onreadystatechange = null
            this.readyState = 0
            this.response = null
            this.responseText = null
            this.responseType = 'text'
            this.dataType = 'string'
            this.responseXML = null
            this.status = 0
            this.statusText = ''
            this.upload = {}
            this.withCredentials = false

            _requestHeader.set(this, {
                'content-type': 'application/x-www-form-urlencoded'
            })
            _responseHeader.set(this, {})
        }

        abort() {
            const myRequestTask = _requestTask.get(this)

            if (myRequestTask) {
                myRequestTask.abort()
            }
        }

        getAllResponseHeaders() {
            const responseHeader = _responseHeader.get(this)

            return Object.keys(responseHeader)
                .map(header => {
                    return `${header}: ${responseHeader[header]}`
                })
                .join('\n')
        }

        getResponseHeader(header) {
            return _responseHeader.get(this)[header]
        }

        open(
            method,
            url /* async, user, password 这几个参数在小程序内不支持*/
        ) {
            this._method = method
            this._url = url
            _changeReadyState.call(this, XMLHttpRequest.OPENED)
        }

        overrideMimeType() {}

        send(data = '') {
            if (this.readyState !== XMLHttpRequest.OPENED) {
                throw new Error(
                    "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."
                )
            } else {
                const url = this._url
                const header = _requestHeader.get(this)
                const responseType = this.responseType
                const dataType = this.dataType

                const relative = _isRelativePath(url)
                let encoding

                if (responseType === 'arraybuffer');
                else {
                    encoding = 'utf8'
                }

                delete this.response
                this.response = null

                const onSuccess = ({ data, statusCode, header }) => {
                    statusCode = statusCode === undefined ? 200 : statusCode
                    if (
                        typeof data !== 'string' &&
                        !(data instanceof ArrayBuffer)
                    ) {
                        try {
                            data = JSON.stringify(data)
                        } catch (e) {
                            data = data
                        }
                    }

                    this.status = statusCode
                    if (header) {
                        _responseHeader.set(this, header)
                    }
                    _triggerEvent.call(this, 'loadstart')
                    _changeReadyState.call(
                        this,
                        XMLHttpRequest.HEADERS_RECEIVED
                    )
                    _changeReadyState.call(this, XMLHttpRequest.LOADING)

                    this.response = data

                    if (data instanceof ArrayBuffer) {
                        Object.defineProperty(this, 'responseText', {
                            enumerable: true,
                            configurable: true,
                            get: function() {
                                throw 'InvalidStateError : responseType is ' +
                                    this.responseType
                            }
                        })
                    } else {
                        this.responseText = data
                    }
                    _changeReadyState.call(this, XMLHttpRequest.DONE)
                    _triggerEvent.call(this, 'load')
                    _triggerEvent.call(this, 'loadend')
                }

                const onFail = ({ errMsg }) => {
                    // TODO 规范错误

                    if (errMsg.indexOf('abort') !== -1) {
                        _triggerEvent.call(this, 'abort')
                    } else {
                        _triggerEvent.call(this, 'error', {
                            message: errMsg
                        })
                    }
                    _triggerEvent.call(this, 'loadend')

                    if (relative) {
                        // 用户即使没监听error事件, 也给出相应的警告
                        console.warn(errMsg)
                    }
                }

                if (relative) {
                    const fs = wx.getFileSystemManager()

                    var options = {
                        filePath: url,
                        success: onSuccess,
                        fail: onFail
                    }
                    if (encoding) {
                        options['encoding'] = encoding
                    }
                    fs.readFile(options)
                    return
                }

                wx.request({
                    data,
                    url: url,
                    method: this._method,
                    header: header,
                    dataType: dataType,
                    responseType: responseType,
                    success: onSuccess,
                    fail: onFail
                })
            }
        }

        setRequestHeader(header, value) {
            const myHeader = _requestHeader.get(this)

            myHeader[header] = value
            _requestHeader.set(this, myHeader)
        }

        addEventListener(type, listener) {
            if (typeof listener !== 'function') {
                return
            }

            this['on' + type] = (event = {}) => {
                event.target = event.target || this
                listener.call(this, event)
            }
        }

        removeEventListener(type, listener) {
            if (this['on' + type] === listener) {
                this['on' + type] = null
            }
        }
    }

    // TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
    XMLHttpRequest.UNSEND = 0
    XMLHttpRequest.OPENED = 1
    XMLHttpRequest.HEADERS_RECEIVED = 2
    XMLHttpRequest.LOADING = 3
    XMLHttpRequest.DONE = 4

    const _socketTask = new WeakMap()

    class WebSocket {
        constructor(url, protocols = []) {
            this.binaryType = '' // TODO 更新 binaryType
            this.bufferedAmount = 0 // TODO 更新 bufferedAmount
            this.extensions = ''

            this.onclose = null
            this.onerror = null
            this.onmessage = null
            this.onopen = null

            this.protocol = '' // TODO 小程序内目前获取不到，实际上需要根据服务器选择的 sub-protocol 返回
            this.readyState = 3

            if (
                typeof url !== 'string' ||
                !/(^ws:\/\/)|(^wss:\/\/)/.test(url)
            ) {
                throw new TypeError(
                    `Failed to construct 'WebSocket': The URL '${url}' is invalid`
                )
            }

            this.url = url
            this.readyState = WebSocket.CONNECTING

            const socketTask = wx.connectSocket({
                url,
                protocols: Array.isArray(protocols) ? protocols : [protocols]
            })

            _socketTask.set(this, socketTask)

            socketTask.onClose(res => {
                this.readyState = WebSocket.CLOSED
                if (typeof this.onclose === 'function') {
                    this.onclose(res)
                }
            })

            socketTask.onMessage(res => {
                if (typeof this.onmessage === 'function') {
                    this.onmessage(res)
                }
            })

            socketTask.onOpen(() => {
                this.readyState = WebSocket.OPEN
                if (typeof this.onopen === 'function') {
                    this.onopen()
                }
            })

            socketTask.onError(res => {
                if (typeof this.onerror === 'function') {
                    this.onerror(new Error(res.errMsg))
                }
            })

            return this
        }

        close(code, reason) {
            this.readyState = WebSocket.CLOSING
            const socketTask = _socketTask.get(this)

            socketTask.close({
                code,
                reason
            })
        }

        send(data) {
            if (typeof data !== 'string' && !(data instanceof ArrayBuffer)) {
                throw new TypeError(
                    `Failed to send message: The data ${data} is invalid`
                )
            }

            const socketTask = _socketTask.get(this)

            socketTask.send({
                data
            })
        }
    }

    WebSocket.CONNECTING = 0 // The connection is not yet open.
    WebSocket.OPEN = 1 // The connection is open and ready to communicate.
    WebSocket.CLOSING = 2 // The connection is in the process of closing.
    WebSocket.CLOSED = 3 // The connection is closed or couldn't be opened.

    class Worker {
        constructor(file) {
            this.onmessage = null

            // 目前 微信小游戏中 Worker 最大并发数量限制为 1 个，
            // 所以创建新Worker前, 需要结束现有的 Worker.terminate
            if (Worker.previousWorker) {
                Worker.previousWorker.terminate()
            }
            Worker.previousWorker = this

            this._file = file

            this._worker = wx.createWorker(file)

            this._worker.onMessage(res => {
                if (this.onmessage) {
                    this.onmessage({
                        target: this,
                        data: res
                    })
                }
            })
        }

        postMessage(message, transferList) {
            this._worker.postMessage(message, transferList)
        }

        terminate() {
            this._worker.terminate()
            Worker.previousWorker = null
        }
    }

    Worker.previousWorker = null

    // export default function(file) {
    //     const worker = wx.createWorker(file)

    //     return worker
    // }

    function createImageBitmap(
        image,
        sx = 0,
        sy = 0,
        sw = 0,
        sh = 0,
        options = {}
    ) {
        return Promise.resolve(new ImageBitmap())
    }

    class ImageBitmap {
        constructor() {
            this.height = 0
            this.width = 0
        }
        close() {}
    }

    /*
     * TODO 使用 wx.readFile 来封装 FileReader
     */
    class FileReader {
        construct() {}
    }

    const Image = wx.createImage().constructor

    class HTMLImageElement extends HTMLElement {
        constructor() {
            return Image()
        }
    }

    GameGlobal.screencanvas = GameGlobal.screencanvas || new Canvas()
    const canvas$2 = GameGlobal.screencanvas

    const canvasConstructor = canvas$2.constructor

    class WebGLRenderingContext {
        constructor() {
            return Canvas().getContext('webgl')
        }
    }

    const localStorage = {
        get length() {
            const { keys } = wx.getStorageInfoSync()
            return keys.length
        },

        key(n) {
            const { keys } = wx.getStorageInfoSync()

            return keys[n]
        },

        getItem(key) {
            const value = wx.getStorageSync(key)
            return value === '' ? null : value
        },

        setItem(key, value) {
            if (window.asyncStorage) {
                return wx.setStorage({
                    key: key,
                    data: value
                })
            }
            return wx.setStorageSync(key, value)
        },

        removeItem(key) {
            if (window.asyncStorage) {
                return wx.removeStorage({
                    key: key
                })
            }
            return wx.removeStorageSync(key)
        },

        clear() {
            if (window.asyncStorage) {
                return wx.clearStorage()
            }
            return wx.clearStorageSync()
        }
    }

    let chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    function InvalidCharacterError(message) {
        this.message = message
    }
    InvalidCharacterError.prototype = new Error()
    InvalidCharacterError.prototype.name = 'InvalidCharacterError'

    // encoder
    // [https://gist.github.com/999166] by [https://github.com/nignag]

    function btoa(input) {
        let str = String(input)
        let output = ''
        for (
            // initialize result and counter
            let block, charCode, idx = 0, map = chars;
            // if the next str index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || ((map = '='), idx % 1);
            // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))
        ) {
            charCode = str.charCodeAt((idx += 3 / 4))
            if (charCode > 0xff) {
                throw new InvalidCharacterError(
                    "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
                )
            }
            block = (block << 8) | charCode
        }
        return output
    }

    // decoder
    // [https://gist.github.com/1020396] by [https://github.com/atk]
    function atob(input) {
        let str = String(input).replace(/=+$/, '')
        if (str.length % 4 === 1) {
            throw new InvalidCharacterError(
                "'atob' failed: The string to be decoded is not correctly encoded."
            )
        }
        let output = ''
        for (
            // initialize result and counters
            let bc = 0, bs, buffer, idx = 0;
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4)
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer)
        }
        return output
    }

    /**
     * 对于ES6中Symbol的极简兼容
     * 方便模拟私有变量
     */

    let idCounter = 0

    const Symbol = function Symbol(key) {
        return `__${key}_${Math.floor(Math.random() * 1e9)}_${++idCounter}__`
    }

    Symbol.iterator = Symbol('Symbol.iterator')

    var _Symbol = GameGlobal.Symbol || Symbol

    const addEventListener = (type, listener) => {
        document.addEventListener(type, listener)
    }

    const EventListener = (type, listener) => {
        document.removeEventListener(type, listener)
    }
    const dispatchEvent = function(event = {}) {
        console.log('window.dispatchEvent', event.type, event)
        // nothing to do
    }

    const { platform } = wx.getSystemInfoSync()

    // 暴露全局的 canvas
    GameGlobal.screencanvas = GameGlobal.screencanvas || new Canvas()

    const canvas$1 = GameGlobal.screencanvas

    function getComputedStyle(dom) {
        const tagName = dom.tagName

        if (tagName === 'CANVAS') {
            return getCanvasComputedStyle(dom)
        } else if (tagName === 'IMG') {
            return getImageComputedStyle(dom)
        }

        return style
    }

    const scrollTo = noop
    const scrollBy = noop
    const alert = noop
    const focus = noop
    const blur = noop

    if (platform !== 'devtools') {
        const wxPerf = wx.getPerformance ? wx.getPerformance() : Date

        const consoleTimers = {}

        console.time = function(name) {
            consoleTimers[name] = wxPerf.now()
        }

        console.timeEnd = function(name) {
            const timeStart = consoleTimers[name]
            if (!timeStart) {
                return
            }

            const timeElapsed = wxPerf.now() - timeStart
            console.log(name + ': ' + timeElapsed / 1000 + 'ms')
            delete consoleTimers[name]
        }
    }

    function eventHandlerFactory() {
        return res => {
            const event = new Event('resize')

            event.target = window
            event.timeStamp = Date.now()
            event.res = res
            event.windowWidth = res.windowWidth
            event.windowHeight = res.windowHeight
            document.dispatchEvent(event)
        }
    }

    if (wx.onWindowResize) {
        wx.onWindowResize(eventHandlerFactory())
    }

    const setTimeout = GameGlobal.setTimeout
    const clearTimeout = GameGlobal.clearTimeout
    const setInterval = GameGlobal.setInterval
    const clearInterval = GameGlobal.clearInterval
    const requestAnimationFrame = GameGlobal.requestAnimationFrame
    const cancelAnimationFrame = GameGlobal.cancelAnimationFrame

    var _Window = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        addEventListener: addEventListener,
        EventListener: EventListener,
        dispatchEvent: dispatchEvent,
        canvas: canvas$1,
        getComputedStyle: getComputedStyle,
        scrollTo: scrollTo,
        scrollBy: scrollBy,
        alert: alert,
        focus: focus,
        blur: blur,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval,
        requestAnimationFrame: requestAnimationFrame,
        cancelAnimationFrame: cancelAnimationFrame,
        document: document$1,
        navigator: navigator,
        XMLHttpRequest: XMLHttpRequest,
        WebSocket: WebSocket,
        Worker: Worker,
        Image: Image$1,
        ImageBitmap: ImageBitmap,
        Audio: Audio,
        FileReader: FileReader,
        Element: Element,
        HTMLElement: HTMLElement,
        HTMLImageElement: HTMLImageElement,
        HTMLCanvasElement: canvasConstructor,
        HTMLMediaElement: HTMLMediaElement,
        HTMLAudioElement: HTMLAudioElement,
        HTMLVideoElement: HTMLVideoElement,
        WebGLRenderingContext: WebGLRenderingContext,
        TouchEvent: TouchEvent,
        PointerEvent: PointerEvent,
        MouseEvent: MouseEvent,
        localStorage: localStorage,
        location: location,
        btoa: btoa,
        atob: atob,
        Symbol: _Symbol,
        performance: performance$1,
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        devicePixelRatio: devicePixelRatio,
        screen: screen,
        scrollX: scrollX,
        scrollY: scrollY,
        ontouchstart: ontouchstart,
        ontouchmove: ontouchmove,
        ontouchend: ontouchend,
        createImageBitmap: createImageBitmap
    })

    const _window = Object.create(_Window)

    const global = GameGlobal

    GameGlobal.self = GameGlobal || global

    GameGlobal.global = GameGlobal.global || global

    function inject() {
        const { platform } = wx.getSystemInfoSync()

        // 开发者工具无法重定义 window
        if (
            typeof __devtoolssubcontext === 'undefined' &&
            platform === 'devtools'
        ) {
            for (const key in _window) {
                const descriptor = Object.getOwnPropertyDescriptor(global, key)

                if (!descriptor || descriptor.configurable === true) {
                    Object.defineProperty(window, key, {
                        value: _window[key]
                    })
                }
            }

            for (const key in _window.document) {
                const descriptor = Object.getOwnPropertyDescriptor(
                    global.document,
                    key
                )

                if (!descriptor || descriptor.configurable === true) {
                    Object.defineProperty(global.document, key, {
                        value: _window.document[key]
                    })
                }
            }
            Object.defineProperties(window, {
                parent: {
                    value: window
                },
                wx: {
                    value: wx
                }
            })
        } else {
            _window.wx = wx
            for (const key in _window) {
                global[key] = _window[key]
            }
            global.window = global
            global.top = global.parent = global
        }
    }

    if (!GameGlobal.__isAdapterInjected) {
        GameGlobal.__isAdapterInjected = true
        inject()
    }
})()
