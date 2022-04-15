function convertCapitalization(){
    var text=document.getElementById("in").value,output;
	document.getElementById("out1").innerHTML=text.toUpperCase();
    document.getElementById("out2").innerHTML=text.toLowerCase();
    output="";
    for(let i=0;i<text.length;i++){
        var c=text.charCodeAt(i);
        if(65<=c&&c<=90) c+=32;
        else if(97<=c&&c<=122) c-=32;
        output+=String.fromCharCode(c); console.log(output);
    }
    document.getElementById("out3").innerHTML=output; 
    output="";
    for(let i=0;i<text.length;i++){
        var c=text.charAt(i);
        if(i&1) output+=c.toLowerCase();
        else output+=c.toUpperCase();
    }
    document.getElementById("out4").innerHTML=output;
    document.getElementById("out5").innerHTML=text.split('').reverse().join('');
}
function caesarCipher(){
	var s=document.getElementById("caesar-cipher-in").value,shift=parseInt(document.getElementById("caesar-cipher-shift").value),cipher="";
	if(!isNaN(shift)) for(var i=0;i<s.length;i++){
		var c=s.charCodeAt(i);
		if(65<=c&&c<=90) c=((c-65+shift)%26+26)%26+65;
		else if(97<=c&&c<=122) c=((c-97+shift)%26+26)%26+97;
		else if(48<=c&&c<=57) c=((c-48+shift)%10+10)%10+48;
		cipher+=String.fromCharCode(c);
	}
	document.getElementById("caesar-cipher-out1").innerHTML=cipher; cipher="";
	if(!isNaN(shift)) for(var i=0;i<s.length;i++){
		var c=s.charCodeAt(i);
		if(65<=c&&c<=90) c=((c-65+shift)%26+26)%26+65;
		else if(97<=c&&c<=122) c=((c-97+shift)%26+26)%26+97;
		cipher+=String.fromCharCode(c);
	}
	document.getElementById("caesar-cipher-out2").innerHTML=cipher; cipher="";
	if(!isNaN(shift)) for(var i=0;i<s.length;i++){
		var c=s.charCodeAt(i);
		if(48<=c&&c<=57) c=((c-48+shift)%10+10)%10+48;
		cipher+=String.fromCharCode(c);
	}
	document.getElementById("caesar-cipher-out3").innerHTML=cipher;
}


function gcd(a, b){
    return b == 0 ? a : gcd(b, a%b)
}

function fpow(base, pow, mod){
    x = 1n
    for(; pow; pow >>= 1n){
        if(pow&1n){
            x = x*base%mod
        }
        base = base*base%mod
    }
    return x
}

function divmod(a, b, mod){
    return a*fpow(b, mod-2, mod)%mod;
}

function rand(l, r) {
    return Math.floor(Math.random()*(r-l+1)) + l;
}

function millerRabin(N, iterations = 7){
    if(N < 2 || N%6n%4n != 1)
        return (N|1n) == 3
    
    let A = [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n]
    while(A.length < iterations)
        A.push(rand(1795265023n, 9223372036854775807n))
    
    let s = 0n
    while(!(((N-1n)>>s)&1n))
        s++
    let d = N>>s;
    for(a in A){
        let p = fpow(BigInt(a)%N, d, N);
        let i = s;
        while(p != 1 && p != N-1n && BigInt(a)%N && i--)
            p = p*p%N
        if(p != N-1n && i != s)
            return 0
    }
    return true
}
const bigIntMax = (...args) => args.reduce((m, e) => e > m ? e : m);
const bigIntMin = (...args) => args.reduce((m, e) => e < m ? e : m);

