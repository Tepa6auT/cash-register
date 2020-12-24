function checkCashRegister(price, cash, cid) {
    let name = ["PENNY","NICKEL","DIME","QUARTER","ONE","FIVE","TEN","TWENTY","ONE HUNDRED"]
    let value = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]
    let result = {status: "OPEN", change: []}
    let change = cash - price
 
    let beforehand = function() {
      let cidTotal = 0
      cid.map(item => cidTotal += item[1])
      return parseFloat(cidTotal.toFixed(2))
    }
 
    if (change > beforehand()) {
      result.status = 'INSUFFICIENT_FUNDS'
      result.change = []
    } else if (change == beforehand()) {
      result.status = 'CLOSED'
      result.change = [...cid]
    } else {
      for (let i = cid.length-1; i >= 0; i--) {
        let amount = 0
        while (change >= value[i] && cid[i][1] > 0) {
          cid[i][1] -= value[i]
          amount += value[i]
          change -= value[i]
          if (change < 0.01 && i == 0) {
            amount += 0.01
            change = 0
          }
        }
        if (amount > 0) {
          result.change.push([name[i], amount])
        }
      } if (change > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []}
      }
    }
    return result
 }
 
 checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);