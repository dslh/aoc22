const Forest = ({ data, visible, focus }) => {
  const treeClass = (row, col) => {
    if (focus && row == focus.row && col == focus.col)
      return 'focus';

    if (visible && visible[row] && visible[row][col])
      return 'visible';
  };

  return <div className="forest">
    {data.map((row, i) =>
      <div key={i}>
        {row.map((tree, j) =>
          <span key={j} className={treeClass(i, j)}>{tree}</span>
        )}
      </div>
    )}
  </div>
};

export default Forest;
