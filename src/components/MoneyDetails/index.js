// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  const moneyDetails = (
    <div className="money-detail-cont">
      <div className="stats-cont balance">
        <img
          alt="balance"
          className="stats-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
        />
        <div className="balance-cont">
          <p className="balance-head">Your Balance</p>
          <p className="amount-value" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="stats-cont income">
        <img
          alt="income"
          className="stats-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="balance-cont">
          <p className="balance-head">Your Income</p>
          <p className="amount-value" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="stats-cont expenses">
        <img
          alt="expenses"
          className="stats-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="balance-cont">
          <p className="balance-head">Your Expenses</p>
          <p className="amount-value" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )

  return moneyDetails
}

export default MoneyDetails
