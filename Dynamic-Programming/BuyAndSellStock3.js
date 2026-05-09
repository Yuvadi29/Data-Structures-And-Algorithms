/*You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
Example 2:

Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
Example 3:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
*/

var maxProfit = function (prices) {
    // Here we have a limit on the number of transactions i can perform here.
    
    //We are limited to 2 transactions, we can be either of one in four states:
    // 1. First buy
    // 2. First sell
    // 3. Second buy
    // 4. Second Sell


    // Instead of a complex 2D array (DP table), we can track these four states using four variables. This brings our space complexity down to O(1).

    let firstBuy = -Infinity;
    let firstSell = 0;
    let secondBuy = -In1finity;
    let secondSell = 0;

    for(let price of prices){
        // State 1: Maximize money after first buy (negative because we spent it)
        firstBuy = Math.max(firstBuy, -price);

        // State 2: Maximize profit after first sell. We either do nothing, or sell the stock we bought earlier.
        firstSell = Math.max(firstSell, firstBuy + price);

        // State 3: Maximize money after second buy. We either do nothing, or buy again using the profit from the first sell.
        secondBuy = Math.max(secondBuy, firstSell - price);

        // State 4: Maximize profit after second sell. We either do nothing, or sell the stock we bought second.
        secondSell = Math.max(secondSell, secondBuy + price);
    }

    return secondSell;

};