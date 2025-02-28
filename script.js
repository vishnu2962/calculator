
const btn = document.querySelectorAll('button');
const screen = document.querySelector('.screen'); 
var exp = '';
filter = ['=','+','-','x','%','÷','+/-','*','/']

btn.forEach((button) =>{
    button.addEventListener('click', (e) => {
        value = e.target.getAttribute('data-value');
        calculate(value);
    })
});

const calculate = (value) => {
    if ((!'=AC⌫'.includes(value))) {
        if (exp === '' && !filter.includes(value)){
            exp += value;
        }
        else if(filter.includes(value) && !filter.includes(exp.slice(-1))) {
            exp += value;
        }else if(!filter.includes(value)){
            exp += value;
        }

    }else if (value === 'AC') {
        exp = '';
    }else if(value === '⌫') {
        exp = exp.slice(0,-1);
    }else if(value === '=') {
        exp = exp.replace(/x/g,'*').replace(/÷/g,'/');
        exp = exp.replace(/(\d+)%(\d+)/g, '($1/100 * $2)');

        if (exp.length == '1' && filter.includes(exp)){
            exp = 'Error';
        }else{

            try{
                if (exp != '' && !filter.includes(exp.slice(-1))){
                    exp = eval(exp);
                }else if(exp !== '' && filter.includes(exp.slice(-1))){
                    exp = exp.slice(0, exp.length -1);
                    exp = eval(exp);
                }
                
            }
            catch{
                exp = 'Error';
            }
        }

        //exp = eval(exp);
        //console.log(exp);
    }

   screen.value = exp;
   exp = screen.value;
}








// percentage calculation code 

// exp = '2-3+100%10';
// exp = exp.replace(/(\d+)%(\d+)/g, "($1/100 * $2)");
// console.log(math.evaluate(exp));
// console.log(eval(exp));

// Part	Meaning
// \d+	Matches one or more digits (e.g., 100, 10, 50)
// %	Matches the literal percent sign %
// (\d+)	Captures the second number after % (e.g., in 100%10, it captures 10)
// g	Global flag → replaces all occurrences in the string