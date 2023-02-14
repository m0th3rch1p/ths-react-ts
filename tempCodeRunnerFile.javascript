process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

const solution = (n, memo = {}) => {
  if (n <= 0) return 0;

  // Check if the result has already been calculated
  if (memo[n]) return memo[n];

  const sum3 = 3 * Math.floor((n - 1) / 3) * (Math.floor((n - 1) / 3) + 1) / 2;
  const sum5 = 5 * Math.floor((n - 1) / 5) * (Math.floor((n - 1) / 5) + 1) / 2;
  const sum15 = 15 * Math.floor((n - 1) / 15) * (Math.floor((n - 1) / 15) + 1) / 2;

  // Store the result in the memoization table
  memo[n] = sum3 + sum5 - sum15;

  // Return the result for n-1
  return memo[n];
};

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n = parseInt(readLine());
        
    }
    
}

console.log(solution(20));