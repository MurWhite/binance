import { connect } from 'react-redux';
import React, { Component } from 'react';
import { actionTypes } from '../../store/home/actions'
import "./list.scss";

function renderColoredSpan(judge = 0, content) {
  let className = '';
  if (judge > 0) {
    className = 'rise'
  } else if (judge < 0) {
    className = 'fall'
  }
  return (<span className={className}>{content}</span>);
}

function tabClassName(active, descend) {
  let className = [];
  active && className.push('active');
  descend && className.push('descend');
  return className.join(' ');
}

const tabList = [
  { key: 'symbol', label: 'symbol' },
  { key: 'lastPrice', label: 'lastPrice' },
  { key: 'priceChange', label: 'priceChange/24h' },
  { key: 'highPrice', label: 'highPrice/24h' },
  { key: 'lowPrice', label: 'lowPrice/24h' },
  { key: 'quoteVolume', label: 'quoteVolume/24h' },
]

class List extends Component {
  constructor() {
    super();
    this.state = {
      sortKey: '',
      descend: true,
    };
  }

  sort = (key) => {
    const { dispatch } = this.props;
    let { sortKey, descend } = this.state;
    if (sortKey === key) {
      descend = !descend;
    } else {
      descend = true;
    }
    this.setState({ sortKey: key, descend});
    dispatch({ type: actionTypes.SORT_LIST, key, descend })
  }

  handleTHeadClick = (e) => {
    const node = e.target;
    if (node.tagName === 'TH' && node.dataset.key) {
      this.sort(node.dataset.key);
    }
  }

  render() {
    const { list } = this.props;
    const { sortKey, descend } = this.state;
    return (
      <table className="table-list">
        <thead>
          <tr onClick={this.handleTHeadClick}>
            {tabList.map(tab => (
              <th key={tab.key} data-key={tab.key} className={tabClassName(sortKey===tab.key, descend)}>{tab.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {list.map((item) => {
          return (
          <tr key={item.symbol} style={{display: Number(item.quoteVolume)===0?'none':''}}>
            <td>{item.symbol}</td>
            <td>{renderColoredSpan(item.lastPriceChange, item.lastPrice)}</td>
            <td data-price={item.priceChangePercent}>{renderColoredSpan(item.priceChangePercent, `${item.priceChangePercent}%`)}</td>
            <td>{item.highPrice}</td>
            <td>{item.lowPrice}</td>
            <td>{item.quoteVolume}</td>
          </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps ( state ) {
  const { list } = state.home;
  return { list }
}

export default connect(mapStateToProps)(List)
