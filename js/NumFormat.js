function E(Number)
{
  return new ExpantaNum(Number);
}

// https://gist.github.com/cloudytheconqueror/10dc9c5698de3a630a01e53bb968a63e
function exponentialFormat(num, precision, mantissa = true) {
  
    return num.toStringWithDecimalPlaces(precision)
}

function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    let zeroCheck = num.array == undefined ? num : num.array[0]
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let init = num.toString()
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return portions[0]
}

function formatSmall(x, precision=2) { 
    return format(x, precision, true)    
}

function regularFormat(num, precision) {
    if (isNaN(num)) return "NaN"
    let zeroCheck = num.array == undefined ? num : num.array[0]
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let fmt = num.toString()
    let f = fmt.split(".")
    if (precision == 0) return commaFormat(num.floor == undefined ? Math.floor(num) : num.floor())
    else if (f.length == 1) return fmt + "." + "0".repeat(precision)
    else if (f[1].length < precision) return fmt + "0".repeat(precision - f[1].length)
    else return f[0] + "." + f[1].substring(0, precision)
}

function fixValue(x, y = 0) {
    return x || new ExpantaNum(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return new ExpantaNum(0)
    return x.reduce((a, b) => ExpantaNum.add(a, b))
}

// Basically does the opposite of what standardize in OmegaNum does
function polarize(array, smallTop = false) {
    if (array[0] == Number.POSITIVE_INFINITY) return [array[0], array[array.length-1], array.length-1]
    do {
        while (array[0] >= 10) {
            array[0] = Math.log10(array[0])
            array[1] = (array[1]||0) + 1
        }
        let l = array.length
        for (i=1;i<l-1;++i) {
            if (array[i] == 0) continue
            array[0] = Math.log10(array[0])+array[i]
            array[i] = 0
            array[i+1] += 1
            if (array[0] >= 10) break
        }
        if (array[0] < 10 && array[l-1] >= 10 && smallTop) {
            array[0] = Math.log10(array[0])+array[l-1]
            array[l-1] = 0
            array[l] = 1
        }
    } while (array[0] >= 10)
    return [array[0], array[array.length-1], array.length-1]
}

function format(decimal, precision = 2, small = false) {
    if (EN.isNaN(decimal)) return "NaN"
    small = small || modInfo.allowSmall
    let precision2 = Math.max(3, precision) // for e
    let precision3 = Math.max(4, precision) // for F, G, H
    let precision4 = Math.max(6, precision) // for J
    decimal = new ExpantaNum(decimal)
    let array = decimal.array
    if (decimal.abs().lt(1e-308)) return (0).toFixed(precision)
    if (decimal.sign < 0) return "-" + format(decimal.neg(), precision)
    if (decimal.isInfinite()) return "Infinity"
    if (decimal.lt("0.0001")) { return format(decimal.rec(), precision) + "⁻¹" }
    else if (decimal.lt(1)) return regularFormat(decimal, precision + (small ? 2 : 0))
    else if (decimal.lt(1000)) return regularFormat(decimal, precision)
    else if (decimal.lt(1e9)) return commaFormat(decimal)
    else if (decimal.lt("10^^5")) {
        let rep = (array[1]||0)-1
        if (array[0] >= 1000000000) {
            array[0] = Math.log10(array[0])
            rep += 1
        }
        let m = 10**(array[0]-Math.floor(array[0]))
        let e = Math.floor(array[0])
        let p = array[0] < 1000 ? precision2 : 0
        return "e".repeat(rep) + regularFormat(m, p) + "e" + commaFormat(e)
    }
    else if (decimal.lt("10^^1000000")) {
        let pol = polarize(array)
        return regularFormat(pol[0], precision3) + "F" + commaFormat(pol[1])
    }
    else if (decimal.lt("10^^^5")) {
        if ((array[2]||0) >= 1){
            let rep = array[2]
            array[2] = 0
            return "F".repeat(rep) + format(array, precision)
        }
        let n = array[1] + 1
        if (decimal.gte("10^^" + (n + 1))) n += 1
        return "F" + format(n, precision)
    }
    else if (decimal.lt("10^^^1000000")) {
        let pol = polarize(array)
        return regularFormat(pol[0], precision3) + "G" + commaFormat(pol[1])
    }
    else if (decimal.lt("10^^^^5")) {
        if ((array[3]||0) >= 1){
            let rep = array[3]
            array[3] = 0
            return "G".repeat(rep) + format(array, precision)
        }
        let n = array[2] + 1
        if (decimal.gte("10^^^" + (n + 1))) n += 1
        return "G" + format(n, precision)
    }
    else if (decimal.lt("10^^^^1000000")) {
        let pol = polarize(array)
        return regularFormat(pol[0], precision3) + "H" + commaFormat(pol[1])
    }
    else if (decimal.lt("10^^^^^5")) {
        if ((array[4]||0) >= 1){
            let rep = array[4]
            array[4] = 0
            return "H".repeat(rep) + format(array, precision)
        }
        let n = array[3] + 1
        if (decimal.gte("10^^^^" + (n + 1))) n += 1
        return "H" + format(n, precision)
    }
    
    let pol = polarize(array, true)
    return regularFormat(Math.log10(pol[0]) + pol[1], precision4) + "J" + commaFormat(pol[2])
}

function formatWhole(decimal) {
    return format(decimal,0)
}

function formatTime(s) {
    if (EN(s).gte(31536000000)) return format(EN(s).div(31536000)) + " years"
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = new ExpantaNum(x)
    let result = x.toString(precision)
    if (new ExpantaNum(result).gte(maxAccepted)) {
        result = new ExpantaNum(maxAccepted - Math.pow(0.1, precision)).toString(precision)
    }
    return result
}
