import React from 'react';
import List from './List';

class SearchableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    
    this.setState({ 
      query: value
    });
  }

  onArchive(id) {
    const { archivedItems } = this.state;

    this.setState({
      archivedItems: [...archivedItems, id]
    });
  }

  render() {
    const { list } = this.props;
    const { query } = this.state;

    const filteredList = list
      .filter(byQuery(query)) || '';


    return ( 
      <div>
        <Search 
          query={query}
          onChange={this.onChange}
        >
          Search List:
        </Search>
        <List 
          list={filteredList} 
        />
      </div>
    );
  }
}

function byArchived(archivedItems) {
  return function(item) {
    return !archivedItems.includes(item.id);
  }
}

// function List({ list, onArchive }) {
//   return (
//     <ul>
//       {list.map(item => 
//         <li key={item.id}>
//           <span>
//             {item.name}
//           </span>
//           <span>
//             <button
//               type="button"
//               onClick={() => onArchive(item.id)}
//             >
//               Archive
//             </button>
//           </span>
//         </li>
//       )}
//     </ul>
//   );
// }

function Search({ query, onChange, children }) {
  return (
    <div>
      {children} 
      <input 
        type="text"
        value={query}
        onChange={onChange}
      />
    </div>
  )
}

function byQuery(query) {
  return function (item) {
    return !query || 
      item.name.toLowerCase().includes(query.toLowerCase());
  }
}

export default SearchableList;