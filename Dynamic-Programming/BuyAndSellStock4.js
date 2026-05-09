/*You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

 

Example 1:

Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
Example 2:

Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
*/

var maxProfit = function (k, prices) {
    // Here we are limited to k transactions and cannot hold multiple stocks at once, we need to track 2 states for every day whether we are "holding" a stock or "not holding"

    // We use two arrays (or a 2D array) to track the maximum profit:
    // hold[j]: Maximum profit on the current day with $j$ transactions completed, while currently holding a stock.
    //free[j]: Maximum profit on the current day with $j$ transactions completed, while not holding any stock.

    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    // If k is large, we can perform as many transactions as we want.
    if (k >= n / 2) {
        let profit = 0;
        for (let i = 0; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    // Initialise DP arrays
    // hold[j]= max profit with j transactions while holding a stock
    // free[j]= max profit with j transactions while not holding a stock

    let hold = new Array(k + 1).fill(-Infinity);
    let free = new Array(k + 1).fill(0);

    for (let price of prices) {
        for (let j = 1; j <= k; j++) {
            // Choice 1: Buy the stock or keep holding previous once
            hold[j] = Math.max(hold[j], free[j- 1] - price);

            // Choice 2: Sell the stock or keep 
            free[j] = Math.max(free[j], hold[j] + price);
        }
    }
    return free[k];

    /*
    1. The "Quick-Profit" Optimization
If $k \ge \frac{n}{2}$, it means you have enough transactions to buy and sell every time the price goes up. In this case, we don't need complex DP; we just sum up every positive price difference from one day to the next.

2. Defining the States
Buying: When you buy a stock, your profit decreases by the current price: $free[j-1] - price$.
Selling: When you sell a stock, your profit increases by the current price: $hold[j] + price$.
3. The Iteration LogicFor every single price in the array, we check what would happen if that price was our $j$-th transaction:To update hold[j], we look at the profit we had after $(j-1)$ completed transactions (free[j-1]) and subtract the current price.To update free[j], we look at the profit we had while holding the stock for the $j$-th transaction (hold[j]) and add the current price.
4. ComplexityTime Complexity: $O(n \times k)$, where $n$ is the number of days and $k$ is the max transactions. We loop through prices and, for each price, loop up to $k$.Space Complexity: $O(k)$. We only store two arrays of size $k$ to keep track of the profits.

    */

};