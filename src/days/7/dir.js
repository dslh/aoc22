const Dir = ({ dir }) => {
  const { name, dirs, files } = dir;

  return <div className="dir">
    <div className="dirName">{name}</div>
    <div className="dirContents">
      {Object.values(dirs).map((subdir, i) => <Dir key={i} dir={subdir} />)}
      {Object.entries(files).map(([name, size], i) => <div className="file" key={i}>{name} ({size})</div>)}
    </div>
  </div>;
};

export default Dir;
