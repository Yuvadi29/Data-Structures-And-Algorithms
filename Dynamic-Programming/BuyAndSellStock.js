/*You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

*/

var maxProfit = function (prices) {
    // Use Sliding Window Algorithm
    // Go to each price for a day and find out the minimum price on the left for that day.Initially consider the first element to be minimum

    let minimum = prices[0];
    let profit = 0;

    for (let i = 0; i < prices.length; i++) {
        // For i = 1, meaning the day 1, price is 0
        let cost = prices[i] - minimum;
        // This will give use the profit which is the maximum of the profit and cost
        profit = Math.max(profit, cost);
        // Update the minimum price if the current price is lower than the minimum price
        minimum = Math.min(minimum, prices[i]);
    }
    return profit;
};