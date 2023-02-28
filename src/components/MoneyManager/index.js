import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    inputTitle: '',
    inputAmount: '',
    selectValue: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  onAddDetails = event => {
    const {selectValue, inputTitle, inputAmount} = this.state

    const amount = parseInt(inputAmount)

    event.preventDefault()

    if (selectValue === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance + amount,
        income: prevState.income + amount,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.income - (prevState.expenses + amount),
        expenses: prevState.expenses + amount,
        selectValue: transactionTypeOptions[0].optionId,
      }))
    }

    const newType = transactionTypeOptions.filter(eachOption => {
      if (eachOption.optionId === selectValue) {
        return eachOption.displayText
      }
      return undefined
    })
    console.log(newType[0].displayText)

    const newHistory = {
      id: uuidv4(),
      title: inputTitle,
      amount: inputAmount,
      type: newType[0].displayText,
    }
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      inputTitle: '',
      inputAmount: '',
    }))
  }

  addMoney = event => {
    this.setState({inputAmount: event.target.value})
  }

  addTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onSelectOption = event => {
    this.setState({selectValue: event.target.value})
  }

  onDeleteHistory = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(
        eachHistory => eachHistory.id !== id,
      ),
    }))

    const {historyList} = this.state
    const type = historyList.filter(eachHistory => eachHistory.id === id)

    if (type[0].type === 'Expenses') {
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(type[0].amount),
        balance: prevState.balance + parseInt(type[0].amount),
      }))
    } else {
      this.setState(prevState => ({
        income: prevState.income - parseInt(type[0].amount),
        balance: prevState.balance - parseInt(type[0].amount),
      }))
    }
  }

  render() {
    const {
      balance,
      income,
      expenses,
      inputTitle,
      inputAmount,
      selectValue,
      historyList,
    } = this.state

    const mainApp = (
      <div className="home-cont">
        <div className="money-manage-cont">
          <div className="top-banner">
            <h1 className="user-name">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your
              <span className="app-name"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
          <div className="bottom-cont">
            <div className="input-form">
              <h1 className="trans-head">Add Transactions</h1>
              <form className="user-entry-form" onSubmit={this.onAddDetails}>
                <label htmlFor="title" className="label-text">
                  TITLE
                </label>
                <input
                  id="title"
                  className="input"
                  type="text"
                  placeholder="TITLE"
                  value={inputTitle}
                  onChange={this.addTitle}
                />
                <label htmlFor="amount" className="label-text" value="AMOUNT">
                  AMOUNT
                </label>
                <input
                  id="amount"
                  className="input"
                  type="text"
                  placeholder="AMOUNT"
                  value={inputAmount}
                  onChange={this.addMoney}
                />
                <label htmlFor="type" className="label-text">
                  TYPE
                </label>
                <select
                  id="title"
                  className="select"
                  onChange={this.onSelectOption}
                  value={selectValue}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <div className="history-cont">
              <h1 className="history">History</h1>
              <ul className="history-list">
                <li className="column-names-cont">
                  <p className="col-name">Title</p>
                  <p className="col-name">Amount</p>
                  <p className="col-name">Type</p>
                </li>
                {historyList.map(eachHistory => (
                  <TransactionItem
                    history={eachHistory}
                    key={eachHistory.type}
                    onDeleteHistory={this.onDeleteHistory}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
    return mainApp
  }
}

export default MoneyManager
