function solvingQuadraticEquations(a, b, c) {
    let d, x1, x2, result;
    if(a === 0) {
        result = "Это не квадратное уравнение"
    } else {
        d = b*b - 4*a*c;
        if(d < 0) {
            d = Math.abs(d);
            x1 = Number(-b / (2*a)) + " + " + Number(Math.sqrt(d)/ (2*a)) + " * i";
            x2 = Number(-b / (2*a)) + " - " + Number(Math.sqrt(d)/ (2*a)) + " * i";
            result = "корни квадратного уравнения: \n" + x1 + " и " + x2;;
        } else {
                x1 = (-b + Math.sqrt(d))/ (2*a);
                x2 = (-b - Math.sqrt(d))/ (2*a);
                result = "корни квадратного уравнения: \n" + x1 + " и " + x2;
        }
    }
    return result;
}

console.log(solvingQuadraticEquations(1, 6, 14))