function factorize(){
	var startTime=Date.now();
	var xstring = document.getElementById("factorize-in").value;
	if(xstring == "") return;
    if(isNaN(xstring)){
        alert("Must be a positive integer");
        return;
    }
    let X = BigInt(xstring);
    if(X <= 0){
        alert("Must be a positive integer");
        return;
    }
    function pollardsRho(N, iterations = 40){
        if(N == 1) return 1n
        function f(x){
            return x*x%N + 1n
        }
        let x = 0n, y = 0n, p = 2n, q;
        let t = 0, i = 1n;
        while(t++ % iterations || gcd(p, N) == 1){
            if(x == y)
                y = f(x = ++i)
            q = p*(bigIntMax(x, y) - bigIntMin(x, y))%N
            if(q)
                p = q
            x = f(x)
            y = f(f(y))
        }
        return gcd(p, N)
    }

    function Queue() {
        this.queue = [];
        this.tail = 0;
        this.head = 0;
    }

    Queue.prototype.push = function(element) {
        this.queue[this.tail++] = element
    }

    Queue.prototype.pop = function(){
        if(this.tail === this.head)
            return undefined
        let element = this.queue[this.head]
        delete this.queue[this.head++]
        return element
    }

    Queue.prototype.back = function(){
        if(this.tail === this.head)
            return undefined
        return this.queue[this.tail-1]
    }

    function pollardsRhoPrimeFactor(x, pollardsRhoIters = 40, millerRabinIters = 7){
        if(x == 1) return []
        let ret = []
        let q = new Queue()
        q.push(x);
        while(q.head !== q.tail){
            let y = q.pop()
            if(millerRabin(y, millerRabinIters))
                ret.push(y)
            else{
                q.push(pollardsRho(y, pollardsRhoIters))
                q.push(y/q.back())
            }
        }
        return ret
    }
    let primes = pollardsRhoPrimeFactor(X)
    primes.sort((a, b) => a==b? 0: a>b? 1:-1)

    function getProduct(total, num) {
        return total*num;
    }
    
    const getSubsets = a => a.reduce((ret, value) =>
        ret.concat(ret.map(set => [value,...set])), [[]]
    )

    function unique(a) {
        return a.sort((a, b) => a==b? 0: a>b? 1:-1 ).filter(function(value, index, array) {
            return (index === 0) || (value !== array[index-1])
        })
    }

    let factors = [1n];
    for(let i = 0; i < primes.length; i++){
    	factors=factors.concat(factors.map(a=> a*primes[i]));
    	factors=unique(factors);
    }
    factors = unique(factors)

	let sum = 0, uniqueCnt = 0, str = "";
	if(primes.length>0) for(let i = 0; i <= primes.length; i++){
		if((i == primes.length) || (i && primes[i] != primes[i-1])){
			str = str.concat(primes[i-1]+"<sup>"+sum+"</sup> * ");
			sum = 0
			uniqueCnt++
		}
		sum++
	}
	if(str.length)
		str = str.slice(0, -3)
	
	document.getElementById("factorize-out1").innerHTML=primes.length;
	document.getElementById("factorize-out2").innerHTML=primes.join(", ");
	document.getElementById("factorize-out3").innerHTML=uniqueCnt;
	document.getElementById("factorize-out4").innerHTML=str;
	document.getElementById("factorize-out5").innerHTML=factors.length;
	document.getElementById("factorize-out6").innerHTML=factors.join(", ");
	document.getElementById("time").innerHTML="Completed in "+(Date.now()-startTime)+"ms.";
}
function nextPrime(){
	var startTime=Date.now();
	var xstring = document.getElementById("next-prime-in").value;
	if(xstring == "") return;
    if(isNaN(xstring)){
        alert("Must be a positive integer");
        return;
    }
    let X = BigInt(xstring),next=bigIntMax(1n,X)+1n,prev=bigIntMax(1n,X)-1n,gap;
    while(!millerRabin(next)) next++;
    if(prev<2) prev="None";
    else while(!millerRabin(prev)) prev--;
	document.getElementById("next-prime-out1").innerHTML=next;
	document.getElementById("next-prime-out2").innerHTML=prev;
	document.getElementById("time").innerHTML="Completed in "+(Date.now()-startTime)+"ms.";

}