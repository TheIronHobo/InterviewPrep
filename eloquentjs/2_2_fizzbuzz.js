function FizzBuzz(iter){
    for(let i = 1; i <= iter; i++){
        let output = '';
        if(i%3==0) output+="Fizz";
        if(i%5==0) output+="Buzz";
        if(output!='') console.log(i + ': '+ output);
    }
}

FizzBuzz(100);
