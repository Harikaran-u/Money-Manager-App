// Write your code here
import './index.css'

const TransactionItem = props => {
  const {history, onDeleteHistory} = props
  const {title, amount, type, id} = history

  const deleteHistory = () => {
    onDeleteHistory(id)
  }

  const historyList = (
    <li className="list-ele">
      <p className="value">{title}</p>
      <p className="value">{`Rs ${amount}`}</p>
      <p className="value">{type}</p>
      <button
        className="delete-btn"
        type="button"
        onClick={deleteHistory}
        data-testid="delete"
      >
        <img
          className="delete-icon"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
  return historyList
}

export default TransactionItem
